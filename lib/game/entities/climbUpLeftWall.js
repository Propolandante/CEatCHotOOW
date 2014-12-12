ig.module(
	'game.entities.climbUpLeftWall'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityClimbUpLeftWall = ig.Entity.extend({
	size: {x: 4, y: 4},
	
	//_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 150, 0, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	check: function( other ){
		other.climbUpLeftWall(this);
	},

	update: function(){},
	
	kill: function(){}
});

}); // Derek commenting to test SourceTree/Git
