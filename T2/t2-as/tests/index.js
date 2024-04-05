import assert from "assert";
import { mancalaResult } from "../build/release.js";

// 这是一个正常完成比赛的测试用例
// assert.strictEqual(mancalaResult(1, [13, 16, 22, 26, 14, 23, 12, 26, 22, 15, 25, 11, 26, 24, 14, 11, 23, 12, 26, 22, 16, 25, 26, 24, 13, 25, 15, 26, 23, 16], 30), 14976);

// 这是一个正常进行但是尚未结束的测试用例
// assert.strictEqual(mancalaResult(2, [22, 16, 21, 12], 4), 20000);

// 这是一些测试错误的测试用例
// assert.strictEqual(mancalaResult(2, [22, 16, 21, 12, 11], 5), 30004);    // 不该由 1 继续
// assert.strictEqual(mancalaResult(2, [22, 26, 21, 12], 4), 30001);        // 不该由 2 继续
// assert.strictEqual(mancalaResult(2, [22, 16, 21, 16], 4), 30003);        // 走了空的洞

// assert.strictEqual(mancalaResult(2, [22, 16, 21, 12, 23, 16, 22], 7), 30006);   // 应该由 1 继续走
// assert.strictEqual(mancalaResult(2, [12, 16, 21, 12], 4), 30000);

console.log("ok");
