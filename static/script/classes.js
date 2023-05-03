const dropBtn = document.querySelector('.drop-btn');

// when the document is ready run the function inside of it...
$(document).ready(function() {
    $('.drop-btn').click(function (e) {     // when an element with '.drop-btn' in html is clicked it runs the function inside of click() method again...
        e.stopPropagation(); // prevent event bubbling
        dropBtn.classList.toggle('active');
        $('.drop-down').slideToggle('fast');   // slideToggle() method is performed everytime the button is clicked...
    });

    $(document).click(function (event) {
        event.stopPropagation();
        var target = $(event.target);
        if(!target.is('.drop-btn') && !target.closest('.drop-down').length) {
            $('.drop-down').slideUp('fast');
            dropBtn.classList.remove('active');
        }
    })

    // slideUp the drop-down even when the document is scrolled by the user...
    $(document).scroll(function () {
        $('.drop-down').slideUp('fast');
        dropBtn.classList.remove('active');
    })
});

// code for joining the toggling the modal create-class here...
const createJoinBtn = document.querySelector('.create-join-btn');
const modalContainer = document.querySelector('.modal-container');
const closeModal = document.querySelector('.close-modal');

createJoinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalContainer.classList.add('active');
})

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modalContainer.classList.remove('active');
})