ig.module(
	'game.entities.end'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityEnd = ig.Entity.extend({
	size : {
			x : 608,
			y : 256
		},

	
	animSheet: new ig.AnimationSheet( 'media/endScreen.png', 608, 256),
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'screen', 1, [0] );
		ig.game.player.controllable = false;

	},
	
	
	update: function(){
	},

	
	
});
	
});
