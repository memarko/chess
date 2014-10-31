King = function(color)
{
  this.type = "King";
  Obj.apply(this,arguments);
  this.icon = "king";
};
King.prototype = new Obj();
