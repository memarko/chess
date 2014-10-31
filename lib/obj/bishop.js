Bishop = function(color)
{
  this.type = "Bishop";
  Obj.apply(this,arguments);
  this.icon = "bishop";
};
Bishop.prototype = new Obj();
