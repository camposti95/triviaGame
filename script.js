const questions = [
    {
        question: 'What animal is Mickey Mouse?',
        answers: [
            { text: 'Rat' },
            { text: 'Moose' },
            { text: 'Snake' },
            { text: 'Mouse' }
        ],
        correct: 'Mouse',
        correctMessages: [
            { response: "That's Correct!" },
            { response: "Well Done" },
            { response: "Nice Guess!"}
        ],
        incorrectMessages: [
            { response: "Nope, Sorry" },
            { response: "Wrong Choice" },
            { response: "Aww that's wrong"}
        ]
    },
    {
        question: 'In the Nickelodeon show Rugrats, what is Tommys last name?',
        answers: [
            { text: 'Ferrari' },
            { text: 'Pickles' },
            { text: 'Costanza' },
            { text: 'Hilfiger' }
        ],
        correct: 'Pickles',
        correctMessages: [
            { response: "That's Correct!" },
            { response: "Well Done" },
            { response: "Nice Guess!"}
        ],
        incorrectMessages: [
            { response: "Nope, Sorry" },
            { response: "Wrong Choice" },
            { response: "Aww that's wrong"}
        ]
    },
    {
        question: 'How many licks to the center of a Tootsie Pop',
        answers: [
            { text: '1' },
            { text: '2' },
            { text: '3' },
            { text: 'This question is BS' }
        ],
        correct: 'This question is BS',
        correctMessages: [
            { response: "That's Correct!" },
            { response: "Well Done" },
            { response: "Nice Guess!"}
        ],
        incorrectMessages: [
            { response: "What!? Are you Mr.Owl?" }
        ]
    },
    {
        question: 'What is the largest planet in our solar system',
        answers: [
            { text: 'Jupiter' },
            { text: 'Earth' },
            { text: 'Mars' },
            { text: 'The Sun' }
        ],
        correct: 'Jupiter',
        correctMessages: [
            { response: "That's Correct!" },
            { response: "Well Done" },
            { response: "Nice Guess!"}
        ],
        incorrectMessages: [
            { response: "Nope, Sorry" },
            { response: "Wrong Choice" },
            { response: "Aww that's wrong"}
        ]
    },
    {
        question: 'In the series One Piece, what is the name of Luffys Pirate Crew?',
        answers: [
            { text: 'The Straw Hat Pirates' },
            { text: 'The Straw Hat Pirates' },
            { text: 'The Straw Hat Pirates' },
            { text: 'The Usopp Pirates' }
        ],
        correct: 'The Straw Hat Pirates',
        correctMessages: [
            { response: "That's Correct! Now watch the show on Netflix!" },
        ],
        incorrectMessages: [
            { response: "Nope, Sorry" },
            { response: "Wrong Choice" },
            { response: "Aww that's wrong"}
        ]
    },
]

function shuffledCorrectMessages() {
    let randomMessage = questions[index].correctMessages[(Math.floor(Math.random() * questions[index].correctMessages.length))]
    return randomMessage.response
}
function shuffledIncorrectMessages() {
    let randomMessage = questions[index].incorrectMessages[(Math.floor(Math.random() * questions[index].incorrectMessages.length))]
    return randomMessage.response
}

$(function() {
    $("#start-btn").click(function (){
        $("#start-btn").hide()
        $("h1").hide()
        $("#question-container").removeClass("hide")
        $("#question-container").addClass("question-container-flex")
        $(".container").addClass("container-start")
        $(".controls").css("height", "20%")
        $('#submit-btn').show()
        showQuestion(questions)
    })
})

let index = 0
let score = 0
let count = 0

function showQuestion(question) {
    $('#question').text(question[index].question)
    $('#0').text(question[index].answers[0].text)
    $('#1').text(question[index].answers[1].text)
    $('#2').text(question[index].answers[2].text)
    $('#3').text(question[index].answers[3].text)
    $('button').addClass('btn answers-btn')
    if(index == (questions.length - 1)){
        $('#next-btn').text('Summary')
    }
}

function clearStatus() {
    $('#message').empty()
    $('.submit-btn').removeAttr('disabled')
    $('.answer-choice').removeAttr('disabled')
    $('#next-btn').hide()
    $('#next-btn').attr('disabled','disabled')
}

$(function() {
    let answer
    $('.answer-choice').focus(function( e ){
        answer = e.target
        console.log(answer)
    })
    $('.submit-btn').click(function(){
        if(answer.innerText == questions[index].correct){
            $('#message').text(shuffledCorrectMessages()).css('color','#82CD47')
            score += 1
        }else{
            $('#message').text(shuffledIncorrectMessages()).css('color','#D61C4E')
        }
        $('.answer-choice').attr('disabled','disabled')
        $('.submit-btn').attr('disabled','disabled')
        $('#next-btn').removeAttr('disabled')
        $('#next-btn').show()
        count ++
    })
})

$(function() {
    $('#next-btn').click(function ( e ){
        if(count == 5){
            switch (score){
                case 0:
                    $('#question').text('That was hard to watch...')
                    break
                case 1:
                    $('#question').text('Ayyy you got one right at least.')
                    break
                case 2:
                    $('#question').text('Not bad, you got some right.')
                    break
                case 3:
                    $('#question').text("Nice. Maybe you'll do better next time.")
                    break
                case 4:
                    $('#question').text('Very good, proud of you.')
                    break
                case 5:
                    $('#question').text('Ha! Nerd.')
            }
            
            $('.score-message').text(`Score: ${score}/5`)
            $('#message').hide()
            $('.submit-btn').hide()
            $('.answer-choice').hide()
            $('#next-btn').text('Restart').addClass('restart-btn')
            $('.icon').show()
            $(function() {
                $('#next-btn').click(function (){
                    location.reload()
                })
            })
        }else{
            index++
            clearStatus()
            showQuestion(questions)
        }
    })
})