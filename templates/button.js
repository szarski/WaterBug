WaterBug.Button = WaterBug.Class({

  initialize: function(element, click_event) {
    this.element = element;
    this.click_event = click_event || function(){};
    var that = this;
    this.element.onclick = function(){ that.click_event.apply(that, arguments); };
  }

},{});
