Pawn = function(color)
{
  Obj.apply(this,arguments);
  this.icon = "pawn";
};
Pawn.prototype = new Obj();
