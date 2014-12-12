ig.module(
	'game.entities.cameraFocus'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCameraFocus = ig.Entity.extend({
	size: {x: 4, y: 4},
	
	//_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 150, 0, 0.7)',
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		ig.game.cf = this;
	},

	update: function(){

	},
	
	check: function(other){
		other.slowWake();
	},
	
	kill: function(){}
	
	
	
});

});