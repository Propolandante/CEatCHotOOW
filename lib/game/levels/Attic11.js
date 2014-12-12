ig.module( 'game.levels.Attic11' )
.requires( 'impact.image','game.entities.trigger','game.entities.climbableWallLeft','game.entities.player','game.entities.climbUpLeftWall','game.entities.levelchange','game.entities.climbUpRightWall','game.entities.climbableWallRight','game.entities.beehive','game.entities.cWallBottom' )
.defines(function(){
LevelAttic11=/*JSON[*/{"entities":[{"type":"EntityTrigger","x":576,"y":32,"settings":{"size":{"x":32,"y":128},"target":{"1":"exit"}}},{"type":"EntityClimbableWallLeft","x":188,"y":132,"settings":{"size":{"x":4,"y":92}}},{"type":"EntityPlayer","x":20,"y":78},{"type":"EntityClimbableWallLeft","x":348,"y":84,"settings":{"size":{"x":4,"y":76}}},{"type":"EntityClimbUpLeftWall","x":348,"y":80},{"type":"EntityLevelchange","x":624,"y":68,"settings":{"name":"exit","level":"Attic3"}},{"type":"EntityClimbUpLeftWall","x":188,"y":128},{"type":"EntityClimbUpRightWall","x":256,"y":128},{"type":"EntityClimbableWallRight","x":256,"y":132,"settings":{"size":{"x":4,"y":92}}},{"type":"EntityBeehive","x":448,"y":144},{"type":"EntityTrigger","x":348,"y":56,"settings":{"size":{"x":100,"y":88},"target":{"1":"beehive"}}},{"type":"EntityCWallBottom","x":380,"y":192},{"type":"EntityLevelchange","x":-68,"y":60,"settings":{"name":"back","level":"Attic2"}}],"layer":[{"name":"background","width":19,"height":8,"linkWithCollision":false,"visible":1,"tilesetName":"media/attic.png","repeat":false,"preRender":false,"distance":"1","tilesize":32,"foreground":false,"data":[[6,41,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[6,6,6,16,6,6,16,6,6,16,6,6,16,6,6,16,6,6,16],[41,41,7,17,6,6,16,7,7,17,6,6,16,7,7,17,6,6,16],[6,6,6,16,7,7,17,6,6,16,7,7,17,6,6,16,7,7,17],[6,6,6,16,6,6,16,6,6,16,6,6,16,6,6,16,6,6,16],[6,6,7,17,6,6,16,7,7,17,6,6,16,7,7,17,6,6,16],[6,6,6,16,7,7,17,6,6,16,7,7,17,6,6,16,7,7,17],[6,41,0,16,0,0,16,0,0,16,0,0,16,0,0,16,0,0,0]]},{"name":"tiles","width":19,"height":8,"linkWithCollision":false,"visible":1,"tilesetName":"media/attic.png","repeat":false,"preRender":false,"distance":"1","tilesize":32,"foreground":false,"data":[[21,12,12,22,11,11,21,12,12,22,11,21,12,22,21,22,12,12,12],[32,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[7,7,0,0,0,0,0,0,0,92,0,0,0,0,0,0,0,0,0],[1,4,0,0,0,0,0,0,0,92,0,0,0,0,0,0,0,0,0],[43,44,0,0,0,71,1,1,73,0,0,0,0,0,0,0,0,0,0],[53,54,43,44,0,71,4,1,73,0,0,0,0,0,0,0,0,0,5],[1,1,53,54,0,71,1,4,73,0,0,0,0,0,0,0,0,4,15],[21,12,22,11,11,11,11,21,22,11,11,21,12,12,12,12,22,21,12]]},{"name":"tiles_hr","width":38,"height":16,"linkWithCollision":false,"visible":1,"tilesetName":"media/attic.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,282,9,10,1,2,1,2,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,282,29,30,21,22,21,22,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,282,29,30,165,166,167,167,168,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,282,69,70,225,226,227,227,228,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,26,0,0,0,0,0,282,1,2,165,168,87,88,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,3,4,0,0,0,0,0,0,0,0,21,22,185,188,9,10,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,23,24,0,0,0,0,0,0,0,0,1,2,225,28,29,30,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,21,22,7,8,49,50,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,25,26,0,0,0,0,0,0,0,0,87,88,27,28,69,70,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":38,"height":16,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],[1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],[1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[1,0,0,1,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,1,1,0],[1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelAttic11Resources=[new ig.Image('media/attic.png'), new ig.Image('media/attic.png'), new ig.Image('media/attic.png')];
});