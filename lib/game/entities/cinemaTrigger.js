ig.module(
	'game.entities.cinemaTrigger'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCinemaTrigger = ig.Entity.extend({
	size: {x: 4, y: 4},
	cEvent: 'slowAwake',
	
	//_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 150, 200, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
	},

	update: function(){
		this.pos.x--;
		
	},
	
	check: function(other){
		if(this.cEvent === 'slowAwake'){
			other.slowWake();
		}else if(this.cEvent === 'fastAwake'){
			other.fastWake();
		}else if(this.cEvent === 'awake'){
			other.awake();
		}else if(this.cEvent === 'look'){
			other.look();
		}else if(this.cEvent === 'touch'){
			other.touch();
		}
		
	},
	
	kill: function(){}
	
	
	
});

});