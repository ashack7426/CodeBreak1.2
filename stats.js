const stats_button = document.getElementById("statistics-button");
stats_button.addEventListener("click", () => stat());
let statChildren = [];

const stat = () => {
  //Stats Page
  if (localStorage.getItem("flip") !== null) {
    return;
  }

  if (statChildren.length) {
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
    //CLicked the Stats Button
    var game = document.querySelector(".game-container");

    //Title Div
    const stats = document.createElement("div");
    stats.style.width = "100vw";
    stats.style.height = "100vw";
    const top = document.createElement("header");
    const title = document.createElement("h2");
    title.textContent = "statistics".toUpperCase();
    title.style.fontSize = "4vh";

    //Close Button
    const close_but = document.createElement("button");
    close_but.innerText = "X";
    close_but.style.fontSize = "25px";
    close_but.style.position = "absolute";
    close_but.style.right = "0vw";
    close_but.style.top = "0vh";

    close_but.addEventListener("click", () => stat());

    close_but.style.width = "100px - 2vh";
    close_but.style.minWidth = "50px";

    close_but.style.height = "100px - 2vh";
    close_but.style.minHeight = "50px";

    top.appendChild(title);
    top.appendChild(close_but);
    stats.appendChild(top);

    // info
    const info = document.createElement("div");
    info.style.display = "flex";
    info.style.margin = "0 auto";

    //games played
    let info_container = document.createElement("div");
    info_container.classList.add("statistic-container");

    let info_num = document.createElement("div");
    info_num.classList.add("statistic");

    info_num.textContent = localStorage.getItem("games_played");
    info_num.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    let label = document.createElement("div");
    label.classList.add("label");
    label.textContent = "Played Games";
    label.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    info_container.appendChild(info_num);
    info_container.appendChild(label);
    info.appendChild(info_container);

    //win percent
    info_container = document.createElement("div");
    info_container.classList.add("statistic-container");

    info_num = document.createElement("div");
    info_num.classList.add("statistic");

    info_num.textContent = Math.round(localStorage.getItem("win_rate") * 100);
    info_num.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    label = document.createElement("div");
    label.classList.add("label");
    label.textContent = "Won Games(%)";
    label.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    info_container.appendChild(info_num);
    info_container.appendChild(label);
    info.appendChild(info_container);

    stats.appendChild(info);

    //Current Streak
    info_container = document.createElement("div");
    info_container.classList.add("statistic-container");

    info_num = document.createElement("div");
    info_num.classList.add("statistic");

    info_num.textContent = localStorage.getItem("current_streak");
    info_num.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    label = document.createElement("div");
    label.classList.add("label");
    label.textContent = "Current Streak";
    label.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    info_container.appendChild(info_num);
    info_container.appendChild(label);
    info.appendChild(info_container);
    info.style.paddingBottom = "5vh";

    stats.appendChild(info);

    //Max Streak
    info_container = document.createElement("div");
    info_container.classList.add("statistic-container");

    info_num = document.createElement("div");
    info_num.classList.add("statistic");

    info_num.textContent = localStorage.getItem("max_streak");
    info_num.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    label = document.createElement("div");
    label.classList.add("label");
    label.textContent = "Max Streak";
    label.style.fontSize = "min(calc(12px + 1.5vw), calc(12px + 1.5vh))";

    info_container.appendChild(info_num);
    info_container.appendChild(label);
    info.appendChild(info_container);
    info.style.marginBottom = "2vh";

    stats.appendChild(info);

    //graph
    const graph = document.createElement("div");

    graph.style.width = "100vw";

    graph.style.paddingBottom = "5vh";

    let guess_title = document.createElement("h1");
    guess_title.textContent = "Guess Distribution";
    guess_title.style.fontSize = "3vh";
    stats.appendChild(guess_title);

    let guess_distribution = localStorage
      .getItem("guess_distribution")
      .split(",");

    let total = 0;
    for (let i = 0; i < guess_distribution.length; i++) {
      guess_distribution[i] = parseInt(guess_distribution[i]);
      total += guess_distribution[i];
    }

    let score = 9;
    let b = localStorage.getItem("board").split(",");
    let won = true;

    for (let bb = 0; bb < b.length; bb++) {
      if (b[bb] === "") {
        score = bb;
        break;
      }
    }

    if (score === 9) {
      for (let kk = 0; kk < 8; kk++) {
        if (b[8][kk] !== secret[kk]) {
          won = false;
          break;
        }
      }
    }

    //we have guess distributions
    const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const max_guess = Math.max(...guess_distribution);
    let width = 0;

    for (let i = 0; i < labels.length; i++) {
      const bar = document.createElement("div");
      bar.style.alignItems = "center";
      bar.style.fontSize = "1.6em";

      //1-9 on bar
      const num = document.createElement("div");
      num.textContent = labels[i];
      num.style.width = "2vw";
      num.style.display = "inline-block";
      num.style.marginLeft = "20vw";
      num.style.fontSize = "3vh";

      //blue bar
      const bar_info = document.createElement("div");

      if (
        parseInt(labels[i]) === score &&
        localStorage.getItem("game_over") === "true" &&
        won
      ) {
        bar_info.style.backgroundColor = "#0F89C5";
      } else {
        bar_info.style.backgroundColor = "#818384";
      }

      bar_info.style.display = "inline-block";
      bar_info.style.marginLeft = "1vw";
      bar_info.style.height = "2.5vh";

      //Bar quantity number
      const bar_info_text = document.createElement("span");
      bar_info_text.textContent = guess_distribution[i];
      bar_info_text.style.paddingLeft = "1vw";
      bar_info_text.style.fontSize = "3vh";

      width = (guess_distribution[i] * 55) / max_guess;

      if (width < 1 || guess_distribution[i] === 0) {
        bar_info.style.width = "1vw";
      } else {
        bar_info.style.width = width + "vw";
      }

      bar.appendChild(num);
      bar.appendChild(bar_info);
      bar.appendChild(bar_info_text);

      bar.style.marginBottom = "1vh";

      graph.appendChild(bar);
    }

    stats.appendChild(graph);

    //time share
    const time_share = document.createElement("div");

    time_share.style.alignItems = "center";
    time_share.style.display = "flex";
    time_share.style.justifyContent = "center";
    time_share.style.textAlign = "center";

    //CountDown Timer
    const time = document.createElement("div");
    time.width = time_share.style.width;
    time.style.display = "inline-block";
    time.style.fontSize = "4vh";

    const time_text = document.createElement("div");
    time_text.textContent = "NEXT CODE";
    time.appendChild(time_text);

    const countdown = document.createElement("div");
    countdown.setAttribute("id", "countdown");
    time.appendChild(countdown);
    time_share.appendChild(time);

    const line = document.createElement("div");
    line.classList.add("vertical");
    line.style.marginLeft = "10vw";
    line.style.marginRight = "10vw";

    //dark mode make white
    if (localStorage.getItem("dark") === "true") {
      //dark mode make white
      line.style.backgroundColor = "#ffffff";
    } else {
      //light mode make black
      line.style.backgroundColor = "#000";
    }

    line.style.display = "inline-block";
    time_share.appendChild(line);

    //Share Button
    const share = document.createElement("div");
    share.style.display = "inline-block";
    const share_button = document.createElement("button");
    share_button.style.fontSize = "min(4vh,4vw)";
    share_button.style.height = "10vh";
    share_button.style.width = "25vw";
    share_button.style.color = "#ffffff";

    if (localStorage.getItem("game_over") === "true") {
      share_button.style.backgroundColor = "#117733";
    } else {
      share_button.style.backgroundColor = "#818384";
    }

    share_button.innerHTML = "SHARE";

    //share button is greyed out until you finish the game
    share_button.onclick = share_button_click;

    share.appendChild(share_button);
    time_share.appendChild(share);

    stats.appendChild(time_share);

    while (game.hasChildNodes()) {
      statChildren.push(game.firstChild);
      game.removeChild(statChildren[statChildren.length - 1]);
    }

    game.appendChild(stats);

    const message_container = document.createElement("div");
    message_container.classList.add("message-container");

    game.appendChild(message_container);
  }

  daily_timer(); // Run Countdown
};

//Share Button Click
function share_button_click() {
  let text = "";
  if (localStorage.getItem("game_over") === "true") {
    var dummy = document.createElement("textarea");
    dummy.style.display = "none";
    document.body.appendChild(dummy);

    let board = localStorage.getItem("board").split(",");
    text += "CODE " + Math.trunc(1 + (new Date() - launch_date) / 86400000);

    const isEmptyRow = (element) => element === "";
    let index = board.findIndex(isEmptyRow);

    if (index === -1) {
      //if the last row isnt all green then game_lost
      let cnt = 0;
      for (let k = 0; k < 8; k++) {
        if (board[8][k] === secret[k]) {
          cnt++;
        }
      }

      if (cnt === 8) {
        //won game in 9 guesses
        text += " 9/9";
      } else {
        //lost_game
        text += " X/9";
      }
    } else {
      text += " " + index + "/9";
    }

    if (localStorage.getItem("hard_crown") === "true") {
      text += " 👑";
    }

    text += "\n\n";

    score = 9;
    let b = localStorage.getItem("board").split(",");

    for (let bb = 0; bb < b.length; bb++) {
      if (b[bb] === "") {
        score = bb;
        break;
      }
    }

    for (let i = 0; i < score; i++) {
      let row = board[i];
      let row_text = "";

      for (let j = 0; j < 8; j++) {
        if (row[j] === secret[j]) {
          //green
          row_text += "🟩";
        } else {
          if (localStorage.getItem("dark") === "true") {
            //dark mode make black
            row_text += "⬛";
          } else {
            //light mode make white
            row_text += "⬜";
          }
        }
      }

      //add new line character if its not the very last one
      if (i !== board.length - 1) {
        row_text += "\n";
      }

      //add to text
      text += row_text;
    }

    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      navigator.clipboard.writeText(text);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = text;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }

    showMessageStats("Copied to Clipboard", 3000); // success
  } else {
    showMessageStats("Nothing to Share!", 3000); //Game is in Play
  }
}

//Show Stat Messages
function showMessageStats(message, time) {
  let mDisplay = document.querySelector(".message-container");

  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  mDisplay.append(messageElement);
  setTimeout(() => mDisplay.removeChild(messageElement), time);
}
