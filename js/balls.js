var game = {
  title: "Colors",
  initScore: 10,
  width: 3,
  height: 3,
  items: [ 'empty', 'one', 'two', 'three', 'four', 'five' ],
  filler: function(){
    return game.items[Math.floor((Math.random()*5)+1)];
  },
  checkLine: function(line) {
    var occures = 0;
    var repeat = 0;
    for (var j = 0; j < line.length; j++) {
      var currentValue = line[j].getValue();
      if (currentValue != 0 && currentValue == repeat) {
        occures++;
      } else {
        repeat = currentValue;
        occures = 0;
      }
      if (occures >= 2) {
        this.cleanSegment(line, j-occures, j);
        this.triggerEvent("scorePlus");
      }
    }
  },
  doAction: function(cellIndex, rowIndex) {
    var value = this.getCell(rowIndex, cellIndex);
    if (value !== "") {
      value = game.items[game.items.indexOf(value) + 1];
      this.setCell(rowIndex, cellIndex, value);
      this.triggerEvent("scoreMinus");
    }
  },
  refreshView: function() {
    var tds = document.querySelectorAll("#field td");
    for(var x=0; x<tds.length; x++) {
      var cellIndex = tds[x].cellIndex;
      var rowIndex = tds[x].parentElement.rowIndex;
	  
	  tds[x].className = this.getCell(rowIndex, cellIndex);
    }
  },
  cleanCell: function() {
    return "";
  },
  isReady: function(line){
    for (var j = 0; j < line.length; j++) {
      var currentValue = line[j].getValue();
      if (currentValue != 0) {
        return false;
      }
    }
    return true;
  }
};

if (CORE) {
  CORE.addGame(game);
}
