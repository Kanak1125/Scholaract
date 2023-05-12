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

// javaSCript code that will listen to the scoll event of the page and when the vertical scroll is more than '100px' '.scroll-active' class is added to the classInfoCard...
const classInfoCard = document.querySelector('.class-info-card');
document.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        classInfoCard.classList.add('scroll-active');
    } else {
        classInfoCard.classList.remove('scroll-active');
    }
})

const materialsArray = JSON.parse(document.querySelector('.material-container').dataset.materials);

console.log(materialsArray);

// checking browser support...
if ('content' in document.createElement('template')) {
    materialsArray.map(material => {    // runs the following code for every object in classesArray and returns the array of Class cloned cards with their data in it...
        const materialTemplate = document.querySelector(".stream-template");
        // Clone the new material card template so that the original template doesnot get overwritten for future use and insert it into the section.classes container...
        const clone = materialTemplate.content.cloneNode(true);    // here is when the template is cloned...
            let title = clone.querySelector('.title');
            let description = clone.querySelector('.description');
            let file = clone.querySelector('.file_link');

            title.textContent = `${material.title}`;
            description.textContent = `${material.description}`; // name of the teacher who created the class
            if (material.file_url){
                file.href = `${material.file_url}`;
            }else{
                file.style.display = 'none';
            }
            
            
            const materialContainer = document.querySelector('.material-container');
            
            materialContainer.appendChild(clone);
    })

} else {
    console.log("template not found!");
}