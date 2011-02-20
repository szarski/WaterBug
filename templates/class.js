Class = function(instance_methods, class_methods){
  var klass = function(){
    var prototype = klass.prototype;
    prototype.initialize.apply(prototype, arguments);
    return prototype;
  }

  klass.prototype = instance_methods;

  for (key in class_methods) {
    klass[key] = class_methods[key];
  }

  return klass;
}
