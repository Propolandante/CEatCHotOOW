ig.module(
	'game.entities.superDustBunny'
)
.requires(
	'impact.entity',
	
	'game.entities.enemyDeath',
	'game.entities.dustCloud'
)
.defines(function(){

EntitySuperDustBunny = ig.Entity.extend({
	size: {x: 21, y: 37},
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/superDustBunnySpriteSheet3.png', 21, 37),
	
	health: 1, //2
	
	//gravityFactor: .25,
	
	flipped: false,
	
	direction: 'left',// default direction
	// left = true
	// right = false
	
	sightRange: 250,
	distanceToPlayer: 0,
	seePlayer: false,
	lostSightTimer: null,
	
	
	patrolling: true,
	paceTimer: null,
	waitTimer: null,
	patrolPost: {x: 0, y: 0},
	
	shooting: false,
	shootTimer: null,
	shootRate: 2.0,
	
	recoverTime: 0,

	range: 50,
	
	pacingSpeed: 10,
	chasingSpeed: 30,
	
	
	shootEndTime: 0,
	shootWaitTime: 5000, // delay between shooting projectiles
	
	xleft: 0,
	xright: 0,
	
	//debug
	s_x: 0,
	s_y: 0,
	s_nx: 0,
	s_ny: 0,
	
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'idle', 1, [5]);
		this.addAnim( 'pacing', .20, [0,1,2,3,4,5,6,3]);
		this.addAnim( 'chasing', .10, [0,1,2,3,4,5,6,3]);
		this.addAnim( 'shooting', .10, [7]);
		this.addAnim( 'hit', 1, [13]);
		
		this.xleft = x - (this.range/2);
		this.xright = x + (this.range/2);
		//this.vel.y = 0;
		
		this.patrolPost.x = x;
		this.patrolPost.y = y;
		
		this.shootEndTime = Date.now();
		
		//interpret initial direction (this is to avoid a directional change on the first frame!)
		if(this.direction == 'left'){this.vel.x = -(this.pacingSpeed); this.flipped = false;}
		else if(this.direction == 'right'){this.vel.x = this.pacingSpeed; this.flipped = true;}
		
		ig.game.superDustBunny = this;
	},
	
	update: function(){
		
		//determine line of sight on cat
		var player = ig.game.getEntityByName('cat');
		var xd = 0; // x distance to player
		var yd = 0; // y distance to player
		
		if(this.recoverTime == 0){
		
		if(player)
		{
			// Get the x and y distance to the player
			xd = (player.pos.x + player.size.x / 2) - (this.pos.x + this.size.x / 2);
			yd = (player.pos.y + player.size.y / 2) - (this.pos.y);
			
			// Calculate the distance
			this.distanceToPlayer = Math.sqrt(xd * xd + yd * yd);
			
			// if player is within range
			if (this.distanceToPlayer < this.sightRange && player.pos.y > this.pos.y - 34) {
				
				// Check if the enemy has a line of sight to the player
				var trace = ig.game.collisionMap.trace(this.pos.x + this.size.x / 2, this.pos.y, xd, yd, 1, 1);
				
	
				if (!trace.collision.x && !trace.collision.y) { // WE HAVE A VISUAL!
					this.seePlayer = true;
				}
				else if(this.seePlayer)
				{
					//lose sight of player, start countdown to giving up
					this.seePlayer = false;
					this.lostSightTimer = new ig.Timer(1);
				}
			}
			else if(this.seePlayer)
			{
				//lose sight of player, start countdown to giving up
				this.seePlayer = false;
				this.lostSightTimer = new ig.Timer(1);
			}
			
		}
		
		
		//kill lostSightTimer if it's been too long
		if(this.lostSightTimer)
		{
			if(this.lostSightTimer.delta() >= 0)
			{
				this.lostSightTimer = null;
			}
		}
		
		// if player exists, and we see the player OR lostSightTimer is still active
		if( player && (this.seePlayer || (this.lostSightTimer && this.lostSightTimer.delta() < 0) ) )
		{
			//cancel any patrolling actions
			if(this.patrolling)
			{
				this.patrolling = false;
				this.paceTimer = null;
				this.waitTimer = null;
			}
			
			//enter chase mode
			this.shooting = true;
			this.currentAnim = this.anims.chasing;
			
			if(player.pos.x < this.pos.x)
			{
				this.direction = 'left';
				this.vel.x = -(this.chasingSpeed);
				this.flipped = false;
			}
			else if (player.pos.x > this.pos.x)
			{
				this.direction = 'right';
				this.vel.x = this.chasingSpeed;
				this.flipped = true;
			}
			
		}
		//if lost sight of player, retreat to origin
		else if (this.pos.x < this.patrolPost.x - this.range || this.pos.x > this.patrolPost.x + this.range)
		{
			this.shooting = false;
			this.seekOrigin();
		}
		else{
			this.shooting = false;
			this.patrolling = true;
			this.patrol();
		}
		
		//shooting projectiles
		if(this.shooting)
		{
			if(this.shootTimer == null)
			{
				this.shootTimer = new ig.Timer(this.shootRate);
			}
			
			if(this.shootTimer.delta() >= 0)
			{
				this.shootDustCloud(xd, yd);
				this.shootTimer = null;
			}
		}
		}else{
			this.recoverTime--;
		}
		//handle direction and sprite flipping
		if(this.vel.x < 0)
		{
			this.direction = 'left';
			this.flipped = false;
		}
		else if(this.vel.x > 0)
		{
			this.direction = 'right';
			this.flipped = true;
		}
		if (this.flipped == true) {
			this.currentAnim.flip.x = true;
		} else {
			this.currentAnim.flip.x = false;
		}
		
		// i killed the movement to test dustBall angles
		//this.vel.x = 0;
		
		this.parent();
	},
	
	seekOrigin: function(){
		
		this.currentAnim = this.anims.pacing;
		
		if(this.pos.x < this.patrolPost.x - this.range)
		{
			this.direction = 'right';
			this.vel.x = this.pacingSpeed;
			this.flipped = false;
		}
		else if(this.pos.x > this.patrolPost.x + this.range)
		{
			this.direction = 'left';
			this.vel.x = -(this.pacingSpeed);
			this.flipped = true;
		}
		else
		{
			this.patrol();
			this.patrolling = true;
		}
		
		
	},
	
	patrol: function(){
		
		// determine if we are pacing or waiting
		
		//if no timers have been started, start a pace timer
		if(this.paceTimer == null && this.waitTimer == null)
		{
			this.paceTimer = new ig.Timer(5);
		}
		// if paceTimer is has run past time, kill it and start wait timer
		else if(this.paceTimer != null && this.paceTimer.delta() >= 0)
		{
			this.paceTimer = null;
			this.waitTimer = new ig.Timer(2);
		}
		// if wait timer has run past time, kill it and start a pace timer
		else if(this.waitTimer != null && this.waitTimer.delta() >= 0)
		{
			this.waitTimer = null;
			this.paceTimer = new ig.Timer(5);
		}
		
		this.currentAnim = this.anims.pacing;
		
		if(this.recoverTime > 0){
			this.recoverTime--;
			this.currentAnim = this.anims.hit;
		}
		
		//pace logic
		if(this.direction == 'right')
		{
			this.vel.x = this.pacingSpeed;
			this.flipped = true;
			if ( (this.vel.x == 0) || (this.pos.x > this.patrolPost.x + this.range))
			{
				this.direction = 'left';
				this.vel.x = -(this.pacingSpeed);
				this.flipped = false;
			}
			
		}
		
		else if(this.direction == 'left')
		{
			this.vel.x = -(this.pacingSpeed);
			this.flipped = false;
			if ( (this.vel.x == 0)  || (this.pos.x < this.patrolPost.x - this.range))
			{
				this.direction = 'right';
				this.vel.x = this.pacingSpeed;
				this.flipped = true;
			}
			
		}
		
		
	},
	
	shootDustCloud: function(xd, yd)
	{
		var player = ig.game.getEntityByName('cat');
		
		if(player)
		{
			var px = (player.pos.x + player.size.x / 2) - (this.pos.x + this.size.x / 2);
			var py = (player.pos.y + player.size.y / 2) - (this.pos.y);
			var xSpeed = 100;
			var secondsToImpact = Math.abs(px / xSpeed);
			var ySpeed = (py / secondsToImpact) - 10;
			
			ig.log('px ' + px);
			ig.log('py ' + py);
			ig.log('xSpeed ' + xSpeed);
			ig.log('ySpeed ' + ySpeed);
			ig.log('secondsToImpact ' + secondsToImpact);
			ig.log('flipped? ' + this.flipped);
			
			
			
			if(this.direction === 'left')
			{
				ig.game.spawnEntity( EntityDustCloud, this.pos.x, this.pos.y + 5, {flipped:this.flipped, xSpeed:xSpeed, ySpeed:ySpeed} );
			} 
			else 
			{
				ig.game.spawnEntity( EntityDustCloud, this.pos.x, this.pos.y + 5, {flipped:this.flipped, xSpeed:xSpeed, ySpeed:ySpeed} );
			}
		}
	},
	
	check: function(other){
		other.takeDamage(1);
	},
	
	takeDamage: function(val){
		if(this.health > 0){
			ig.log("SDB health is");
			this.health -= val;
			ig.log("SDB health is");
			this.currentAnim = this.anims.hit;
			this.recoverTime = 15;
			if (this.direction == "left"){
				this.vel.x = 150;
			}else
				this.vel.x = -150;
		}
		else{
			this.kill();
		}
	},
	
	kill: function(){
		this.parent();
		ig.game.spawnEntity( EntityEnemyDeath, this.pos.x, this.pos.y);
	}
	
});

});
