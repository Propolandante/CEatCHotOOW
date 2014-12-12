ig.module('game.main'
)
.requires(
	'impact.game', 
	'impact.font',
	//'impact.debug.debug',

	'plugins.camera', 
	'game.entities.player', 
	'game.entities.bee', 
	'game.entities.mouse', 
	'game.entities.beeFree', 
	
	'game.entities.cameraFocus', 
	
	'game.entities.climbableWallLeft', 
	'game.entities.climbableWallRight', 
	'game.entities.climbUpLeftWall', 
	'game.entities.climbUpRightWall', 
	'game.entities.trigger', 
	'game.entities.levelchange', 
	'game.entities.bossMusicTrigger', 
	
	'game.entities.blackMatte', 
	'game.entities.fadeToBlack'
	, 
	'game.levels.Intro', 
	'game.levels.Attic1', 
	'game.levels.Attic2', 
	'game.levels.Attic3', 
	'game.levels.Attic4', 
	'game.levels.Attic5', 
	'game.levels.Attic6', 
	'game.levels.Attic7', 
	'game.levels.Attic8', 
	'game.levels.Attic9', 
	'game.levels.Attic11', 
	'game.levels.Attic12', 
	'game.levels.Attic13', 
	'game.levels.Attic14', 
	'game.levels.Attic15', 
	'game.levels.Attic16', 
	'game.levels.Attic17', 
	'game.levels.LivingRoom1', 
	'game.levels.LivingRoom2', 
	'game.levels.LivingRoom3', 
	'game.levels.LivingRoom4', 
	'game.levels.StartScreen', 
	'game.levels.OptionScreen', 
	'game.levels.CreditsScreen',
	'game.levels.End',
	'game.levels.Blume1'
)
.defines(function() {

	MyGame = ig.Game.extend({

		// Load a font
		font : new ig.Font('media/04b03.font.png'),
		gravity : 800,
		defaultVolume : 0.3,
		currentVolume : this.defaultVolume,
		levelName : 'LevelBlume1',
		fatness : false,
		hairballs : 0,
		pHealth : 1,
		// px: 0,
		// py: 0,
		// psettings: {},

		theme : new ig.Sound('media/sounds/catEscapeFinal.*'),
		bossIntro : new ig.Sound('media/sounds/cant escape intro.*'),
		bossTheme : new ig.Sound('media/sounds/cant escape main.*'),
		introMusic : new ig.Sound('media/sounds/intro.*'),
		outroMusic : new ig.Sound('media/sounds/outro.*'),

		init : function() {
			// Initialize your game here; bind keys etc.
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.X, 'jump');
			ig.input.bind(ig.KEY.Z, 'shoot');
			ig.input.bind(ig.KEY.M, 'mute');
			ig.input.bind(ig.KEY.PLUS, 'nextLevel');
			ig.input.bind(ig.KEY.MINUS, 'prevLevel');

			// ig.soundManager.volume = 0.1;

			ig.music.add(this.theme, 'theme');
			ig.music.add(this.bossIntro, 'bossIntro');
			ig.music.add(this.bossTheme, 'bossTheme');
			ig.music.add(this.outroMusic, 'outro');

			ig.music.volume = this.defaultVolume;
			ig.music.play('theme');
			ig.music.loop = true;

			//ig.global.currentLevel = 'Attic1';

			this.loadLevel(LevelBlume1);

			//this.loadLevel( ig.global['Level'+ ig.global.currentLevel] );

		},

		loadLevel : function(data) {
			this.currentLevel = data;
			// this.px = px;
			// this.py = py;

			this.parent(data);
			//this.player = ig.game.spawnEntity( EntityPlayer, px, py, {flipped:this.flipped} );
			this.setupCamera();
		},

		loadLevelDeferred : function(data, levelName) {
			ig.log("loadLevelDeferred called");

			this._levelToLoad = data;
			this.levelName = levelName;
			// this.px = px;
			// this.py = py;
			// this.psettings = psettings;

		},

		reloadLevel : function() {
			this.loadLevelDeferred(this.currentLevel, this.levelName);
		},

		setupCamera : function() {
			this.camera = new ig.Camera(ig.system.width / 3, ig.system.height / 3, 3);
			this.camera.trap.size.x = ig.system.width / 10;
			this.camera.trap.size.y = ig.system.height / 3;

			this.camera.lookAhead.x = ig.system.width / 6;

			this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
			this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
			this.camera.set(this.player);
		},

		update : function() {
			// Update all entities and backgroundMaps
			if (this._levelToLoad) {
				this.loadLevel(this._levelToLoad);
				this._levelToLoad = null;
			}
			this.parent();
			this.camera.follow(this.player);

			//Audio control
			if (ig.input.pressed('mute')) {
				if (ig.Sound.enabled == true)// if not muted
				{
					ig.Sound.enabled = false;
					// mute future sounds
					ig.music.volume = 0.0;
					// mute ongoing music
					ig.soundManager.volume = 0;
				} else// if already muted
				{
					ig.Sound.enabled = true;
					// unmute future sounds
					ig.music.volume = this.defaultVolume;
					// unmute ongoing music
					ig.soundManager.volume = .2;
				}
			}

			if (ig.music.currentIndex === 2) {
				ig.music.loop = true;
			}
			// if(ig.input.pressed('nextLevel')){
			//
			//
			//
			// var num = this.levelName.match(/\d+/g);
			// num++;
			// this.levelName = "LevelAttic".concat(num);
			// ig.game.loadLevelDeferred( ig.global["LevelAttic".concat(num)], this.levelName);
			// }
			// if(ig.input.pressed('prevLevel')){
			// var num = this.levelName.match(/\d+/g);
			// num--;
			// this.levelName = "LevelAttic".concat(num);
			// ig.game.loadLevelDeferred( ig.global["LevelAttic".concat(num)], this.levelName);
			// }

			// // Add your own, additional update code here
		},

		draw : function() {
			// Draw all entities and backgroundMaps
			this.parent();
			var bh = ig.game.getEntityByName('beehive');
			// if(bh)
			// {
			// if(bh.fallTimer)
			// {
			// this.font.draw( 'timer: ' + bh.fallTimer.delta(), 50, 50 );
			// }
			//
			// this.font.draw( 'triggered: ' + bh.triggered, 50, 40 );
			// this.font.draw( 'gravity: ' + bh.gravityFactor, 50, 30 );
			// this.font.draw( 'beeCount: ' + bh.beeCount, 50, 60 );
			// }
			// this.font.draw( 'HBs: ' + this.hairballs, 50, 70 );
			//this.font.draw( 'fatness: ' + this.fatness, 50, 40 );
			//this.font.draw( 'coord: (' + this.health + ", " + this.player.pos.y + ")", 50, 50 );
			// this.font.draw( 'debugTag: ' + this.levelName, 50, 70 );
			// this.font.draw( 'px: ' + this.px, 50, 60 );
			// this.font.draw( 'py: ' + this.py, 50, 80 );

		}
	});

	StartScreen = ig.Game.extend({
		instructText : new ig.Font('media/04b03.font.png'),
		titleText : new ig.Font('media/8bitoperator.png'),
		background : new ig.Image('media/startBackground.png'),
		intro : new ig.Sound('media/sounds/intro.*'),
		defaultVolume: 0.3,
		
		init : function() {
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.X, 'select');
			ig.input.bind(ig.KEY.Z, 'select');
			ig.input.bind(ig.KEY.ENTER, 'select');
			ig.input.bind(ig.KEY.M, 'mute');

			ig.soundManager.volume = 0.2;
			ig.music.add(this.intro, 'intro');
			//
			ig.music.volume = this.defaultVolume;
			ig.music.play('intro');
			ig.music.loop = true;
			//
			this.loadLevel(LevelStartScreen);
		},
		update : function() {
			if (ig.input.pressed('select') && (ig.game.getEntityByName('cursor').option === 1)) {
				ig.system.setGame(IntroScene);
			// } else if (ig.input.pressed('select') && (ig.game.getEntityByName('cursor').option === 2)) {
				// ig.system.setGame(OptionScreen);
			} else if (ig.input.pressed('select') && (ig.game.getEntityByName('cursor').option === 2 )) {
				ig.system.setGame(CreditsScreen);
			}

			if (ig.input.pressed('mute')) {
				if (ig.Sound.enabled == true)// if not muted
				{
					//ig.Sound.enabled = false; // mute future sounds
					ig.music.volume = 0.0;
					// mute ongoing music
					//ig.soundManager.volume = 0;
				} else// if already muted
				{
					//ig.Sound.enabled = true; // unmute future sounds
					ig.music.volume = this.defaultVolume;
					// unmute ongoing music
					//ig.soundManager.volume = 0.1;
				}
			}
			this.parent();
		},
		draw : function() {
			this.background.draw(0, 0);
			this.parent();

			var x = ig.system.width/2, // 608/2 = 304
			y = ig.system.height - 10;
			// 256 - 10 = 246
			this.titleText.draw('Cat Escape: Meow or Never', x, y - 200, ig.Font.ALIGN.CENTER);
			this.instructText.draw('Start', x, y - 108, ig.Font.ALIGN.CENTER);
			//y: 138
			//this.instructText.draw('Controls', x, y - 72, ig.Font.ALIGN.CENTER);
			//y: 174
			this.instructText.draw('Credits', x, y - 72, ig.Font.ALIGN.CENTER);
			//x: 344 y: 210
		}
	});

	OptionScreen = ig.Game.extend({
		instructText : new ig.Font('media/04b03.font.png'),
		background : new ig.Image('media/startBackground.png'),
		init : function() {
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.X, 'select');
			ig.input.bind(ig.KEY.Z, 'select');
			ig.input.bind(ig.KEY.ENTER, 'select');

			this.loadLevel(LevelOptionScreen);
		},
		update : function() {
			if (ig.input.pressed('select') && (ig.game.getEntityByName('cursor').option === 1)) {
				//ig.system.setGame(MyGame);
			} else if (ig.input.pressed('select') && (ig.game.getEntityByName('cursor').option === 2)) {
				//ig.system.setGame(MyGame);
			} else if (ig.input.pressed('select') && (ig.game.getEntityByName('cursor').option === 3 )) {
				ig.system.setGame(StartScreen);
			}
			this.parent();
		},
		draw : function() {
			this.background.draw(0, 0);
			this.parent();

			var x = ig.system.width / 2, // 608/2 = 304
			y = ig.system.height - 10;
			// 256 - 10 = 246
			this.instructText.draw('Music', x, y - 108, ig.Font.ALIGN.CENTER);
			//y: 138
			this.instructText.draw('Sound Effects', x, y - 72, ig.Font.ALIGN.CENTER);
			//y: 174
			this.instructText.draw('Back to Main Menu', x, y - 36, ig.Font.ALIGN.CENTER);
			//x: 344 y: 210
		}
	});
	
	CreditsScreen = ig.Game.extend({
		instructText : new ig.Font('media/04b03.font.png'),
		creditsText : new ig.Font('media/creditsText.png'),
		background : new ig.Image('media/startBackground.png'),
		init : function() {
			//ig.input.bind(ig.KEY.UP_ARROW, 'up');
			//ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			//ig.input.bind(ig.KEY.X, 'select');
			//ig.input.bind(ig.KEY.Z, 'select');
			ig.input.bind(ig.KEY.ENTER, 'back');

			this.loadLevel(LevelCreditsScreen);
		},
		update : function() {
			if (ig.input.pressed('back') ) {
				ig.system.setGame(StartScreen);
			}
			this.parent();
		},
		draw : function() {
			this.background.draw(0, 0);
			this.parent();

			var x = ig.system.width, // 608/2 = 304
			y = ig.system.height - 10;
			// 256 - 10 = 246
			this.creditsText.draw('Derek Donahue', x - 600, y - 200, ig.Font.ALIGN.LEFT);
			//y: 138
			this.creditsText.draw('Joe Rossi', x - 600, y - 164, ig.Font.ALIGN.LEFT);
			this.creditsText.draw('Brittany West', x - 600, y - 128, ig.Font.ALIGN.LEFT);
			this.creditsText.draw('Joe Wise', x - 600, y - 92, ig.Font.ALIGN.LEFT);
			//y: 174
			this.instructText.draw('Press Enter for Main Menu', (x/2), y - 36, ig.Font.ALIGN.CENTER);
			//x: 344 y: 210
		}
	});

	IntroScene = ig.Game.extend({

		// Load a font
		font : new ig.Font('media/04b03.font.png'),

		//Load Mattes
		bottomM : new ig.Image('media/gMatteBottom.png'),
		topM : new ig.Image('media/gMatteTop.png'),
		leftM : new ig.Image('media/gMatteLeft.png'),
		rightM : new ig.Image('media/gMatteRight.png'),
		those : new ig.Image('media/newThose.png'),
		introTitle: new ig.Image('media/introTitle.png'),
		// nightTint: new ig.Image( 'media/nightTint.png'),

		//Relevant Matte coordnates
		bMy : 36,
		tMy : -45,
		rMx : 110,
		lMx : -90,
		alpha : 1,

		fadeCalled: false,

		defaultVolume : 0.3,
		currentVolume : this.defaultVolume,
		levelName : 'LevelIntro',

		init : function() {
			// Initialize your game here; bind keys etc.
			//ig.input.bind( ig.KEY.LEFT_ARROW, 'left');

			ig.input.bind(ig.KEY.X, 'select');
			ig.input.bind(ig.KEY.Z, 'select');
			ig.input.bind(ig.KEY.M, 'mute');
			ig.input.bind(ig.KEY.ENTER, 'select');

			ig.soundManager.volume = 0.2;
			//ig.music.fadeOut(18);

			this.loadLevel(LevelIntro);

		},

		loadLevel : function(data) {
			this.currentLevel = data;
			// this.px = px;
			// this.py = py;

			this.parent(data);
			//this.player = ig.game.spawnEntity( EntityPlayer, px, py, {flipped:this.flipped} );
			this.setupCamera();
		},

		// loadLevelDeferred: function(data, levelName){
		// this._levelToLoad = data;
		// this.levelName = levelName;
		// // this.px = px;
		// // this.py = py;
		// // this.psettings = psettings;
		//
		// },

		// reloadLevel: function() {
		// this.loadLevelDeferred( this.currentLevel, this.levelName );
		// },

		setupCamera : function() {
			this.camera = new ig.Camera(ig.system.width / 3, ig.system.height / 3, 3);
			this.camera.trap.size.x = ig.system.width / 10;
			this.camera.trap.size.y = ig.system.height / 3;

			this.camera.lookAhead.x = ig.system.width / 6;

			this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
			this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
			this.camera.set(this.cf);
		},

		update : function() {
			// Update all entities and backgroundMaps
			// if( this._levelToLoad ) {
			// this.loadLevel( this._levelToLoad);
			// this._levelToLoad = null;
			// }
			if (this.fadeCalled == false){
				if (ig.input.pressed('select')) {
					ig.game.spawnEntity(EntityFadeToBlack, this.camera.pos.x, this.camera.pos.y, {
						time : 2,
						target : MyGame
					});
					ig.music.fadeOut(1.5);
					this.fadeCalled = true;
	
				}
				if (this.cf.pos.x <= 200) {
					ig.game.spawnEntity(EntityFadeToBlack, this.camera.pos.x, this.camera.pos.y, {time : 3,target : MyGame});
					ig.music.fadeOut(2.5);
					this.fadeCalled = true;
				}
			}


			this.parent();
			this.camera.follow(this.cf);

			// this.nightTint.alpha -= 0.005;

			//Audio control
			if (ig.input.pressed('mute')) {
				if (ig.Sound.enabled == true)// if not muted
				{
					//ig.Sound.enabled = false; // mute future sounds
					ig.music.volume = 0.0;
					// mute ongoing music
					//ig.soundManager.volume = 0;
				} else// if already muted
				{
					//ig.Sound.enabled = true; // unmute future sounds
					ig.music.volume = this.defaultVolume;
					// unmute ongoing music
					//ig.soundManager.volume = 0.1;
				}
			}

			if (this.bMy < 64)
				this.bMy++;
			if (this.tMy > -165)
				this.tMy--;
			this.lMx--;
			this.rMx++;
			this.cf.pos.x--;
			
			


		},

		draw : function() {
			// Draw all entities and backgroundMaps
			this.parent();
			// if( this.nightTint.alpha != 1) {
			// ig.system.context.globalAlpha = this.alpha;
			// this.font.draw( 'py: ' + this.nightTint.alpha, 50, 80 );
			// }
			// if(this.nightTint.alpha > 0){
			// this.nightTint.draw(0,0);
			// }
			// if( this.nightTint.alpha != 1) {
			// ig.system.context.globalAlpha = 1;
			// }
			
			this.bottomM.draw(0, this.bMy);
			
			if(this.camera.pos.x < 515 && this.camera.pos.x > 330)
				this.those.draw(0, 0);
				
			if(this.camera.pos.x < 250)
				this.introTitle.draw(0,0);
			this.topM.draw(0, this.tMy);
			
			this.leftM.draw(this.lMx, 0);
			this.rightM.draw(this.rMx, 0);
			
		

			
			//this.font.draw( 'alpha: ' + this.ftb.currentAnim.alpha, 50, 40 );
			//this.font.draw( 'time: ' + this.ftb.time, 50, 30 );
			//this.font.draw( 'timer: ' + this.timer.delta(), 50, 60 );
			// }
			//this.font.draw( 'cam: ' + this.camera.pos.x, 50, 70 );
			//this.font.draw( 'fatness: ' + this.fatness, 50, 40 );
			//this.font.draw( 'coord: (' + this.health + ", " + this.player.pos.y + ")", 50, 50 );
			// this.font.draw( 'debugTag: ' + this.levelName, 50, 70 );
			// this.font.draw( 'px: ' + this.px, 50, 60 );
			// this.font.draw( 'py: ' + this.py, 50, 80 );


		}
	});

	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main('#canvas', StartScreen, 60, 608, 256, 2);

});
