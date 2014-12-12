ig.module( 'game.levels.Attic4' )
.requires( 'impact.image','game.entities.mouseHole','game.entities.bee','game.entities.player','game.entities.mouse','game.entities.levelchange','game.entities.trigger','game.entities.dustBunny' )
.defines(function(){
LevelAttic4=/*JSON[*/{"entities":[{"type":"EntityMouseHole","x":120,"y":172,"settings":{"circulation":3}},{"type":"EntityBee","x":296,"y":96,"settings":{"range":10,"size":{"x":14,"y":20}}},{"type":"EntityBee","x":296,"y":68,"settings":{"range":10,"size":{"x":14,"y":20}}},{"type":"EntityPlayer","x":36,"y":78},{"type":"EntityMouse","x":44,"y":212},{"type":"EntityLevelchange","x":-80,"y":112,"settings":{"name":"back","level":"Attic3"}},{"type":"EntityLevelchange","x":660,"y":44,"settings":{"name":"exit","level":"Attic5"}},{"type":"EntityTrigger","x":-40,"y":28,"settings":{"size":{"x":36,"y":200},"target":{"1":"back"}}},{"type":"EntityBee","x":296,"y":40,"settings":{"range":10,"size":{"x":14,"y":20}}},{"type":"EntityTrigger","x":600,"y":20,"settings":{"size":{"x":32,"y":208},"target":{"1":"exit"}}},{"type":"EntityBee","x":296,"y":160,"settings":{"range":10,"size":{"x":14,"y":20}}},{"type":"EntityDustBunny","x":448,"y":136},{"type":"EntityMouse","x":96,"y":180},{"type":"EntityMouse","x":392,"y":148},{"type":"EntityBee","x":296,"y":128,"settings":{"range":10,"size":{"x":14,"y":20}}}],"layer":[{"name":"background","width":6,"height":8,"linkWithCollision":false,"visible":1,"tilesetName":"media/attic.png","repeat":true,"preRender":false,"distance":"1","tilesize":32,"foreground":false,"data":[[0,0,0,0,0,0],[6,6,16,6,6,16],[7,7,17,6,6,16],[6,6,16,7,7,17],[7,7,17,6,6,16],[6,6,16,7,7,17],[7,7,17,6,6,16],[0,0,0,0,0,0]]},{"name":"tiles","width":19,"height":8,"linkWithCollision":false,"visible":1,"tilesetName":"media/attic.png","repeat":false,"preRender":false,"distance":"1","tilesize":32,"foreground":false,"data":[[12,12,12,12,12,22,11,21,12,12,12,12,12,21,12,12,12,12,12],[21,22,0,0,0,21,22,23,0,0,21,22,0,0,0,21,22,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,25,27,0,0,0,0,0,27,0,0,0,0,0,0,28,28,4,1],[1,26,26,26,26,26,28,26,26,25,26,27,28,26,26,26,4,5,4],[1,26,26,26,26,1,1,4,33,26,1,5,1,1,33,43,44,15,4],[1,26,26,33,1,4,1,1,1,26,1,15,1,4,4,53,54,1,4],[12,12,12,22,21,12,12,12,12,12,22,21,12,12,12,22,21,12,12]]},{"name":"collision","width":19,"height":8,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":32,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],[1,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0],[1,0,0,1,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelAttic4Resources=[new ig.Image('media/attic.png'), new ig.Image('media/attic.png')];
});