<%= render :template => 'note.js' %>
<%= render :template => 'class.js' %>
<%= render :template => 'console.js' %>

var html = ("<%= escape_javascript(render :template => 'main_wrapper.html') %>");

document.body.innerHTML += html;


Console(document.getElementById('console_input'), document.getElementById('console_display'));
