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
    document.body.style.overflowY = 'hidden';
})

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modalContainer.classList.remove('active');
    document.body.style.overflowY = 'visible';
})

const classesObj = JSON.parse(document.querySelector('.classes').dataset.classes);
const classesArray = classesObj.classes;
console.log(classesArray);

const listenCardClickEvent = (clone, cl_id) => {
    const classCard = [...document.querySelectorAll('.class-card')];    // selecting every class-card and pushing them to classCard array...
    classCard.forEach(card => {
        console.log(card);
    })
    // classCard.forEach(card => {
    //     card.addEventListener('click', () => {
    //         console.log("card clicked" + cl_id);
    //         // window.location.href = `/class/${cl_id}`;
    // })
    // })
    // console.log(clone)
    // clone.addEventListener('click', () => {
    //     console.log("card clicked " + cl_id)
    // })
}
listenCardClickEvent()
// checking browser support...
if ('content' in document.createElement('template')) {
    classesArray.map(cl => {    // runs the following code for every object in classesArray and returns the array of Class cloned cards with their data in it...
        const classTemplate = document.querySelector(".class-template");
        // Clone the new class card template so that the original template doesnot get overwritten for future use and insert it into the section.classes container...
        const clone = classTemplate.content.cloneNode(true);    // here is when the template is cloned...
        // listenCardClickEvent(clone, cl.id);
            let className = clone.querySelector('.class-name');
            let teacherName = clone.querySelector('.teacher-name');

            className.textContent = `${cl.class_name}`;
            teacherName.textContent = `${cl.created_by}`; // name of the teacher who created the class
             // Add click event listener to the cloned class card
            
            const classes = document.querySelector('.classes');
            classes.appendChild(clone);
            // clone.addEventListener('click', () => {
            //     // console.log("click")
            //     const classId = cl.id;
            //     console.log('clicked' + cl.id);
            //     // window.location.href = `/class/${classId}`;
            // });

            // clone.onclick = () => {
            //     console.log('clicked' );
            // }
    })
} else {
    console.log("template not found!");
}

