// the toggleModal(param1, param2, param3, param4) function will be exported as DEFAULT when this file is imported to other js files with 'export default' keyword as similar as exporting the component in React.js...

export default function toggleModal(modalArr, modalOpenBtnArr, modalCloseBtnArr, isFromTask) {
    let fileList = [];

    modalArr.forEach((modal, index) => {
        modalOpenBtnArr[index].addEventListener('click', () => {
            modal.showModal();  // displays the modal with .showModal() method for dialog elements, to show dialog just use show() inbuilt() method...
            if (isFromTask) {
                modal.style.left = "20vw";
                // const postFileBtn = document.querySelectorAll('.post-file-btn');
                // const fileInput = document.querySelectorAll('.file-input');
                // const taskFromInfoContainer = document.querySelectorAll('.task-form-info-container');
                
                fileList = [];
                // console.log("listening...")
                // fileInput[index].addEventListener('change', () => {
                //     console.log("file uploaded...")
                //     // let fileImgContainer;
                //     for (let i = 0; i < fileInput[index].files.length; i++ ) {
                //         fileList.push(fileInput[index].files[i]);
                //         let fileImgContainer = document.createElement('div');
                //         fileImgContainer.classList.add('file-img-container');
                //         const imgContainer = document.createElement('div');
                //             imgContainer.classList.add('file_img_container');
                //             // const linkToUploadedImg = document.createElement('a');
                //             const imgFile = document.createElement('img');
                //             imgFile.classList.add('file_image');
                //             imgContainer.appendChild(imgFile);
    
                //             fileImgContainer.appendChild(imgContainer)
                //             taskFromInfoContainer[index].prepend(fileImgContainer);
                //     }

                //     // if (fileList.length > 0) {
                //     // fileList.forEach(file => {
                        
                //     //         const imgContainer = document.createElement('div');
                //     //         imgContainer.classList.add('file_img_container');
                //     //         // const linkToUploadedImg = document.createElement('a');
                //     //         const imgFile = document.createElement('img');
                //     //         imgFile.classList.add('file_image');
                //     //         imgContainer.appendChild(imgFile);
    
                //     //         taskFromInfoContainer[index].prepend(imgContainer);
                //     //     }
                //     // })
                //     console.log(fileList);
                // })

                /* --------just commented out --------- */
                // const fileInput = document.querySelectorAll('.file-input');
                // const taskFromInfoContainer = document.querySelectorAll('.task-form-info-container');
                
                // console.log(fileInput, taskFromInfoContainer);
                // fileInput[index].addEventListener('change', (event) => {
                    //     fileUploadMsgContainer.textContent = event.target.files[0].name;
                    //     taskFromInfoContainer[index].appendChild(fileUploadMsgContainer);
                    // })

                //     fileInput.forEach((input, i) => {
                //         if (i === index) {
                //             input.addEventListener('change', event => {
                //             const fileUploadMsgContainer = document.createElement('div');
                //             fileUploadMsgContainer.textContent = event.target.files[0].name;
                //             taskFromInfoContainer[i].appendChild(fileUploadMsgContainer);
                //         })
                //     }
                // })

                /* --------just commented out --------- */

                // const fileUploadMsgContainer = document.createElement('div');
                // (function (i) {
                //     fileInput[i].addEventListener('change', (event) => {
                //         fileUploadMsgContainer.textContent = '';
                //         fileUploadMsgContainer.textContent = event.target.files[0].name;
                //         console.log(taskFromInfoContainer[i], fileInput[i]);
                //       taskFromInfoContainer[i].appendChild(fileUploadMsgContainer);
                //     });
                //   })(index);
            }
        })
        
        modalCloseBtnArr[index].addEventListener('click', () => {
            modal.close();  // closes the modal...
            if (isFromTask) modal.style.left = "100vw";
            // fileList = []; // clearing the fileList array after closing the modal...

            // Clear the imgContainers from the modal
            // const fileImgContainer = document.querySelectorAll('.file-img-container');
            // fileImgContainer.forEach(f => f.innerHTML = '');
        })
    })
}