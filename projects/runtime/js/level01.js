var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -1,
            gameItems: [
                {type: 'sawblade',x:400,y:125},
                {type: 'sawblade',x:800,y:20},
                {type: 'sawblade',x:1200,y:125},
                {type: 'sawblade',x:1800,y:20},
                {type: 'enemy',x:2500,y:125},
                {type: 'reward',x:2900,y:20}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        var createSawBlade = function(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = groundY - y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/musty-mustard.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        };
        
         
        function createEnemy(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/foot.png');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = groundY-y;   
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                enemy.fadeOut();
                
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                enemy.shrink();
            };
        };
        createEnemy(400, 50);
        createEnemy(800, 50);
        createEnemy(1200, 50);
        
        function createReward(x,y) {
            var reward =  game.createGameItem('reward',25);
            var footLettuce = draw.bitmap('img/burgerkingfootlettuce.png');
            footLettuce.x = -25;
            footLettuce.y = -25;
            reward.addChild(footLettuce);
            reward.x = x;
            reward.y = groundY-y;   
            game.addGameItem(reward);
            reward.velocityX = -1;
            reward.onPlayerCollision = function() {
                game.increaseScore(10);
                reward.fadeOut();
                
            };
        }
        createReward(600, 100)
    
    
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var sawblade;
            sawblade = levelData.gameItems[i];
            createSawBlade(sawblade.x, sawblade.y);
        }
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}