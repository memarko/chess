Knight = function(color)
{
  this.type="Knight";
  Obj.apply(this,arguments);
  this.icon = "knight";
};
Knight.prototype = new Obj();
