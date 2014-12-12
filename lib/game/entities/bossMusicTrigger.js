
ig.module(
	'game.entities.bossMusicTrigger'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBossMusicTrigger = ig.Entity.extend({
	size: {x: 32, y: 32},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,	
	
	init: function(x, y, settings ){
		this.parent(x,y,settings);
	},
	
	check: function( other ) {
		ig.log("bossMusicTrigger hit");
		// ig.music.next();
		ig.music.play('bossTheme');
		ig.music.loop=true;
		this.kill();
	},
	
	
});

});