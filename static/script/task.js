const taskArray = JSON.parse(document.querySelector('.task-card-container').dataset.task);

if ('content' in document.createElement('template')) {
    taskArray.map(task => {    // runs the following code for every object in classesArray and returns the array of Class cloned cards with their data in it...
        const taskTemplate = document.querySelector(".task-template");
        // Clone the new material card template so that the original template doesnot get overwritten for future use and insert it into the section.classes container...
        const clone = taskTemplate.content.cloneNode(true);    // here is when the template is cloned...
            let taskName = clone.querySelector('.task-name');
            let description = clone.querySelector('.description');
            let dueDate = clone.querySelector('.due-date')
            // let dueDate = clone.querySelector('.due-date');

            taskName.textContent = `${task.title}`;
            description.textContent = `${task.description}`; 
            dueDate.textContent = `${task.due_date}`;
            
            const taskContainer = document.querySelector('.task-card-container');
            
            taskContainer.appendChild(clone);
    })

} else {
    console.log("template not found!");
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
        $(dropDown).click(function (e) {
            handleDropDownClick(e, dropDown, taskCardDropDown[index]);  // for Each materialCardDropDownBtn, same materialCardDropDown in its index is passed as argument to the handleDropDownClick() function...
        });
    })
});