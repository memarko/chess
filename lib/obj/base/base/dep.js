
//(function() {
  var oldCall = Deps.Dependency.prototype.call;
  Deps.Dependency.prototype.call = function(){
    oldCall.apply(this, arguments);
    if(Deps.Dependency.staticId === undefined)
      Deps.Dependency.staticId = 0;
    if(Deps.Dependency.list === undefined)
      Deps.Dependency.list = {};
    this.depId = Deps.Dependency.staticId++;
    Deps.Dependency.list[this.depId] = this;
  };
  Deps.Dependency.getDep = function(dep)
  {
    return Deps.Dependency[dep.depId];
  };
//})();
