
var gamePattern = [];
var useClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var startCount = 0;
var level = 0;

$("body").on("keydown", function(){
    if (startCount === 0){
        nextSequence();
    }
})


$(".btn").on("click", function(){
    var userChosenColour = this.id;
    useClickedPattern.push(userChosenColour);
    // console.log(useClickedPattern);
    animatePress(userChosenColour);
    playSound(this.id);
    checkAnswer(useClickedPattern.length-1);
});



function playSound(key){
    tom = new Audio("./sounds/" + key + ".mp3");
    tom.play();
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    $("h1").text("Level " + level);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log(randomChosenColour);


    playSound(randomChosenColour);

    level++;

};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(useClickedPattern);
    if (gamePattern[currentLevel] === useClickedPattern[currentLevel]){
        
        //console.log("curr " + currentLevel + " level " + level);

        if (currentLevel === gamePattern.length-1){
            console.log("success");
            setTimeout(function(){
                nextSequence();
            }, 1000);
            useClickedPattern = [];
        }

                
    }
    else{
        console.log("wrong");
        var wrongAnswer = new Audio("./sounds/wrong.mp3");
        wrongAnswer.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press any key to restart");

        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    useClickedPattern = [];
    startCount = 0;
}



