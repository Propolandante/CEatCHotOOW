ig.module(
	'game.entities.whiteTransition'
)
.requires(
	'game.entities.whiteMatte'
)
.defines(function(){
	
EntityWhiteTransition = EntityWhiteMatte.extend({

	timer: null,
	time: 0,
	target: null,
	dies: true,
	
	transType: 'fadeToWhite',
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);

		
		this.time = settings.time;
		this.timer = new ig.Timer(this.time);
		this.transType = settings.transType;
		this.dies = settings.dies;
		if(this.transType == 'fadeTo'){
			this.currentAnim.alpha = 0;
		}else{
			this.currentAnim.alpha = 1;
		}
			
		
		ig.game.ftb = this;

	},
	
	takeDamage: function(val){},
	
	update: function(){
		if(this.transType == 'fadeTo'){
			this.pos.x = ig.game.camera.pos.x;
			this.currentAnim.alpha = 1 + (this.timer.delta() / this.time);;
		}else if(this.transType == 'fadeFrom'){
			this.pos.x = ig.game.camera.pos.x;
			this.currentAnim.alpha = 2 - (this.timer.delta() / this.time);;
			if (this.dies && this.timer.delta() >= 0){
				this.kill();
			}
		}
		
	},

	
	
});
	
});
