ig.module(
	'game.entities.crawlspace'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCrawlspace = ig.Entity.extend({
	size: {x: 4, y: 32},
	

	_wmDrawBox: true,
	_wmBoxColor: 'rgba(50, 50, 0, 0.7)',
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	
	check: function( other ){
		other.crawlSwitch(this);
	},

	update: function(){},
	
	kill: function(){}
});

}); // Derek commenting to test SourceTree/Git
