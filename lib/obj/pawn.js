Pawn = function(color)
{
  this.type="Pawn";
  Obj.apply(this,arguments);
  this.icon = "pawn";
};
Pawn.prototype = new Obj();
