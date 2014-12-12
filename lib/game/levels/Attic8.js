ig.module( 'game.levels.Attic8' )
.requires( 'impact.image','game.entities.mouseHole','game.entities.cWallBottom','game.entities.climbUpLeftWall','game.entities.climbableWallLeft','game.entities.levelchange','game.entities.player','game.entities.bee','game.entities.climbableWallRight','game.entities.environHazard','game.entities.climbUpRightWall','game.entities.trigger','game.entities.waterLeak','game.entities.mouse','game.entities.crawlspace' )
.defines(function(){
LevelAttic8=/*JSON[*/{"entities":[{"type":"EntityMouseHole","x":736,"y":172,"settings":{"circulation":1}},{"type":"EntityCWallBottom","x":32,"y":156},{"type":"EntityClimbUpLeftWall","x":124,"y":288},{"type":"EntityClimbableWallLeft","x":124,"y":292,"settings":{"size":{"x":4,"y":28}}},{"type":"EntityCWallBottom","x":96,"y":288},{"type":"EntityLevelchange","x":-72,"y":152,"settings":{"name":"back","level":"Attic16"}},{"type":"EntityPlayer","x":48,"y":334},{"type":"EntityBee","x":612,"y":168},{"type":"EntityClimbableWallRight","x":32,"y":32,"settings":{"size":{"x":4,"y":96}}},{"type":"EntityEnvironHazard","x":160,"y":320,"settings":{"size":{"x":224,"y":64}}},{"type":"EntityClimbUpRightWall","x":96,"y":160},{"type":"EntityTrigger","x":796,"y":276,"settings":{"size":{"x":32,"y":80},"target":{"1":"exit"}}},{"type":"EntityWaterLeak","x":236,"y":136,"settings":{"size":{"x":8,"y":184}}},{"type":"EntityCWallBottom","x":124,"y":348},{"type":"EntityMouse","x":672,"y":180},{"type":"EntityCrawlspace","x":608,"y":160},{"type":"EntityClimbableWallRight","x":96,"y":164,"settings":{"size":{"x":4,"y":92}}},{"type":"EntityLevelchange","x":872,"y":272,"settings":{"name":"exit","level":"Attic12"}}],"layer":[{"name":"background","width":6,"height":8,"linkWithCollision":false,"visible":1,"tilesetName":"media/attic.png","repeat":true,"preRender":false,"distance":"1","tilesize":32,"foreground":false,"data":[[6,6,16,17,7,17],[6,6,16,16,6,16],[7,7,17,17,6,16],[6,6,16,16,7,17],[6,6,16,17,6,16],[7,7,17,16,6,16],[6,6,16,17,7,17],[7,7,17,16,6,16]]},{"name":"tiles","width":25,"height":12,"linkWithCollision":false,"visible":1,"tilesetName":"media/attic.png","repeat":false,"preRender":false,"distance":"1","tilesize":32,"foreground":false,"data":[[12,12,12,12,12,12,12,22,21,12,12,12,12,12,12,12,12,12,22,21,12,12,12,12,12],[11,73,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],[11,73,0,0,0,0,0,0,0,0,0,0,11,21,12,12,12,12,12,12,12,12,22,0,11],[11,73,0,11,21,22,36,36,35,35,36,11,12,12,12,12,22,21,22,0,0,0,0,0,11],[11,0,0,0,0,11,35,37,36,35,36,11,0,0,11,12,12,12,22,0,0,0,0,0,11],[12,12,22,73,0,0,0,0,0,0,0,0,0,0,31,31,31,31,31,0,0,0,0,0,11],[12,12,22,73,0,0,0,0,0,0,0,0,0,21,12,12,22,21,12,12,12,12,22,21,12],[11,12,22,73,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],[11,11,0,61,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],[11,0,0,71,11,12,11,0,0,11,21,12,22,0,0,0,0,0,0,0,0,0,0,0,0],[11,0,0,0,11,8,8,10,9,8,8,8,21,12,22,0,0,0,0,0,0,0,0,0,0],[12,12,12,12,22,30,30,30,30,30,30,30,21,12,12,12,21,12,12,12,22,21,12,12,12]]},{"name":"collision","width":50,"height":24,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0],[0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],[0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0]]}]}/*]JSON*/;
LevelAttic8Resources=[new ig.Image('media/attic.png'), new ig.Image('media/attic.png')];
});