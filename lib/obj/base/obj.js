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
  if(typeof this.iconDep == 'undefined')
    this.iconDep = new Deps.Dependency;
  if(typeof this.colorDep == 'undefined')
    this.colorDep = new Deps.Dependency;
  this.iconDep.depend();
  this.colorDep.depend();
  return this.icon+(this.color ? "black" : "white");
};

Obj.prototype.setIcon = function(icon)
{
  if(typeof this.iconDep == 'undefined')
    this.iconDep = new Deps.Dependency;
  this.icon = icon;
  this.iconDep.changed();
};

Obj.prototype.getColor = function()
{
  if(typeof this.colorDep == 'undefined')
    this.colorDep = new Deps.Dependency;
  this.colorDep.depend();
  return this.color;
};

Obj.prototype.setColor = function(color)
{
  if(typeof this.colorDep == 'undefined')
    this.colorDep = new Deps.Dependency;
  this.color = color;
  this.colorDep.changed();
  this.iconDep.changed();
};

Obj.createObj=function(i,j)
{
  switch(i)
  {
    case 0:
    case 7:
      var color = (i == 0);
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
    case 1:
      return new Pawn(true,i,j);
    case 6:
      return new Pawn(false,i,j);
    default:
      return null;
  }
}

//moves
Obj.prototype.move = function(i,j,board)
{
  if(this.i == i && this.j==j)
    return false;
  board.fields[this.i][this.j].setObj(null);
  board.fields[i][j].setObj(this);
  this.i = i;
  this.j = j;
}
//isvalid

//move
