BoardObj = function() {
    this.type="BoardObj";
    this.fields = [];
    var color = false;
    for (var i = 0; i < 8; i++) {
      this.fields.push([]);
      for (var j = 0; j < 8; j++) {
        this.fields[i].push(new Field(color,i,j));
        this.fields[i][j].setObj(Obj.createObj(i,j));
        color = !color;
      }
      color = !color;

    }
    return this;
};

//Boards = new Mongo.Collection("boards");
//Board = Boards.findOne();
//if (Board === null||Board === undefined) {

//  Boards.insert(Board);
//}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Board = new BoardObj();
    Board = extendObject(Board);
  });
}


function extendObject(obj)
{
  console.log(obj);
  if(typeof obj.type != 'undefined')
  {
    for(var prop in obj)
    {
      if(typeof obj[prop] == 'object')
        obj[prop] = extendObject(obj[prop]);
    }
    if(obj.type.match(/^[a-zA-Z0-9_]+$/g))
      return _.extend(obj, eval(obj.type + ".prototype"));
    else
      return obj;
  }
}

if(Meteor.isServer)
{
  /*Meteor.publish('Board', function(){
    return Board;
  });*/
}

if(Meteor.isClient)
{
  //Meteor.subscribe('Board');
  Template.board.data = function(){
        return Board;
    };
}
