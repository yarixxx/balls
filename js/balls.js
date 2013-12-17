var game = {
  title: "Colors",
  filler: function(){
    return Math.floor((Math.random()*5)+1);
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
    if (value < 5) {
      value++;
    } else {
      value = 1;
    }

    this.setCell(rowIndex, cellIndex, value);
    this.triggerEvent("scoreMinus");
  },
  isReady: function(line){
    for (var j = 0; j < line.length; j++) {
      var currentValue = line[j].getValue();
      if (currentValue != 0) {
        return false;
      }
    }
    return true;
  },
  refreshView: function() {
    var tds = document.querySelectorAll("#field td");
    for(var x=0; x<tds.length; x++) {
      var cellIndex = tds[x].cellIndex;
      var rowIndex = tds[x].parentElement.rowIndex;
      var value = this.getCell(rowIndex, cellIndex)
      if (value == 0) {
        tds[x].style.background = "#eee";
      }
      if (value == 1) {
        tds[x].style.background = "red";
      }
      if (value == 2) {
        tds[x].style.background = "green";
      }
      if (value == 3) {
        tds[x].style.background = "blue";
      }
      if (value == 4) {
        tds[x].style.background = "yellow";
      }
      if (value == 5) {
        tds[x].style.background = "orange";
      }

    }
  }
};

if (CORE) {
  CORE.addGame(game);
}
