WaterBug.Console = WaterBug.Class({

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
    this.output_element.scrollTop = this.output_element.scrollHeight;
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
    this.output_element.scrollTop = this.output_element.scrollHeight;
    this.input_element.value = '';
  },

  format_output: function(command, result, exception){
    content = exception ? "<span class=\"<%= html_element_id(:exception) %>\">" + result + "</span>" : this.inspect(result);
    return '\n<div class="<%= html_element_id(:line) %>"><div class="<%= html_element_id(:line_number) %>">' + this.command_history.length + '</div><div class="<%= html_element_id(:content) %>">' + content + '</div><div style="clear:both;"></div></div>';
  },

  inspect: function(obj, level) {
    if (!level)
      level = 0;
    var representation;
    switch (typeof obj) {
      case 'string': 
        representation = '"' + WaterBug.Console.escapeHTML(obj).replace(/\n/,'<br />') + '"';
        break;
      case 'number': 
        representation = '' + obj;
        break;
      case 'boolean': 
        representation = (obj ? 'true' : 'false');
        break;
      case 'undefined':
        representation = 'undefined';
        break;
      case 'object':
        if (level < 3) {
          var values = [];
          for (var property in obj)
            values.push(property+': '+this.inspect(obj[property], level+1));
          representation =  '{' + values.join(", ") + '}';
        } else {
          representation =  "<span class=\"<%= html_element_id(:too_deep) %>\">(too deep...)</span>";
        }
        break;
      default:
        representation = WaterBug.Console.escapeHTML('' + obj);
        break;
    }
    if (level == 0)
      return '<span class="<%= html_element_id(:object_type) %>">'+ typeof(obj) +'</span>' + representation;
    else
      return representation;
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

},{

  escapeHTML: function(string) {
    return (''+string).replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  }

});
