import { executeTemplate } from "./modules/generateTaskTemplate.js";  // importing the executeTemplate() function...
import toggleModal from "./modules/modal.js";

const taskContainer = document.querySelector('.task-card-container-stud');
const taskArray = JSON.parse(taskContainer.dataset.task).reverse();
console.log(taskArray)

// Retrieve the template content
const template = document.querySelector('.task-template-stud');
const templateContent = template.content;

executeTemplate(templateContent, taskArray, taskContainer, false);
console.log("Execution successful!");

// var taskId = '{{ task_id }}';

function handleDropDownClick(e, btn, dropdown) {
  e.stopPropagation(); // prevent event bubbling
  btn.classList.toggle('active');
  $(dropdown).slideToggle('fast');
}

$(document).ready(function() {
  const taskCardDropDown = [...document.querySelectorAll('.update-drop-down')];
  const taskCardDropDownBtn = [...document.querySelectorAll('.edit-delete-menu')];

  taskCardDropDownBtn.forEach((dropDown, index) => {
    $(dropDown).click(function(e) {
      handleDropDownClick(e, dropDown, taskCardDropDown[index]);
    });
  });
});

const taskCardLinkArr = [...document.querySelectorAll('.task-card-link')];
const modalArr = [...document.querySelectorAll('.modal')];
const closeModal = [...document.querySelectorAll('.close-modal')];


// const taskCardContainers = document.querySelectorAll('.task-card-container-stud');

// template.forEach((taskCardContainer) => {
//   taskCardContainer.addEventListener('click', () => {
//     const task = JSON.parse(taskCardContainer.dataset.task);
//     const taskId = task.id;
//     console.log(taskId);  // Output: the task ID value
//     // Perform further actions with the task ID as needed
//   });
// });



// taskCardLinkArr.forEach((taskCardLink) => {
//   taskCardLink.addEventListener('click', function(e) {
//     console.log('Task card clicked'); // Debug statement
//     e.preventDefault();
//     const taskId = this.dataset.id;
//     const taskdes = this.dataset.description;
//     console.log('Task ID:', taskId); // Debug statement
//     console.log('Task Description:', taskdes); // Debug statement

//   });
// });


toggleModal(modalArr, taskCardLinkArr, closeModal, true);
taskCardLinkArr.forEach((taskCardLink) => {
  taskCardLink.addEventListener('click', function(e) {
    console.log('Task card clicked'); // Debug statement
    e.preventDefault();
    const taskContainer = this.closest('.task-card-container-stud');
    const taskData = JSON.parse(taskContainer.dataset.task).reverse(); // parsing JSON data stored in data-task
    const taskElements = Array.from(taskContainer.children); // converting the live collection  of child elements into an array
    // console.log(taskElements)
    const index = taskElements.indexOf(this.parentNode); // accessing index of the taskContainer i.e. of class = task-card-container-stud
    // console.log('Index:', index);
    const taskId = taskData[index].id;
    console.log('Task ID:', taskId);
    // const taskDes = taskData[index].description;
    // console.log('Task Description:', taskDes);
    
  });
});
// console.log(taskCardLinkArr)