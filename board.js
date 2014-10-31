Board = {
  initialize: function() {
    color = false;
    for (var i = 0; i < 8; i++) {
      this.fields.push([]);
      for (var j = 0; j < 8; j++) {
        this.fields[i].push(new Field(color,i,j));
        this.fields[i][j].setObj(Obj.createObj(i,j));
        color = !color;
      }
      color = !color;
    }
  },
  fields: []
};
Board.initialize();

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
