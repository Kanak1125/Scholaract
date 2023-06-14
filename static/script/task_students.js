import { executeTemplate } from "./generateTaskTemplate.js";  // importing the executeTemplate() function...
import toggleModal from "./modules/modal.js";

const taskArray = JSON.parse(document.querySelector('.task-card-container').dataset.task).reverse();
console.log(taskArray)

// // Retrieve the template content
// const template = document.querySelector('.task-template');
// const templateContent = template.content;

// Retrieve the template content
const template = document.querySelector('.task-template-stud');
const templateContent = template.content;

executeTemplate(templateContent, taskArray, false);
console.log("Execution successful!");

var taskId = '{{ task_id }}';

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

// console.log(taskCardLinkArr, modalArr);

toggleModal(modalArr, taskCardLinkArr, closeModal, true);