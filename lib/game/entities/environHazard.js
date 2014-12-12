ig.module(
	'game.entities.environHazard'
)
.requires(
	'impact.entity'
	
)
.defines(function(){
	
EntityEnvironHazard = ig.Entity.extend({
	size: {x: 32, y: 32},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 0, 1)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	gravityFactor: 0,

	


	
	check: function(other){

			other.kill();
	},
	
	kill: function() {
	}
	
});
	
});
