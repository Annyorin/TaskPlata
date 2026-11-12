const fs = require("fs");
const https = require("https");
const path = require("path");

const index = JSON.parse(fs.readFileSync("02-design-system/assets/scrn/index.json", "utf8"));
const roots = [
  "6a29b756b98cd198781bb8ea",
  "6a296382c29e72170c86e4cc",
  "6a296e1878d043a3a89f516f",
];
const byParent = {};
for (const item of index.items) {
  const key = item.parent || "root";
  (byParent[key] ||= []).push(item.id);
}
const want = [];
function add(id) {
  want.push(id);
  for (const child of byParent[id] || []) add(child);
}
roots.forEach(add);

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        get(res.headers.location).then(resolve, reject);
        return;
      }
      const chunks = [];
      res.on("data", (d) => chunks.push(d));
      res.on("end", () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks) }));
    }).on("error", reject);
  });
}

(async () => {
  const dir = "02-design-system/assets/scrn";
  const placed = [];
  const urls = {};
  for (let i = 0; i < want.length; i += 1) {
    const result = await get("https://scrn.gallery/api/flows/" + want[i]);
    const doc = JSON.parse(result.buf.toString("utf8"));
    const screens = (doc.screens_full || [])
      .filter((screen) => screen.type === "image" && (screen.preview_url || screen.original_url))
      .map((screen) => {
        urls[screen._id] = "https://scrn.gallery" + (screen.preview_url || screen.original_url);
        return screen._id;
      });
    placed.push({ id: doc._id || want[i], name: doc.name || "", screens });
    if ((i + 1) % 10 === 0) console.log("flows", i + 1, "/", want.length, doc.name, screens.length);
  }
  const ids = Object.keys(urls);
  let ok = 0;
  let fail = 0;
  const queue = ids.filter((id) => !fs.existsSync(path.join(dir, id + ".jpg")));
  async function worker() {
    while (queue.length) {
      const id = queue.shift();
      try {
        const result = await get(urls[id]);
        if (result.status !== 200) {
          fail += 1;
          console.log("bad", id, result.status);
          continue;
        }
        fs.writeFileSync(path.join(dir, id + ".jpg"), result.buf);
        ok += 1;
      } catch (error) {
        fail += 1;
        console.log("err", id, error.message);
      }
    }
  }
  await Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);
  const ready = placed.map((flow) => ({
    id: flow.id,
    screens: flow.screens.filter((id) => fs.existsSync(path.join(dir, id + ".jpg"))),
  }));
  fs.writeFileSync(path.join(dir, "pay-cards.json"), JSON.stringify(ready));
  const shots = ready.reduce((sum, flow) => sum + flow.screens.length, 0);
  console.log("downloaded", ok, "fail", fail, "placements", shots, "unique", ids.length);
})();
