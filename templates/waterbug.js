WaterBug = {};

<%= render :template => 'note.js' %>
<%= render :template => 'class.js' %>
<%= render :template => 'console.js' %>
<%= render :template => 'exception_handler.js' %>
<%= render :template => 'fake_console.js' %>

WaterBug.console = WaterBug.FakeConsole();

WaterBug.Runner = {
  html_string: ("<%= escape_javascript(render :template => 'main_wrapper.html') %>"),

  insert_body: function() {
    var container = document.createElement('div');
    container.innerHTML = this.html_string;
    var last_element = document.body.children[document.body.children.length - 1];
    var children=[];
    var element_count = container.children.length;
    for (var index=0; index < element_count; index+=1)
      children.push(container.children[index]);
    while (children.length > 0) {
      var child = children.shift();
      document.body.insertBefore(child, last_element);
    }
  },

  load: function() {
    this.insert_body();
    var fake_console = WaterBug.console;
    WaterBug.console = WaterBug.Console(document.getElementById('<%= html_element_id(:console_input) %>'), document.getElementById('<%= html_element_id(:console_display) %>'));
    fake_console.call(WaterBug.console);
  }
}

setTimeout('WaterBug.Runner.load();', 1000); // this is a mockup od document.ready :)
