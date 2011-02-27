WaterBug.Class = function(instance_methods, class_methods){
  var klass = function(){
    var prototype = {};
    for (key in klass.prototype) {
      prototype[key] = klass.prototype[key];
    }
    prototype.initialize.apply(prototype, arguments);
    klass.all.push(prototype);
    var id = klass.all.length;
    prototype.id = id;
    prototype.class = klass;
    return prototype;
  };

  klass.prototype = instance_methods;
  for (key in class_methods) {
    klass[key] = class_methods[key];
  };

  klass.all = [];
  return klass;
}
