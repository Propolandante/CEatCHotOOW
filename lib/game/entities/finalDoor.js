ig.module(
	'game.entities.finalDoor'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityFinalDoor = ig.Entity.extend({
	size : {
			x : 80,
			y : 216
		},

	offset: {
		x: 20,
		y: 0
	},
	
	zIndex: -20,
	
	openned: false,
	endTimer: null,
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.BOTH,
	
	animSheet: new ig.AnimationSheet( 'media/doorSpriteSheet.png', 112, 216),
	
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		
		this.addAnim( 'closed', 1, [0] );
		this.addAnim( 'open', 1, [1] );
		ig.game.door = this;
	},
	
	
	update: function(){
		
		if (this.openned){
			this.currentAnim = this.anims.open;

		}
		if (this.endTimer != null && this.endTimer.delta() >=0){
			ig.music.play('outro');
			ig.music.loop = true;
			ig.soundManager.volume=.5;
			ig.game.loadLevelDeferred(ig.global['LevelEnd'], 'LevelEnd');
		}
	},
	
	takeDamage: function(val){},
	
	check: function(other){
		if(this.openned && other instanceof EntityPlayer){
			if (this.endTimer === null){
				this.endTimer = new ig.Timer(3);
				ig.game.spawnEntity( EntityWhiteTransition, 0, 0, {time: 2, transType: 'fadeTo', dies: false});
				ig.game.player.controllable = false;
			}
		}
	}
	
});
	
});
