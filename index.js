var btn = ["#green","#red","#yellow","#blue"];
var seq = [];
var game = false;
var i = 0;
var level = 0;
$(document).keydown(function() {
    if (!game) {
        $("#level-title").text("Level " + level);
        startgame();
    }
});

function startgame() {
    game = true;
    i = 0;
    nextsequence();
}

function nextsequence() {
    level++;    
    $("#level-title").text("Level " + level);
    var ind = Math.floor(Math.random() * 4);
    seq.push(btn[ind]);
    console.log("Sequence:", seq);
    $(btn[ind]).fadeIn(100).fadeOut(100).fadeIn(100);
    i = 0;
}

$(document).click(function(event) {
    if (!game) return;
    var val = "#" + $(event.target).attr('id');
    $(val).addClass('pressed');
    setTimeout(function() {
        $(val).removeClass('pressed');
    },100);
    console.log("Clicked:", val);
    console.log("Expected:", seq[i]);

    if (val === seq[i]) {
        makesound(btn.indexOf(seq[i]));
        i++;
        if (i === seq.length) {
            setTimeout(nextsequence, 1000);
        }
    } else {
        var snd = new Audio("./sounds/wrong.mp3");
        $('body').addClass('game-over');
        $("#level-title").text("Game Over Press any key to restart");
        snd.play();
        game = false;
        game_restart();

    }
});

function makesound(x) {
    var sounds = ["./sounds/green.mp3", "./sounds/red.mp3", "./sounds/yellow.mp3", "./sounds/blue.mp3"];
    var snd = new Audio(sounds[x]);
    snd.play();
}
function game_restart() {
    setTimeout(function() {
        $('body').removeClass('game-over');}
    , 300);
    seq = [];
    level = 0;
}