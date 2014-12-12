ig.module(
	'game.entities.climbStop'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityClimbStop = ig.Entity.extend({
	size: {x: 4, y: 4},
	
	//_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 150, 0, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	check: function( other ){
		other.climbStop(this);
	},

	update: function(){},
	
	kill: function(){}
	
});

});