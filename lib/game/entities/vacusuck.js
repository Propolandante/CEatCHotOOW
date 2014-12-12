ig.module(
	'game.entities.vacusuck'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityVacusuck = ig.Entity.extend({
	
	size: {x: 125, y: 33},
	
	type: ig.Entity.TYPE.NONE,
	
	animSheet: new ig.AnimationSheet( 'media/vacuumWindSheet.png', 125, 33),
	
	gravityFactor: 0,
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'explode', 0.1, [0,1,2,3,4]);
		
	},
	
	update: function(){
		if( !ig.game.vacuum.suck ) {
    		this.kill();
    	}
    	this.parent();
	}
	
});

});