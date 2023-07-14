import { executeTemplate } from "./modules/generateTaskTemplate.js";  // importing the executeTemplate() function...
import toggleModal from "./modules/modal.js";

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

taskCardLinkArr.forEach((taskCardLink) => {
  taskCardLink.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Task card clicked'); // Debug statement
    const taskContainer = this.closest('.task-card-container');
    const taskData = JSON.parse(taskContainer.dataset.task).reverse();
    const taskElements = Array.from(taskContainer.children);
    const index = taskElements.indexOf(this.parentNode.parentNode);
    console.log('Index:', index);
    const taskId = taskData[index].id;
    const taskTitle = taskData[index].title;
    console.log('Task ID:', taskId);
    const taskDescription = taskData[index].description;
    console.log('Task Description:', taskDescription);

    const form = this.closest('form');
    submitFormData(form, taskId);

  });
});

const taskSubmissionForm = document.querySelectorAll('.task-submission-form');
console.log(taskSubmissionForm);

taskSubmissionForm.forEach(form => {
  // const taskSubmitBtn = document.getElementById('task-submit-btn');
  form.addEventListener('submit', (e, taskId) => {
    e.preventDefault();
    console.log("submitted");
    // console.log("task id being passed is" + taskId)
    submitFormData(form, taskId);

  })
})

function submitFormData(form, taskId) {
    const taskIdInput = form.querySelector('.task-id-input');
    if (taskId) taskIdInput.value = taskId;

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
}

console.log(taskCardLinkArr);