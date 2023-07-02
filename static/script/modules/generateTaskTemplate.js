// Clone the template when creating a new task card

// 'isTeacher' ---> boolean value to check if the function is getting called from the teacher's page or student's page coz'
// only the teachers can delete the task (line no. 9)...

function createTaskCard(taskData, templateContent, isTeacher) {
    const taskCard = templateContent.cloneNode(true);
  
    const taskId = taskData.id;
    if (isTeacher) {
      // Update the task ID in the delete form action URL
      const deleteForm = taskCard.querySelector('.delete-form');
      const deleteFormAction = deleteForm.action.replace('__task.id__', taskId);
      deleteForm.action = deleteFormAction;
    }
  
    // Populate other task data
    const taskName = taskCard.querySelector('.task-name');
    const description = taskCard.querySelector('.description');
    const dueDate = taskCard.querySelector('.due-date');
  
    taskName.textContent = taskData.title;
    description.textContent = taskData.description;
    dueDate.textContent = taskData.due_date;
  
    return taskCard;
  }
  
export const executeTemplate = (templateContent, templateDataArray, taskContainer, isTeacher) => {
    if ('content' in document.createElement('template')) {
      templateDataArray.forEach(task => {
        const taskCard = createTaskCard(task, templateContent, isTeacher);
    
        taskContainer.appendChild(taskCard);
      });
    } else {
      console.log('template not found!');
    }
}