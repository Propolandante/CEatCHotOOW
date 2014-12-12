/*
This entity calls ig.game.loadLevel() when its triggeredBy() method is called -
usually through an EntityTrigger entity.


Keys for Weltmeister:

level
	Name of the level to load. E.g. "LevelTest1" or just "test1" will load the 
	'LevelTest1' level.
*/

ig.module(
	'game.entities.levelchange'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityLevelchange = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
	
	size: {x: 32, y: 32},
	level: null,
	px: 64,
	
	triggeredBy: function( entity, trigger ) {
		if( this.level ) {
			ig.global.currentLevel = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
				return a.toUpperCase() + b;
			});
			var levelName = 'Level'+ ig.global.currentLevel;
			
			ig.game.loadLevelDeferred( ig.global['Level'+ ig.global.currentLevel], levelName);

		}
	},
	
	update: function(){
		
		if(this.name == 'exit')
		{
			if(ig.input.pressed('nextLevel')){
				
				if( this.level ) {
					ig.global.currentLevel = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
						return a.toUpperCase() + b;
					});
					var levelName = 'Level'+ ig.global.currentLevel;
					
					ig.game.loadLevelDeferred( ig.global['Level'+ ig.global.currentLevel], levelName);

				}
			}
		}
		
		if(this.name == 'back')
		{
			if(ig.input.pressed('prevLevel')){
				
				if( this.level ) {
					ig.global.currentLevel = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
						return a.toUpperCase() + b;
					});
					var levelName = 'Level'+ ig.global.currentLevel;
					
					ig.game.loadLevelDeferred( ig.global['Level'+ ig.global.currentLevel], levelName);

				}
			}
		}
		
	}
});

});