ig.module(
	'game.entities.vacuumBag'
)
.requires(
	'impact.entity',
	
	'game.entities.enemyDeath'
)
.defines(function(){

EntityVacuumBag = ig.Entity.extend({
	size: {x: 36, y: 66},
	offset: {x:5, y: 15},
	
	pivot: {x: 0, y: 55},
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/vacuumBagSheet.png', 60, 80),

	
	//gravityFactor: .25,
	
	flipped: false,
	
	vacuumParent: null,

	zIndex: -5,
		
	init: function (x,y,settings){
		this.parent(x,y,settings);
		
		
		this.addAnim( 'damage134', 1, [0]);
		this.addAnim( 'damage234', 1, [1]);
		this.addAnim( 'damage334', 1, [2]);
		this.addAnim( 'damage1', 1, [3]);
		this.addAnim( 'damage2', 1, [4]);
		this.addAnim( 'damage3', 1, [5]);
		
		this.vacuumParent = settings.vp;
		this.name = settings.name;
		//this.zIndex = -5;
	},
	
	update: function(){
		if (this.currentAnim.flip.x == true){
			this.offset.x = 19;
		}else{
			if (this.currentAnim.angle == 0){
				this.offset.x = 5;
			}else{
				this.offset.x = -3;
			}
			
			
		}
		
		this.parent();				
	},
	
	check: function(other){
		other.takeDamage(1);
	},
	
	kill: function(){
		this.parent();
	},
	
	takeDamage: function(val){
		ig.game.vacuum.takeDamage(val);
	},
	
});

});
