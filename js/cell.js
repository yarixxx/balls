function Cell() {
  var value = 0;
    
  return {
    setValue: function(newValue) {
      value = newValue;
    },
    getValue: function() {
      return value;
    }
  };
}
