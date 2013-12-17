function Line() {
  var line;

  return {
    addCell: function(cell) {
      this.line.push(cell);
    },
    setLine: function(line) {
      this.line = line;
    },
    getLine: function() {
      return this.line;
    },
  };
}
