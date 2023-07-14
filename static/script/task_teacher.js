import { executeTemplate } from "./modules/generateTaskTemplate.js";  // importing the executeTemplate() function...
import toggleModal from "./modules/modal.js";
import animateCard from "./modules/animateCards.js";

const taskContainer = document.querySelector('.task-card-container');
const taskArray = JSON.parse(taskContainer.dataset.task).reverse();
console.log(taskArray);
// console.log(taskArray.reverse());

// Retrieve the template content
const template = document.querySelector('.task-template');
const templateContent = template.content;


executeTemplate(templateContent, taskArray, taskContainer, true);

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

console.log(taskCardLinkArr, modalArr);

toggleModal(modalArr, taskCardLinkArr, closeModal, true);

const teacherTaskCardArr = document.querySelectorAll('.teacher-task-card');
teacherTaskCardArr.forEach((card, index) => {
  // console.log("I'm being animated...");
  animateCard(card);

    card.addEventListener('click', e => {
      e.preventDefault();
      const taskId = taskArray[index].id;
      // console.log(`ID: ${taskId}`);  
      const form = card.querySelector('.assigned-task-modal-open-form');  // taking card as the base... to find the correct index(ed) form...
      // console.log(form);
      submitFormData(form, taskId);
    })
})

function submitFormData(form, taskId) {
  // console.log("Im running...");
  const taskIdInput = form.querySelector('.task-id-input-for-teach');
  // console.log(taskId);
  if (taskId) taskIdInput.value = taskId;
  // console.log(taskIdInput.value);
  console.log(taskId)
  console.log("running...");

  // // Submitting the form using AJAX
  const formData = new FormData(form);  // gathers all the form fields and their values from the 'form' element...
  const xhr = new XMLHttpRequest(); // creates a new "XMLHttpRequest" object, which is used to send asynchronous HTTP requests.
  // XMLHttpRequest object provides functionality for making AJAX requests to the server...
  xhr.open(form.method, form.action); // initializing the AJAX request with form method as POST and form action blank...
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); // Adding this header for Django to identify it as an AJAX request

  // when the request is complete the following function is called with "onload"...
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Request was successful
      console.log("Request was successful");
    } else {
      // Request failed
      console.error('Request failed. Status:', xhr.status);
    }
  };
  xhr.onerror = function() {
    console.error('Network error occurred');
  };
  xhr.send(formData); // this sends the data to the server...
  print(formData)
}