$(document).ready(function () {

    game_area= $(".game_area"); // set selector. so you can change it just here.
    seconds_remaining= 15;
    questions_remaining = 5;
    lag = 4;

    current_stage = 0;  // 0= first screen, 1= choose category screen, 2= quiz screen, 3=wait screen, 4=results
    current_category = -1; // set
    current_question_id = -1;
    correct_answers=0;
    incorrect_answers=0;
    unanswered=0;
    last_questions = [];

    questions=[
        {
            category_id: 0,
            text: 'These movie stars were all born in which year?',
            text_additional: 'Errol Flynn, James Mason and Ethel Merman',
            img: '',
            answers: [
                '1904',
                '1919',
                '1909',
                '1914',
            ],
            answer_description: '',
            right_anwer_id: 2,
        },
        {
            category_id: 0,
            text: 'This is a short plot summary of which Disney or Pixar Animation movie?',
            text_additional: 'Two mice encounter the world\'s largest diamond while trying to find an abducted orphan girl',
            img: '',
            answers: [
                'The Incredibles',
                'The Rescuers',
                'Lilo and Stitch',
                'Brave',
            ],
            answer_description: '',
            right_anwer_id: 1,
        },
        {
            category_id: 0,
            text: '',
            text_additional: 'Which of these is the co-writer and co-producer of the three Back to the Future films (1985-1990)?',
            img: '',
            answers: [
                'Bob Gale',
                'Crispin Glover',
                'Dean Cundey',
                'Jeffrey Weissman',
            ],
            answer_description: '',
            right_anwer_id: 0,
        },
        {
            category_id: 0,
            text: '',
            text_additional: 'Which of these actresses was not born in the USA but in Argentina?',
            img: '',
            answers: [
                'Berenice Bejo',
                'Penelope Ann Miller',
                'Shannyn Sossamon',
                'Missi Pyle',
            ],
            answer_description: '',
            right_anwer_id: 0,
        },
        {
            category_id: 0,
            text: 'Which of these artists is/are portrayed in this music biopic?',
            text_additional: 'Amadeus (Tom Hulce 1984)',
            img: '',
            answers: [
                'Mozart',
                'Beethoven',
                'Haydn',
                'Schubert',
            ],
            answer_description: '',
            right_anwer_id: 0,
        },
        {
            category_id: 0,
            text: '',
            text_additional: 'Which of these actors was not born in the USA but in Austria-Hungary (Slovakia)?',
            img: '',
            answers: [
                'James Cagney',
                'Peter Lorre',
                'Humprey Bogart',
                'Vincent Price',
            ],
            answer_description: '',
            right_anwer_id: 1,
        },





        {
            category_id: 1,
            text: 'Which of the following did Charles Dickens write?',
            text_additional: '',
            img: '',
            answers: [
                'Realms of Glory',
                'A Christmas Song',
                'A Christmas Carol',
                'Away in the Manger',
            ],
            answer_description: 'The full title of the original book is: "A Christmas Carol in Prose, Being a Ghost Story of Christmas" and was first published December 19, 1843.',
            right_anwer_id: 2,
        },
        {
            category_id: 1,
            text: 'In the animated TV special, "\'Twas the Night Before Christmas", the townsfolk create a song to attract Santa back. According to the song, what is calling Santa?',
            text_additional: '',
            img: '',
            answers: [
                'Comet and Cupid',
                'Calling birds',
                'Christmas bells',
                'Chimneys asunder',
            ],
            answer_description: 'Christmas bells are calling. Santa. Santa. We need you today',
            right_anwer_id: 2,
        },
        {
            category_id: 1,
            text: 'How do you say "Merry Christmas" in Spanish?',
            text_additional: '',
            img: '',
            answers: [
                'Fuego y Feliciano',
                'Felipe Nochos',
                'Feliz Navidad',
                'Feliz Nativity',
            ],
            answer_description: 'While many artists have versions of song, the original by Jose Feliciano is one of the most downloaded and played Christmas songs in the U.S.',
            right_anwer_id: 2,
        },
        {
            category_id: 1,
            text: 'This ballet production is a seasonal favorite. What is its title?\n',
            text_additional: '',
            img: '',
            answers: [
                'Neux',
                'Nativity',
                'Nunsensations',
                'Nutcracker',
            ],
            answer_description: '"The Nutcracker" is by Peter Ilyich Tchaikovsky, composed in 1891-92. It was based on "The Nutcracker and the Mouse King," a story by E.T.A. Hoffmann (1816).',
            right_anwer_id: 3,
        },
        {
            category_id: 1,
            text: 'Which of these is NOT a Christmas carol?',
            text_additional: '',
            img: '',
            answers: [
                'O Christmas Tree',
                'O Little Town of Bethlehem',
                'Oh Holy Night',
                'O Little Town of Glory',
            ],
            answer_description: '',
            right_anwer_id: 3,
        },
    ];

    // categories of questions
    categories =[
        {
            title: 'Movie',
            icon: 'iconmonstr-video-8.svg',  // free .svg icon from iconmonstr.com
            background: '2.jpg',
        },
        {
            title: 'Christmas',
            icon: 'iconmonstr-christmas-27.svg',
            background: '1.jpg',
        }
    ];
    mixed_category={
        id: 'any',
        title: 'Random',
        icon: 'iconmonstr-help-6.svg',
    };

    // Click play
    $('body').on('click','.playbtn',function () {
        play();
    });
    $("body").on('click','#restartBTN',function () {
        play();
    });

    // Click category
    $('body').on('click','.category',function(){
        var id = $(this).attr('attr-id');
        chooseCategory(id);
    });

    // Click answer
    $('body').on('click','.answer',function(){
        var id = $(this).attr('attr-id');
        checkAnswer(id);
    });


    // Keybord
    $('body').keydown(function(e) {
        console.log(e.keyCode);
        if (e.ctrlKey && e.keyCode == 13) {
            // Ctrl + Enter for start
            if(current_stage==0){
                play();
            }
        }
        if (e.keyCode == 49) {
            checkAnswer(0);
        }
        if (e.keyCode == 50) {
            checkAnswer(1);
        }
        if (e.keyCode == 51) {
            checkAnswer(2);
        }
        if (e.keyCode == 52) {
            checkAnswer(3);
        }
    });


    init();
});

function init(){
    game_area.html('<div class="container"><div class="row"><div class="col-12 text-center">There are will be '+questions_remaining+' questions. You can use Ctrl+Enter to start and 1/2/3/4 buttons to chose answer.<br/>Good luck!</div></div><div class="row"><div class="col-md-6 offset-md-3"><div class="playbtn" >Play</div></div></div></div>');
    current_stage = 0;
    current_category = -1; // set
    current_question_id = -1;
    correct_answers=0;
    incorrect_answers=0;
    unanswered=0;
    last_questions = [];
}


function play(){

    $('#game_over_modal').modal('hide');

    var html='' ;

    html+='<div class="container">';
    html+='<h2>Select a category:</h2>';
    html+='<div class="row">';
    for(var i=0; i < categories.length; i++){
        //console.log(categories[i]);
        html+='<div class="col-md-4 text-center">'+
            '<div class="category" attr-id="'+i+'">'+
            '<div class="cat_title">'+categories[i].title+'</div>'+
            '<div class="cat_img"><img src="./assets/images/icons/'+categories[i].icon+'" /></div>'+
            '</div>'+
            '</div>';
    }
    html+='<div class="col-md-4 text-center">'+
        '<div class="category" attr-id="'+mixed_category.id+'">'+
        '<div class="cat_title">'+mixed_category.title+'</div>'+
        '<div class="cat_img"><img src="./assets/images/icons/'+mixed_category.icon+'" /></div>'+
        '</div>'+
        '</div>';

    html+='</div>';
    html+='</div>';

    //console.log(html);
    game_area.html(html); // display
    current_stage = 1;  // set stage to "choose category"
}

function chooseCategory(id){
    current_category  = id;
    loadQuestion();
    current_stage = 2;  // set stage to "quiz"
}

function loadQuestion(){

    console.log('correct_answers '+correct_answers);
    console.log('correct_answers '+incorrect_answers);
    console.log('unanswered '+unanswered);
    console.log(' ');


    var cid =  current_category;
    if(cid === mixed_category.id){
        cid = getRandomInt(0, categories.length); // if random category
    }


    var arr =[]; //questions array
    for(var i=0; i < questions.length; i++){
        if(questions[i].category_id == cid && find(last_questions,i) == -1 ){
            arr[arr.length]=i;
        }
    }
    current_question_id = arr[ getRandomInt(0,arr.length) ];
    //console.log(current_question_id);
    last_questions.push(current_question_id); // to prevent question repeat


    //current_question_id =1;

    var question = questions[current_question_id];

    var html='';
    html+='<div class="question_area" style="background: #ccc url(\'./assets/images/backgrounds/'+categories[cid].background+'\') center no-repeat;background-size: cover;">';
    html+='<div class="container">';
        html+='<div class="question_icon"><img src="./assets/images/icons/'+categories[cid].icon+'" /></div>';
        html+='<div class="question_title">'+question.text+'</div>';
        html+='<div class="question_desc">'+question.text_additional+'</div>';
        html+='<div class="answer_desc">'+question.answer_description+'</div>';
        html+='<div id="timer">&nbsp;</div>';
    html+='</div>';
    html+='</div>';
    html+='<div class="container answers_area">';
    html+='<div class="row answers">';
        html+='<div class="col-md-8 offset-md-2">';
            html+='<div class="row">';
            var c=-1;
                for( i=0; i < question.answers.length; i++){
                    c=i+1;
                    html+='<div class="col-6">';
                    html+='<div class="answer enabled" attr-id="'+i+'" id="'+i+'a">'+c+'. '+question.answers[i]+'</div>';
                    html+='</div>';
                }
            html+='</div>';
        html+='</div>';
    html+='</div>';

    html+='</div>';

    $(".answer_desc").hide();
    countDown('waitAnswer',seconds_remaining);

    //console.log(html);
    game_area.html(html); // display
    current_stage = 2;
}

function checkAnswer(id){
    if(current_stage !== 2) return false;

    //console.log('checked id='+id);
    var question = questions[current_question_id];

    $(".answer").removeClass('enabled');

    //console.log(question.right_anwer_id);

    $("#"+question.right_anwer_id+"a").addClass('correct');

    if(id == question.right_anwer_id){
        // You was correct
        //console.log('You was correct');
        correct_answers++;
    }else{
        // You was incorrect
        //console.log('You was incorrect');
        incorrect_answers++;
        $("#"+id+"a").addClass('incorrect');
    }
    clearInterval(interval);

    //Check if we need to load or game is already over
    if(correct_answers+incorrect_answers+unanswered === questions_remaining){
        gameOver();
        return false;
    }


    $(".answer_desc").show();
    countDown('loadQuestion',lag);
    current_stage = 3;
}



function countDown(type,second,endMinute,endHour,endDay,endMonth,endYear) {
    var now = new Date();
    second = (arguments.length == 2) ? second + now.getSeconds() : second;
    endYear =  typeof(endYear) != 'undefined' ?  endYear : now.getFullYear();
    endMonth = endMonth ? endMonth - 1 : now.getMonth();  //month starts with 0
    endDay = typeof(endDay) != 'undefined' ? endDay :  now.getDate();
    endHour = typeof(endHour) != 'undefined' ?  endHour : now.getHours();
    endMinute = typeof(endMinute) != 'undefined' ? endMinute : now.getMinutes();

    var endDate = new Date(endYear,endMonth,endDay,endHour,endMinute,second+1);
    interval = setInterval(function() { //start a timer
        var time = endDate.getTime() - now.getTime();
        if (time < 0) {
            clearInterval(interval);
            console.log("Wrong timer! ");
            init();
        } else {
            var days = Math.floor(time / 864e5);
            var hours = Math.floor(time / 36e5) % 24;
            var minutes = Math.floor(time / 6e4) % 60;
            var seconds = Math.floor(time / 1e3) % 60;

            if( type === 'waitAnswer') {
                $("#timer").html(seconds+' seconds remaining');
            }

            //console.log(seconds);

            if (!seconds && !minutes && !days && !hours) {
                clearInterval(interval);
                if(type === 'waitAnswer') {
                    timeIsOver();
                }else{
                    current_stage=2;
                    loadQuestion();
                }
            }
        }
        now.setSeconds(now.getSeconds() + 1); // increase current time
    }, 1000);
}

function timeIsOver() {
    unanswered++ ;
    $(".question_title").html('TIME IS OVER');
    $(".question_desc").html('');
    $(".answer_desc").show();

    //Check if we need to load or game is already over
    if(correct_answers+incorrect_answers+unanswered === questions_remaining){
        gameOver();
        return  false;
    }

    countDown('loadQuestion',lag);
}

function gameOver(){
    clearInterval(interval);
    var html =''+
        '<strong>Correct answers:</strong> '+ correct_answers+'<br/>'+
        '<strong>Incorrect answers:</strong> '+ incorrect_answers+'<br/>'+
        '<strong>Unanswered:</strong> '+ unanswered+'<br/>'

    $("#game_over_modal .modal-body").html(html);
    $('#game_over_modal').modal();
    current_stage = 4;
    init();
}


// Getting random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function find(array, value) {
    if (array.indexOf) {
        // if method exist
        return array.indexOf(value);
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
    }

    return -1;
}