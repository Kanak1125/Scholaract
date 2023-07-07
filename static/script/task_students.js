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
// taskCardLinkArr.forEach((taskCardLink) => {
//   taskCardLink.addEventListener('click', function(e) {
//     console.log('Task card clicked'); // Debug statement
//     e.preventDefault();
//     const taskContainer = this.closest('.task-card-container-stud');
//     const taskData = JSON.parse(taskContainer.dataset.task).reverse(); // parsing JSON data stored in data-task
//     const taskElements = Array.from(taskContainer.children); // converting the live collection  of child elements into an array
//     // console.log(taskElements)
//     const index = taskElements.indexOf(this.parentNode); // accessing index of the taskContainer i.e. of class = task-card-container-stud
//     // console.log('Index:', index);
//     const taskId = taskData[index].id;
//     console.log('Task ID:', taskId);
//     // const taskDes = taskData[index].description;
//     // console.log('Task Description:', taskDes);
    
//   });
// });
// // console.log(taskCardLinkArr)

// taskCardLinkArr.forEach((taskCardLink) => {
//   taskCardLink.addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log('Task card clicked'); // Debug statement
//     const taskContainer = this.closest('.task-card-container-stud');
//     const taskData = JSON.parse(taskContainer.dataset.task).reverse();
//     const taskElements = Array.from(taskContainer.children);
//     const index = taskElements.indexOf(this.parentNode.parentNode);
//     console.log('Index:', index);
//     const taskId = taskData[index].id;
//     console.log('Task ID:', taskId);
//     const taskDes = taskData[index].description;
//     console.log('Task Description:', taskDes);

//     // Access the form elements
//     const form = this.querySelector('form');
//     const formElements = form.elements;

//     // Access and process form data
//     const formData = new FormData(form);
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ': ' + pair[1]);
//     }
//   });
// });

// console.log(taskCardLinkArr);
taskCardLinkArr.forEach((taskCardLink) => {
  taskCardLink.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Task card clicked'); // Debug statement
    const taskContainer = this.closest('.task-card-container-stud');
    const taskData = JSON.parse(taskContainer.dataset.task).reverse();
    const taskElements = Array.from(taskContainer.children);
    const index = taskElements.indexOf(this.parentNode.parentNode);
    console.log('Index:', index);
    const taskId = taskData[index].id;
    console.log('Task ID:', taskId);
    const taskDes = taskData[index].description;
    console.log('Task Description:', taskDes);

    const form = this.closest('form');
    submitFormData(form, taskId);

    const taskSubmissionForm = document.getElementById('task-submission-form');
    const taskSubmitBtn = document.getElementById('task-submit-btn');
    taskSubmissionForm.addEventListener('submit', (e, taskId) => {
      e.preventDefault();
      console.log("submitted")
      submitFormData(taskSubmissionForm, taskId);
    })
  });
});


function submitFormData(form, taskId) {
    const taskIdInput = form.querySelector('.task-id-input');
    if (taskId) taskIdInput.value = taskId;
    
    // Submitting the form using AJAX
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