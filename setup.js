//hi
let board = localStorage.getItem("board");

if (board === null) {
  board = ["", "", "", "", "", "", "", "", ""];
  localStorage.setItem("board", board.join());
} else {
  board = board.split(",");
}

let markings = localStorage.getItem("marks");
if (markings === null) {
  markings = [
    "--------",
    "--------",
    "--------",
    "--------",
    "--------",
    "--------",
    "--------",
    "--------",
    "--------",
  ];
  localStorage.setItem("marks", markings);
} else {
  markings = markings.split(",");
}

//return a random Int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//a is the list of valid indexs, and c is the number of indexs you want
//returns a list of lists
function indexCodes(a, c) {
  let index = [];
  let n = a.length;

  for (let j = 0; j < c; j++) index[j] = j;
  index[c] = n;

  let ok = true;
  let result = [];

  while (ok) {
    let comb = [];
    for (let j = 0; j < c; j++) comb[j] = a[index[j]];
    result.push(comb);

    ok = false;

    for (let j = c; j > 0; j--) {
      if (index[j - 1] < index[j] - 1) {
        index[j - 1]++;
        for (let k = j; k < c; k++) index[k] = index[k - 1] + 1;
        ok = true;
        break;
      }
    }
  }

  return result;
}

function allCombos(letter_nums) {
  let lst = [];
  let start = [0, 1, 2, 3, 4, 5, 6, 7];

  let A = letter_nums[0];
  let B = letter_nums[1];
  let C = letter_nums[2];

  let A_combos = indexCodes(start, A);

  for (let i = 0; i < A_combos.length; i++) {
    let B_lst = [];
    let AA = A_combos[i];

    for (let s = 0; s < start.length; s++) {
      if (!AA.includes(s)) {
        B_lst.push(s);
      }
    }

    let B_combos = indexCodes(B_lst, B);

    for (let j = 0; j < B_combos.length; j++) {
      let CC = [];
      let BB = B_combos[j];

      for (let s = 0; s < start.length; s++) {
        if (!(AA.includes(s) || BB.includes(s))) {
          CC.push(s);
        }
      }

      //We have A B and C
      let possible_code = ["", "", "", "", "", "", "", ""];

      //change A
      for (let s = 0; s < AA.length; s++) {
        possible_code[AA[s]] = "A";
      }

      //change B
      for (let s = 0; s < BB.length; s++) {
        possible_code[BB[s]] = "B";
      }

      //change C
      for (let s = 0; s < CC.length; s++) {
        possible_code[CC[s]] = "C";
      }

      if (!lst.includes(possible_code)) {
        lst.push(possible_code);
      }
    }
  }

  return lst;
}

function shuffle(array, seed) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

//random seed
function random(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

//generate all possible combos
function getCodeList() {
  var codes = [];
  let vals = [];

  for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9 - a; b++) {
      for (let c = 0; c < 9 - (a + b); c++) {
        if (a > 0 && b > 0 && c > 0 && a + b + c === 8) {
          vals.push([a, b, c]);
        }
      }
    }
  }

  //generate all
  for (let i = 0; i < vals.length; i++) {
    let combos = allCombos(vals[i]);

    for (let j = 0; j < combos.length; j++) {
      if (!codes.includes(combos[j])) {
        codes.push(combos[j]);
      }
    }
  }

  return shuffle(codes, 55);
}

//make the game grid
function makeGrid(secret_len, guesses) {
  grid = [];

  if (board) {
    for (let i = 0; i < guesses; i++) {
      row = [];
      for (let j = 0; j < secret_len + 1; j++) {
        if (board[i].length > 0) {
          row.push(board[i][j]);
        } else {
          row.push("");
        }
      }
      grid.push(row);
    }
  } else {
    for (let i = 0; i < guesses; i++) {
      row = [];
      for (let j = 0; j < secret_len + 1; j++) {
        row.push("");
      }
      grid.push(row);
    }
  }

  return grid;
}

//get the score for the row
function getScore(guess) {
  let cnt = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] == secret[i]) {
      cnt++;
    }
  }
  return cnt;
}

//return markings
function getMarks() {
  return markings;
}
