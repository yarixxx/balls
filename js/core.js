function Core() {
  var games = [];
  var user;
  var field;
  var dispatcher;

  function createStarter(config, handler) {
    var starter = document.createElement("div");
    starter.innerText = config.title;
    starter.addEventListener("click", handler, false);
    return starter;
  }

  function init() {
    var gamesList = document.querySelector("#gamesList");
    games.forEach(function(config){
      gamesList.appendChild(createStarter(config, function(){
        startGame(config);
      }));
    });
    var goToStartScreen1 = document.querySelector("#goToStartScreen1");
    goToStartScreen1.addEventListener("click", function() {
      hideGameOverScreen();
      showStartScreen();
    }, false);
    var goToStartScreen2 = document.querySelector("#goToStartScreen2");
    goToStartScreen2.addEventListener("click", function() {
      hideGameOverScreen();
      showStartScreen();
    }, false);
  };

  function startGame(config) {
    if (!user) {
      user = new User(dispatcher);
      user.init();
    }
    user.setName("test");

    var gameTitle = document.querySelector("#playScreen h1");
    gameTitle.innerText = config.title;

    user.addScore(config.initScore);

    field = new Rect(config.width, config.height, dispatcher);
    field.setCheckLine(config.checkLine);
    field.setDoAction(config.doAction);
    field.setIsReady(config.isReady);
    field.setRefreshView(config.refreshView);
    field.init(config.filler);
    field.refreshView();

    bindToField();

    hideStartScreen();
    showPlayScreen();
  }

  function bindToField() {
    var tds = document.querySelectorAll("#field td");
    for(var x=0; x<tds.length; x++) {
      tds[x].addEventListener("click", function(e){
        var cellIndex = e.srcElement.cellIndex;
        var rowIndex = e.srcElement.parentElement.rowIndex;
        field.doAction(cellIndex, rowIndex);
      }, false);
    }
  }

  function gameOver() {
    hidePlayScreen();
    showGameOverScreen();
  }

  function victory() {
    hidePlayScreen();
    showVictoryScreen();
  }

  function stopGame() {
    hidePlayScreen();
    showStartScreen();
  }

  function showStartScreen() {
    var startScreen = document.querySelector("#startScreen");
    startScreen.style.display = "block";
  }

  function hideGameOverScreen() {
    var gameOverScreen = document.querySelector("#gameOverScreen");
    gameOverScreen.style.display = "none";
  }

  function hideVictoryScreen() {
    var victoryScreen = document.querySelector("#victoryScreen");
    victoryScreen.style.display = "none";
  }

  function showVictoryScreen() {
    var victoryScreen = document.querySelector("#victoryScreen");
    victoryScreen.style.display = "block";
  }

  function hideStartScreen() {
    var startScreen = document.querySelector("#startScreen");
    startScreen.style.display = "none";
  }

  function showPlayScreen() {
    var playScreen = document.querySelector("#playScreen");
    playScreen.style.display = "block";
  }

  function showGameOverScreen() {
    var gameOverScreen = document.querySelector("#gameOverScreen");
    gameOverScreen.style.display = "block";
  }

  function hidePlayScreen() {
    var playScreen = document.querySelector("#playScreen");
    playScreen.style.display = "none";
  }

  return {
    addGame: function(configuration) {
      games.push(configuration);
    },
    init: function() {
      init();
      dispatcher = new EventDispatcher();
      dispatcher.addEventListener("gameOver", gameOver);
      dispatcher.addEventListener("victory", victory);
    }
  };
}

