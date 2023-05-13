const dropBtn = document.querySelector('.drop-btn');

// when the document is ready run the function inside of it...
function handleDropDownClick(e, btn, dropdown) {
    e.stopPropagation(); // prevent event bubbling
    btn.classList.toggle('active');
    $(dropdown).slideToggle('fast');   // slideToggle() method is performed everytime the button is clicked...
}

$(document).ready(function() {
    const userDropDown = document.querySelector('.drop-down');
    const materialCardDropDown = [...document.querySelectorAll('.update-drop-down')];
    const userDropDownBtn = dropBtn;
    const materialCardDropDownBtn = [...document.querySelectorAll('.edit-delete-menu')];

    $(userDropDownBtn).click(function (e) {     // when an element with '.drop-btn' in html is clicked it runs the function inside of click() method again...
        handleDropDownClick(e, userDropDownBtn, userDropDown);
    });

    materialCardDropDownBtn.forEach((dropDown, index) => {
        $(dropDown).click(function (e) {
            handleDropDownClick(e, dropDown, materialCardDropDown[index]);  // for Each materialCardDropDownBtn, same materialCardDropDown in its index is passed as argument to the handleDropDownClick() function...
        });
    })

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

const editPost = [...document.querySelectorAll('.edit-post')];  // this selects every element with '.edit-post' class and assign it to 'editPost' array using querySelectorAll and spread operator(...) ...
const closeModal = [...document.querySelectorAll('.close-modal')];  // this selects every '.close-modal' as there are multiple material cards and store it in the 'closeModal' array as in above...
const modal = document.querySelector('.modal'); // selects the dialog element in HTML...

editPost.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.showModal();  // displays the modal with .showModal() method for dialog elements, to show dialog just use show() inbuilt() method...
    })
})

closeModal.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.close();  // closes the modal...
    })
})