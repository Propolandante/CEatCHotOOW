ig.module(
	'game.entities.sparkticle'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntitySparkticle = ig.Entity.extend({
	
	size: {x: 8, y: 8},
	
	type: ig.Entity.TYPE.NONE,
	
	animSheet: new ig.AnimationSheet( 'media/sparkle.png', 8, 8),
	
	gravityFactor: 0,
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'explode', 0.04, [1,2,3], true);
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