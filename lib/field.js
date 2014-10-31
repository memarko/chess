Field = function(color,i,j) {
  this.type="Field";
  this.color = color;
  this.i=i;
  this.j=j;
  return this;
};
Field.prototype.getColor = function()
{
  if(typeof this.colorDep == 'undefined')
    this.colorDep = new Deps.Dependency();
  this.colorDep.depend();
  return this.color;
};

Field.prototype.setColor = function(color)
{
  if(typeof this.colorDep == 'undefined')
    this.colorDep = new Deps.Dependency();
  this.color = color;
  this.colorDep.changed();
};

Field.prototype.getObj= function()
{
  if(typeof this.objDep == 'undefined')
    this.objDep = new Deps.Dependency();
  this.objDep.depend();
  return this.obj;
};

Field.prototype.setObj = function(obj)
{
  if(typeof this.objDep == 'undefined')
    this.objDep = new Deps.Dependency();
  this.obj = obj;
  this.objDep.changed();
};

Field.prototype.setMark = function()
{
  if(typeof this.markDep == 'undefined')
    this.markDep = new Deps.Dependency();
  this.mark = true;
  Session.set('clickedObj', this);
  this.markDep.changed();
};

Field.prototype.clearMark = function()
{
  if(typeof this.markDep == 'undefined')
    this.markDep = new Deps.Dependency();
  this.mark = false;
  Session.set('clickedObj', null);
  this.markDep.changed();
};

Field.prototype.isMark = function()
{
  if(typeof this.markDep == 'undefined')
    this.markDep = new Deps.Dependency();
  this.markDep.depend();
  return this.mark;
};


if (Meteor.isClient)
{
  Session.set('clickedObj', null);
  Template.board.events = {
    'click .field' : function()
    {
      var prevField = Session.get('clickedObj');
      if(prevField !== null)
      {
        prevField = Board.fields[prevField.i][prevField.j];
        var obj = prevField.obj;
        if(obj === null)
        {
          prevField.clearMark();
          this.setMark();
          return;
        }

        obj.move(this.i,this.j,Board);
        this.clearMark();
        prevField.clearMark();
      }
      else
      {
        if(this.obj !== null)
          this.setMark();
      }

    }
  };
}
