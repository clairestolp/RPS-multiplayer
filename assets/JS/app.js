// Initialize Firebase
var config = {
    apiKey: "AIzaSyCwli5yohHEnwCtj1CjbFAoXMHUq7dSYLM",
    authDomain: "rps-multiplayer-6f33a.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-6f33a.firebaseio.com",
    projectId: "rps-multiplayer-6f33a",
    storageBucket: "",
    messagingSenderId: "91840069925"
};

firebase.initializeApp(config);

var rps = {
    user: undefined,
    choices: [
        '<i class="fas fa-question" data-choice="0"></i>', 
        '<i class="far fa-hand-rock" data-choice="1"></i>', 
        '<i class="far fa-hand-scissors" data-choice="2"></i>', 
        '<i class="far fa-hand-paper" data-choice="3"></i>',
        '<i class="fas fa-check" data-choice="4"></i>'
    ], 
    elements: {
        userDiv: $('<div>')
            .attr('id', 'userDiv')
            .addClass('player-div')
            .append(`<h3 class="text-center">${'username'}</h3>`),

        opponentDiv: $('<div>')
            .attr('id', 'opponentDiv')
            .addClass('player-div')
            .append(`<h3 class="text-center">${'opponentname'}</h3>`),
        
        userChoice: $('<div>').addClass('choice mb-4 d-inline-flex align-items-center justify-content-center'),

        opponentChoice: $('<div>').addClass('choice mb-4 d-inline-flex align-items-center justify-content-center'), 

        header: $('<h1>').addClass('mb-4 text-center'),

        nav: $('<nav>').addClass('navbar')
    }, 
    bot: function () {
        opponent.choice = Math.floor((Math.random() * 3) + 1);
        console.log(opponent.choice);
        setTimeout(function () {
            rps.elements.opponentChoice
                .empty()
                .append(rps.choices[4]);
        }, 3000);
    }

}

var database = firebase.database();
var $display = $('#display');
var connectionsRef = database.ref('/connections');
var connectedRef = database.ref('.info/connected');
var user, opponent;
var users;

//dev user and opponent DELETE FOR PRODUCTION

rps.user = {
    name: 'Claire',
    wins: 0,
    loses: 0, 
    ties: 0,
    choice: '',
    isPaired: false
}

opponent = {
    name: 'bot',
    wins: 0,
    loses: 0,
    ties: 0,
    choice: ''
}

/*
function loginScreen (){
    $display
    .empty()
    .addClass('d-flex justify-content-center align-items-center');

    var container = $('<form>').addClass('form-group');
    var input = $('<div>').addClass('input-group');
    var textInput = '<input type="text" id="username-input" class="form-control"></input>'
    var submit = '<button id="login" type="submit" class="btn btn-primary">Let\'s Play!</button>';
    
    input
        .append(textInput)
        .append(submit);
    
    container
        .append('<label>Enter your name to begin.</label>')
        .append(input);

        $display.append(container);
}

var userLogin = function() {
    $('#login').on('click', function () {
        event.preventDefault();

        rps.user = {
            name: $('#username-input').val().trim(),
            wins: 0,
            losses: 0,
            choice: '',
            isPaired: false
        };
    
        $display.empty();
    });
}
*/

    function appendNav (user) {
        var nav = rps.elements.nav;
        var list = $('<ul>').addClass('nav');
        var username = $('<li>').addClass('nav-item').text('Hi ' + user.name);
        var wins = $('<li>').addClass('nav-item');
        var loses = $('<li>').addClass('nav-item');
        var ties = $('<li>').addClass('nav-item');
        var logout = $('<button>').addClass('btn btn-light float-right').text("Logout").attr('id', 'logout');

        wins.attr('id', 'wins').text('Wins: ' + user.wins);
        loses.attr('id', 'loses').text('Loses: ' + user.loses);
        ties.attr('id', 'ties').text('Ties: ' + user.ties);

        list
            .append(username)
            .append(wins)
            .append(loses)
            .append(ties);
        
        nav
            .append(list)
            .append(logout);

        $display
            .append(nav);
    }

    //userResponse should be the index of the choices array that corresponds to the user's selection
    function battleScreen() {
        var elem = rps.elements;
        var rowA = $('<div>').addClass('row align-items-center mb-4')
        var col1a = $('<div>').addClass('col-md-5');
        var col2a = $('<div>').addClass('col-md-2 d-flex align-items-center justify-content-center');
        var col3a = $('<div>').addClass('col-md-5');
        var rowB = $('<div>').addClass('row align-items-center mb-3')
        var col1b = $('<div>').addClass('col-md-4 choice-btn').html(rps.choices[1]);
        var col2b = $('<div>').addClass('col-md-4 choice-btn').html(rps.choices[2]);
        var col3b = $('<div>').addClass('col-md-4 choice-btn').html(rps.choices[3]);
        var rowC = $('<div>').addClass('row justify-content-center');
        var col1c = $('<div>').addClass('col-md-4');
        var button = $('<button>').addClass('btn btn-dark mt-2').attr('id', 'userChoice').text('Janken POI!')
       
        rps.elements.header.text('Ready to Janken?');

        elem.userChoice
            .append(rps.choices[0]);
        elem.opponentChoice
            .append(rps.choices[0]);
        elem.userDiv
            .addClass('d-flex flex-column align-items-center justify-content-center')
            .append(elem.userChoice);
        elem.opponentDiv
            .addClass('d-flex flex-column align-items-center justify-content-center')
            .append(elem.opponentChoice);

        col1a.append(elem.userDiv);
        col2a.append($('<h1>').text('VS').addClass('text-center'));
        col3a.append(elem.opponentDiv)
            
        rowA
            .append(col1a)
            .append(col2a)
            .append(col3a);

        rowB    
            .append(col1b)
            .append(col2b)
            .append(col3b);

        col1c.append(button);

        rowC
            .append(col1c);
        
        $display
            .append($(rps.elements.header))
            .append(rowA)
            .append(rowB)
            .append(rowC);
    }


//console.log(users);
//loginScreen();
//userLogin();
appendNav(rps.user);
battleScreen(0, 0);
rps.bot();

$('.choice-btn > i').on('click', function (){
    user.choice = $(this).attr('data-choice');
    console.log(user);
    var index = parseInt(user.choice)
    rps.elements.userChoice
        .empty()
        .append(rps.choices[index]);
});

$('#userChoice').on('click', function () {
    //update database w/ user choice
    
});





