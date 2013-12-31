function Core() {
  var games = [];
  var user;
  var field;
  var dispatcher;
  var clickBinded = false;

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

    var goToStartScreenBtns = document.getElementsByClassName("go-to-start-screen");
    for (var i = 0; i < goToStartScreenBtns.length; i++) {
        goToStartScreenBtns[i].addEventListener("click", function() {
            field.cleanField();
            hideVictoryScreen();
            hidePlayScreen();
            hideGameOverScreen();
            showStartScreen();
        }, false);
    }
  }

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
    field.setCleanCell(config.cleanCell);
    field.init(config.filler);
    field.refreshView();

    bindToField();
	
	renderOrder(config.items);

    hideStartScreen();
    showPlayScreen();
  }
  
  function renderOrder(items) {
	var order = document.querySelector("#order");
    order.innerText = "";
	items.forEach(function(item){
		console.log(item);
		var li = document.createElement("li");
		li.className = item;
		order.appendChild(li);
	});
  }

  function bindToField() {
	if (clickBinded) {
		return;
	}
 
    var tds = document.querySelectorAll("#field td");
    for(var x=0; x<tds.length; x++) {
      tds[x].addEventListener("click", function(e){
        var cellIndex = e.srcElement.cellIndex;
        var rowIndex = e.srcElement.parentElement.rowIndex;
        field.doAction(cellIndex, rowIndex);
      }, false);
    }
	
	clickBinded = true;
  }

  function gameOver() {
    field.cleanField();
    hidePlayScreen();
    showGameOverScreen();
  }

  function victory() {
    field.cleanField();
    hidePlayScreen();
    showVictoryScreen();
  }

  function stopGame() {
    field.cleanField();
    hidePlayScreen();
    showStartScreen();
  }
  
  function updateElement(id, action) {
	var element = document.querySelector(id);
    element.style.display = action;
  }

  function showStartScreen() {
	updateElement("#startScreen", "block");
  }

  function hideGameOverScreen() {
  	updateElement("#gameOverScreen", "none");
  }

  function hideVictoryScreen() {
   	updateElement("#victoryScreen", "none");
  }

  function showVictoryScreen() {
	updateElement("#victoryScreen", "block");
  }

  function hideStartScreen() {
  	updateElement("#startScreen", "none");
  }

  function showPlayScreen() {
	updateElement("#playScreen", "block");
  }

  function showGameOverScreen() {
  	updateElement("#gameOverScreen", "block");
  }

  function hidePlayScreen() {
   	updateElement("#playScreen", "none");
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

