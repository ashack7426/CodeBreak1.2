var children = [];
var strat_but = document.getElementById("Strategy-button");
strat_but.addEventListener("click", () => strategy());

const strategy = () => {
  if (localStorage.getItem("flip") !== null) {
    return;
  }

  if (children.length) {
    //Clicked the Close Button
    var game = document.querySelector(".game-container");
    game.textContent = "";
    while (statChildren.length) {
      game.appendChild(statChildren.shift());
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
    const strat = document.createElement("div");
    const top = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Strategy";
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
    strat.appendChild(top);

    //Strategy Intro Section
    let intro = document.createElement("div");
    intro.style.borderBottom = "1px solid #3a3a3c";

    para = document.createElement("p");
    para.innerHTML =
      "CODEBREAK can be a hard game for new players. This page is meant to give one possible strategy to first time players. One way to play this game is with the two-swap method. The idea with the two-swap method is that you start off by having one guess and then your next guess involves you swapping two of the letters and keeping everything else the same from the previous guess. Look below to see all the possible cases with this strategy.";

    para.style.padding = "2vw";
    para.style.textAlign = "center";
    para.style.fontSize = "calc(10px + 1.5vh)";
    intro.appendChild(para);
    strat.appendChild(intro);

    //initalize example rows
    let example = document.getElementById("guessRow-0").cloneNode(true);
    var txt = "ABCABCAB";

    let tilecontainer = document.createElement("div");
    tilecontainer.classList.add("tile-container");

    for (let i = 0; i < example.childNodes.length; i++) {
      //remove classes
      let node = example.childNodes[i];
      node.id = "secret-tile-" + i;
      if (i < example.childNodes.length - 2) {
        node.removeAttribute("class");
        node.classList.add("tile");

        let letter = txt[i];
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
      } else if (i == example.childNodes.length - 1) {
        node.textContent = "8";
        node.removeAttribute("class");
        node.classList.add("tile");
      } else {
        node.removeAttribute("class");
        node.classList.add("vertical");
      }
    }

    para = document.createElement("p");
    para.innerHTML = "Lets say that this is the Secret Code";
    para.style.textAlign = "center";
    para.style.fontSize = "calc(10px + 1.5vh)";

    tilecontainer.appendChild(para);
    tilecontainer.appendChild(example);
    tilecontainer.style.display = "inline-block";
    tilecontainer.style.paddingLeft = "20vw";
    tilecontainer.style.paddingRight = "20vw";

    tilecontainer.style.borderBottom = "1px solid #3a3a3c";

    strat.appendChild(tilecontainer);

    //+2
    let two = document.createElement("div");

    para = document.createElement("p");
    para.innerHTML = "+2 or -2";
    para.style.textAlign = "center";
    para.style.fontSize = "calc(10px + 1.5vh)";
    two.appendChild(para);

    tilecontainer = document.createElement("div");
    tilecontainer.classList.add("tile-container");
    tilecontainer.style.display = "inline-block";
    tilecontainer.style.paddingLeft = "20vw";
    tilecontainer.style.paddingRight = "20vw";

    let first = document.getElementById("guessRow-0").cloneNode(true);
    let first_marks = document.getElementById("markRow-0").cloneNode(true);
    let second = first.cloneNode(true);
    let second_marks = document.getElementById("markRow-0").cloneNode(true);

    var txt = "ABCABCAB";
    let first_guess = "BACCABAB";
    let second_guess = "ABCCABAB";

    for (let i = 0; i < first.childNodes.length; i++) {
      //remove classes
      let node = first.childNodes[i];
      node.id = "secret-tile-" + i;
      if (i < first.childNodes.length - 2) {
        node.removeAttribute("class");
        node.classList.add("tile");

        let letter = first_guess[i];
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
      } else if (i == first.childNodes.length - 1) {
        node.textContent = "3";
        node.removeAttribute("class");
        node.classList.add("tile");
      } else {
        node.removeAttribute("class");
        node.classList.add("vertical");
      }
    }

    for (let i = 0; i < second.childNodes.length; i++) {
      //remove classes
      let node = second.childNodes[i];
      node.id = "secret-tile-" + i;
      if (i < second.childNodes.length - 2) {
        node.removeAttribute("class");
        node.classList.add("tile");

        let letter = second_guess[i];
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
      } else if (i == second.childNodes.length - 1) {
        node.textContent = "5";
        node.removeAttribute("class");
        node.classList.add("tile");
      } else {
        node.removeAttribute("class");
        node.classList.add("vertical");
      }
    }

    for (let i = 0; i < first_marks.childNodes.length; i++) {
      let mark = first_marks.childNodes[i];
      let mark2 = second_marks.childNodes[i];

      //remove all classes
      mark.removeAttribute("class");
      mark.classList.add("mark");
      mark.textContent = "";
      mark.style.fontSize = "3vh";
      mark.style.paddingTop = "0";

      //remove all classes
      mark2.removeAttribute("class");
      mark2.classList.add("mark");
      mark2.textContent = "";
      mark2.style.fontSize = "3vh";
      mark2.style.paddingTop = "0";

      if (i < 2) {
        mark.classList.add("wrong");
        mark.textContent = "X";

        mark2.classList.add("correct");
        mark2.textContent = "O";
      }
    }

    tilecontainer.appendChild(first);
    tilecontainer.appendChild(first_marks);
    tilecontainer.appendChild(second);
    tilecontainer.appendChild(second_marks);
    tilecontainer.style.borderBottom = "1px solid #3a3a3c";

    strat.appendChild(two);
    strat.appendChild(tilecontainer);

    //+1
    let one = document.createElement("div");

    para = document.createElement("p");
    para.innerHTML = "+1 or -1";
    para.style.textAlign = "center";
    para.style.fontSize = "calc(10px + 1.5vh)";
    one.appendChild(para);

    tilecontainer = document.createElement("div");
    tilecontainer.classList.add("tile-container");
    tilecontainer.style.display = "inline-block";
    tilecontainer.style.paddingLeft = "20vw";
    tilecontainer.style.paddingRight = "20vw";

    second = first.cloneNode(true);
    second_guess = "BACACBAB";

    for (let i = 0; i < second.childNodes.length; i++) {
      //remove classes
      let node = second.childNodes[i];
      node.id = "secret-tile-" + i;
      if (i < second.childNodes.length - 2) {
        node.removeAttribute("class");
        node.classList.add("tile");

        let letter = second_guess[i];
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
      } else if (i == second.childNodes.length - 1) {
        node.textContent = "4";
        node.removeAttribute("class");
        node.classList.add("tile");
      } else {
        node.removeAttribute("class");
        node.classList.add("vertical");
      }
    }

    first_marks = first_marks.cloneNode(true);

    for (let i = 0; i < first_marks.childNodes.length; i++) {
      let mark = first_marks.childNodes[i];

      //remove all classes
      mark.removeAttribute("class");
      mark.classList.add("mark");
      mark.textContent = "";
      mark.style.fontSize = "3vh";
      mark.style.paddingTop = "0";

      if (i === 3 || i === 4) {
        mark.classList.add("wrong");
        mark.textContent = "X";
      }
    }

    strat.appendChild(one);
    tilecontainer.appendChild(first.cloneNode(true));
    tilecontainer.appendChild(first_marks);
    tilecontainer.appendChild(second);
    tilecontainer.style.borderBottom = "1px solid #3a3a3c";

    strat.appendChild(tilecontainer);

    //+0
    let zero = document.createElement("div");

    para = document.createElement("p");
    para.innerHTML = "+0 or -0";
    para.style.textAlign = "center";
    para.style.fontSize = "calc(10px + 1.5vh)";
    zero.appendChild(para);

    //4 and 7 indexes mark will both be the same

    tilecontainer = document.createElement("div");
    tilecontainer.classList.add("tile-container");
    tilecontainer.style.display = "inline-block";
    tilecontainer.style.paddingLeft = "20vw";
    tilecontainer.style.paddingRight = "20vw";

    second = first.cloneNode(true);
    second_guess = "BACCBBAA";

    for (let i = 0; i < second.childNodes.length; i++) {
      //remove classes
      let node = second.childNodes[i];
      node.id = "secret-tile-" + i;
      if (i < second.childNodes.length - 2) {
        node.removeAttribute("class");
        node.classList.add("tile");

        let letter = second_guess[i];
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
      } else if (i == second.childNodes.length - 1) {
        node.textContent = "3";
        node.removeAttribute("class");
        node.classList.add("tile");
      } else {
        node.removeAttribute("class");
        node.classList.add("vertical");
      }
    }

    first_marks = first_marks.cloneNode(true);

    for (let i = 0; i < first_marks.childNodes.length; i++) {
      let mark = first_marks.childNodes[i];

      //remove all classes
      mark.removeAttribute("class");
      mark.classList.add("mark");
      mark.textContent = "";
      mark.style.fontSize = "3vh";
      mark.style.paddingTop = "0";

      if (i === 4 || i === 7) {
        mark.classList.add("same");
        mark.textContent = "!";
      }
    }

    strat.appendChild(zero);
    tilecontainer.appendChild(first.cloneNode(true));
    tilecontainer.appendChild(first_marks.cloneNode(true));
    tilecontainer.appendChild(second);
    tilecontainer.appendChild(first_marks);

    tilecontainer.style.borderBottom = "1px solid #3a3a3c";

    strat.appendChild(tilecontainer);

    //Change Page
    while (game.hasChildNodes()) {
      children.push(game.firstChild);
      game.removeChild(children[children.length - 1]);
    }

    game.appendChild(strat);
  }
};
