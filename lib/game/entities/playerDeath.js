ig.module(
	'game.entities.playerDeath'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayerDeath = ig.Entity.extend({
	
	size: {x: 16, y: 16},
	
	type: ig.Entity.TYPE.NONE,
	
	animSheet: new ig.AnimationSheet( 'media/explosion.png', 16, 16),
	
	gravityFactor: 0,
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'explode', 0.04, [0,0,0,1,2,3], true);
		//this.currentAnim = this.anims.explode;
		
	},
	
	update: function(){
		if( this.currentAnim.loopCount > 0 ) {
    		this.kill();
    	}
    	this.parent();
	},
	
	kill: function(){
		this.parent();
		
		if(ig.game.levelName==='LevelAttic9')
		{
			ig.log("ig.game.levelName===LevelAttic9");
			
			ig.music.play('theme');
			ig.music.loop=true;
			
			var boss = ig.game.getEntityByName("vacuum");
			if(boss)
			{
				boss.suckSound.stop();
				boss.swipeSound.stop();
				boss.shootSound.stop();
			}
			
			ig.game.loadLevelDeferred(ig.global['LevelAttic14'], 'LevelAttic14');
		}
		else
		{
			ig.game.reloadLevel();	
		}
		
	}
	
});

});