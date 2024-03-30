import assert from "assert";
import { bocchiShutUp } from "../build/debug.js";
assert.strictEqual(bocchiShutUp(1,[13,14,15,21,11,16],6),10);
console.log("ok");
