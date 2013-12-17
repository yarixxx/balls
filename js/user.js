function User(dispatcher) {
  var name;
  var score = 0;
  var _dispatcher = dispatcher;

  function _init(first) {
    _dispatcher.addEventListener("scorePlus", function() {
      _addScore(2);
    });
    _dispatcher.addEventListener("scoreMinus", function() {
      _removeScore(1);
      if (score <= 0) {
        _dispatcher.triggerEvent("gameOver");
      }
    });
  }

  function _setName(newName) {
    name = newName;
    _publishName();
  }

  function _getName() {
    return name;
  }

  function _addScore(value) {
    score += value;
    _publishScore();
  }

  function _removeScore(value) {
    score -= value;
    _publishScore();
  }

  function _publishName() {
    var userName = document.querySelector("#userName");
    userName.innerText = name;
  }

  function _publishScore() {
    var userScore = document.querySelector("#userScore");
    userScore.innerText = score;
  }
    
  return {
    setName: function(newName) {
      _setName(newName);
    },
    getName: function() {
      return getName();
    },
    addScore: function(value) {
      _addScore(value);
    },
    removeScore: function(value) {
      _removeScore(value);
    },
    init: function() {
      _init();
    }
  };
}
