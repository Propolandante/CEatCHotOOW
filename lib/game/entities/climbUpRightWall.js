ig.module(
	'game.entities.climbUpRightWall'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityClimbUpRightWall = ig.Entity.extend({
	size: {x: 4, y: 4},
	
	//_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 150, 0, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	check: function( other ){
		other.climbUpRightWall(this);
	},

	update: function(){},
	
	kill: function(){}
	
});

});