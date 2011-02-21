<%= render :template => 'note.js' %>
<%= render :template => 'class.js' %>
<%= render :template => 'console.js' %>
<%= render :template => 'exception_handler.js' %>
<%= render :template => 'fake_console.js' %>


WaterBug = {
  html_string: ("<%= escape_javascript(render :template => 'main_wrapper.html') %>"),
  console: FakeConsole(),

  insert_body: function() {
    var container = document.createElement('div');
    container.innerHTML = this.html_string;
    var last_element = document.body.children[document.body.children.length - 1];
    var children=[];
    for (var index=0; index < container.childElementCount; index+=1)
      children.push(container.children[index]);
    while (children.length > 0) {
      var child = children.shift();
      console.log('pop:');
      console.log(child);
      document.body.insertBefore(child, last_element);
    }
  },

  load: function() {
    this.insert_body();
    var fake_console = this.console;
    this.console = Console(document.getElementById('console_input'), document.getElementById('console_display'));
    fake_console.call(this.console);
  }
}

setTimeout('WaterBug.load();', 1000); // this is a mockup od document.ready :)
