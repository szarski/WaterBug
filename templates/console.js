WaterBug.Console = WaterBug.Class({

  initialize: function(singleline_input_element, multiline_input_element, output_element) {
    this.command_history = [];
    this.command_history_index = 0;
    this.output_element = output_element;
    this.input_element_singleline = singleline_input_element;
    this.input_element_multiline = multiline_input_element;
    this.set_singleline_mode();
  },

  set_singleline_mode: function() {
    this.reconnect_input_element(this.input_element_singleline);
    this.input_element_singleline.style.display='block';
    this.input_element_multiline.style.display='none';
    this.singleline_mode = 1;
    this.multiline_mode = 0;
  },

  set_multiline_mode: function() {
    this.reconnect_input_element(this.input_element_multiline);
    this.input_element_singleline.style.display='none';
    this.input_element_multiline.style.display='block';
    this.singleline_mode = 0;
    this.multiline_mode = 1;
  },

  reconnect_input_element: function(element){
    this.disconnect_input_element();
    this.connect_input_element(element);
  },

  disconnect_input_element: function() {
    if (this.input_element) {
      this.input_element.onkeyup = null;
      this.input_element = null;
    }
  },

  connect_input_element: function(element, is_textarea) {
                           alert(element);
    this.input_element = element;
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

  run: function(command) {
    var result;
    var exception = 0;
    this.command_history.push(command);
    this.reset_command_history_index();
    try {
      result = eval(command);
    } catch(e) {
      result = WaterBug.Exception(e.message);
    }
    this.log(result, command);
    this.input_element.value = '';
  },

  log: function(object, command) {
    var command_output = command ? '<div class="<%= html_element_id(:command) %>">'+WaterBug.Inspector.escapeHTML('' + command)+'</div>' : '';

    var output = '\n<div class="<%= html_element_id(:line) %>"><div class="<%= html_element_id(:line_number) %>">' + this.command_history.length + '</div><div class="<%= html_element_id(:content) %>">' + command_output + this.inspect(object) + '</div><div style="clear:both;"></div></div>';

    this.output_element.innerHTML += output;
    this.output_element.scrollTop = this.output_element.scrollHeight;
  },

  inspect: function(obj) {
    // should return HTML code
    return WaterBug.Inspector(obj).html();
  },

  object_to_string: function(obj) {
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
});
