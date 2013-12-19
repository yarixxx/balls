function Rect(width, height, dispatcher) {
  var hlines = [];
  var vlines = [];
  var _width = width;
  var _height = height;
  var _dispatcher = dispatcher;
  var _checkLine;
  var _doAction;
  var _refreshView;
  var _isReady;
  var _finish = true;

  function hValidate(validator) {
    for (var i = 0; i < _width; i++) {
      var currentLine = hlines[i];
      validator.call(this, currentLine);
      if (_finish) {
        _finish = _isReady.call(this, currentLine);
      }
    }
  }

  function vValidate(validator) {
    for (var i = 0; i < _width; i++) {
      var currentLine = vlines[i];
      validator.call(this, currentLine);
      if (_finish) {
        _finish = _isReady.call(this, currentLine);
      }
    }
  }

  function _setCell(rowIndex, cellIndex, value){
    hlines[rowIndex][cellIndex].setValue(value);
  }
  
  function _getCell(rowIndex, cellIndex) {
    if (hlines[rowIndex] && hlines[rowIndex][cellIndex]) {
      return hlines[rowIndex][cellIndex].getValue();
    }
    return "";
  }

  function _validate(validator) {
    _finish = true;
    vValidate.call(this, validator);
    if (_finish) {
      _dispatcher.triggerEvent("victory");
    }
    _finish = true;
    hValidate.call(this, validator);
    if (_finish) {
      _dispatcher.triggerEvent("victory");
    }
  }

  function _cleanSegment(line, a, b) {
    for (var i = a; i <= b; i++) {
      line[i].setValue(0);
    }
  }

  function _fillLine(i, filler) {
    for (var j = 0; j < _height; j++) {
      var cell = new Cell();
      cell.setValue(filler());
      if (!hlines[i]) {
        hlines[i] = [];
      }
      if (!vlines[j]) {
        vlines[j] = [];
      }
      hlines[i].push(cell);
      vlines[j].push(cell);
    }
  }

  return {
    init: function(filler) {
      for (var i = 0; i < _width; i++) {
        _fillLine(i, filler);
      }
      _validate.call(this, _checkLine);
    },
    setIsReady: function(isReady) {
      _isReady = isReady;
    },
    setCheckLine: function(checkLine) {
      _checkLine = checkLine;
    },
    setDoAction: function(doAction) {
      _doAction = doAction;
    },
    doAction: function(cellIndex, rowIndex) {
      _doAction.call(this, cellIndex, rowIndex);
      _validate.call(this, _checkLine);
      _refreshView.call(this);
    },
    refreshView: function() {
      _refreshView.call(this);
    },
    setRefreshView: function(refreshView) {
      _refreshView = refreshView;
    },
    validate: function(validator) {
      _validate.call(this, validator);
    },
    setCell: function(rowIndex, cellIndex, value){
      _setCell(rowIndex, cellIndex, value);
    },
    getCell: function(rowIndex, cellIndex) {
      return _getCell(rowIndex, cellIndex);
    },
    cleanSegment: function(line, a, b) {
      _cleanSegment(line, a, b);
    },
    triggerEvent: function(event) {
      _dispatcher.triggerEvent(event);
    }
  }
}
