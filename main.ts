// Entry runner for "The 3AM Fridge Text".
// One text message, sent by an appliance that has been awake all night:
// the milk's expiry date becomes its own, and the owner's six midnight
// visits become a relationship problem. Delivered to /output/entry.txt
// with no extra files alongside it.
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const TEXT_FROM_THE_FRIDGE =
  "It's 3am. The milk expires tomorrow, and honestly, so do I. Also, he's opened me six times tonight just to stare. We need to talk.";

async function main(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await mkdir(out, { recursive: true });
  for (const name of await readdir(out)) {
    await rm(join(out, name), { recursive: true, force: true });
  }
  await writeFile(join(out, "entry.txt"), TEXT_FROM_THE_FRIDGE + "\n", "utf8");
}

await main();
