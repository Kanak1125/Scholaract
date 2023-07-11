// the toggleModal(param1, param2, param3, param4) function will be exported as DEFAULT when this file is imported to other js files with 'export default' keyword as similar as exporting the component in React.js...

export default function toggleModal(modalArr, modalOpenBtnArr, modalCloseBtnArr, isFromTask) {
    modalArr.forEach((modal, index) => {
        modalOpenBtnArr[index].addEventListener('click', () => {
            modal.showModal();  // displays the modal with .showModal() method for dialog elements, to show dialog just use show() inbuilt() method...
            if (isFromTask) {
                modal.style.left = "20vw";
                const postFileBtn = document.querySelectorAll('.post-file-btn');
                const fileInput = document.querySelectorAll('.file-input');
                const taskFromInfoContainer = document.querySelectorAll('.task-form-info-container');
                    
                postFileBtn[index].addEventListener('click', (e) => {
                    e.preventDefault();
                    fileInput[index].click();
                })
                
                fileInput[index].addEventListener('change', () => {
                    if (fileInput[index].files.length > 0) {
                        const imgContainer = document.createElement('div');
                        imgContainer.classList.add('file_img_container');
                        // const linkToUploadedImg = document.createElement('a');
                        const imgFile = document.createElement('img');
                        imgFile.classList.add('file_image');
                        imgContainer.appendChild(imgFile);

                        taskFromInfoContainer[index].prepend(imgContainer);
                    }
                    else console.log("No files uploaded");
                })
            }
        })
        
        modalCloseBtnArr[index].addEventListener('click', () => {
            modal.close();  // closes the modal...
            if (isFromTask) modal.style.left = "100vw";
        })
    })
}