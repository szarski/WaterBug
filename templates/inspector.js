WaterBug.Inspector = WaterBug.Class({

  inspect_levels: 2,

  initialize: function(inspected_object) {
    this.subject = inspected_object;
  },

  html: function() {
    var representation;
    var type;
    if (this.subject && (this.subject['class']) && (this.subject['class'] == WaterBug.Exception)) {
      representation = "<span class=\"<%= html_element_id(:exception) %>\">" + this.subject.short_broken_with('<br />') + "</span>";
      type = "!";
    } else {
      type = typeof(this.subject);
      switch (typeof this.subject) {
        case 'string': 
          representation = '"' + this.escapeHTML(this.subject).replace(/\n/,'<br />') + '"';
          break;
        case 'number': 
          representation = '' + this.subject;
          break;
        case 'boolean': 
          representation = (this.subject ? 'true' : 'false');
          break;
        case 'undefined':
          representation = 'undefined';
          break;
        case 'object':
          representations = this.object_inspect(this.subject);
          break;
        default:
          representation = this.escapeHTML('' + this.subject);
          break;
      }
    }
    return '<span class="<%= html_element_id(:object_type) %>">'+ type +'</span>' + representation;
  },

  escapeHTML: function(text) {return this['class'].escapeHTML(text)},

  object_inspect: function(obj, level) {
    if (!level)
      level = 0;
    if (level < this.inspect_levels) {
      var values = [];
      for (var property in obj)
        values.push(property+': '+this.object_inspect(obj[property], level+1));
      return '{' + values.join(", ") + '}';
    } else {
      return  "<span class=\"<%= html_element_id(:too_deep) %>\">(too deep...)</span>";
    }
  }
}, {

  escapeHTML: function(string) {
    return (''+string).replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  }

});
