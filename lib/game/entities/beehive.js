ig.module(
	'game.entities.beehive'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityBeehive = ig.Entity.extend({
	size: {x: 32, y: 32},
	
	name: 'beehive',
	
	
	gravityFactor: 0,
	triggered: false,
	fallTimer: null,
	beeTimer: null,
	beeCount: 30,
	beeDelay: 0.10,	
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/beehive.png', 32, 32),
	
	init: function (x,y,settings){
		
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'wiggle', 0.3, [1,2]);
		this.addAnim('broken', 1, [3]);
		
		this.currentAnim = this.anims.idle;
		
		
		this.parent(x,y,settings);
		
		ig.game.beehive = this;
	},
	
	update: function() {
		
		
		//handle fall trigger
		if(this.triggered)
		{
			if(this.gravityFactor == 0)
			{
				if(!this.fallTimer){this.fallTimer = new ig.Timer(0.6);}
			
				if(this.fallTimer.delta() < 0.0)
				{
					if(this.currentAnim == this.anims.idle)
					{
						this.currentAnim = this.anims.wiggle;
					}
				}
				else
				{
					this.gravityFactor = 1;
					this.fallTimer = null;
					this.currentAnim = this.anims.idle;
				}
			}
			else if(this.standing)
			{
				this.currentAnim = this.anims.broken;
			}
			
		}
		
		
		//release bees
		if(this.currentAnim == this.anims.broken)
		{
			if (!this.beeTimer) {this.beeTimer = new ig.Timer(this.beeDelay * this.beeCount);}
			if(this.beeTimer.delta() > -(this.beeDelay * this.beeCount))
			{
				this.releaseBee();
				this.beeCount--;
			}
			if(this.beeCount <= 0)
			{
				this.beeTimer = null;
			}
						
			
		}
		
		
		this.parent();
		
	},
	
	triggeredBy: function( entity, trigger ) {
		if(!this.triggered)
		{
			this.triggered = true;
		}
	},
	
	releaseBee: function() {
		// http://i.imgur.com/1M90apA.gif
		
		var inc_x = Math.random() * 40;
		var inc_y = Math.random() * -40;
		
		var ceiling = 70 + inc_x;
		
		var o_y = -50 + inc_y;
		var o_x = 25 + inc_x;
		var f_y = -20 + inc_y;
		var f_x = 60 + inc_x;
		
		
		
		
		ig.game.spawnEntity(EntityBeeFree, this.pos.x+16, this.pos.y + 16, {flipped:true, o_y: o_y, o_x: o_x, f_y:f_y, f_x:f_x});
		
		
	}
	
	
});
	
});
