ig.module(
	'game.entities.cineCat'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityCineCat = ig.Entity.extend({
	size : {
			x : 26,
			y : 16
		},
		offset : {
			x : 12,
			y : 34
		},
	
	animSheet: new ig.AnimationSheet( 'media/cat.png', 50, 50),
	
	type: ig.Entity.TYPE.A,
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'sleeping', 1, [25] );
		this.addAnim( 'slowWake', 0.5, [25,26]);
		this.addAnim( 'fastWake', 0.3, [25,26]);
		this.addAnim( 'awake', 1, [27]);
		this.addAnim( 'look', 1, [28]);
		this.addAnim( 'touch', 1, [29]);

		this.currentAnim.flip.x = true;
	},
	
	
	update: function(){
		this.currentAnim.flip.x = true;
		this.parent();
		
		
	},
	
	slowWake: function(){
		this.currentAnim = this.anims.slowWake;
		this.currentAnim.flip.x = true;
	},
	
	fastWake: function(){
		this.currentAnim = this.anims.fastWake;
		this.currentAnim.flip.x = true;
	},
	
	awake: function(){
		this.currentAnim = this.anims.awake;
		this.currentAnim.flip.x = true;
	},
	
	look: function(){
		this.currentAnim = this.anims.look;
		this.currentAnim.flip.x = true;
	},
	
	touch: function(){
		this.currentAnim = this.anims.touch;
		this.currentAnim.flip.x = true;
	}
	
	
});
	
});
