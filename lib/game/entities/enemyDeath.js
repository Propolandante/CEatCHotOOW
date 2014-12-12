ig.module(
	'game.entities.enemyDeath'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEnemyDeath = ig.Entity.extend({
	
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
	}
	
});

});