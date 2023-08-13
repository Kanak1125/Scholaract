import { executeTemplate } from "./modules/generateTaskTemplate.js";  // importing the executeTemplate() function...
import toggleModal from "./modules/modal.js";
import animateCard from "./modules/animateCards.mjs";
import { showPopup, submissionSuccessPopup } from "./popUp.mjs";

const taskContainer = document.querySelector('.task-card-container-stud');
let taskArray = [];
// console.log('TaskContainer from stud...' + taskContainer);
try {
  taskArray = JSON.parse(taskContainer.dataset.task).reverse();
} catch (err) {
  console.log(`Err: ${err}`);
}

// Retrieve the template content
const template = document.querySelector('.task-template-stud');
const templateContent = template.content;

const getAnimation = () => {
  const studentTaskCardArr = document.querySelectorAll('.student-task-card');
  studentTaskCardArr.forEach(card => {
    animateCard(card);
  })
}

function latestTaskOrder() {
  executeTemplate(templateContent, taskArray, taskContainer, false);
  updateEventListener();
  getAnimation();
  performFormSubmission(taskArray);
}

function dueTaskOrder() {
  const dueDateToMillisecondsTask = taskArray.map(task => {
    const dateString = task.due_date;
    const [day, month, year] = typeof dateString === 'string' ? dateString.split('-') : dateString;
    // console.log(day, month, year);
    const newDueDate = new Date(year, month - 1, day);

    const milliseconds = newDueDate.getTime();

    task.due_date = milliseconds;
    return task;
  })
  const sortedTaskArray = dueDateToMillisecondsTask.sort((a, b) => a.due_date - b.due_date);  // sorting according to the due_date
  // NOTE: nearer the due date the task will appear ahead...


  // reverting the array of objects back to the correct Date format...
  const revertedDateTaskArray = sortedTaskArray.map (task => {
    const newDueDate = new Date(task.due_date);
    const dueDate = newDueDate.getDate();
    const dueMonth = newDueDate.getMonth() + 1;
    const dueFullYear = newDueDate.getFullYear();

    task.due_date = `${dueDate < 10 ?
      '0' +  dueDate
      :
      dueDate}-${dueMonth < 10 ?
        '0' +  dueMonth
        :
        dueMonth}-${dueFullYear}`
    return task;
  })

  executeTemplate(templateContent, revertedDateTaskArray, taskContainer, false);
  updateEventListener();
  getAnimation();
  performFormSubmission(revertedDateTaskArray);
}

function oldestTaskOrder() {
  const oldestTaskArray = taskArray.slice().reverse();  // creating the copy of original taskArray and reversing it so that the original array doesn't change in every render...
  // console.log(oldestTaskArray);
  executeTemplate(templateContent, oldestTaskArray, taskContainer, false);
  // console.log('reversed');
  updateEventListener();
  getAnimation();
  performFormSubmission(oldestTaskArray);
}

// for sorting dropdown...
const dropdownToggleBtn = document.querySelector('.dropdown-toggle');

// let isTaskSorted = false;

export const sortTasks = () => {
  // isTaskSorted = true;
  const option = dropdownToggleBtn.textContent;
  const trimmedOption = option.trim();  // removing whitespace...

  // console.log(option);
  switch (trimmedOption) {
    case 'Latest':
      latestTaskOrder();
      break;
    case 'Due':
      // reverseTaskOrder();
      dueTaskOrder();
      break;
    case 'Oldest':
      oldestTaskOrder();
      // console.log("I'm the oldest");
      break;
    default:
      // console.log("I'm the latest");
      break;
  }
  showPopup();
  submissionSuccessPopup();
}

console.log(taskArray)


// executeTemplate(templateContent, taskArray, taskContainer, false);
console.log("Execution successful!");

// var taskId = '{{ task_id }}';

// NO NEED OF THIS LINE coz no dropdowns except in navbar...
/* function handleDropDownClick(e, btn, dropdown) {
//   e.stopPropagation(); // prevent event bubbling
//   btn.classList.toggle('active');
//   $(dropdown).slideToggle('fast');
// }

// $(document).ready(function() {
//   const taskCardDropDown = [...document.querySelectorAll('.update-drop-down')];
//   const taskCardDropDownBtn = [...document.querySelectorAll('.edit-delete-menu')];

//   taskCardDropDownBtn.forEach((dropDown, index) => {
//     $(dropDown).click(function(e) {
//       handleDropDownClick(e, dropDown, taskCardDropDown[index]);
//     });
//   });
// }); */

let taskCardLinkArr;

// we need to update the modalArray everytime the taskArray is sorted out so creating a function to call everytime the array is sorted...
function updateEventListener() {
  taskCardLinkArr = [...document.querySelectorAll('.task-card-link')];
  const modalArr = [...document.querySelectorAll('.modal')];
  const closeModal = [...document.querySelectorAll('.close-modal')];

  toggleModal(modalArr, taskCardLinkArr, closeModal, true);
}

// const postFileBtn = document.querySelectorAll('.post-file-btn');
// const fileInput = document.querySelectorAll('.file-input');
// console.log(postFileBtn, fileInput)

// postFileBtn.forEach((btn, index) => {
//   btn.addEventListener('click', () => {
//     fileInput[index].click();
//   })

//   fileInput[index].addEventListener('change', () => {
//     if (fileInput[index].files.length > 0) console.log("File uploaded successfully...");
//     else console.log("No files uploaded");
//   })
// })

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
executeTemplate(templateContent, taskArray, taskContainer, false);
updateEventListener();
getAnimation();

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
//     const taskDescription = taskData[index].description;
//     console.log('Task Description:', taskDescription);

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

// should be debugged...
// async function getApprovedStatus(taskContainer, taskId) {
//   const response = await fetch(`http://127.0.0.1:8000/api/${taskId}/`);
//   const data = await response.json();
  
//   const taskStatus = taskContainer.querySelector('.task-status');
//   if (data[0].approved) taskStatus.textContent = "Approved";
//   else taskStatus.textContent = "Due";
// }

function performFormSubmission(taskArr) {
  // console.log(taskCardLinkArr);
  taskCardLinkArr.forEach((taskCardLink) => {
    taskCardLink.addEventListener('click', function(e) {
      e.preventDefault();
      // console.log('Task card clicked'); // Debug statement
      const taskContainer = taskCardLink.closest('.task-card-container-stud');
      console.log(taskContainer);
      const taskData = taskArr;
      const taskElements = Array.from(taskContainer.children);
      const index = taskElements.indexOf(this.parentNode.parentNode);
      console.log('Index:', index);
      const taskId = taskData[index].id;
      const taskTitle = taskData[index].title;
      console.log('Task-title: ---------------->' + taskTitle);
      console.log('Task ID:', taskId);
      const taskDescription = taskData[index].description;
      console.log('Task Description:', taskDescription);
  
      const form = this.closest('.submit-task-form');
      submitFormData(form, taskId);
      // getApprovedStatus(taskContainer, taskId);
    });
  });
  
  const taskSubmissionForm = document.querySelectorAll('.task-submission-form');
  // console.log(taskSubmissionForm);
  
  // for submitting the task...
  taskSubmissionForm.forEach((form, index) => {
    // const taskSubmitBtn = document.getElementById('task-submit-btn');

    const labelForUploadingFile = form.querySelector('.post-file-btn'); // label for uploading file for task submission...
    const inputFieldFile = form.querySelector('.file-input');
    labelForUploadingFile.setAttribute('for', `post_file-${index}`);
    inputFieldFile.setAttribute('id', `post_file-${index}`);
    const taskSubmitBtn = form.querySelector('.task-submit-btn');
    
      form.addEventListener('submit', (e) => {
        console.log(form);
        e.preventDefault();
        if (taskSubmitBtn.classList.contains('btn-disabled')) return; // return if the file is not uploaded...
        // console.log(form);
        console.log("submitted");
        // console.log("task id being passed is" + taskId)
        submitFormData(form, null);

        setTimeout(() => {
          taskSubmitBtn.classList.add('btn-disabled');
        }, 200);
      })
  })
  
  function submitFormData(form, taskId) {
      const taskIdInput = form.querySelector('.task-id-input');
      if (taskId) taskIdInput.value = taskId;
      console.log("----------------");
      // console.log(form);
      // // Submitting the form using AJAX
      const formData = new FormData(form);  // gathers all the form fields and their values from the 'form' element...
      for (const [name, value] of formData.entries()) {
        console.log(name, value);
      }
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
}

showPopup();
submissionSuccessPopup();
performFormSubmission(taskArray);