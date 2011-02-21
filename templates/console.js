function escapeHTML(string) {
 return (''+string).replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
};

Console = Class({

  initialize: function(input_element, output_element) {
    this.command_history = [];
    this.command_history_index = 0;
    this.input_element = input_element;
    this.output_element = output_element;
    var that = this;
    this.input_element.onkeyup = function(e){
      var key;
      if(window.event) // IE
        key = ({38: 'up', 40: 'down', 13: 'enter'})[event.keyCode];
      else // FF and ?
        key = ({38: 'up', 40: 'down', 13: 'enter'})[e.keyCode];
      return that.keypress(key);
    };
  },

  log: function(object) {
    if (object.exception)
      this.output_element.innerHTML += this.format_output('', object.message + ' (' + object.url + ':' +object.line + ')', 1);
    else
      this.output_element.innerHTML += this.format_output('', object, '');
  },

  run: function(command) {
    var result;
    var exception = 0;
    this.command_history.push(command);
    this.reset_command_history_index();
    try {
      result = eval(command);
    } catch(e) {
      result = e.message;
      exception = e.message;
    }
    this.output_element.innerHTML += this.format_output(command, result, exception);
    this.input_element.value = '';
  },

  format_output: function(command, result, exception){
    if (exception)
      return "\n(" + this.command_history.length + ") <span class=\"exception\">" + this.inspect(result) + "</span><br />";
    else
      return "\n(" + this.command_history.length + ") " + this.inspect(result) + "<br />";
  },

  inspect: function(string) {
    return escapeHTML(string).replace(/\n/,'<br />');
  },

  previous_command: function(){
    this.load_command_from_history(-1);
  },

  next_command: function(){
    this.load_command_from_history(+1);
  },

  load_command_from_history: function(shift) {
    this.command_history_index += shift;
    if (this.command_history_index < 0)
      this.command_history_index = 0;
    if (this.command_history_index > this.command_history.length)
      this.reset_command_history_index();
    this.input_element.value = this.command_history[this.command_history_index] || '';
  },

  reset_command_history_index: function() {
    this.command_history_index = this.command_history.length;
  },

  keypress: function(key) {
    if (key=='enter') {
      this.run(this.input_element.value);
      return false
    } else if (key=='up') {
      this.previous_command();
      return false
    } else if (key=='down') {
      this.next_command();
      return false
    } else
      return true;
  }

},{
});
