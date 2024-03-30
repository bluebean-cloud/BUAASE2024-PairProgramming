// The entry file of your WebAssembly module.

// export function add(a: i32, b: i32): i32 {
//   return a + b;
// }


export function bocchiShutUp(flag: i32, arr: i32[], size: i32): i32 {
  let _map: i32[] = new Array<i32>(30).fill(0);
  for (let i = 0; i < size; i++) {
    _map[arr[i]]++;
  }
  let count: i32 = 0;
  let max: i32 = 0;
  let ans: i32 = 0;
  if (flag == 1) {
    for (let i: i32 = 11; i <= 16; i++) {
      if (max < _map[i]) {
        max = _map[i];
        ans = i;
        count = 1;
      } else if (max == _map[i]) {
        count++;
      }
    }
  } else {
    for (let i: i32 = 21; i <= 26; i++) {
      if (max < _map[i]) {
        max = _map[i];
        ans = i;
        count = 1;
      } else if (max == _map[i]) {
        count++;
      }
    }
  }
  if (count == 1) {
    return ans;
  }
  return 10;
}
