//Main Screen Elements
const tileDisplay = document.querySelector(".tile-container"); //title div
const keyboard = document.querySelector(".key-container"); // key-buttons bottom
const messageDisplay = document.querySelector(".message-container"); // message alert container
const titleDiv = document.querySelector(".title"); //title dic

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); //delay

//initalize vars
const guessRows = makeGrid(8, 9);
const code_list = getCodeList();
let marks = getMarks();
const launch_date = new Date(2022, 2, 25).setHours(0, 0, 0);
let days = localStorage.getItem("last_day_won");
let code_num = localStorage.getItem("code_num");

if (code_num !== null) {
  code_num = parseInt(code_num);
} else {
  code_num = Math.trunc((new Date() - launch_date) / 86400000);
  localStorage.setItem("code_num", code_num);
}

if (days !== null) {
  days = parseInt(days);
} else {
  days = -1;
}

let secret =
  code_list[
    Math.trunc((new Date() - launch_date) / 86400000) % code_list.length
  ];

const keys = ["ENTER", "A", "B", "C", "DEL"];
const arrows = ["◄", "▲", "▼", "►"];

const light = true;

if (localStorage.getItem("hard_crown") === null) {
  localStorage.setItem("hard_crown", "false");
}

if (localStorage.getItem("games_played") === null) {
  localStorage.setItem("games_played", 0);
}

if (localStorage.getItem("win_rate") === null) {
  localStorage.setItem("win_rate", 0);
}

if (localStorage.getItem("current_streak") === null) {
  localStorage.setItem("current_streak", 0);
}

if (localStorage.getItem("max_streak") === null) {
  localStorage.setItem("max_streak", 0);
}

let guess_distribution = localStorage.getItem("guess_distribution");
let nums = "0,0,0,0,0,0,0,0,0";

if (guess_distribution === null) {
  localStorage.setItem("guess_distribution", nums);
}

let currentRow = localStorage.getItem("current_row");

if (currentRow === null) {
  currentRow = 0;
  localStorage.setItem("current_row", currentRow);
} else {
  currentRow = parseInt(currentRow);
}

let currentTile = 0;

let isGameOver = localStorage.getItem("game_over");

if (isGameOver === null) {
  isGameOver = false;
  localStorage.setItem("game_over", isGameOver);
} else {
  isGameOver = isGameOver === "true";
}

//Countdown Timer
function daily_timer() {
  var d1 = new Date();
  var d2 = Date.UTC(
    d1.getUTCFullYear(),
    d1.getUTCMonth(),
    d1.getUTCDate() + (d1.getUTCHours() < 4 ? 0 : 1),
    4
  );

  var dh = d2 - d1;
  var hours = Math.floor(dh / 3600000);
  var dm = dh - 3600000 * hours;
  var min = Math.floor(dm / 60000);
  var ds = dm - 60000 * min;
  var sec = Math.floor(ds / 1000);
  var dmilli = ds - 1000 * sec;
  setTimeout(daily_timer, dmilli);
  hours = ("0" + hours).slice(-2);
  min = ("0" + min).slice(-2);
  sec = ("0" + sec).slice(-2);

  let count = document.querySelector("#countdown");

  if (count !== null) {
    count.textContent = hours + ":" + min + ":" + sec;
  }

  //if the codenum is different from calc days then reset everything
  if (
    hours + ":" + min + ":" + sec === "00:00:00" ||
    code_num !== Math.trunc((new Date() - launch_date) / 86400000)
  ) {
    //if calc days - last_day_won is larger than 1 then I get rid of the streak
    if (Math.trunc((new Date() - launch_date) / 86400000) - days > 1) {
      localStorage.setItem("current_streak", 0);
    }

    //reset game_over, code_num, current_row, board, & secret
    localStorage.setItem("game_over", false);
    localStorage.setItem("current_row", 0);
    localStorage.setItem(
      "code_num",
      Math.trunc((new Date() - launch_date) / 86400000)
    );

    //make a list of all possible secrets code_num is how to get it
    secret =
      code_list[
        Math.trunc((new Date() - launch_date) / 86400000) % code_list.length
      ];

    let guesses = ["", "", "", "", "", "", "", "", ""];
    localStorage.setItem("board", guesses.join());

    if (localStorage.getItem("level") === "hard") {
      localStorage.setItem("hard_crown", "true");
    }

    marks = [
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

    localStorage.setItem("marks", marks);

    //reload page
    location.reload();
  }
}

setInterval(daily_timer(), 1000); //run every second

let level = localStorage.getItem("level");
if (!level) {
  level = "reg";
  localStorage.setItem("level", "reg");
}

//add color to key
const addColorToKey = (tile, letter) => {
  let color = null;

  if (!isGameOver) {
    if (letter == "A") {
      color = "A-overlay";
    } else if (letter == "B") {
      color = "B-overlay";
    } else {
      color = "C-overlay";
    }
  } else {
    let index = tile.id[tile.id.length - 1];

    if (secret[index] === tile.textContent) {
      color = "green-overlay";
    } else {
      color = "grey-overlay";
    }
  }

  if (color != null) {
    tile.classList.add(color);
  }
};

//add mark to markRow
const addMark = (markElement, mark) => {
  if (mark === "-") {
    return;
  } else if (mark === "O") {
    markElement.textContent = "O";
    markElement.classList.add("correct");
  } else if (mark === "X") {
    markElement.textContent = "X";
    markElement.classList.add("wrong");
  } else if (mark === "!") {
    markElement.textContent = "!";
    markElement.classList.add("same");
  } else {
    return;
  }
};

//check if in dark mode
function darkCheck() {
  let body = document.body;
  let lines = document.querySelectorAll(".vertical");
  let key_buttons = document.querySelectorAll(".key");

  if (localStorage.getItem("dark") === "true") {
    body.classList.add("dark-mode");

    key_buttons.forEach((k) => {
      k.style.color = "#ffffff";
    });

    lines.forEach((l) => {
      l.style.backgroundColor = "#ffffff";
    });
  } else {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
    }

    key_buttons.forEach((k) => {
      k.style.color = "#000";
    });

    lines.forEach((l) => {
      l.style.backgroundColor = "#000";
    });
  }
}

//Click a Tile
const tileClick = (guessRowIndex, guessIndex) => {
  if (localStorage.getItem("game_over") === "true") {
    return;
  }

  const markElement = document.getElementById(
    "markRow-" + guessRowIndex + "-tile-" + guessIndex
  );

  text = markElement.textContent;

  if (guessRowIndex < currentRow) {
    if (text === "") {
      markElement.textContent = "O";
      markElement.classList.add("correct");

      if (markElement.classList.contains("cursor")) {
        markElement.style.top = "0";
        markElement.style.fontSize = "3vh";
      }
    } else if (text === "O") {
      markElement.classList.remove("correct");
      markElement.textContent = "X";
      markElement.classList.add("wrong");

      if (markElement.classList.contains("cursor")) {
        markElement.style.top = "0";
        markElement.style.fontSize = "3vh";
      }
    } else if (text === "X") {
      markElement.classList.remove("wrong");
      markElement.textContent = "!";
      markElement.classList.add("same");

      if (markElement.classList.contains("cursor")) {
        markElement.style.top = "0";
        markElement.style.fontSize = "3vh";
      }
    } else if (text === "*") {
      markElement.textContent = "O";
      markElement.classList.add("correct");

      if (markElement.classList.contains("cursor")) {
        markElement.style.top = "0";
        markElement.style.fontSize = "3vh";
      }
    } else {
      if (markElement.classList.contains("cursor")) {
        markElement.classList.add("cursor");
        markElement.textContent = "*";
        markElement.style.fontSize = "5vh";
        markElement.style.top = "1vh";
      } else {
        markElement.textContent = "";
      }

      markElement.classList.remove("same");
    }
  } else if (guessRowIndex === currentRow) {
    currentTile = guessIndex;

    //find the tile that has a mark
    const rowTiles = document.querySelector(
      "#markRow-" + currentRow
    ).childNodes;
    rowTiles.forEach((tile) => {
      if (tile.classList.contains("cursor")) {
        tile.classList.remove("cursor");
        tile.textContent = "";
        markElement.style.paddingTop = "0";
      }
    });

    markElement.textContent = "*";
    markElement.style.fontSize = "5vh";
    markElement.classList.add("cursor");
  }

  let arr = [];

  for (let i = 0; i < marks.length; i++) {
    row = "";
    for (let j = 0; j < marks[0].length; j++) {
      if (i === guessRowIndex && j === guessIndex) {
        row += markElement.textContent;
      } else {
        row += marks[i][j];
      }
    }
    arr.push(row);
  }

  marks = arr;

  localStorage.setItem("marks", marks.join());
};

//Initalize game screen
guessRows.forEach((guessRow, guessRowIndex) => {
  if (guessRowIndex <= currentRow) {
    const rowElement = document.createElement("div");
    rowElement.setAttribute("id", "guessRow-" + guessRowIndex);
    const markRowElement = document.createElement("div");
    markRowElement.setAttribute("id", "markRow-" + guessRowIndex);

    guessRow.forEach((_guess, guessIndex) => {
      const tileElement = document.createElement("div");
      let letter = guessRows[guessRowIndex][guessIndex];
      tileElement.textContent = letter;

      if (guessIndex < guessRow.length - 1) {
        tileElement.setAttribute(
          "id",
          "guessRow-" + guessRowIndex + "-tile-" + guessIndex
        );

        tileElement.addEventListener("click", () =>
          tileClick(guessRowIndex, guessIndex)
        );

        if (letter.length > 0) {
          addColorToKey(tileElement, letter);
        }

        tileElement.setAttribute("data", letter);
      } else {
        let line = document.createElement("div");
        line.setAttribute("id", "line-" + guessRowIndex);
        line.classList.add("vertical");

        rowElement.append(line);

        tileElement.setAttribute(
          "id",
          "guessRow-" + guessRowIndex + "-tile-score"
        );

        tileElement.setAttribute("data", letter);
      }

      tileElement.classList.add("tile");
      rowElement.append(tileElement);

      if (guessRowIndex < 9 && guessIndex < 8) {
        const markElement = document.createElement("div");
        markElement.setAttribute(
          "id",
          "markRow-" + guessRowIndex + "-tile-" + guessIndex
        );
        markElement.classList.add("mark");

        markRowElement.style.width = tileElement.style.width;
        markRowElement.style.height = "calc(5px + 1.5vh)";

        if (
          guessIndex === 0 &&
          guessRowIndex === currentRow &&
          localStorage.getItem("game_over") === "false"
        ) {
          markElement.textContent = "*";
          markElement.style.fontSize = "5vh";
          markElement.classList.add("cursor");
        }

        //look at marks
        let m = marks[guessRowIndex][guessIndex];
        addMark(markElement, m);

        markRowElement.append(markElement);
      }
    });

    tileDisplay.append(rowElement);
    tileDisplay.append(markRowElement);
  }
});

//find the cursor
const findCursor = () => {
  let cursorRow = null;
  let cursorTile = null;

  for (let i = 0; i < currentRow + 1; i++) {
    const rowTiles = document.querySelector("#markRow-" + i).childNodes;
    rowTiles.forEach((tile) => {
      if (tile.classList.contains("cursor")) {
        let id = tile.id;
        cursorRow = i;
        cursorTile = parseInt(id.charAt(id.length - 1));
        return [cursorRow, cursorTile];
      }
    });
  }

  return [cursorRow, cursorTile];
};

//arrow key handling
const handleCursor = (arrow) => {
  //find cursor tile
  const cursor = findCursor();
  let cursorRow = cursor[0];
  let cursorTile = cursor[1];

  if (cursorRow === null || cursorTile === null) {
    cursorRow = currentRow;
    cursorTile = 7;
  }

  let cursorElement = document.getElementById(
    "markRow-" + cursorRow + "-tile-" + cursorTile
  );

  if (!isGameOver) {
    cursorElement.classList.remove("cursor");

    if (cursorElement.textContent === "*") {
      cursorElement.textContent = "";
      cursorElement.style.paddingTop = "0";
    }

    if (arrow === "◄") {
      //go to the left and wrap around
      let n = cursorTile - 1;
      let m = guessRows[0].length - 1;
      let newTile = ((n % m) + m) % m;

      cursorElement = document.getElementById(
        "markRow-" + cursorRow + "-tile-" + newTile
      );
    } else if (arrow === "▲") {
      //go up then wrap around
      let n = cursorRow - 1;
      let m = currentRow + 1;
      let newRow = ((n % m) + m) % m;

      cursorElement = document.getElementById(
        "markRow-" + newRow + "-tile-" + cursorTile
      );
    } else if (arrow === "▼") {
      //go down then wrap around
      let n = cursorRow + 1;
      let m = currentRow + 1;
      let newRow = ((n % m) + m) % m;

      cursorElement = document.getElementById(
        "markRow-" + newRow + "-tile-" + cursorTile
      );
    } else {
      //go to the right and wrap around
      let n = cursorTile + 1;
      let m = guessRows[0].length - 1;
      let newTile = ((n % m) + m) % m;

      cursorElement = document.getElementById(
        "markRow-" + cursorRow + "-tile-" + newTile
      );
    }

    cursorElement.classList.add("cursor");

    if (cursorElement.textContent === "") {
      cursorElement.textContent = "*";
      cursorElement.style.fontSize = "5vh";
      cursorElement.top = "1vh";
    }
  }
};

//Handle key button clicks
async function handleClick(key) {
  if (
    currentRow === 0 ||
    guessRows[currentRow - 1][guessRows[0].length - 1] !== ""
  ) {
    let found = document.querySelector(".title-container");

    if (!isGameOver && found !== null) {
      const cursor = findCursor();
      const cursorRow = cursor[0];
      const cursorTile = cursor[1];

      if (key === "DEL" || key === "BACKSPACE") {
        deleteLetter();
        return;
      }

      if (key === "ENTER") {
        if (cursorRow === currentRow || cursorRow === null) {
          localStorage.setItem("flip", "true");
          await checkRow();
          localStorage.removeItem("flip");
        } else {
          tileClick(cursorRow, cursorTile);
        }
        return;
      }

      addLetter(key);
    }
  }
}

//listen for keydowns
document.addEventListener("keydown", function (event) {
  let found = document.querySelector(".title-container");

  if (
    (currentRow === 0 ||
      guessRows[currentRow - 1][guessRows[0].length - 1] !== "") &&
    currentRow < 9 &&
    found &&
    !isGameOver
  ) {
    let key = event.key;

    if (
      key === "a" ||
      key === "b" ||
      key === "c" ||
      key === "A" ||
      key === "B" ||
      key === "C" ||
      key === "Backspace" ||
      key === "Enter"
    ) {
      handleClick(key.toUpperCase());
    }

    if (key === "ArrowLeft") {
      handleCursor(arrows[0]);
    }

    if (key === "ArrowRight") {
      handleCursor(arrows[3]);
    }

    if (key === "ArrowUp") {
      handleCursor(arrows[1]);
    }

    if (key === "ArrowDown") {
      handleCursor(arrows[2]);
    }
  }
});

//initalize key buttons
const letter_buttons = document.createElement("div");
const grey_buttons = document.createElement("div");
let del = null;

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  buttonElement.classList.add("key");

  if (key == "A" || key == "B" || key == "C") {
    if (level === "reg") {
      num = 0;

      for (let i = 0; i < secret.length; i++) {
        if (secret[i] === key) {
          num++;
        }
      }

      buttonElement.textContent = key + " (" + num.toString() + ")";
    } else {
      buttonElement.textContent = key;
    }

    letter_buttons.append(buttonElement);
  } else {
    buttonElement.textContent = key;

    if (key == "DEL") {
      del = buttonElement;
    } else {
      grey_buttons.append(buttonElement);
    }
  }
  keyboard.append(letter_buttons);
});

//arrow buttons
arrows.forEach((arrow) => {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("key");
  buttonElement.textContent = arrow;
  buttonElement.setAttribute("id", arrow);
  buttonElement.addEventListener("click", () => handleCursor(arrow));
  buttonElement.style.width = "calc(100px + 1.2vw)";
  grey_buttons.append(buttonElement);
});

grey_buttons.append(del);
keyboard.append(grey_buttons);

//title Animation
const title = "CODEBREAK";
for (let i = 0; i < 9; i++) {
  const letterTile = document.createElement("div");
  letterTile.setAttribute("id", "TitleLetter-" + i);
  letterTile.classList.add("tile");
  letterTile.innerHTML = title[i];

  setTimeout(() => {
    if (i == 0) {
      //C overlay
      letterTile.classList.add("C-overlay");
    } else if (i === 4) {
      //B Overlay
      letterTile.classList.add("B-overlay");
    } else if (i === 7) {
      //A Overlay
      letterTile.classList.add("A-overlay");
    } else if (i === 8) {
      line = document.createElement("div");
      line.setAttribute("id", "line-title");
      line.classList.add("vertical");
      if (localStorage.getItem("dark") === "true") {
        line.style.backgroundColor = "#ffffff";
      }

      titleDiv.append(line);
      letterTile.style.backgroundColor = "#818384";
    } else {
      letterTile.style.backgroundColor = "#818384";
    }

    letterTile.classList.add("flip");
    titleDiv.append(letterTile);
  }, 260 * i);
}

darkCheck(); //check if dark

//Add a letter
const addLetter = (letter) => {
  if (currentTile < guessRows[0].length - 1 && currentRow < guessRows.length) {
    //change key
    let num = 0;
    const buttonElement = document.getElementById(letter);

    if (level === "reg") {
      num = parseInt(buttonElement.textContent[3]);
    } else {
      //num = parseInt(buttonElement.textContent[4]);
      num = 1;
    }

    if (num > 0) {
      if (level === "reg") {
        num--;
        buttonElement.textContent = letter + " (" + num.toString() + ")";
      }

      const cursor = findCursor();
      const cursorRow = cursor[0];
      const cursorTile = cursor[1];

      let markElement = document.getElementById(
        "markRow-" + cursorRow + "-tile-" + cursorTile
      );

      markElement.classList.remove("cursor");
      if (markElement.textContent === "*") {
        //add letter fix
        markElement.textContent = "";
      }

      markElement.style.paddingTop = "0";

      if (cursorRow === currentRow) {
        currentTile = cursorTile;
      }

      const tile = document.getElementById(
        "guessRow-" + currentRow + "-tile-" + currentTile
      );

      if (tile.textContent !== "") {
        let butEle = document.getElementById(tile.textContent);
        num = parseInt(buttonElement.textContent[3]) + 1;
        butEle.textContent = tile.textContent + " (" + num.toString() + ")";
      }

      tile.textContent = letter;
      guessRows[currentRow][currentTile] = letter;

      //remove all overlays
      tile.classList.remove("A-overlay");
      tile.classList.remove("B-overlay");
      tile.classList.remove("C-overlay");

      tile.setAttribute("data", letter);

      setTimeout(() => {
        tile.classList.add("pop");
      }, 100);

      //change the color to whatever
      addColorToKey(tile, letter);

      let guess = guessRows[currentRow].join("");

      //if they are all filled up current tile goes to the end
      if (guess.length !== guessRows[0].length - 1) {
        //Go to the next unfilled tile with wrap around
        let unfilledTile = (currentTile + 1) % (guessRows[0].length - 1);

        while (guessRows[currentRow][unfilledTile]) {
          unfilledTile = (unfilledTile + 1) % (guessRows[0].length - 1);
        }

        currentTile = unfilledTile;

        markElement = document.getElementById(
          "markRow-" + currentRow + "-tile-" + currentTile
        );

        markElement.classList.add("cursor");
        markElement.textContent = "*";
        markElement.style.fontSize = "5vh";
      } else {
        currentTile = 8;
      }
    } else {
      //alert check
      showMessage("No more " + letter + "'s", 2000);
      shakeTiles();
    }
  } else {
    showMessage("No more " + letter + "'s", 2000);
  }
};

//remove a color
const removeColor = (tile) => {
  classes = ["A-overlay", "B-overlay", "C-overlay"];

  for (let i = 0; i < classes.length; i++) {
    c = classes[i];
    if (tile.classList.contains(c)) {
      tile.classList.remove(c);
    }
  }
};

//delete prev tile or the last tile
//go back to the next filled tile or the start
const deleteLetter = () => {
  let guess = guessRows[currentRow].join("");

  if (guess.length > 0) {
    const cursor = findCursor();
    const cursorRow = cursor[0];
    const cursorTile = cursor[1];

    if (cursorRow !== null && cursorTile !== null) {
      let markElement = document.getElementById(
        "markRow-" + cursorRow + "-tile-" + cursorTile
      );

      markElement.classList.remove("cursor");
      markElement.textContent = "";
      markElement.style.paddingTop = "0";

      if (currentRow === cursorRow) {
        currentTile = (cursorTile + 1) % (guessRows[0].length - 1);
      }
    }

    //go back to the next letter
    let n = currentTile - 1;
    let m = guessRows[0].length - 1;
    let filledTile = ((n % m) + m) % m;
    while (guessRows[currentRow][filledTile] === "") {
      let n = filledTile - 1;
      filledTile = ((n % m) + m) % m;
    }

    //delete last letter
    currentTile = filledTile;

    let tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );

    if (level === "reg") {
      //change key
      letter = tile.textContent;
      const buttonElement = document.getElementById(letter);
      let num = parseInt(buttonElement.textContent[3]) + 1;
      buttonElement.textContent = letter + " (" + num.toString() + ")";
    }

    tile.textContent = "";
    guessRows[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
    //change color back to default
    removeColor(tile);
    tile.classList.remove("pop");

    if (guessRows[currentRow].join("").length === 0) {
      currentTile = 0;
    } else {
      //go back to next filled tile
      let n = currentTile - 1;
      let m = guessRows[0].length - 1;
      let filledTile = ((n % m) + m) % m;
      while (guessRows[currentRow][filledTile] === "") {
        let n = filledTile - 1;
        filledTile = ((n % m) + m) % m;
      }
      currentTile = (filledTile + (1 % m) + m) % m;
    }

    markElement = document.getElementById(
      "markRow-" + currentRow + "-tile-" + currentTile
    );

    markElement.classList.add("cursor");
    markElement.textContent = "*";
    markElement.style.fontSize = "5vh";
  }
};

//Go to Stats page once game is over
const gameOverStats = async () => {
  await delay(3000);
  document.getElementById("statistics-button").click();
};

//Game Over Screen
const gameOverScreen = (score) => {
  let board = localStorage.getItem("board").split(",");

  const isEmptyRow = (element) => element === "";
  let number_of_rows = board.findIndex(isEmptyRow);

  if (number_of_rows === -1) {
    number_of_rows = 9;
  }

  for (let i = 0; i < number_of_rows; i++) {
    let rowTiles = document.querySelector("#guessRow-" + i).childNodes;
    const guess = [];
    rowTiles.forEach((tile) => {
      guess.push({ letter: tile.getAttribute("data"), color: null });
    });

    guess.forEach((guess, index) => {
      if (guess.letter === secret[index]) {
        guess.color = "green-overlay";
      } else {
        guess.color = "grey-overlay";
      }
    });

    localStorage.setItem("flip", "true");

    rowTiles.forEach((tile, index) => {
      setTimeout(() => {
        //not the score tile
        if (index < guessRows[0].length - 1) {
          removeColor(tile);
          tile.classList.add(guess[index].color);
          tile.classList.remove("flip");
          tile.classList.add("flip");
        }
      }, 260 * index);
    });
  }

  localStorage.removeItem("flip");

  const won = score === guessRows[0].length - 1;

  let games_won = localStorage.getItem("games_won");
  let current_streak = localStorage.getItem("current_streak");
  let max_streak = localStorage.getItem("max_streak");
  let games_played = localStorage.getItem("games_played");

  if (!games_won) {
    games_won = 0;
  }

  if (!current_streak) {
    current_streak = 0;
  }

  if (!max_streak) {
    max_streak = 0;
    localStorage.setItem("max_streak", max_streak);
  }

  if (!games_played) {
    games_played = 0;
  }

  localStorage.setItem("games_played", parseInt(games_played) + 1);

  if (won) {
    localStorage.setItem("games_won", parseInt(games_won) + 1);
    localStorage.setItem("current_streak", parseInt(current_streak) + 1);
    localStorage.setItem(
      "last_day_won",
      Math.trunc((new Date() - launch_date) / 86400000)
    );
  } else {
    localStorage.setItem("current_streak", 0);
  }

  if (
    localStorage.getItem("current_streak") > localStorage.getItem("max_streak")
  ) {
    localStorage.setItem("max_streak", localStorage.getItem("current_streak"));
  }

  let guess_distribution = localStorage.getItem("guess_distribution");
  let nums = "0,0,0,0,0,0,0,0,0";

  if (guess_distribution === null) {
    localStorage.setItem("guess_distribution", nums);
  }

  nums = localStorage.getItem("guess_distribution").split(",");

  if (won) {
    let s = 9;
    let b = localStorage.getItem("board").split(",");

    for (let bb = 1; bb < b.length; bb++) {
      if (b[bb] === "") {
        s = bb;
        break;
      }
    }
    nums[s - 1] = String(parseInt(nums[s - 1]) + 1);
  }

  //go from array to string
  localStorage.setItem("guess_distribution", nums.join());

  localStorage.setItem(
    "win_rate",
    localStorage.getItem("games_won") / localStorage.getItem("games_played")
  );

  gameOverStats();
};

//Add a guess Row after submit
function addRow() {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "guessRow-" + currentRow);
  const markRowElement = document.createElement("div");
  markRowElement.setAttribute("id", "markRow-" + currentRow);
  markRowElement.style.height = "calc(5px + 1.5vh)";

  for (let i = 0; i < 9; i++) {
    const tileElement = document.createElement("div");

    let c = currentRow;

    if (i < 8) {
      tileElement.setAttribute("id", "guessRow-" + currentRow + "-tile-" + i);

      tileElement.addEventListener("click", () => tileClick(c, i));

      const markElement = document.createElement("div");
      markElement.setAttribute("id", "markRow-" + currentRow + "-tile-" + i);
      markElement.classList.add("mark");
      markElement.style.width = tileElement.style.width;
      markElement.style.height = "calc(5px + 1.5vh)";
      markRowElement.append(markElement);
    } else {
      let line = document.createElement("div");
      line.setAttribute("id", "line-" + currentRow);
      line.classList.add("vertical");

      if (localStorage.getItem("dark") === "true") {
        line.style.backgroundColor = "#ffffff";
      }

      rowElement.append(line);

      tileElement.setAttribute("id", "guessRow-" + currentRow + "-tile-score");
    }

    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  }

  tileDisplay.append(rowElement);
  tileDisplay.append(markRowElement);
}

//Get the score for the row
async function checkRow() {
  let guess = guessRows[currentRow].join("");
  if (guess.length === guessRows[0].length - 1) {
    let score = getScore(guess);

    const cursor = findCursor();
    let cursorRow = cursor[0];
    let cursorTile = cursor[1];

    if (cursorRow !== null && cursorTile !== null) {
      let cursorElement = document.getElementById(
        "markRow-" + cursorRow + "-tile-" + cursorTile
      );

      cursorElement.classList.remove("cursor");
      cursorElement.textContent = "";
      cursorElement.style.paddingTop = "0";
    }

    //append guess + score
    board = localStorage.getItem("board").split(",");

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = guess + score;
        break;
      }
    }

    localStorage.setItem("board", board.join());

    score_row = currentRow;
    flipTiles(score, score_row);

    if (level === "reg") {
      //reset key tiles
      const key_A = document.getElementById("A");
      const key_B = document.getElementById("B");
      const key_C = document.getElementById("C");
      const key_buttons = [key_A, key_B, key_C];

      key_buttons.forEach((button) => {
        num = 0;
        letter = button.id;

        for (let i = 0; i < secret.length; i++) {
          if (secret[i] === letter) {
            num++;
          }
        }

        button.textContent = letter + " (" + num.toString() + ")";
      });
    }

    if (score == guessRows[0].length - 1) {
      isGameOver = true;
      localStorage.setItem("game_over", isGameOver);
      document.getElementById(
        "guessRow-" + currentRow + "-tile-score"
      ).textContent = "8";
      gameOverScreen(score);
      showMessage("Amazing!", 2000);
      return;
    } else {
      if (currentRow < guessRows.length) {
        currentRow++;
        currentTile = 0;
        localStorage.setItem("current_row", currentRow);

        if (currentRow < 9) {
          //add a row
          addRow();

          let markElement = document.getElementById(
            "markRow-" + currentRow + "-tile-" + currentTile
          );

          markElement.classList.add("cursor");
          markElement.textContent = "*";
          markElement.style.fontSize = "5vh";
        }
      }

      if (currentRow >= guessRows.length) {
        isGameOver = true;
        localStorage.setItem("game_over", isGameOver);
        document.getElementById("guessRow-8-tile-score").textContent =
          score.toString();
        gameOverScreen(score);
        showMessage(secret.join(""), 3000);
        return;
      }
    }
  } else {
    shakeTiles();
    showMessage("Guess needs to be 8 letters long", 3000);
  }
}

//Shake the tiles
function shakeTiles() {
  const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes;

  rowTiles.forEach((tile) => {
    if (tile.classList.contains("shake")) {
      tile.classList.remove("shake");
    }
  });

  rowTiles.forEach((tile) => {
    tile.classList.add("shake");
  });
}

//Show the Message
const showMessage = (message, time) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), time);
};

//Flip the tiles
const flipTiles = (score, score_row) => {
  const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes;

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      if (index == guessRows[0].length - 1) {
        const tile = document.getElementById(
          "guessRow-" + score_row + "-tile-score"
        );
        tile.textContent = score;
        guessRows[score_row][index] = score;
        tile.setAttribute("data", score);
      } else {
        if (index < guessRows[0].length - 1) {
          tile.classList.remove("shake");
          tile.classList.remove("pop");
          tile.classList.add("flip");
        }
      }
    }, 260 * index);
  });
};

/*
(Strat swaps 2 different letters ) 

(+2 means that the prev 2 were in the wrong position and now they are both in the correct position ) 
(-2 means that prev 2 were in the correct position and now they are both in the wrong position ) 

(+1 means that they were both wrong before and now one of them is right ) 
(-1 means that one of them was right before and now they are both wrong )  

(+0 that means you have one of 2 situations. 

Case 1: (one is right and the other one is wrong before switching and now after switching you are now in the same scenario - this must mean that whatever the correct letter is in one spot is the same in the other spot in other words we have a double letter match ) 

Case 2: (they were both wrong before and they are both wrong now )

No matter what this means that these two spots have to be the same letter 
)
 */
