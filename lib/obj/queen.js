Queen = function(color)
{
  this.type="Queen";
  Obj.apply(this,arguments);
  this.icon = "queen";
};
Queen.prototype = new Obj();
