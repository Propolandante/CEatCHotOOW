ig.module(
	'game.entities.mouseHole'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityMouseHole = ig.Entity.extend({
	size: {x: 18, y: 20},
	
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/mousehole.png', 18, 20),
	
	zIndex: -10,
	
	health: 5,

	gravityFactor: 0,
	
	flipped: false,
	
	range: 0,
	
	holeIndex: -1,
	hairballCount: 0,
	mouseCount: 0,
	circulation: 0,
	
	mouseDirection: "left",
	
	spawnTimer: null,
	mouseDelay: 1,


	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		this.addAnim( 'idle', 0.01, [0] );
		
		this.spawnTimer = new ig.Timer();
		
		ig.game.mouseHole = this;
	},
	
	
	update: function(){
		
		this.parent();
		
		//make sure holes are indexed properly. Normaly this would happen in init() but sometimes it fucks up
		if(this.holeIndex == -1)
		{
			var holes = ig.game.getEntitiesByType(EntityMouseHole);
			
			function compare(a,b) {
				if (a.pos.x < b.pos.x)
					return -1;
				if (a.pos.x > b.pos.x)
					return 1;
				return 0;
			}
			
			holes.sort(compare); // sort holes from left to right across level
			
			for(i = 0; i < holes.length; i++)
			{
				holes[i].holeIndex = i;
			}
			
		}
		
		var player = ig.game.getEntityByName( "cat" );
		var mice = ig.game.getEntitiesByType( EntityMouse );
		
			
		if (player)
		{
			this.hairballCount = ig.game.hairballs;
			this.mouseCount = 0;
			
			for(m = 0; m < mice.length; m++)
			{
				if(mice[m].owner == this.holeIndex)
				{
					this.mouseCount++;
				}
			}
			
			if(this.hairballCount + this.mouseCount < this.circulation)
			{
				if(this.spawnTimer.delta() > this.mouseDelay)
				{
					this.spawnMouse();
					this.spawnTimer.reset();
				}
			}
			
		}
		
	},
	
	spawnMouse: function(){
		
		if(this.mouseDirection == "left")
		{
			if(this.range > 0)
			{
				ig.game.spawnEntity( EntityMouse, this.pos.x, this.pos.y+5, {range:this.range, goingLeft:true, owner:this.holeIndex} );
			}
			else
			{
				ig.game.spawnEntity( EntityMouse, this.pos.x, this.pos.y+5, {goingLeft:true, owner:this.holeIndex} );
			}
			this.mouseDirection = "right";
		}
		else if (this.mouseDirection == "right")
		{
			if(this.range > 0)
			{
				ig.game.spawnEntity( EntityMouse, this.pos.x, this.pos.y+5, {range:this.range, goingLeft:false, owner:this.holeIndex} );
			}
			else
			{
				ig.game.spawnEntity( EntityMouse, this.pos.x, this.pos.y+5, {goingLeft:false, owner:this.holeIndex} );
			}
			this.mouseDirection = "left";
		}
		
	}
	
});
	
});
