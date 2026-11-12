# Плейбук сборки: пролог, каркас, законы размеров, грабли

Код ниже вставляется в `use_figma`. Перед этим загрузи скилл `figma-use`. Блок `CONFIG` заполняется один раз под файл пользователя, дальше пролог копируется в начало каждого скрипта.

## 0. CONFIG: заполнить под файл

```js
const CONFIG = {
  componentsPage: 'Components',   // страница с компонентами
  screensPage:    'Screens',      // страница с экранами
  iconPrefix:     'Icon/',        // как названы иконки-компоненты
  stylePrefix:    '',             // префикс текстовых стилей, если есть (например 'DS/')
  screen:         { w: 390, h: 844, step: 440 },  // размер фрейма и шаг между экранами
  fonts:          [],             // оставь пустым: семейства и начертания соберутся из стилей
};
```

## 1. Пролог: карта по именам, стили, переменные, шрифты

```js
const pages = figma.root.children;
const CPG = pages.find(p => p.name === CONFIG.componentsPage);
const SPG = pages.find(p => p.name === CONFIG.screensPage);
if (!CPG || !SPG) throw new Error('не нашёл страницы: ' + CONFIG.componentsPage + ' / ' + CONFIG.screensPage);
await CPG.loadAsync();

// карта компонентов по имени. ID не хранить: они меняются при пересборке
const COMP = {}; const ICONS = {};
for (const n of CPG.findAll(x => x.type === 'COMPONENT' || x.type === 'COMPONENT_SET')) {
  if (n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET') continue; // варианты берём через сет
  if (n.name.indexOf(CONFIG.iconPrefix) === 0) ICONS[n.name.slice(CONFIG.iconPrefix.length)] = n;
  else COMP[n.name] = n;
}

await figma.setCurrentPageAsync(SPG);   // ровно один раз за скрипт

// стили и переменные
const TSS = {}; (await figma.getLocalTextStylesAsync()).forEach(s => TSS[s.name] = s);
const V = {}; (await figma.variables.getLocalVariablesAsync()).forEach(v => V[v.name] = v);

// шрифты: собрать из стилей, загрузить все начертания
const fontSet = new Map();
Object.values(TSS).forEach(s => fontSet.set(s.fontName.family + '|' + s.fontName.style, s.fontName));
await Promise.all([...fontSet.values()].map(f => figma.loadFontAsync(f)));

// хелперы
function hx(h){h=h.replace('#','');return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255};}
function S(h,o){return{type:'SOLID',color:hx(h),opacity:o===undefined?1:o};}
function P(name, fallbackHex){                     // заливка переменной; fallback только как заглушка до привязки
  if (!V[name]) throw new Error('нет переменной: ' + name);
  return figma.variables.setBoundVariableForPaint({type:'SOLID',color:hx(fallbackHex||'#808080')}, 'color', V[name]);
}
function cfg(c, dir, o) {
  c.layoutMode = dir; c.itemSpacing = o.gap === undefined ? 8 : o.gap;
  c.paddingTop = o.pt === undefined ? (o.p||0) : o.pt; c.paddingBottom = o.pb === undefined ? (o.p||0) : o.pb;
  c.paddingLeft = o.pl === undefined ? (o.p||0) : o.pl; c.paddingRight = o.pr === undefined ? (o.p||0) : o.pr;
  c.counterAxisAlignItems = o.align || 'MIN'; c.primaryAxisAlignItems = o.justify || 'MIN';
  c.cornerRadius = o.radius || 0; c.clipsContent = o.clip === undefined ? false : o.clip;
  c.fills = o.fillVar ? [P(o.fillVar, o.fillHex)] : [];
  c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'AUTO';
  if (o.strokeVar) { c.strokes = [P(o.strokeVar, o.strokeHex)]; c.strokeWeight = o.sw || 1; }
  if (o.w) { c.resize(o.w, Math.max(1, c.height)); if (dir === 'HORIZONTAL') c.primaryAxisSizingMode = 'FIXED'; else c.counterAxisSizingMode = 'FIXED'; }
  return c;
}
function AF(name, dir, o){ const f = figma.createFrame(); f.name = name; return cfg(f, dir, o || {}); }
function fill(n){ n.layoutSizingHorizontal = 'FILL'; return n; }
function wrap(t){ t.textAutoResize = 'HEIGHT'; return t; }
async function TX(chars, styleName, colorVar) {
  const t = figma.createText();
  const st = TSS[CONFIG.stylePrefix + styleName]; if (!st) throw new Error('нет текстового стиля: ' + styleName);
  t.fontName = st.fontName; t.characters = chars;
  await t.setTextStyleIdAsync(st.id);
  if (colorVar) t.fills = [P(colorVar)];
  return t;
}
function IC(name, size, colorVar) {
  const c = ICONS[name]; if (!c) throw new Error('нет иконки: ' + name);
  const i = c.createInstance(); if (size) i.rescale(size / i.width);
  if (colorVar) i.findAll(n => 'fills' in n || 'strokes' in n).forEach(v => {
    if (v.fills && v.fills.length) v.fills = [P(colorVar)];
    if (v.strokes && v.strokes.length) v.strokes = [P(colorVar)];
  });
  return i;
}
function inst(name, variantMatch) {
  const c = COMP[name]; if (!c) throw new Error('нет компонента: ' + name);
  if (c.type === 'COMPONENT_SET') {
    const v = variantMatch ? c.children.find(x => x.name.indexOf(variantMatch) >= 0) : c.defaultVariant;
    if (!v) throw new Error('нет варианта ' + variantMatch + ' у ' + name);
    return v.createInstance();
  }
  return c.createInstance();
}
function prop(node, prefix, value) {              // подпись через component properties, если они есть
  const key = Object.keys(node.componentProperties || {}).find(k => k.indexOf(prefix) === 0);
  if (!key) return false;
  const o = {}; o[key] = value; node.setProperties(o); return true;
}
async function setChars(t, val) {
  for (const seg of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(seg.fontName);
  t.characters = val;
}
```

Порядок подмены подписи: сначала `prop(node, 'Title', '…')`; если вернул `false`, найти текстовый узел внутри инстанса по имени и `setChars`. Все дефолтные тексты компонента подменять явно.

## 2. Каркас экрана

```js
function screen(name, idx, xBase, yBase) {
  const f = figma.createFrame();
  f.name = name; f.resize(CONFIG.screen.w, CONFIG.screen.h);
  f.layoutMode = 'VERTICAL'; f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'FIXED';
  f.itemSpacing = 0; f.clipsContent = true;
  f.fills = [P('bg/app', '#FFFFFF')];              // имя переменной фона подставить из системы
  SPG.appendChild(f); f.x = (xBase||0) + idx * CONFIG.screen.step; f.y = yBase||0;
  if (COMP['StatusBar']) { const sb = inst('StatusBar'); f.appendChild(sb); sb.layoutSizingHorizontal = 'FILL'; }
  return f;
}
function body(f, o) {                              // растущая середина
  const b = AF('content','VERTICAL', Object.assign({ pl:16, pr:16, pt:8, pb:24, gap:16, clip:true }, o||{}));
  f.appendChild(b); b.layoutSizingHorizontal = 'FILL'; b.layoutGrow = 1; return b;
}
function bottom(f, withTabbar) {
  if (withTabbar && COMP['TabBar']) { const tb = inst('TabBar'); f.appendChild(tb); tb.layoutSizingHorizontal = 'FILL'; }
  if (COMP['HomeIndicator']) { const hi = inst('HomeIndicator'); f.appendChild(hi); hi.layoutSizingHorizontal = 'FILL'; }
}
```

Порядок: `screen()` → апбар (`inst('AppBar','BackTitle')` + `prop(ab,'Title','…')`) → `body()` → содержимое → `bottom(f, true|false)`. Отступы рамки (16, 8, 24) заменить на значения из токенов системы, если они есть.

Прижать кнопку к низу: перед ней распорка
```js
const sp = AF('spacer','VERTICAL',{}); b.appendChild(sp); fill(sp); sp.layoutGrow = 1;
```

Имена компонентов каркаса (`StatusBar`, `AppBar`, `TabBar`, `HomeIndicator`) подставить как они названы в системе пользователя.

## 3. Три закона размеров

Оба класса дефектов, которые ловятся чаще всего, растут из одного корня: **в компонент зашивали геометрию вместо правил поведения.**

1. **Высота от содержимого.** Всё, что содержит текст или строки, собирается на авто-лейауте с явными паддингами и hug по главной оси. Тексты внутри: `wrap(t)` + `fill(t)`. Фиксированная высота допустима, только когда геометрия и есть содержание: сетка календаря, оси графика, кольцо, скелетон, QR.
2. **Ширина от родителя.** `layoutSizingHorizontal = 'FILL'` на инстансе растягивает только рамку. Начинка тянется, если компонент это умеет: либо авто-лейаут с `FILL` или `layoutGrow = 1` у детей, либо констрейнты `STRETCH` у подложек во всю ширину и `SCALE` у графики. Без этого рамка станет 358, а содержимое останется 300, приколотое к левому верхнему углу.
3. **Доли масштабированием, не пикселями.** Заполнение прогресса, бюджета, шкалы: трек с `clipsContent`, внутри заливка с констрейнтом `SCALE`. Пиксельная ширина при другой ширине контейнера соврёт.

Проверка перед сдачей: положить инстансы в тестовый фрейм шириной 500 с `FILL` и убедиться, что ширина совпала с доступной, а доли остались прежними. Второй тест: удвоить длину текста и убедиться, что ничего не обрезано.

## 4. Проверка отдельным вызовом

После записи новый read-only вызов:

```js
const f = SPG.findOne(n => n.type === 'FRAME' && n.name === 'ИМЯ_ЭКРАНА');
const report = { instances: 0, fakeFrames: [], unboundFills: [], noStyle: [], clipped: [] };
f.findAll(n => true).forEach(n => {
  if (n.type === 'INSTANCE') report.instances++;
  if (n.type === 'FRAME' && /button|input|row|card|chip|tab/i.test(n.name)) report.fakeFrames.push(n.name);
  if ('fills' in n && Array.isArray(n.fills)) n.fills.forEach(p => { if (p.type === 'SOLID' && !(n.boundVariables && n.boundVariables.fills)) report.unboundFills.push(n.name); });
  if (n.type === 'TEXT') { if (!n.textStyleId) report.noStyle.push(n.characters.slice(0,30)); if (n.textTruncation === 'ENDING') report.clipped.push(n.characters.slice(0,30)); }
});
return report;
```

Пустые `fakeFrames`, `unboundFills`, `noStyle`, `clipped` это норма. Что-то есть: чинить, потом скриншот.

## 5. Грабли API

| Симптом | Причина | Как правильно |
|---|---|---|
| `Cannot move node. Reparenting would create a component inside a component` | вложенные контейнеры создавали через `createComponent` | верхний узел компонента через `createComponent`, всё внутри обычными `createFrame` |
| `layoutGrow failed validation: Expected integer` | пропорции задавали долями (1.6, 1.2) | `layoutGrow` только 0 или 1; пропорции через фиксированные ширины плюс одна растущая колонка |
| Варианты сета лежат друг на друге | `combineAsVariants` не раскладывает варианты | сету задать `layoutMode='HORIZONTAL'`, паддинги и `itemSpacing` |
| Текст в инстансе не подменяется | подпись живёт в component properties | сначала `prop(node,'Title', …)`, если `false`, правка текстового узла |
| После свопа инстанса подписи перепутались | тексты переносили по индексу, порядок узлов у нового мастера другой | переносить по совпадению исходной строки либо явным списком |
| Инстанс приносит чужой текст | дефолты компонента завязаны на другой сценарий | подменять все тексты явно, дефолты держать нейтральными |
| Скрипт упал на узле чужой страницы | страница не загружена | `await page.loadAsync()`; `setCurrentPageAsync` один раз за скрипт |
| Удалился не тот узел | удаляли по ID из прошлого шага | удалять по имени внутри секции, ID между сессиями не переиспользовать |
| Всё откатилось после записи | `throw` в конце мутирующего вызова | отчёт отдельным read-only вызовом |
| Шрифт не грузится | стиль ссылается на шрифт, которого нет в Figma | локальные шрифты плагин не видит: загрузить шрифт в аккаунт Figma или взять стиль на доступном |
