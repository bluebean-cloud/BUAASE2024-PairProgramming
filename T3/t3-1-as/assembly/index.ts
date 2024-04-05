
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
    // console.log(i.toString())
    let check_result = check(holes, op[i], nextPlay, i);
    if (check_result != 0) { // error
      return check_result;
    }
    nextPlay = update(holes, nextPlay, op[i] % 10 - 1);
    // console.log("after update: " + holes.toString());
  }
  let checkEnd_result = checkEnd(holes);
  // console.log("final holes: " + holes.toString());
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

export function mancalaBoard(firstHand: i32, op: i32[], size: i32): Array<i32> {
  let holes: i32[] = new Array<i32>(15).fill(4);  // holes[6] [13] 作为得分洞，0-5 属于 player1，7-12 属于player2
  console.log("ops: " + op.toString());
  holes[6] = 0;
  holes[13] = 0;
  holes[14] = 0;
  let nextPlay:i32 = firstHand;
  for (let i:i32 = 0; i < size; i++) {
    // console.log(i.toString())
    let check_result = check(holes, op[i], nextPlay, i);
    if (check_result != 0) { // error
      let errHand: i32 = Math.floor(op[i] / 10) as i32;
      if (errHand == 1) {
        holes[14] = 100 + 2 * holes[6] - 48;
      } else {
        holes[14] = 100 + 48 - 2 * holes[13];
      }
      console.log("error!");
      return holes;
    }
    nextPlay = update(holes, nextPlay, op[i] % 10 - 1);
    // console.log("after update: " + holes.toString());
  }
  let checkEnd_result = checkEnd(holes);
  console.log("op: " + op[size - 1].toString() + " board: " + holes.toString());

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