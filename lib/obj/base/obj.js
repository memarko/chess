Obj = function(color,i,j)
{
  this.icon = "pawn";
  this.color = color;
  this.i = i;
  this.j = j;
  return this;
};

//icon
Obj.prototype.getIcon = function()
{
  return this.icon+(this.color ? "black" : "white");
};

Obj.prototype.setIcon = function(icon)
{
  this.icon = icon;
};

Obj.prototype.getColor = function()
{
  return this.color;
};

Obj.prototype.setColor = function(color)
{
  this.color = color;
};

Obj.createObj=function(i,j)
{
  switch(i)
  {
    case 0:
    case 7:
      var color = (i === 0);
      switch(j)
      {
        case 0:
          return new Rook(color,i,j);
        case 1:
          return new Knight(color,i,j);
        case 2:
          return new Bishop(color,i,j);
        case 3:
          return new Queen(color,i,j);
        case 4:
          return new King(color,i,j);
        case 5:
          return new Bishop(color,i,j);
        case 6:
          return new Knight(color,i,j);
        case 7:
          return new Rook(color,i,j);
      }
      break;
    case 1:
      return new Pawn(true,i,j);
    case 6:
      return new Pawn(false,i,j);
    default:
      return null;
  }
};
Obj.setDbData=function(obj)
{
  if(obj === undefined)
    return null;
  var newObj = null;
  switch(obj.icon)
  {
    case "rook":
      newObj = new Rook();
      break;
    case "knight":
      newObj = new Knight();
      break;
    case "bishop":
      newObj = new Bishop();
      break;
    case "queen":
      newObj = new Queen();
      break;
    case "king":
      newObj = new King();
      break;
    case "pawn":
      newObj = new Pawn();
      break;
  }
  _.extend(newObj,obj);
  for(var o in newObj)
  {
    if(/Dep$/.test(o))
    {
      newObj[o] = Deps.Dependency.getDep(newObj[o]);
    }
  }
  return newObj;
};
//moves
Obj.prototype.move = function(i,j)
{
  if(this.i == i && this.j==j)
    return false;
  newField = Field.getField(i,j);
  oldField = Field.getField(this.i,this.j);
  oldField.obj.i = i;
  oldField.obj.j = j;
  newField.setObj(oldField.getObj());
  oldField.setObj(null);

};
//isvalid

//move
