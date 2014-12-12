ig.module(
	'game.entities.dustBunny'
)
.requires(
	'impact.entity',
	
	'game.entities.enemyDeath'
)
.defines(function(){

EntityDustBunny = ig.Entity.extend({
	size: {x: 32, y: 22},
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/dustBunnySpriteSheet.png', 32, 22),
	
	health: 0, //1
	
	gravityFactor: .25,
	
	flipped: false,
	
	direction: 'left',// default direction
	// left = true
	// right = false
	
	jump: 0,
	
	jumpEndTime: 0,	// when bunny finishes jumping
	jumpWaitTime: 0, // delay between jumps
	
	range: 40,
	
	xleft: 0,
	xright: 0,
	
	onScreen: false,
	
	bunnyJump: new ig.Sound('media/sounds/bunnyJump.*'),
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.jumpWaitTime = Math.random()*9000;
		//ig.log("jumpWaitTime=="+this.jumpWaitTime);
		
		this.addAnim( 'idle', 0.1, [0,1,2,3,4]);
		
		this.xleft = x - (this.range/2);
		this.xright = x + (this.range/2);
		this.vel.y = 0;
		
		//interpret initial direction (this is to avoid a directional change on the first frame!)
		if(this.direction == 'left'){this.vel.x = -30; this.flipped = false;}
		else if(this.direction == 'right'){this.vel.x = 30; this.flipped = true;}
		
		ig.game.dustBunny = this;
	},
	
	update: function(){
		// movement
		/*
		if(this.direction == 'left'){
			if(this.standing)
			{
				this.vel.y = 30;
			}
		}else if(this.direction == 'right'){
			//this.vel.x = 30;
			//this.flipped = true;
			if(this.standing){
				this.vel.y = 30;
			}
		}
		*/


		var player = ig.game.getEntityByName('cat');
		
		this.checkOnScreen();

		if (player)
		{
			if (player.pos.x < this.pos.x)
			{
				this.direction = 'left';
			}
			else
			{
				this.direction = 'right';
			}
		}
		
		
	
		
				//interpret direction
		if(this.direction == 'left'){this.vel.x = -10; this.flipped = false;}
		else if(this.direction == 'right'){this.vel.x = 10; this.flipped = true;}
		
		//flip sprite if necessary
		if (this.flipped == true){
			this.currentAnim.flip.x = true;
		}else{
			this.currentAnim.flip.x = false;
		}
		
		if(this.vel.y > 0)
		{
			this.jumpEndTime = Date.now();
		}
		
		if(this.standing)
		{
			var curTime = Date.now();
			if( (curTime - this.jumpEndTime) >= this.jumpWaitTime)
			{
				this.vel.y = this.jump;
				if(this.onScreen)	this.bunnyJump.play();
			}
		}
		
		this.parent();	
			
	},
	
	check: function(other){
		other.takeDamage(1);
	},
	
	takeDamage: function(val){
		if(this.health > 0){
			ig.log("dustBunny health is");
			this.health -= val;
			ig.log("dustBunny health is");
		}
		else{
			this.kill();
		}
	},
	
	kill: function(){
		this.parent();
		ig.game.spawnEntity( EntityEnemyDeath, this.pos.x, this.pos.y);
	},
	
	checkOnScreen: function(){
		if(this.pos.x < ig.game.camera.pos.x || this.pos.x > ig.game.camera.pos.x+608 || this.pos.y<ig.game.camera.pos.y || this.pos.y >ig.game.camera.pos.y+256)
		{
			this.onScreen=false;
		}
		else
		{
			this.onScreen=true;
		}
	
	}
	
});

});
		

		
	
	