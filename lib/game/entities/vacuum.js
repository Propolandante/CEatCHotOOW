ig.module(
	'game.entities.vacuum'
)
.requires(
	'impact.entity',
	
	'game.entities.vacuumBag',
	'game.entities.enemyDeath',
	'game.entities.vacusuck',
	'game.entities.whiteTransition'
)
.defines(function(){

EntityVacuum = ig.Entity.extend({
	size: {x: 33, y: 23},
	
	pivot: {x: 29, y: 23},
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/vacuumHead.png', 33, 23),
	
	health: 14,
	maxHealth: 14,
	
	name : "vacuum",
	
	//gravityFactor: .25,
	
	flipped: false,
	
	direction: 'right',// default direction

	
	swipe: true,
	suck: false,
	shoot: false,
	
	timer: null,
	
	newTimer: true,
	
	music: true,
	
	swipeMusicCount:0,
	
	swipeCount:0,
	
	range: 96,
	
	explodeTracker: 0,
	
	rightSpeed: 95,
	leftSpeed: -95,
	
	xleft: 0,
	xright: 0,
	
	bag: null,
	dying: false,
	
	bagDeathTimer: null,
	
	initialPlay: true,
	
	
	suckSound: new ig.Sound('media/sounds/vacuumSuck2.*'),
	swipeSound: new ig.Sound('media/sounds/swipeSound2.*'),
	shootSound: new ig.Sound('media/sounds/bunnySpawn.*'),
	deathSound: new ig.Sound('media/sounds/vacuumDeath.*'),

	init: function (x,y,settings){
		this.parent(x,y,settings);
		//this.swipeSound.play();
		this.range=ig.system.realWidth;
		
		this.addAnim( 'idle', 1, [1]);
		this.addAnim( 'move', 1, [2]);
		
		this.xleft = x - (this.range/2);
		this.xright = x + (this.range/2);
		
		this.zIndex = -8;
		//this.vel.y = 0;
		
		//interpret initial direction (this is to avoid a directional change on the first frame!)
		
		
		
		ig.game.vacuum = this;
	},
	
	update: function(){
		if (this.dying == false){
			if (this.bag == null){
				if(this.direction == 'left'){
					this.vel.x = this.leftSpeed; this.flipped = false;
					ig.game.spawnEntity(EntityVacuumBag, this.pos.x+this.size.x, this.pos.y-40, {vp: this, name: "bag"});
					this.bag = ig.game.getEntityByName( "bag" );
				}
				else if(this.direction == 'right'){
					this.vel.x = this.rightSpeed; this.flipped = true;
					ig.game.spawnEntity(EntityVacuumBag, this.pos.x+this.size.x, this.pos.y-40, {vp: this, name: "bag"});
					this.bag = ig.game.getEntityByName( "bag" );
				}
			}
	
		if(this.initialPlay)
		{
			this.swipeSound.play();
			this.initialPlay=false;
		}
			
			
			if(this.swipe)
			{	
				if(this.music)
				{
					this.swipeMusicCount++
					if(this.swipeMusicCount%125==0)
					{
						this.swipeSound.play();
						this.swipeMusicCount=0;
					}
					// this.music=false;
				}
				
				this.currentAnim = this.anims.move;
				this.offset.y = 0;
				this.currentAnim.angle = 0;
				this.bag.currentAnim.angle = 0;
				this.bag.offset.y = 15;
				this.moveSwipe();
			}
			
			if(this.suck)
			{
				if(this.music)
				{
					this.suckSound.play();
					this.music=false;
				}
				this.currentAnim = this.anims.move;
				this.offset.y = 5;
				this.currentAnim.angle = Math.PI / 4;
				this.bag.currentAnim.angle = Math.PI / 12;
				this.bag.offset.y = 6;
				this.moveSuck();
			}
			
			if(this.shoot)
			{
				if(this.music)
				{
					this.swipeMusicCount++
					if(this.swipeMusicCount%125==0)
					{
						this.swipeSound.play();
						this.swipeMusicCount=0;
					}
					// this.music=false;
				}
				this.currentAnim = this.anims.idle;
				this.offset.y = 0;
				this.currentAnim.angle = 0;
				this.bag.currentAnim.angle = 0;
				this.bag.offset.y = 15;
				this.moveShoot();
			}
			
			
			if(ig.Sound.enabled == false)
			{
				this.swipeSound.stop();
				this.suckSound.stop();
			}
	
	
			if (this.currentAnim == this.anims.move){
				if (this.health/this.maxHealth > 2/3){
					this.bag.currentAnim = this.bag.anims.damage1;
				}else if (this.health/this.maxHealth > 1/3){
					this.bag.currentAnim = this.bag.anims.damage2;
				}else{
					this.bag.currentAnim = this.bag.anims.damage3;
				}
			}else{
				if (this.health/this.maxHealth > 2/3){
					this.bag.currentAnim = this.bag.anims.damage134;
				}else if (this.health/this.maxHealth > 1/3){
					this.bag.currentAnim = this.bag.anims.damage234;
				}else{
					this.bag.currentAnim = this.bag.anims.damage334;
				}
			}
			if (this.flipped){
				this.bag.currentAnim.flip.x = true;
				this.bag.pos.x = this.pos.x-this.bag.size.x;
			}else{
				this.bag.currentAnim.flip.x = false;
				this.bag.pos.x = this.pos.x+this.size.x-2;
			} 
			this.bag.pos.y = this.pos.y-42;
		}else{
			if (this.bagDeathTimer.delta() < 0){
				var p1x = Math.random()*40 - 20 + this.bag.pos.x+10;
				var p1y = Math.random()*40 - 20 + this.bag.pos.y+30;
				
				var p2x = Math.random()*40 - 20 + this.bag.pos.x+10;
				var p2y = Math.random()*80 - 40 + this.bag.pos.y+30;
				
				
		
				if (this.explodeTracker % 5 == 0)
					ig.game.spawnEntity(EntityEnemyDeath, p1x, p1y, {});
				if (this.explodeTracker % 7 == 0)
					ig.game.spawnEntity(EntityEnemyDeath, p2x, p2y, {});
				this.explodeTracker++;
				if (this.explodeTracker >= 1000){
					this.explodeTracker = 0;
				}
			}else{
				this.bag.kill();
				if (this.pos.x >= 304){
					this.vel.x = -1600;
					this.currentAnim.angle += 10;
				}else{
					this.vel.x = 1600;
					this.currentAnim.angle -= 10; 
				}
				
				var p3x = Math.random()*40 - 20 + this.pos.x;
				var p3y = Math.random()*40 - 20 + this.pos.y;
				
				var p4x = Math.random()*40 - 20 + this.pos.x;
				var p4y = Math.random()*40 - 20 + this.pos.y;
				ig.game.spawnEntity(EntityEnemyDeath, p3x, p3y, {});
				ig.game.spawnEntity(EntityEnemyDeath, p3x, p3y, {});
				
				if (this.pos.x < 310 && this.pos.x > 288){
					this.kill();
				}
			}
			
			
		}
		this.parent();	
		
					
	},
	
	check: function(other){
		other.takeDamage(1);
	},
	
	kill: function(){
		if (this.dying){
			ig.game.door.openned = true;
			this.parent();

			
		}else{
			var player = ig.game.getEntityByName( "cat" );
			if(player)
			{
				player.sucked=false;
				this.suck = false;
			}
			ig.game.spawnEntity( EntityWhiteTransition, 0, 0, {time: .1, transType: 'fadeFrom', dies: true});
			this.type = ig.Entity.TYPE.NONE;
			this.checkAgainst =  ig.Entity.TYPE.NONE;
			this.collides = ig.Entity.COLLIDES.NONE;
			this.bag.type = ig.Entity.TYPE.NONE;
			this.bag.checkAgainst =  ig.Entity.TYPE.NONE;
			this.bag.collides = ig.Entity.COLLIDES.NONE;
			this.bagDeathTimer = new ig.Timer(1.5);
			this.vel.x = 0;
			this.dying = true;
			
			ig.music.stop();
			
			this.deathSound.play();
			
			this.suckSound.stop();
			this.swipeSound.stop();
			this.shootSound.stop();
		}
	},
	
	moveSwipe: function(){
		
		if(this.swipeCount === 5 && this.pos.x < 450)
		{	
			// ig.log("should be 4 swipeCount==="+this.swipeCount);
			this.swipe=false;
			this.suck=true;
			ig.game.spawnEntity(EntityVacusuck, this.pos.x-125, this.pos.y-10, {});
			this.music=true;

			this.swipeCount=0;
			// ig.log("should be 0 swipeCount=="+this.swipeCount);
			this.vel.x = 0; 
			this.flipped=false;
			this.direction = 'left';
			this.currentAnim.flip.x = false;
		}
		else
		{
		
			if(this.direction == 'left')
			{
				if(this.vel.x == 0 || this.pos.x <= this.xleft) //if hits range edge or wall
				{
					this.direction = 'right'; // flip direction
					this.swipeCount++;
					this.pos.x += 60;
					//ig.log("hit left wall swipeCount=="+this.swipeCount);
				}
			}
		
			else if(this.direction == 'right')
			{
				if(this.vel.x == 0 || this.pos.x >= this.xright) // if hits range edge or wall
				{
					this.direction = 'left'; // flip direction
					this.swipeCount++;
					this.pos.x -= 60;
					//ig.log("hit right wall swipeCount=="+this.swipeCount);
				}
			}
		
					//interpret direction
			if(this.direction == 'left'){this.vel.x = this.leftSpeed; this.flipped = false;}
			else if(this.direction == 'right'){this.vel.x = this.rightSpeed; this.flipped = true;}
		
			//flip sprite if necessary
			if (this.flipped == true){
				this.currentAnim.flip.x = true;
			}else{
				this.currentAnim.flip.x = false;
			}
		
			
		}	
	
	},
	
	moveSuck: function(){
		//this.currentAnim.flip.x = false;
		
		var player = ig.game.getEntityByName( "cat" );
		if(this.timer===null)
		{
			this.timer = new ig.Timer(9);
		}
		
		if(player)
		{
			player.sucked=true;
		}
		
		if(this.timer.delta()>=0)
		{
			this.timer=null;
			player.sucked=false;
	
			this.music=true;
			this.suck=false;
			this.shoot=true;
		}
	},
	
	moveShoot: function(){
		
		if(this.timer===null)
		{
			this.timer = new ig.Timer(6);
			var spawn =true;
			ig.game.spawnEntity(EntityDustBunny, this.pos.x, this.pos.y, {range: this.range});
			this.shootSound.play();
		}
		
		if( this.timer.delta() === -3 && spawn)
		{
			ig.game.spawnEntity(EntityDustBunny, this.pos.x-50, this.pos.y-50);
			spawn = false;
		}
		
		// if(this.timer.delta()/3 === -3 || this.timer.delta()/3 === -2 || this.timer.delta()/3 === -1)
		// {
			// ig.game.spawnEntity(EntityDustBunny, this.pos.x-50, this.pos.y-50);
		// }
		
		if(this.timer.delta()>=0)
		{
			ig.game.spawnEntity(EntityDustBunny, this.pos.x, this.pos.y, {range: this.range});
			this.timer=null;
			this.shootSound.play();
			this.direction='right';
			
			ig.log("this.direction=="+this.direction);
			
			this.flipped=false;
			
			
			this.music=true;
			this.shoot=false;
			this.swipe=true;
		}
		
	},
	
	takeDamage: function(val){
		if(this.health > 0){
			this.health -= val;
		}
		else{
			this.kill();
		}
	},
	
});

});
