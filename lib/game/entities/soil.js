ig.module(
	'game.entities.soil'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntitySoil = ig.Entity.extend({
	size: {x: 32, y: 32},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(153, 102, 51, 1)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	gravityFactor: 0,
	
	pressure: 100,
	particleTime: 5,
	
	update: function() {
		
		this.parent();	
	},

	
	check: function(other){
		
	},
	
	kill: function() {
	}
	
	

});

});