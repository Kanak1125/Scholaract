import toggleModal from "./modules/modal.js";

const taskArray = JSON.parse(document.querySelector('.task-card-container').dataset.task);

// Retrieve the template content
const template = document.querySelector('.task-template');
const templateContent = template.content;

// Clone the template when creating a new task card
function createTaskCard(taskData) {
  const taskCard = templateContent.cloneNode(true);

  // Update the task ID in the delete form action URL
  const deleteForm = taskCard.querySelector('.delete-form');
  const taskId = taskData.id;
  const deleteFormAction = deleteForm.action.replace('__task.id__', taskId);
  deleteForm.action = deleteFormAction;

  // Populate other task data
  const taskName = taskCard.querySelector('.task-name');
  const description = taskCard.querySelector('.description');
  const dueDate = taskCard.querySelector('.due-date');

  taskName.textContent = taskData.title;
  description.textContent = taskData.description;
  dueDate.textContent = taskData.due_date;

  return taskCard;
}

if ('content' in document.createElement('template')) {
  taskArray.forEach(task => {
    const taskCard = createTaskCard(task);

    const taskContainer = document.querySelector('.task-card-container');
    taskContainer.appendChild(taskCard);
  });
} else {
  console.log('template not found!');
}

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