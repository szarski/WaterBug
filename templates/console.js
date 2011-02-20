Console = Class({

  initialize: function(input_element, output_element) {
    this.command_history = [];
    this.command_history_index = 0;
    this.input_element = input_element;
    this.output_element = output_element;
    var that = this;
    this.input_element.onkeypress = function(event){return that.keypress(((event.charCode === undefined)||(event.charCode == 0)) ? event.keyCode : event.charCode);};
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
      return "\n(" + this.command_history.length + ") <span class=\"exception\">" + result + "</span><br />";
    else
      return "\n(" + this.command_history.length + ") " + result + "<br />";
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
    console.log(this.command_history_index);
    this.input_element.value = this.command_history[this.command_history_index] || '';
  },

  reset_command_history_index: function() {
    this.command_history_index = this.command_history.length;
  },

  keypress: function(key) {
    if (key==13) {
      this.run(this.input_element.value);
      return false
    } else if (key==38) {
      this.previous_command();
      return false
    } else if (key==40) {
      this.next_command();
      return false
    } else
      return true;
  }

},{
});
