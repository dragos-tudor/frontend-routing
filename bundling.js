import { bundle } from "/emit.ts"

const indexUrl = new URL("./mod.js", import.meta.url);
const bundleResult = await bundle(indexUrl)

const { code } = bundleResult;
Deno.writeTextFileSync("./index.js", code.split("//#")[0]);