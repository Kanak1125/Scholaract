import { executeTemplate } from "./modules/generateTaskTemplate.js";  // importing the executeTemplate() function...
import toggleModal from "./modules/modal.js";
import animateCard from "./modules/animateCards.mjs";

const taskContainer = document.querySelector('.task-card-container');
const taskArray = JSON.parse(taskContainer.dataset.task).reverse();

// const taskSubmitted = document.querySelector('.')
console.log(taskArray);

// console.log(taskArray.reverse());

let currentAssignmentData = [];

async function refreshTemplate(taskId, index) { // index to tell at which task modal, the task_submitted_data be added...
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/${taskId}/`); // asynchronously fetches the data from the api endpoint which results in response if the promise is fulfilled...
    const data = await response.json(); // then the data is extracted and assigned to data by converting the response to json format...
    currentAssignmentData = data.reverse();
    console.log(currentAssignmentData);

    const closestAssignmentList = document.querySelectorAll('.assignment-lists')[index];
    // console.log(closestAssignmentList);

    if (currentAssignmentData.length === 0) {
      closestAssignmentList.textContent = "No one has submitted yet...";
      return;
    }

    if (closestAssignmentList) {
      currentAssignmentData.forEach(data => {
        const taskSubmittedListTemplate = document.querySelector('.task-submitted-list-template');
        const cloneTemplate = taskSubmittedListTemplate.content.cloneNode(true);
        const studentName = cloneTemplate.querySelector('.student-name');
        const submittedDate = cloneTemplate.querySelector('.date');
        const viewTaskSubmitted = cloneTemplate.querySelector('.view-task-submitted');
        const viewTaskSubmittedFromDropdown = cloneTemplate.querySelector('.view-task-submitted-dropdown');
      
        studentName.textContent = data.student;
        submittedDate.textContent = data.date_of_submission;
        viewTaskSubmitted.href = data.file;
        viewTaskSubmittedFromDropdown.href = data.file;
      
        // dropdowns for small screen devices to view and approve btn...
        const viewApproveMenu = cloneTemplate.querySelector('.view-approve-menu');
        const viewApproveDropdown = cloneTemplate.querySelector('.drop-down');

        viewApproveMenu.addEventListener('click', (e) => {
          handleDropDownClick(e, viewApproveMenu, viewApproveDropdown);
        })

        closestAssignmentList.appendChild(cloneTemplate);

      });
    } else {
      console.log("No assignment-lists element found...");
    }

  } catch (err) {
    console.error("Error while fetching, " + err);
  }
}

// Retrieve the template content
const template = document.querySelector('.task-template');
const templateContent = template.content;


executeTemplate(templateContent, taskArray, taskContainer, true);

const taskCardLinkArr = [...document.querySelectorAll('.task-card-link')];
const modalArr = [...document.querySelectorAll('.modal')];
const closeModal = [...document.querySelectorAll('.close-modal')];

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


console.log(taskCardLinkArr, modalArr);

toggleModal(modalArr, taskCardLinkArr, closeModal, true);

// const submittedTaskArr = JSON.parse(taskContainer.dataset.taskList);
// console.log(submittedTaskArr);

const teacherTaskCardArr = document.querySelectorAll('.teacher-task-card');
teacherTaskCardArr.forEach((card, index) => {
  // console.log("I'm being animated...");
  animateCard(card);

  const form = card.querySelector('.assigned-task-modal-open-form');  // taking card as the base... to find the correct index(ed) form...
 
  form.addEventListener('click', (e) => {
    e.preventDefault();
    const closestAssignmentList = document.querySelectorAll('.assignment-lists')[index];
    closestAssignmentList.innerHTML = "";
    const taskId = taskArray[index].id;
    // console.log(`ID: ${taskId}`);  
    submitFormData(form, taskId);
    refreshTemplate(taskId, index);
  });
});

function submitFormData(form, taskId) {
  // modalArr[index].setAttribute('data-list', "{{ task_submitted_json }}")
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
  
}