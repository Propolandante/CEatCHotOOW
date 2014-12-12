ig.module('game.entities.player').requires('impact.entity', 'game.entities.hairball', 'game.entities.lostHairball', 'game.entities.playerDeath').defines(function() {

	EntityPlayer = ig.Entity.extend({
		size : {
			x : 26,
			y : 16
		},
		offset : {
			x : 12,
			y : 34
		},
		name : "cat",
		type : ig.Entity.TYPE.A,
		checkAgainst : ig.Entity.TYPE.NONE,
		collides : ig.Entity.COLLIDES.PASSIVE,

		animSheet : new ig.AnimationSheet('media/cat.png', 50, 50),

		maxVel : {
			x : 550,
			y : 800
		},
		friction : {
			x : 800,
			y : 0
		},

		jump : -350,


		invulnerableTime : 0,
		invTimer: null,
		wearingPajamas: false,
		alphaDeltaTime: 0.1,
		
		capacity : 5,
		hairballs : 0,
		
		
		fatness : false,

		flipped : false,

		sucked : false,
		
		grasping: false,

		isClimbingLeft : false,
		isClimbingRight : false,

		controllable : true,
		controlTimer: null,

		debugTag : false,
		

		pressCount: 0,

		boxType : 'idle',

		jumpSound : new ig.Sound('media/sounds/jumpSound2.*'),
		eatSound : new ig.Sound('media/sounds/eatMouseSound.*'),
        hurtSound : new ig.Sound('media/sounds/hurtSound3.*'),
        shootSound: new ig.Sound('media/sounds/shootSound.*'),
        climbSound: new ig.Sound('media/sounds/climbSound2.*'),
        deathSound: new ig.Sound('media/sounds/playerDeath2.*'),
        getPJsSound: new ig.Sound('media/sounds/getCatsPJ.*'),
        losePJsSound: new ig.Sound('media/sounds/loseCatsPJ.*'),
        
        // c : new ig.Sound('media/sounds/outOfHairballsSoundAlt.*'),



		init : function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('fatIdle', 1, [24]);
			this.addAnim('run', 0.08, [5, 5, 6, 7, 8, 9]);
			this.addAnim('jump', 1, [5]);
			this.addAnim('fall', 1, [9]);
			this.addAnim('idleClimbUp', 1, [10]);
			this.addAnim('climb', 0.1, [10, 11]);
			this.addAnim('readyWallJump', 1, [14]);

			this.addAnim('fatRun1', 0.06, [15, 16, 17, 18, 19, 20]);
			this.addAnim('fatRun2', 0.08, [15, 16, 17, 18, 19, 20]);
			this.addAnim('fatRun3', 0.1, [15, 16, 17, 18, 19, 20]);
			this.addAnim('fatRun4', 0.12, [15, 16, 17, 18, 19, 20]);
			this.addAnim('fatRun5', 0.14, [15, 16, 17, 18, 19, 20]);
			this.addAnim('fatJump', 1, [20]);
			this.addAnim('wallGrasp', 0.08, [20, 21, 22]);

			ig.game.player = this;
		},

		update : function() {
			if (ig.game.hairballs > 0) {
				ig.game.fatness = true;
			} else {
				ig.game.fatness = false;
			}
			
			//apply invulnerability
			this.applyInvulnerability();
			
			//apply controllability
			this.applyControllability();
			
			
			if (ig.game.pHealth <= 0)
				this.kill();
			//Check input when the player is running and jumping
			if (this.controllable) {
				if (!this.isClimbingLeft && !this.isClimbingRight) {
					if (ig.input.state('left')) {
						if (this.sucked) {

							var oldVel = this.vel.x;
							this.vel.x = -50 + ig.game.hairballs * 10;

							if (this.vel.x < oldVel) {
								this.currentAnim.angle = -1 * this.currentAnim;
							}

							// this.currentAnim = this.anims.fatIdle;

							this.flipped = true;

						} else {
							var oldVel = this.vel.x;
							this.vel.x = -150 + ig.game.hairballs * 10;
							if (this.vel.x < oldVel) {
								this.currentAnim.angle = -1 * this.currentAnim;
							}

							this.flipped = true;
						}
					} else if (ig.input.state('right')) {
						var oldVel = this.vel.x;
						this.vel.x = 150 - ig.game.hairballs * 10;
						if (this.vel.x < oldVel) {
							this.currentAnim.angle = -1 * this.currentAnim;
						}
						this.flipped = false;
					} else {
						if(this.sucked) {this.vel.x=100; }
						else {this.vel.x = 0;}
					}
					//put aduio here
					if (this.standing && ig.input.pressed('jump')) {
						//jumps slower when there are more hairballs
						delete this.plat;
						this.standing = false;
						this.vel.y = this.jump + ig.game.hairballs * 15;
						this.jumpSound.play();
					}

					if (ig.input.released('jump')) {
						this.vel.y /= 2;
					}
					//------------------------------------------------
					//Check input when the player is climbing
				} else if (this.isClimbingLeft) {
					if (ig.input.state('up')) {
						this.pressCount++;
						this.vel.y = -60;
						
						if(this.pressCount%9==0)	this.climbSound.play();
					} else if (ig.input.state('down')) {
						this.pressCount++;
						this.vel.y = 60;
						
						if(this.pressCount%9==0)	this.climbSound.play();
					} else {
						this.pressCount=0;
						this.vel.y = 0;
					}

					if (ig.input.pressed('jump') && !ig.input.state('right')) {

						this.gravityFactor = 1;
						this.pos.x -= 18;
						this.setBoundingBox('idle');
						this.vel.y = -200;
						this.vel.x = -40;
						this.isClimbingLeft = false;

						this.jumpSound.play();
					}
				} else if (this.isClimbingRight) {
					if (ig.input.state('up')) {
						this.pressCount++;
						this.vel.y = -60;
						if(this.pressCount%9==0)	this.climbSound.play();
					} else if (ig.input.state('down')) {
						this.pressCount++;
						this.vel.y = 60;
						if(this.pressCount%9==0)	this.climbSound.play();
					} else {
						this.vel.y = 0;
					}

					if (ig.input.pressed('jump') && !ig.input.state('left')) {

						this.gravityFactor = 1;
						//this.pos.x = 18;
						this.setBoundingBox('idle');
						this.vel.y = -200;
						this.vel.x = 40;
						this.isClimbingRight = false;

						this.jumpSound.play();
					}
				}

				//spawns a new hairball
				if (ig.input.pressed('shoot')) {
					
					this.shootHairball();

				}
				else if (ig.input.pressed('shoot') && ig.game.hairballs <= 0){
					//this.outOfHairballsSound.play();
				} 
				
				if (this.grasping){
					if(ig.input.released('left') || ig.input.released('right'))
						this.grasping = false;	
				}
			}

			//---------------------------------------------------------------

			//Figure out what Animation should be playing
			//Running
			if (this.vel.x != 0 && this.vel.y == 0 && this.standing == true) {
				if (this.boxType != 'run') {
					this.boxType = 'run';
					this.setBoundingBox(this.boxType);
				}
				this.currentAnim.angle = 0;
				if (ig.game.fatness) {
					this.currentAnim = this.anims.fatRun5;
				} else {
					this.currentAnim = this.anims.run;
				}
				//Idle
			} else if (this.vel.x == 0 && this.vel.y == 0) {
				this.currentAnim.angle = 0;
				if (ig.game.fatness) {
					this.currentAnim = this.anims.fatIdle;
				} else {
					this.currentAnim = this.anims.idle;
				}
				//In Air (Fat)
			} else if (ig.game.fatness) {
				this.currentAnim.angle = 0;
				if (this.grasping){
					this.currentAnim = this.anims.wallGrasp;
				}else{
					this.currentAnim = this.anims.fatJump;
				}
			}
			//In Air (thin)
			else if (this.plat == undefined){
				//Jumping
				if (!(this.isClimbingLeft || this.isClimbingRight) && this.vel.y < -150) {
					if (!this.flipped)
						this.currentAnim.angle = -1 * Math.PI / 6;
					else
						this.currentAnim.angle = Math.PI / 6;
					this.currentAnim = this.anims.jump;
					//Falling
				} else if (!(this.isClimbingLeft || this.isClimbingRight) && this.vel.y > 150) {
					if (!this.flipped)
						this.currentAnim.angle = Math.PI / 6;
					else
						this.currentAnim.angle = -1 * Math.PI / 6;
					this.currentAnim = this.anims.fall;
					//Mid-Jump
				} else if (!(this.isClimbingLeft || this.isClimbingRight) && this.vel.y < 150 || this.vel.x > -150) {
					this.currentAnim.angle = 0;
					this.currentAnim = this.anims.jump;

				}
			}

			if (this.isClimbingLeft || this.isClimbingRight) {
				if (this.vel.y == 0) {
					this.currentAnim.angle = 0;
					this.currentAnim = this.anims.idleClimbUp;
					if (this.isClimbingLeft && ig.input.state('left')) {
						this.currentAnim = this.anims.readyWallJump;
					} else if (this.isClimbingRight && ig.input.state('right')) {
						this.currentAnim = this.anims.readyWallJump;
					}

				} else {
					this.currentAnim.angle = 0;
					this.currentAnim = this.anims.climb;
				}

			}

			if (this.flipped == true) {
				this.currentAnim.flip.x = true;
			} else {
				this.currentAnim.flip.x = false;
			}

			//---------------------------------------------------

			if(this.plat != undefined && (this.pos.x < this.plat.x-this.size.x || this.pos.x > this.plat.x + 32) ){
				delete this.plat;
			}

			this.parent();
			if (!this.standing && this.plat != undefined){
				ig.game.player.standing = true;
				ig.game.player.vel.y = 0;
				this.pos.y = this.plat.y-this.size.y;
			}
		},
		

		eatMouse : function() {
			//eat the mouse
			if (ig.game.hairballs < this.capacity) {
				ig.game.hairballs++;
				this.eatSound.play();
			}
			ig.game.pHealth++;
		},
		
		shootHairball : function() {
			var xpos = this.pos.x - 3;
			if (!this.flipped){
				xpos += 20;
			}
			ig.game.spawnEntity(EntityHairball, xpos, this.pos.y, {flipped : this.flipped});
					// ig.game.hairballs--;
					// ig.game.pHealth--;
					
					this.shootSound.play();
		},
		
		wearPajamas : function() {
			
			//this.invulnerableTime = 600;
			this.invTimer = new ig.Timer(8);
			this.wearingPajamas = true;
			this.getPJsSound.play();
			
		},


		latchToLeftWall : function(wall) {
			if (!ig.game.fatness && !this.isClimbingLeft && !this.standing && ig.input.state('right')) {
				this.isClimbingLeft = true;
				this.flipped = false;

				this.vel.y = 0;
				this.size.x = 16;
				this.size.y = 29;
				this.offset.x = 27;
				this.offset.y = 12;
				this.pos.x = wall.pos.x - 11;
				this.vel.x = 100;
				this.gravityFactor = 0;
			}else if (ig.game.fatness && ig.input.state('right')){
				this.grasping = true;
			}
		},

		latchToRightWall : function(wall) {

			if (!ig.game.fatness && !this.isClimbingRight && !this.standing && ig.input.state('left')) {
				this.isClimbingRight = true;
				this.flipped = true;

				this.vel.y = 0;
				this.size.x = 16;
				this.size.y = 29;
				this.offset.x = 7;
				this.offset.y = 12;
				this.pos.x = wall.pos.x;
				this.vel.x = -100;
				this.gravityFactor = 0;

			}else if (ig.game.fatness && ig.input.state('left')){
				this.grasping = true;
			}
		},
		
		
		climbUpLeftWall : function(wall) {
			if (this.isClimbingLeft) {
				this.isClimbingLeft = false;
				this.currentAnim = this.anims.idle;
				this.pos.x += 0;
				this.pos.y = wall.pos.y - 17;
				this.vel.y = 0;
				this.setBoundingBox('idle');
				this.gravityFactor = 1;

			}
		},

		climbUpRightWall : function(wall) {
			if (this.isClimbingRight) {
				this.isClimbingRight = false;
				this.currentAnim = this.anims.idle;
				this.pos.x -= 15;
				this.pos.y = wall.pos.y - 17;
				this.vel.y = 0;
				this.setBoundingBox('idle');
				this.gravityFactor = 1;

			}
		},

		climbStop : function(wall) {
			if (this.isClimbingRight || this.isClimbingLeft) {
				this.vel.y = 0;
				this.pos.y = wall.pos.y + 4;
			}
		},

		takeDamage : function(val) {
			if (!this.invulnerable) {
				this.hurtSound.play();
				ig.game.pHealth -= val;
				this.invTimer = new ig.Timer(1.0);
				this.alphaDeltaTime = -0.5 + 0.1;
				this.controlTimer = new ig.Timer(0.5);
				
				if (ig.game.hairballs > 0)
				ig.game.spawnEntity(EntityLostHairball, this.pos.x, this.pos.y + 5, {flipped : this.flipped});
				ig.game.hairballs -= val;
				
				//this.controllable = false;
				if (this.vel.x != 0) {
					this.vel.x = -2 * this.vel.x;
					this.vel.y = -100;
					ig.log('hi');
				} else {
					ig.log('hi2');
					if (this.flipped)
						this.vel.x = 240;
					else
						this.vel.x = -240;
				}

			}
		},

		kill : function() {
			this.parent();
			this.deathSound.play();
			ig.game.pHealth = 1;
			ig.game.hairballs = 0;
			ig.game.fatness = false;
			ig.game.spawnEntity(EntityPlayerDeath, this.pos.x + 8, this.pos.y);
			// Reload this level

		},
		
		crawlSwitch: function(wall){
			if(ig.game.fatness){
				this.vel.x = 0;
				if(this.vel.x <= 0){
					this.pos.x = wall.pos.x + 4;
				}
				if(this.vel.x < 0){
					this.pos.x = wall.pos.x - this.size.x;
				}
			}
		},
		
		applyInvulnerability : function() {
			if(this.invTimer != null)
			{
				if(!this.hasPajamas && this.invTimer.delta() >= this.alphaDeltaTime)
				{
					this.alphaDeltaTime += 0.1;
					
					if(this.currentAnim.alpha == 1)
					{
						this.currentAnim.alpha = 0.5;
					}
					else
					{
						this.currentAnim.alpha = 1;
					}
				}
				
				if(this.invTimer.delta() < 0.0)
				{
					this.invulnerable = true;
				}
				else
				{
					if(this.wearingPajamas == true) {
						this.wearingPajamas = false;
						this.losePJsSound.play();
						
						}
					this.invulnerable = false;
					this.invTimer = null;
				}
			}else
				this.currentAnim.alpha = 1;
		},
		
		applyControllability : function() {
			if(this.controlTimer != null)
			{
				if(this.controlTimer.delta() < 0.0)
				{
					this.controllable = false;
				}
				else
				{
					this.controllable = true;
					this.controlTimer = null;
				}
			}
		},
		
		
		setBoundingBox : function(boxType) {
			if (boxType == 'idle') {
				this.size.x = 26;
				this.size.y = 16;
				this.offset.x = 12;
				this.offset.y = 34;
			} else if (boxType == 'run') {
				this.size.x = 26;
				this.size.y = 16;
				this.offset.x = 12;
				this.offset.y = 34;
			}
		}
	});

});
