ig.module(
	'game.entities.movableBlock'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityMovableBlock = ig.Entity.extend({
	size: {x: 32, y: 32},
	collides: ig.Entity.COLLIDES.ACTIVE,
	maxVel: {x: 400, y: 800},
	animSheet: new ig.AnimationSheet( 'media/movableBlock.png', 32, 32),
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.BOTH,
	
	hasPlayer: false,
	touchedBee: false,
	
	spawnX:0,
	spawnY:0,
	
	friction : {
			x : 400,
			y : 0
		},
	init: function (x,y,settings){
		this.spawnX = x;
		this.spawnY = y;
		
		this.parent(x,y,settings);
		this.addAnim( 'block', 1, [0]);
		
	},
	
	check: function( other ){
				
		if(other instanceof EntityEnvironHazard)
		{
			this.pos.x=this.spawnX;
			this.pos.y=this.spawnY;
		}
		
		if(other instanceof EntityBee)
		{
			this.touchedBee = true;
		}
		
		if(other instanceof EntityPlayer)
		{
			if(!other.isClimbingLeft && !other.isClimbingRight && other.pos.y < this.pos.y && this.touchedBee){
				other.plat = this.pos;
				this.hasPlayer = true;
			}
		}
	},
	
	takeDamage: function(val){},

	update: function(){
		this.parent();
		if(this.hasPlayer && ig.game.player.standing){
			if (ig.game.player.plat == undefined){
				ig.game.player.plat = new Object();
			}
			ig.game.player.plat.y = this.pos.y;
			ig.game.player.platVelY = this.vel.y;
		}else
			this.hasPlayer = false;		

	},
	
});

});