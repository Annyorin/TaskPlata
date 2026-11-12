const fs = require("fs");
const pay = JSON.parse(fs.readFileSync("02-design-system/assets/scrn/pay-cards.json", "utf8"));
const index = JSON.parse(fs.readFileSync("02-design-system/assets/scrn/index.json", "utf8"));
const tree = index.items.map((item) => ({ id: item.id, parent: item.parent || null }));
const specs = pay.filter((flow) => flow.screens && flow.screens.length).map((flow) => ({
  id: flow.id,
  screens: flow.screens,
}));
const code = `const page = figma.root.children.find((node) => node.id === "2304:3675");
await figma.setCurrentPageAsync(page);
const board = await figma.getNodeByIdAsync("2306:1130");
const specs = ${JSON.stringify(specs)};
const tree = ${JSON.stringify(tree)};
const bySpec = Object.fromEntries(specs.map((flow) => [flow.id, flow.screens]));
const children = {};
for (const item of tree) (children[item.parent || "root"] ||= []).push(item.id);
const jobs = [];
let missed = 0;
function collect(frame, flowId) {
  if (!frame) { missed++; return; }
  const screens = bySpec[flowId] || [];
  if (screens.length) {
    const strip = frame.children.find((child) => child.name === "Скриншоты");
    const existing = new Set(strip ? strip.children.map((child) => child.name) : []);
    const missing = screens.filter((id) => !existing.has("scrn-" + id));
    if (missing.length) jobs.push({ parentId: frame.id, stripId: strip ? strip.id : null, screens: missing });
  }
  const frames = frame.children.filter((child) => child.type === "FRAME" && child.name !== "Скриншоты");
  (children[flowId] || []).forEach((childId, index) => collect(frames[index], childId));
}
const chapters = board.children.filter((child) => child.type === "FRAME");
(children.root || []).forEach((flowId, index) => {
  const chapter = chapters[index];
  const flow = chapter && chapter.children.find((child) => child.type === "FRAME");
  collect(flow, flowId);
});
const created = [];
for (const job of jobs) {
  const rects = job.screens.map((id) => {
    const rect = $fig.rectangle({
      name: "scrn-" + id,
      width: 96,
      height: 208,
      cornerRadius: 14,
      fills: [figma.util.solidPaint("#E8EBF0")],
      layoutSizingHorizontal: "FIXED",
      layoutSizingVertical: "FIXED",
    });
    created.push(rect);
    return rect;
  });
  if (job.stripId) {
    $fig.get(job.stripId).append(...rects);
  } else {
    const strip = $fig.autoLayout({
      name: "Скриншоты",
      layoutMode: "HORIZONTAL",
      itemSpacing: 12,
      fills: [],
    }, rects);
    $fig.addAt($fig.get(job.parentId), 1, strip);
  }
}
await $fig.done();
return {
  added: created.length,
  jobs: jobs.length,
  missed,
  images: created.map((rect) => ({ nodeId: rect.node.id, file: rect.node.name.slice(5) })),
};
`;
fs.writeFileSync("02-design-system/assets/scrn/place-code.js", code);
console.log("bytes", code.length, "specs", specs.length, "tree", tree.length);
