
function update(holes: i32[], player: i32, index: i32): i32 {
  // console.log("player: " + player.toString() + " index: " + index.toString());
  // console.log("cur holes: " + holes.toString());
  if (player == 2) {
    index += 7;
  }
  let balls = holes[index];
  holes[index] = 0;
  while (balls > 0) {
    index++;
    index %= 14;
    if (index == 6 && player == 2 || index == 13 && player == 1) {
    } else {
      holes[index]++;
      balls--;
    }
  }
  if (index == 6 && player == 1 || index == 13 && player == 2) {
    return player;
  }
  if (holes[index] == 1 && Math.floor(index / 7) + 1 == player && holes[12 - index] != 0) { // 得分啦
    let scoreHole = player * 7 - 1;
    holes[index] = 0;
    holes[scoreHole] += 1 + holes[12 - index];
    holes[12 - index] = 0;
  }
  return 3 - player;
}

function check(holes: i32[], op: i32, nextPlay: i32, i: i32): i32 {
  if (op % 10 > 6 || op % 10 < 1) {
    return 30000 + i;
  }
  if (nextPlay != Math.floor(op / 10)) {  // 下一手不该是你！
    return 30000 + i;
  }
  let index: i32 = nextPlay == 1 ? op % 10 - 1 : op % 10 + 6;
  if (holes[index] == 0) {
    return 30000 + i;
  }
  return 0;
}

function checkEnd(holes: i32[]): i32 {
  let check = 0;
  for (let i = 0; i < 6; i++) {
    check += holes[i];
  }
  if (check == 0) {
    return 1; // 1 棋洞空，结束
  }
  check = 0;
  for (let i = 7; i < 13; i++) {
    check += holes[i];
  }
  if (check == 0) {
    return 2; // 2 棋洞为空
  }
  return 0; // 未结束
}

function mancalaResult(firstHand: i32, op: i32[], size: i32): i32 {
  let holes: i32[] = new Array<i32>(14).fill(4);  // holes[6] [13] 作为得分洞，0-5 属于 player1，7-12 属于player2
  holes[6] = 0;
  holes[13] = 0;
  let nextPlay:i32 = firstHand;
  for (let i:i32 = 0; i < size; i++) {
    console.log(i.toString())
    let check_result = check(holes, op[i], nextPlay, i);
    if (check_result != 0) { // error
      return check_result;
    }
    nextPlay = update(holes, nextPlay, op[i] % 10 - 1);
    console.log("after update: " + holes.toString());
  }
  let checkEnd_result = checkEnd(holes);
  console.log("final holes: " + holes.toString());
  if (checkEnd_result == 0) {
    return 20000 + holes[firstHand * 7 - 1];
  }
  let ans: i32 = 0; // 1 的净胜棋数
  if (checkEnd_result == 1) {
    ans = 2 * holes[6] - 48;
  } else {
    ans = 48 - 2 * holes[13];
  }
  return 15000 +  (firstHand == 1 ? ans : -ans);
}

function mancalaBoard(firstHand: i32, op: i32[], size: i32): Array<i32> {
  let holes: i32[] = new Array<i32>(15).fill(4);  // holes[6] [13] 作为得分洞，0-5 属于 player1，7-12 属于player2
  holes[6] = 0;
  holes[13] = 0;
  let nextPlay:i32 = firstHand;
  for (let i:i32 = 0; i < size; i++) {
    console.log(i.toString())
    let check_result = check(holes, op[i], nextPlay, i);
    if (check_result != 0) { // error
      let errHand: i32 = Math.floor(op[i] / 10) as i32;
      if (errHand == 1) {
        holes[14] = 100 + 2 * holes[6] - 48;
      } else {
        holes[14] = 100 + 48 - 2 * holes[13];
      }
      return holes;
    }
    nextPlay = update(holes, nextPlay, op[i] % 10 - 1);
    console.log("after update: " + holes.toString());
  }
  let checkEnd_result = checkEnd(holes);
  if (checkEnd_result == 0) { // 未结束
    holes[14] = nextPlay;
    return holes;
  }
  let ans: i32 = 0; // 1 的净胜棋数
  if (checkEnd_result == 1) {
    ans = 2 * holes[6] - 48;
  } else {
    ans = 48 - 2 * holes[13];
  }
  holes[14] = 200 + ans;
  return holes;
}

function evaluate(holes: i32[]): i32 {
  return holes[6] - holes[13];
}

function miniMax(holes: i32[],  deep: i32): i32 {
  let max: i32 = -9999;
  let step: i32 = -1;
  for (let i:i32 = 5; i >= 0; i--) {
    if (holes[i] != 0) {
      let copy: i32[] = holes.slice();
      let nextPlay = update(copy, 1, i);
      if (nextPlay == 1) {
        let t = maxValue(copy, i, deep, 9999);
        if (max < t) {
          step = i;
          max = t;
        }
        // console.log("step: " + i.toString() + " t: " + t.toString());
      } else {
        let t = minValue(copy, i, deep - 1, max);
        if (max < t) {
          step = i;
          max = t;
        }
        // console.log("step: " + i.toString() + " t: " + t.toString());
      }
    }
  }
  return step;
}

// 我们始终以 1 玩家思考
function maxValue(holes: i32[], step: i32, deep: i32, curMin: i32): i32 {
  if (deep <= 0) {
    return evaluate(holes);
  }
  let max: i32 = -9999;
  for (let i:i32 = 5; i >= 0; i--) {
    if (max >= curMin) {
      return max;
    }
    if (holes[i] != 0) {
      let copy: i32[] = holes.slice();
      let nextPlay = update(copy, 1, i);
      let checkEnd_result = checkEnd(holes);
      if (checkEnd_result != 0) {
        if (checkEnd_result == 1) {
          max = max < 2 * holes[6] - 48 ? 2 * holes[6] - 48 : max;
        } else {
          max = max < 48 - 2 * holes[13] ? 48 - 2 * holes[13] : max;
        }
        continue;
      }
      if (nextPlay == 1) {
        let t = maxValue(copy, i, deep, curMin);
        if (max < t)
          max = t;
      } else {
        let t = minValue(copy, i, deep - 1, max);
        if (max < t)
          max = t;
      }
    }
  }
  return max;
}

// 以对手的思维思考
function minValue(holes: i32[], step: i32, deep: i32, curMax: i32): i32 {
  if (deep <= 0) {
    return evaluate(holes);
  }
  let min: i32 = 9999;
  for (let i:i32 = 12; i >= 7; i--) {
    if (min <= curMax) {
      return min;
    }
    if (holes[i] != 0) {
      let copy: i32[] = holes.slice();
      let nextPlay = update(copy, 2, i - 7);
      let checkEnd_result = checkEnd(holes);
      if (checkEnd_result != 0) {
        if (checkEnd_result == 1) {
          min = min > 2 * holes[6] - 48 ? 2 * holes[6] - 48 : min;
        } else {
          min = min > 48 - 2 * holes[13] ? 48 - 2 * holes[13] : min;
        }
        continue;
      }
      if (nextPlay == 2) {
        let t = minValue(copy, i, deep, curMax);
        if (min > t) 
          min = t;
      } else {
        let t = maxValue(copy, i, deep - 1, min);
        if (min > t)
          min = t;
      }
    }
  }
  return min;
}


export function mancalaOperator(flag: i32, status: i32[]): i32 {
  // console.log("当前场况: " + status.toString());
  if (flag == 2) {
    status = status.slice(7).concat(status.slice(0, 7));
  }
  let deep: i32 = 8;
  let nextStep = miniMax(status, deep);

  // if (nextStep == -1) {
  //   for (let i:i32 = 5; i >= 0; i--) {
  //     if (status[i] != 0) {
  //       nextStep = i;
  //     }
  //   }
  // }

  let ans: i32 = 0;
  if (flag == 1) {
    ans = nextStep + 11;
  } else {
    ans = nextStep + 21;
  }
  // console.log("下一步: " + ans.toString());
  
  return ans;
}
