Rook = function(color)
{
  this.type="Rook";
  Obj.apply(this,arguments);
  this.icon = "rook";
};
Rook.prototype = new Obj();
