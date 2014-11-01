Field = function(color,i,j) {
  this.color = color;
  this.i=i;
  this.j=j;
  return this;
};

Field.prototype.getColor = function()
{
  return this.color;
};

Field.prototype.setColor = function(color)
{
  this.color = color;
  this.update();
};

Field.prototype.getObj= function()
{
  return this.obj;
};

Field.prototype.setObj = function(obj)
{
  this.obj = obj;
  this.update();
};

Field.prototype.setMark = function()
{
  this.mark = true;
  Session.set('clickedObj', this);
  this.update();
};

Field.prototype.clearMark = function()
{
  this.mark = false;
  Session.set('clickedObj', null);
  this.update();
};

Field.prototype.isMark = function()
{
  return this.mark;
};

Field.prototype.update = function()
{
  if(this._id !== undefined)
  {
    var newValues = {};
    for(var key in this)
    {
      if(key == '_id')
        continue;
      newValues[key] = this[key];
    }
    Fields.update(
      { _id : this._id },
      { $set : newValues }
    );
  }
  else
  {
    Fields.insert(this);
  }
};

Field.prototype.setDbData = function(data)
{
  _.extend(this, data);
  if(this.obj !== null)
  {
     this.obj = Obj.setDbData(this.obj);
  }
  return this;
};
Field.getField = function(i,j)
{
  if(typeof i == 'object' && j === undefined)
    return Field.getField(i.i, i.j);
  var f = new Field();
  f.setDbData(Fields.findOne({i: i, j: j}));
  return f;
};
Field.initData = function()
{
  if(Fields.find().count() === 0)
  {
    var color = false;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var field = new Field(color,i,j);
        field.obj = Obj.createObj(i,j);
        field.update();
        color = !color;
      }
      color = !color;

    }
  }
};
Field.reInit = function()
{
  Fields.find().forEach(function(field){
    Fields.remove({_id: field._id});
  });
  Field.initData();
};
if (Meteor.isClient)
{
  Session.set('clickedObj', null);
  Template.board.events({
    'click .field' : function()
    {
      var prevField = Session.get('clickedObj');

      var currField =  Field.getField(this.f.i, this.f.j);
      if(prevField !== null)
      {
        prevField = Field.getField(prevField);

        var obj = prevField.obj;
        if(obj === null)
        {
          prevField.clearMark();
          currField.setMark();
          return;
        }

        obj.move(currField.i,currField.j);
        prevField = Field.getField(prevField);
        currField = Field.getField(currField);
        currField.clearMark();
        prevField.clearMark();
      }
      else
      {

        if(currField.obj !== null)
          currField.setMark();
      }

    }
  });
}
Fields = new Mongo.Collection("fields",{
  transform: function (data) {
    var f = new Field();
    f.setDbData(data);
    return f;
  }
});

if(Meteor.isClient)
{
  Template.field.helpers({
    data: function()
    {
      return Field.getField(this.f.i, this.f.j);
    }
  });
}
