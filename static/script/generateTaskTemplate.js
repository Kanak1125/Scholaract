// Clone the template when creating a new task card
function createTaskCard(taskData, templateContent) {
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
  
export const executeTemplate = (templateContent, templateDataArray) => {
    if ('content' in document.createElement('template')) {
      templateDataArray.forEach(task => {
        const taskCard = createTaskCard(task, templateContent);
    
        const taskContainer = document.querySelector('.task-card-container');
        taskContainer.appendChild(taskCard);
      });
    } else {
      console.log('template not found!');
    }
}