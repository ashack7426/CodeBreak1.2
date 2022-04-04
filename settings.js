const settings_button = document.getElementById("settings-button");
settings_button.addEventListener("click", () => setting());
let dark_change = false;
let level_change = false;
let setting_children = [];

//display popup with toggle options
const setting = () => {
  //Settings
  if (localStorage.getItem("flip") !== null) {
    return;
  }

  if (setting_children.length) {
    //Close Button clicked
    var game = document.querySelector(".game-container");
    game.textContent = "";
    while (setting_children.length) {
      game.appendChild(setting_children.shift());
    }

    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      tile.classList.remove("flip");
      tile.classList.remove("shake");
      tile.classList.remove("dance");
    });

    if (dark_change) {
      //Only care about dark theme if its different from what we came in with
      dark(true);
    }

    if (level_change) {
      //change the level hard or easy
      const buttons = [
        document.querySelector("#A"),
        document.querySelector("#B"),
        document.querySelector("#C"),
      ];

      for (let i = 0; i < 3; i++) {
        let button = buttons[i];
        button.textContent = button.id;
      }

      if (level === "reg") {
        localStorage.setItem("hard_crown", "false");
        //clear the current row
        if (localStorage.getItem("game_over") === "false") {
          guessRows.forEach((guessRow, guessRowIndex) => {
            guessRow.forEach((_guess, guessIndex) => {
              if (guessRowIndex === currentRow) {
                let rowTiles = document.querySelector(
                  "#guessRow-" + currentRow
                ).childNodes;

                rowTiles.forEach((tile) => {
                  tile.textContent = "";
                  guessRows[guessRowIndex][guessIndex] = "";
                  //change color back to default
                  removeColor(tile);
                });

                if (guessIndex === 0) {
                  markElement = document.getElementById(
                    "markRow-" + currentRow + "-tile-" + guessIndex
                  );

                  markElement.classList.add("cursor");
                  markElement.textContent = "*";
                } else {
                  markElement = document.getElementById(
                    "markRow-" + currentRow + "-tile-" + guessIndex
                  );

                  if (markElement !== null) {
                    markElement.classList = "mark";
                    markElement.textContent = "";
                  }
                }

                currentTile = 0;
              }
            });
          });
        }

        for (let i = 0; i < 3; i++) {
          let num = 0;
          let button = buttons[i];

          for (let j = 0; j < secret.length; j++) {
            if (secret[j] === button.id) {
              num++;
            }
          }

          button.textContent += " (" + num.toString() + ")";
        }
      }
    }
  } else {
    // Clicked the Settings Button
    var game = document.querySelector(".game-container");
    const body = document.body;
    dark_change = false;
    level_change = false;

    //Title Div
    const settings = document.createElement("div");
    settings.style.width = "100vw";
    settings.style.height = "100vh";
    const top = document.createElement("header");
    const title = document.createElement("h2");
    title.textContent = "SETTINGS";
    title.style.fontSize = "4vh";

    //Close Button
    const close_but = document.createElement("button");
    close_but.innerText = "X";
    close_but.style.fontSize = "25px";
    close_but.style.position = "absolute";
    close_but.style.right = "0vw";
    close_but.style.top = "0vh";

    close_but.addEventListener("click", () => setting());

    close_but.style.width = "100px - 2vh";
    close_but.style.minWidth = "50px";

    close_but.style.height = "100px - 2vh";
    close_but.style.minHeight = "50px";

    top.appendChild(title);
    top.appendChild(close_but);
    settings.appendChild(top);

    const content = document.createElement("div");

    //light vs dark mode (toggle)
    const light = document.createElement("div");
    light.style.width = "100vw";
    light.style.display = "inline-block";

    const lighttext = document.createElement("h1");
    lighttext.textContent = "Dark Theme";
    lighttext.style.fontSize = "2.5vh";
    light.appendChild(lighttext);

    const lightToggle = document.createElement("label");
    lightToggle.style.marginLeft = "44vw";
    lightToggle.style.top = "-1.2vh";
    lightToggle.classList.add("switch");

    const lightExplain = document.createElement("p");
    lightExplain.textContent = "(Light Mode vs. Dark Mode)";
    lightExplain.style.textAlign = "center";
    lightExplain.style.fontSize = "2vh";
    light.appendChild(lightExplain);

    let lightinput = document.createElement("input");
    let lightspan = document.createElement("span");
    lightspan.classList.add("slider");
    lightinput.type = "checkbox";
    lightspan.addEventListener("click", () => lightToggleClick());

    if (body.classList.contains("dark-mode")) {
      lightinput.checked = true;
    }

    lightToggle.append(lightinput);
    lightToggle.append(lightspan);
    light.appendChild(lightToggle);

    light.style.borderTop = "solid 3px #3a3a3c";
    light.style.borderBottom = "solid 3px #3a3a3c";

    content.appendChild(light);

    //hard vs easy mode (toggle)
    const hard = document.createElement("div");
    hard.style.width = "100vw";
    hard.style.display = "inline-block";
    const hardtext = document.createElement("h1");
    hardtext.textContent = "Hard Mode";
    hardtext.style.fontSize = "2.5vh";

    hard.appendChild(hardtext);
    hard.style.borderBottom = "solid 3px #3a3a3c";

    const hardExplain = document.createElement("p");
    hardExplain.textContent = "(Letter frequencies are not shown in Hard Mode)";
    hardExplain.style.textAlign = "center";
    hardExplain.style.fontSize = "2vh";
    hard.appendChild(hardExplain);

    const hardToggle = document.createElement("label");
    hardToggle.style.marginLeft = "44vw";
    hardToggle.style.top = "-1.2vh";
    hardToggle.classList.add("switch");

    let hardinput = document.createElement("input");
    let hardspan = document.createElement("span");
    hardspan.classList.add("slider");
    hardinput.type = "checkbox";
    hardToggle.append(hardinput);
    hardToggle.append(hardspan);

    hardspan.addEventListener("click", () => hardSwitch());

    if (level !== "reg") {
      hardinput.checked = true;
    }

    hard.appendChild(hardToggle);

    content.appendChild(hard);

    //buy me a coffee
    const coffee = document.createElement("div");
    coffee.style.width = "100vw";
    coffee.style.display = "inline-block";
    const coffeetext = document.createElement("h1");
    coffeetext.textContent = "Buy Me a Coffee";
    coffeetext.style.fontSize = "2.5vh";

    coffee.appendChild(coffeetext);
    coffee.style.borderBottom = "solid 3px #3a3a3c";

    const coffeeExplain = document.createElement("p");
    coffeeExplain.textContent =
      "(If you enjoyed this, then please consider supporting my work!)";
    coffeeExplain.style.textAlign = "center";
    coffeeExplain.style.fontSize = "2vh";

    coffee.appendChild(coffeeExplain);

    const coffeepic = document.createElement("img");
    coffeepic.src = "/images/coffee.png";
    coffeepic.style.margin = "auto";
    coffeepic.style.display = "block";
    coffeepic.style.height = "max(11vh, 8vw)";
    coffeepic.style.width = "auto";

    coffeepic.onclick = function () {
      window.open("https://www.buymeacoffee.com/TKXZEgwi4w", "_blank");
    };

    coffee.append(coffeepic);

    content.appendChild(coffee);

    //feeback email form
    const email = document.createElement("div");
    email.style.width = "100vw";
    email.style.display = "inline-block";
    const emailtext = document.createElement("h1");
    emailtext.textContent = "Send Feedback";
    emailtext.style.fontSize = "2.5vh";

    email.appendChild(emailtext);
    email.style.borderBottom = "solid 3px #3a3a3c";

    const emailExplain = document.createElement("p");
    emailExplain.textContent =
      "(If you have any ideas on how this site can improve, please send any recommendations this way!)";
    emailExplain.style.textAlign = "center";
    emailExplain.style.fontSize = "2vh";
    email.appendChild(emailExplain);

    const emailpic = document.createElement("img");
    emailpic.src = "/images/email.png";
    emailpic.style.margin = "auto";
    emailpic.style.display = "block";
    emailpic.style.height = "max(11.75vh, 8.75vw)";
    emailpic.style.width = "auto";

    emailpic.onclick = function () {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSc0lsWXu1TFUlF5wgePDofUwPvuU6Nbh59qR8qYvLHo8hxkOA/viewform?usp=sf_link",
        "_blank"
      );
    };

    email.append(emailpic);

    content.appendChild(email);
    settings.appendChild(content);

    while (game.hasChildNodes()) {
      setting_children.push(game.firstChild);
      game.removeChild(setting_children[setting_children.length - 1]);
    }
    game.appendChild(settings);
  }
};

function lightToggleClick() {
  dark(false);
} //lightToggleClick

function dark(home) {
  //dark function
  const body = document.body;
  let keys = [];
  let lines = [];

  //keys and vertical line
  if (home) {
    keys = document.querySelectorAll(".key");
    lines = document.querySelectorAll(".vertical");
  }

  if (body.classList.contains("dark-mode")) {
    if (!home) {
      body.classList.remove("dark-mode");
      localStorage.setItem("dark", false);
    }

    if (home) {
      lines.forEach((l) => {
        l.style.backgroundColor = "#ffffff";
      });

      keys.forEach((k) => {
        k.style.color = "#ffffff";
      });
    }
  } else {
    if (!home) {
      body.classList.add("dark-mode");
      localStorage.setItem("dark", true);
    }

    if (home) {
      lines.forEach((l) => {
        l.style.backgroundColor = "#000";
      });

      keys.forEach((k) => {
        k.style.color = "#000";
      });
    }
  }

  dark_change = !dark_change;
}

function hardSwitch() {
  //switch from hard to easy
  if (level === "reg") {
    level = "hard";
  } else {
    level = "reg";
  }
  localStorage.setItem("level", level);
  level_change = !level_change;
}
