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
	
	maxVel: {x: 0, y: 400},
	
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
		this.vel.y = this.maxVel.y;
		
		this.flipped = settings.flipped;
		
		this.addAnim( 'shooting', 0.2, [0,1,2] );
		
		ig.game.hairball = this;
	},
	
	
	update: function(){
		
		if(this.vel.y == 0)
		{
			this.kill();
		}
		
		//if the cat is flipped the hairball will be too
		//this.vel.x = (this.flipped ? -this.maxVel.x : this.maxVel.x);

		this.parent();
	},
	
	takeDamage: function(val){},
	
	check: function(other){
		// if (!(other instanceof EntityMouse) && !(other instanceof EntityFinalDoor)){
		if(other instanceof EntitySoil)
		{
			this.enemyHitSound.play();

			console.log("plant tree at " + this.pos.x + ", " + this.pos.y);

			ig.game.spawnEntity(EntitySapling, this.pos.x, (this.pos.y + this.size.y) - 16, 
			{});

			this.kill();
		}
		//other.kill();
		//other.takeDamage(1);

	} 	
});
	
});
