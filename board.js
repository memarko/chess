Board = {
  initialize: function() {

  },
  fields: []
};

if(Meteor.isServer)
{

  /*Meteor.publish('Board', function(){
    return Board;
  });*/
}

if(Meteor.isClient)
{
  //Meteor.subscribe('Board');
  Template.board.helpers({data : function(){
        var indexes = [];
        for(var i = 0; i < 8; i++)
        {
          indexes.push([]);
          for(var j = 0; j < 8; j++)
          {
            indexes[i].push({i: i, j: j});
          }
        }
        return indexes;
    }
  });
  Template.board.events({
    'click #newgame' : function(){
        Field.reInit();
    }
  });
}
