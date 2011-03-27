WaterBug.Inspector = WaterBug.Class({

  inspect_levels: 3,

  initialize: function(inspected_object, _level) {
    this.subject = inspected_object;
    this.level = _level || 0;
  },

  html: function() {
    var representation;
    var type;
    if (this.subject && (this.subject['class']) && (this.subject['class'] == WaterBug.Exception)) {
      representation = "<span class=\"<%= html_element_id(:exception) %>\">" + this.subject.short_broken_with('<br />') + "</span>";
      type = "!";
    } else {
      type = typeof(this.subject);
      representation = this.representation();
    }
    return '<span class="<%= html_element_id(:object_type) %>">'+ type +'</span>' + representation;
  },

  representation: function(obj) {
    obj = obj || this.subject;
    switch (typeof obj) {
      case 'string': 
        return '"' + this.escapeHTML(this.subject).replace(/\n/,'<br />') + '"';
        break;
      case 'number': 
        return '' + this.subject;
        break;
      case 'boolean': 
        return (this.subject ? 'true' : 'false');
        break;
      case 'undefined':
        return 'undefined';
        break;
      case 'object':
        return this.object_inspect(this.subject);
        break;
      default:
        return this.escapeHTML('' + this.subject);
        break;
      }
  },

  escapeHTML: function(text) {return this['class'].escapeHTML(text)},

  object_inspect: function(obj) {
    if (this.level <= this.inspect_levels) {
      var values = [];
      var count = 0;
      for (var property in obj){
        if (count < 3)
          values.push(property+': '+this['class'](obj[property], this.level+1).representation());
        count += 1;
      }
      if (count >= 3)
        values.push("<span class=\"<%= html_element_id(:too_deep) %>\">...</span>");
      return '{' + values.join(", ") + '}';
    } else {
      return  "<span class=\"<%= html_element_id(:too_deep) %>\">...</span>";
    }
  },

  object_key_count: function(obj) {
    var obj_key_count = 0;
    for (var whatever in document) {obj_key_count+=1};
    return obj_key_count;
  }
}, {

  escapeHTML: function(string) {
    return (''+string).replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  }

});
