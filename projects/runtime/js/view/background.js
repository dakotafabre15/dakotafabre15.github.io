var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var spatula;
        var parallaxs = [];
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY, '#185494');
            background.addChild(backgroundFill);

            // TODO: 3 - Add a burger king and sneak king
            var sneakKing;
            for (var i = 0; i< 20; i++) {
                sneakKing = draw.bitmap('img/bk-logo.png');
                sneakKing.x = i * 100;
                sneakKing.y = groundY*Math.random() - 100;
                background.addChild(sneakKing);
            }
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
             //bk logos
            var parallax;
            for (var i=0; i<8; i++) {
                parallax = draw.bitmap('img/8ed.png');
                var parallaxHeight = 218;

                parallax.x = 225*i;
                parallax.y = groundY - parallaxHeight;
                background.addChild(parallax);
                parallaxs.push(parallax);
                console.log(parallax.x);
            } 
            
            // TODO 4: Part 1 - Add a tree
            spatula = draw.bitmap('img/GOLDEN-SPATULA.png');
            spatula.x = 0;
            spatula.y = 0;
            background.addChild(spatula);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            spatula.x = spatula.x - 1; 
            // TODO 4: Part 2 - Move the tree!
            if(spatula.x < -300) {
                spatula.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for(var i = 0; i<parallaxs.length; i++) {
                parallaxs[i].x = parallaxs[i].x - 1;
                if(parallaxs[i].x < -300){
                    parallaxs[i].x = canvasWidth;
                }
            }
            

        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
