ig.module(
	'game.entities.waterParticle'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityWaterParticle = ig.Entity.extend({
	size: {x: 2, y: 3},
	startY: 0,
	end: 32,
	endTime: 0.45,
	killTime: null,
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.BOTH,
	collides: ig.Entity.COLLIDES.LITE,

	animSheet: new ig.AnimationSheet( 'media/waterparticles.png', 2, 3),
	
	
	
	
	gravityFactor: 1,
	


	init: function (x,y,settings){
		this.parent(x,y,settings);
		this.startY = this.pos.y;
		this.end = this.pos.y + settings.end;
		this.endTime = settings.endTime;
		this.vel.x = 5*(Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
		this.vel.y = 100;
		this.killTimer = new ig.Timer(this.endTime);

		this.addAnim('dark', 1, [0]);
		this.addAnim('light', 1, [1]);
		
		if (settings.color === 'light'){
			this.currentAnim = this.anims.light;
		}

	},
	
	
	update: function(){
		

		//if (this.pos.y >= this.startY + this.end){
		if (this.killTimer.delta() >= 0 || this.pos.y >= this.end || this.vel.y ===0){
			this.kill();
		}
		
		this.parent();
		
	
	},
	
	check: function(other){
		//other.takeDamage(1);

		if (other instanceof EntitySapling)
		{
			other.consumeWater();

			console.log("watering");
			this.kill();
		}
	} 	
});
	
});