// Clone the template when creating a new task card

// 'isTeacher' ---> boolean value to check if the function is getting called from the teacher's page or student's page coz'
// only the teachers can delete the task (line no. 9)...

const monthNames = {
  '01' : 'Jan',
  '02' : 'Feb',
  '03' : 'Mar',
  '04' : 'Apr',
  '05' : 'May',
  '06' : 'Jun',
  '07' : 'Jul',
  '08' : 'Aug',
  '09' : 'Sep',
  '10' : 'Oct',
  '11' : 'Nov',
  '12' : 'Dec',
}

function createTaskCard(taskData, templateContent, isTeacher) {
    const taskCard = templateContent.cloneNode(true);
    
    const taskId = taskData.id;
    if (isTeacher) {
      // Update the task ID in the delete form action URL
      const deleteForm = taskCard.querySelector('.delete-form');
      const deleteFormAction = deleteForm.action.replace('__task.id__', taskId);
      deleteForm.action = deleteFormAction;
    }
  
    // only if student...
    if (!isTeacher) {
      // console.log("student task modal");
      const modalTaskTitle = taskCard.querySelector('.modal-task-title');
      const modalTaskDescription = taskCard.querySelector('.modal-description');
      modalTaskTitle.textContent = taskData.title;
      modalTaskDescription.textContent = taskData.description;
    }

    // Populate other task data
    const taskName = taskCard.querySelector('.task-name');
    const description = taskCard.querySelector('.description');
    const dueDate = taskCard.querySelector('.due-date');
  
    taskName.textContent = taskData.title;
    description.textContent = taskData.description;
    const [day, month, year] = typeof taskData.due_date === 'string' ? taskData.due_date.split('-') : taskData.due_date; 
    const dateFormat = `${day} ${monthNames[month]}, ${year}`;
    
    dueDate.textContent = dateFormat;

    if (isTeacher) {
      const fileContainer = taskCard.querySelector('.file-container');

      (taskData.files).map(file => {
        console.log(file);

        const fileTemplate = document.querySelector(".file-template");

        const clone2 = fileTemplate.content.cloneNode(true);

        let fileLink = clone2.querySelector('.file_link');
          let fileImage = clone2.querySelector('.file_image');
          let imgFileName = clone2.querySelector('.img-file-name');

          if (file.file_url){
            fileLink.href = `${file.file_url}`;
            imgFileName.textContent = file.file_name;
          }else{
            fileLink.style.display = 'none';
          }

          if (file.file_extension == '.pdf') {
            fileImage.src = "../../../static/images/pdf watermark img.png";
          } else {
            fileImage.src = '../../../static/images/image watermark img.png'
          }
          fileContainer.appendChild(clone2);
      })
    }
  
    return taskCard;
  }
  
export const executeTemplate = (templateContent, templateDataArray, taskContainer, isTeacher) => {
    if ('content' in document.createElement('template')) {
      // console.log('TaskContainer' + taskContainer);
      taskContainer.innerHTML = ''; // clearing the taskContainer before adding any taskModal...
      templateDataArray.forEach(task => {
        // console.log(task);
        const taskCard = createTaskCard(task, templateContent, isTeacher);
        
        taskContainer.appendChild(taskCard);
        // console.log(taskCard);
      });
    } else {
      console.log('template not found!');
    }
}