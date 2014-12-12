ig.module(
	'game.entities.fadeToBlack'
)
.requires(
	'game.entities.blackMatte'
)
.defines(function(){
	
EntityFadeToBlack = EntityBlackMatte.extend({

	timer: null,
	time: 0,
	target: null,
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);

		this.currentAnim.alpha = 0;
		this.time = settings.time;
		this.timer = new ig.Timer(this.time);
		this.target = settings.target;
		
		ig.game.ftb = this;

	},
	
	
	update: function(){
		this.pos.x = ig.game.camera.pos.x;
		this.currentAnim.alpha = 1 + (this.timer.delta() / this.time);;
		if (this.timer.delta() >= 0){
			ig.system.setGame(this.target);
		}
		
	},

	
	
});
	
});
