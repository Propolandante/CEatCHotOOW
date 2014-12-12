ig.module(
	'game.entities.climbableWallRight'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityClimbableWallRight = ig.Entity.extend({
	size: {x: 4, y: 32},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 255, 0, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	check: function( other ){
		
		other.latchToRightWall(this);
	},

	update: function(){},
	
	takeDamage: function(val){},
	
	kill: function(){}
	
	
});

});