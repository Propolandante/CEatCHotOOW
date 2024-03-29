ig.module(
	'game.entities.waterLeak'
)
.requires(
	'game.entities.environHazard',
	'game.entities.waterParticle'
)
.defines(function(){
EntityWaterLeak = ig.Entity.extend({
	size: {x: 32, y: 32},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 0, 1)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	gravityFactor: 0,
	
	pressure: 100,
	particleTime: 5,
	
	update: function() {
		
		var c = 'dark';
		if ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1) < 0){
			c = 'light';
		}
		//ig.log(xs);
		
		if (Math.random() < 0.3)
		{
			ig.game.spawnEntity(EntityWaterParticle, this.pos.x + this.size.x/2, this.pos.y, 
			{end: this.size.y, pressure: this.pressure, color: c, endTime: this.particleTime});
		}
		
		
		this.parent();	
	},

	
	check: function(other){
		
	},
	
	kill: function() {
	}
	
	

});

});