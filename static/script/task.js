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
            
            // const fileContainer = clone.querySelector('.file-container');

            // (material.files).map(file => {
            //     const fileTemplate = document.querySelector(".file-template");

            //     const clone2 = fileTemplate.content.cloneNode(true);

            //     let fileLink = clone2.querySelector('.file_link');
            //     let fileImage = clone2.querySelector('.file_image');
            //     let imgFileName = clone2.querySelector('.img-file-name');

            //     if (file.file_url){
            //         fileLink.href = `${file.file_url}`;
            //         imgFileName.textContent = file.file_name;
            //     }else{
            //         fileLink.style.display = 'none';
            //     }

            //     if (file.file_extension == '.pdf') {
            //         fileImage.src = "../../static/images/pdf watermark img.png";
            //     } else {
            //         fileImage.src = '../../static/images/image watermark img.png'
            //     }
            //     fileContainer.appendChild(clone2);
            // });
            
            const taskContainer = document.querySelector('.task-card-container');
            
            taskContainer.appendChild(clone);
    })

} else {
    console.log("template not found!");
}