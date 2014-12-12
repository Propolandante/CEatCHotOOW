ig.module(
	'game.entities.bee'
)
.requires(
	'impact.entity',
	
	'game.entities.enemyDeath'
)
.defines(function(){
	
EntityBee = ig.Entity.extend({
	size: {x: 19, y: 14},
	
	name: 'bee',
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 255, 0, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/beeSpriteSheet.png', 19, 14),
	
	maxVel: {x: 300, y: 300},
	
	baseSpeed: 0,
	speed: 150,
	
	health: 0, //1
	reactsToPlayer: false,
	playerClose: false,
	
	gravityFactor: 0,
	
	flipped: false,
	
	beePathType: 'vertical',
	
	center: 42069666,
	range: 0,
	
	direction: '',

	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		//visual-bee-size-path hack
		if(this.beePathType == 'vertical'){this.range = this.size.y;}
		else if(this.beePathType == 'horizontal'){this.range = this.size.x;}
		else if(this.beePathType == 'none'){this.range = 0;}
		else {/*ABORT ABORT BEE HAS NO PATH TYPE*/}
		
		//reset size to correct size
		this.size.x = 19;
		this.size.y = 14;
		
		//reposition bee to center of path
		if(this.beePathType == 'vertical')
		{
			//this.pos.y = this.pos.y + this.range/2;
			this.center = this.pos.y + this.range/2;
		}
		else if(this.beePathType == 'horizontal')
		{
			this.pos.x = this.pos.x + this.range/2;
			this.center = this.pos.x;
		}
		else if(this.beePathType == 'none'){/*DO NOTHING*/}
		else {/*ABORT ABORT BEE HAS NO PATH TYPE*/}
		
		this.baseSpeed = this.speed;
		
		this.addAnim( 'flying', 0.01, [0,1] );
		
		this.direction = 'there';
		
		ig.game.bee = this;
	},
	
	
	update: function(){
		
		
		//speed up bee if player is close
		if(this.reactsToPlayer)
		{
			var player = ig.game.getEntityByName( 'cat' );
			
			if(player)
			{
					if(Math.abs(player.pos.x - this.pos.x) < 100)
					{
						this.playerClose = true;
						this.speed = this.baseSpeed * 2;
					}
					else
					{
						this.playerClose = false;
					this.speed = this.baseSpeed;
				}
			}
		}
		
		//control bee velocity
		if(this.beePathType == 'vertical')
		{
			if(this.direction == 'there')
			{
				// go faster when closer to center of range, slower on the edges
				this.vel.y = this.speed - ( Math.abs( (this.pos.y - this.center) / (this.range/2) ) *  (this.speed-20)); 
				
				if(this.pos.y > this.center + this.range/2 || this.vel.y === 0)
				{
					this.direction = 'back';
					this.vel.y = -1;
				}
			}
			
			else if(this.direction == 'back')
			{
				
				// go faster when closer to center of range, slower on the edges
				this.vel.y = -(this.speed) + ( Math.abs( (this.pos.y - this.center) / (this.range/2) ) *  (this.speed-20)); 
				
				if(this.pos.y < this.center - this.range/2 || this.vel.y === 0)
				{
					this.direction = 'there';
					this.vel.y = 1;
				}
				
			}
		}
		
		else if(this.beePathType == 'horizontal')
		{
			if(this.direction == 'there')
			{
				// go faster when closer to center of range, slower on the edges
				this.vel.x = this.speed - ( Math.abs( (this.pos.x - this.center) / (this.range/2) ) *  130); 
				
				if(this.pos.x > this.center + this.range/2 || this.vel.x === 0)
				{
					this.direction = 'back';
					this.vel.x = -1;
				}
				
				
			}
			
			else if(this.direction == 'back')
			{
				// go faster when closer to center of range, slower on the edges
				this.vel.x = -(this.speed) + ( Math.abs( (this.pos.x - this.center) / (this.range/2) ) *  130); 
				
				if(this.pos.x < this.center - this.range/2 || this.vel.x === 0)
				{
					this.direction = 'there';
					this.vel.x = 1;
				}
				
			}
		}
		this.parent();
	},
	
	check: function(other){
		
		other.takeDamage(1);
	},
	
	takeDamage: function(val){
		ig.log("randomblahblahtakedamage");
		if(this.health > 0){
			ig.log("bee health is" + this.health);
			this.health -= val;
			ig.log("bee health is" + this.health);
		}
		else{
			this.kill();
		}
	},
	
	kill: function() {
		this.parent();

		ig.game.spawnEntity( EntityEnemyDeath, this.pos.x, this.pos.y-2);
	}
	
});
	
});
