---
name: ship
description: Фаза 3 code — передача на GitHub и деплой превью (Vercel, Netlify, Cloudflare Pages или VPS). Использовать на «задеплой», «выложи на Vercel», «handoff в GitHub», «preview URL».
---

# Ship — GitHub + deploy

## Среда

`05-code/` + git-корень app. Канон: [`PIPELINE.md`](../../../../../_shared/code/PIPELINE.md).

Предусловие: `app-live` gate или пользователь явно шипит только Storybook/статику.

Сначала при сомнении в git — `infra/git-github-check` (health), затем этот скилл (handoff).

## Process

### A. GitHub handoff

1. Убедись: `.gitignore` (node_modules, dist, .env), README: как запустить Storybook и app.
2. Коммит **только по явной просьбе** пользователя.
3. Remote: создать репо (`gh repo create`) или push в существующий; ветка не `force` на main.
4. В `code-manifest` или NOTES: URL репо, ветка, SHA.

### B. Deploy (routing)

Спроси платформу, если не задана. Дефолт прототипа: **Vercel**.

| Платформа | Типичный путь |
|-----------|----------------|
| Vercel | `vercel` / GitHub integration; SPA → rewrites на `index.html` |
| Netlify | `netlify.toml` publish + redirect `/* /index.html 200` |
| Cloudflare Pages | build output + SPA fallback |
| VPS | nginx/caddy: try_files для SPA; HTTPS; env на сервере |

1. Build: `npm run build` (и storybook static — опционально отдельный URL).
2. Env: только публичные; секреты не в git.
3. Проверь preview: открыть URL, пройти один сценарий.
4. Запиши **preview URL** в `outputs/code-manifest.md` § Deploy.

### C. Gate

- [ ] репо доступен команде (или local-only с пометкой);
- [ ] preview открывается, маршруты SPA не 404 на refresh;
- [ ] URL зафиксирован.

## Rules

- Не force-push main/master.
- Не коммитить `.env` с секретами.
- Production-домен и CI — по запросу; канон фазы 3 — **preview**.
- После ship логичный следующий шаг — `user-test-loop`.
