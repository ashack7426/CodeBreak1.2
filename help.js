var children = [];
var help_but = document.getElementById("help-button");
help_but.addEventListener("click", () => help());

//display pop up with instructions
const help = () => {
  if (localStorage.getItem("flip") !== null) {
    return;
  }

  var CODE = " <b>CODE</b> "; //CODE bolded

  if (children.length) {
    //If the close button is clicked
    var game = document.querySelector(".game-container");
    game.textContent = "";
    while (children.length) {
      game.appendChild(children.shift());
    }

    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      tile.classList.remove("flip");
      tile.classList.remove("shake");
      tile.classList.remove("dance");
    });
  } else {
    //If help button is clicked
    var game = document.querySelector(".game-container");

    //Title Div
    const how = document.createElement("div");
    const top = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "HOW TO PLAY";
    title.style.fontSize = "4vh";

    //Close Button
    const close_but = document.createElement("button");
    close_but.innerText = "X";
    close_but.style.fontSize = "25px";
    close_but.style.position = "absolute";
    close_but.style.right = "0vw";
    close_but.style.top = "0vh";

    close_but.addEventListener("click", () => help());

    close_but.style.width = "100px - 2vh";
    close_but.style.minWidth = "50px";

    close_but.style.height = "100px - 2vh";
    close_but.style.minHeight = "50px";

    top.appendChild(title);
    top.appendChild(close_but);
    how.appendChild(top);

    const content = document.createElement("div"); //Content

    //Instructions
    let para = document.createElement("p");
    para.innerHTML =
      "Break the" +
      CODE +
      "in nine tries." +
      " Each" +
      CODE +
      "consists of at least one A, one B, and one C." +
      " A guess must be an eight-letter" +
      CODE +
      "consisting of the letters A, B, & C. " +
      " The frequency of each letter in the" +
      CODE +
      "is revealed at the start. " +
      " Hit the enter button to submit.";
    para.style.fontSize = "calc(10px + 1.5vh)";
    para.style.padding = "2vw";
    para.style.textAlign = "center";
    content.appendChild(para);

    const examples = document.createElement("div");
    examples.style.borderBottom = "1px solid #3a3a3c";
    examples.style.borderTop = "1px solid #3a3a3c";

    //2 divs
    let freq = document.createElement("div");
    //add the key tiles
    let key = document.createElement("div");
    key.style.margin = "0 auto";

    //Button example
    const key_A = document.getElementById("A");
    const key_B = document.getElementById("B");
    const key_C = document.getElementById("C");
    const key_buttons = [key_A, key_B, key_C];
    const example = [3, 3, 2];

    for (let i = 0; i < key_buttons.length; i++) {
      k = key_buttons[i].cloneNode(true);
      k.textContent = k.textContent[0] + " (" + example[i] + ")";
      k.style.fontSize = "min(calc(10px + 1.5vh),calc(10px + 1.5vw)) ";
      k.style.width = "10vw";
      k.style.left = "0";
      k.style.height = k.style.width;

      key.appendChild(k);
    }
    key.classList.add("key-container");

    para = document.createElement("p");
    para.innerHTML = "The" + CODE + "has 3 A’s, 3 B’s, & 2 C’s";
    para.style.fontSize = "calc(8px + 1.5vh)";
    para.style.padding = "1vw";
    para.style.textAlign = "center";
    freq.appendChild(para);

    freq.appendChild(key);

    para = document.createElement("p");
    para.innerHTML = "(The guess" + CODE + "is below)";
    para.style.fontSize = "calc(7px + 1.5vh)";
    para.style.padding = "1vw";
    para.style.textAlign = "center";

    freq.appendChild(para);

    //Guess row examples
    const guess = document.createElement("div");
    //add a row tile generic example (abcabcab)
    let tilecontainer = document.createElement("div");
    tilecontainer.classList.add("tile-container");

    let row = document.getElementById("guessRow-0").cloneNode(true);
    let marks = document.getElementById("markRow-0").cloneNode(true);
    let cursorRow = document.getElementById("markRow-0").cloneNode(true);
    let code_row = row.cloneNode(true);

    row.id = "guessRow-help";
    marks.id = "markRow-0";
    cursorRow.id = "markRow-1";
    code_row.id = "codeRow-help";
    var example_tiles = "ABCABCAB";
    var example_code = "CABCBBAA";

    for (let i = 0; i < marks.childNodes.length; i++) {
      let mark = marks.childNodes[i];
      let c = cursorRow.childNodes[i];

      mark.id = "markRow-0-tile-" + i;
      c.id = "markRow-1-tile-" + i;

      //remove all classes
      mark.removeAttribute("class");
      mark.classList.add("mark");
      mark.textContent = "";
      mark.style.fontSize = "3vh";
      mark.style.paddingTop = "0";

      //remove all classes
      c.removeAttribute("class");
      c.classList.add("mark");
      c.textContent = "";

      if (i == 0) {
        c.classList.add("cursor");
        c.textContent = "*";
        c.style.fontSize = "5vh";
        c.style.paddingTop = "2vh";
      }

      if (example_tiles[i] === example_code[i]) {
        mark.classList.add("correct");
        mark.textContent = "O";
      } else {
        if (example_tiles[i] === "C") {
          mark.classList.add("same");
          mark.textContent = "!";
        } else {
          mark.classList.add("wrong");
          mark.textContent = "X";
        }
      }
    }

    for (let i = 0; i < row.childNodes.length; i++) {
      //remove classes
      let node = row.childNodes[i];
      node.id = "guessRow-help-tile-" + i;
      if (i < row.childNodes.length - 2) {
        node.removeAttribute("class");
        node.classList.add("tile");

        let letter = example_tiles[i];
        let class_name = "";

        if (letter === "A") {
          class_name = "A-overlay";
        } else if (letter === "B") {
          class_name = "B-overlay";
        } else {
          class_name = "C-overlay";
        }

        node.classList.add(class_name);
        node.textContent = letter;
      } else if (i == row.childNodes.length - 1) {
        node.textContent = "2";
        node.removeAttribute("class");
        node.classList.add("tile");
      } else {
        node.removeAttribute("class");
        node.classList.add("vertical");
      }
    }

    for (let i = 0; i < code_row.childNodes.length; i++) {
      //remove classes
      let node = code_row.childNodes[i];
      node.id = "codeRow-help-tile" + i;
      if (i < code_row.childNodes.length - 2) {
        node.removeAttribute("class");
        node.classList.add("tile");

        let letter = example_code[i];
        let class_name = "";

        if (letter === "A") {
          class_name = "A-overlay";
        } else if (letter === "B") {
          class_name = "B-overlay";
        } else {
          class_name = "C-overlay";
        }

        node.classList.add(class_name);
        node.textContent = letter;
      } else if (i == code_row.childNodes.length - 1) {
        node.textContent = "8";
        node.removeAttribute("class");
        node.classList.add("tile");
      } else {
        node.removeAttribute("class");
        node.classList.add("vertical");
      }
    }

    tilecontainer.appendChild(row);

    tilecontainer.appendChild(marks);

    tilecontainer.appendChild(code_row);
    tilecontainer.appendChild(cursorRow);
    tilecontainer.style.display = "inline-block";
    tilecontainer.style.paddingLeft = "20vw";
    tilecontainer.style.paddingRight = "15vw";

    guess.appendChild(tilecontainer);
    guess.style.margin = "0 auto";
    guess.style.display = "block";
    guess.style.width = "100%";

    //More Instructions
    para = document.createElement("p");
    para.style.fontSize = "calc(7px + 1.5vh)";
    para.style.textAlign = "center";
    para.innerHTML = "(The actual" + CODE + "is above)";
    para.style.textAlign = "center";
    guess.appendChild(para);

    para = document.createElement("p");
    para.style.fontSize = "calc(10px + 1.5vh)";
    para.style.textAlign = "center";
    para.innerHTML =
      "After each guess, the number of tiles in the correct position will be revealed to show how close your guess was to the" +
      CODE +
      ".";
    guess.appendChild(para);

    para = document.createElement("p");
    para.style.fontSize = "calc(10px + 1.5vh)";
    para.style.textAlign = "center";
    para.textContent =
      "In this case, 2 tiles are in the correct position. You need to keep guessing to deduce which 2 are the correct positions. The correct positions are shown in this example, however you will not see them while playing the game.";
    guess.appendChild(para);

    var correct = '<span style="color: #117733">O</span>';
    var same = '<span style="color: #0f89c5">!</span>';
    var wrong = '<span style="color: #cc6677">X</span>';
    var cursor = '<span style="color: #44aa99">*</span>';

    para = document.createElement("p");
    para.innerHTML =
      "If you think you know any correct positions then after submitting a guess, you can click a tile to mark it with a " +
      correct +
      "(correct) or " +
      wrong +
      "(wrong). If you think 2 tiles are the same letter indicate this with a " +
      same +
      "(same) or leave blank if you don't know anything.";
    para.style.fontSize = "calc(10px + 1.5vh)";
    para.style.textAlign = "center";
    guess.appendChild(para);

    para = document.createElement("p");
    para.innerHTML =
      "Move the cursor(" +
      cursor +
      ") with the arrow keys to get to specific tiles on the game screen.";
    para.style.fontSize = "calc(10px + 1.5vh)";
    para.style.textAlign = "center";
    guess.appendChild(para);

    examples.appendChild(freq);
    examples.appendChild(guess);
    content.appendChild(examples);

    //another paragraph
    para = document.createElement("p");
    para.innerHTML = "A new" + CODE + "everyday";
    para.style.fontSize = "calc(10px + 1.5vh)";
    para.style.textAlign = "center";
    content.appendChild(para);

    how.appendChild(content);

    while (game.hasChildNodes()) {
      children.push(game.firstChild);
      game.removeChild(children[children.length - 1]);
    }

    game.appendChild(how);
  }
};
