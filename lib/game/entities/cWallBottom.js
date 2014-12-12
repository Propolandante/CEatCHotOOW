ig.module(
	'game.entities.cWallBottom'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCWallBottom = ig.Entity.extend({
	size: {x: 4, y: 4},
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 120, 120, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	check: function( other ){
		if (other.isClimbingRight || other.isClimbingLeft){
			if (other.isClimbingLeft){
				other.pos.x -= 10;
			}
			other.gravityFactor = 1;
			//other.pos.y -= 16;
			other.isClimbingRight = false;
			other.isClimbingLeft = false;
			other.setBoundingBox('idle');
		}
	},

	update: function(){},
	
	kill: function(){}
});

});