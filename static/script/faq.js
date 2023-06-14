const questions = [...document.querySelectorAll('.question')];
const answers = [...document.querySelectorAll('.answer')];
const chevronBtns = [...document.querySelectorAll('.chevron-btn')];

$(document).ready(function() {
    questions.forEach((question, index) => {
        $(question).click(function (e) { 
            e.preventDefault();
            $(answers[index]).slideToggle();    // when the question is clicked the answer with the same 'index' is toggled between display: 'none' and 'block'...
            $(question).toggleClass('active');  // class is toggled...

            // the following code to toggle the icon to point up and down
            if (question.classList.contains('active')) {
                $(chevronBtns[index]).removeClass('fa-chevron-down');
                $(chevronBtns[index]).addClass('fa-chevron-up');
            } else {
                $(chevronBtns[index]).removeClass('fa-chevron-up');
                $(chevronBtns[index]).addClass('fa-chevron-down');
            }
        });
    })
})


// $.each(questions, function (index, value) { 
//     $(value).click(function (e) { 
//         e.preventDefault();
//         $(answers[index]).slideToggle();
//     });
// });
console.log(questions);

// jquery for the 'expand all' and 'collapse all' btns...
$(document).ready(function() {
    $('.expand-all-btn').click(function(e) {
        $(answers).slideDown();
        $(questions).addClass('active');
        $(chevronBtns).removeClass('fa-chevron-down');
        $(chevronBtns).addClass('fa-chevron-up');
    })
    
    $('.collapse-all-btn').click(function(e) {
        $(answers).slideUp();
        $(questions).removeClass('active');
        $(chevronBtns).removeClass('fa-chevron-up');
        $(chevronBtns).addClass('fa-chevron-down');
    })
})