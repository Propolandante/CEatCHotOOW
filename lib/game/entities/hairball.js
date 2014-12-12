ig.module(
	'game.entities.hairball'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityHairball = ig.Entity.extend({
	size: {x: 12, y: 10},
	
	offset: {x: 0, y: 1},
	
	maxVel: {x: 400, y: 0},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/hairball2.png', 12, 12),
	
	health: 1,
	
	gravityFactor: 0,
	
	flipped: false,

	startY: 42069666, // junk values
	endY: 42069666, // junk values
	
	enemyHitSound: new ig.Sound('media/sounds/enemyHitSound.*'),

	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		//if the cat is flipped the hairball will be too
		this.vel.x = (settings.flipped ? -this.maxVel.x : this.maxVel.x);
		
		this.flipped = settings.flipped;
		
		this.addAnim( 'shooting', 0.2, [0,1,2] );
		
		ig.game.hairball = this;
	},
	
	
	update: function(){
		
		if(this.vel.x == 0)
		{
			this.kill();
		}
		
		//if the cat is flipped the hairball will be too
		this.vel.x = (this.flipped ? -this.maxVel.x : this.maxVel.x);

		this.parent();
	},
	
	takeDamage: function(val){},
	
	check: function(other){
		// if (!(other instanceof EntityMouse) && !(other instanceof EntityFinalDoor)){
		if((other instanceof EntityBee) || (other instanceof EntityDustBunny) || (other instanceof EntitySuperDustBunny) 
			|| (other instanceof EntityDustCloud)|| (other instanceof EntityVacuum) || (other instanceof EntityVacuumBag))
		{
			this.enemyHitSound.play();
			other.takeDamage(1);
			this.kill();
		}
		//other.kill();
		//other.takeDamage(1);

	} 	
});
	
});