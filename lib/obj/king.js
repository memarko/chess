King = function(color)
{
  Obj.apply(this,arguments);
  this.icon = "king";
};
King.prototype = new Obj();
