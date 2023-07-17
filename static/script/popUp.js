// const fileInputs = document.querySelectorAll('.file-input');
// console.log(fileInputs);
// const popUp = document.querySelector('.popup');
// console.log(popUp);
// // const modal = document.querySelectorAll('.modal');
// // document.body.append(popUp);
// console.log(modal);
// fileInputs.forEach((fi, index) => {
//     // const currentModal = modal[index];
//     fi.addEventListener('change', () => {
//         console.log('File............')
//         const newPopUp = popUp.cloneNode(true);
//         newPopUp.classList.add('show');
//         currentModal.append(newPopUp);
//     })
// })

// const uploadFiles = [...document.querySelectorAll('.upload_files')];
// const msg = [...document.querySelectorAll('.msg')];
// let timer;

// const popUp = [...document.querySelectorAll('.popup')];
// console.log(uploadFiles, msg, popUp)
// const addPopUp = () => {
//     popUp.forEach((p, index) => {
//         popUp[index].classList.add('show');
//         console.log("Files added.......")
//         msg[index].textContent = uploadFiles[index].files.length > 1 ? 
//         'File(s) recently added' :
//         'File recently added'
        
//         clearInterval(timer);
    
//         timer = setInterval(() => {
//             popUp[index].classList.remove('show');
//         }, 2500);
//     })
// }

// const addPopUp = () => {
//     popUp.forEach((p, index) => {
//         popUp[index].classList.add('show');
//         console.log("Files added.......")
//         msg[index].textContent = uploadFiles[index].files.length > 1 ? 
//         'File(s) recently added' :
//         'File recently added'
        
//         clearInterval(timer);
    
//         timer = setInterval(() => {
//             popUp[index].classList.remove('show');
//         }, 2500);
//     })
// }

// problems due to closures in task_students...
const popUp = [...document.querySelectorAll('.popup')];

for ( let i = 0; i < popUp.length; i++ ) {
    const uploadFiles = [...document.querySelectorAll('.upload_files')][i];
    const msg = [...document.querySelectorAll('.msg')][i];
    let timer;
    
    uploadFiles.addEventListener('change', () => {
        popUp.forEach(p => {
            p.classList.add("show");
            msg.textContent = uploadFiles.files.length > 1 ? 
            'File(s) recently added' :
            'File recently added'
    
            clearInterval(timer);
        
            timer = setInterval(() => {
                p.classList.remove('show');
            }, 2500);
        })
        // const currentPopUp = [...document.querySelectorAll('.popup')][i];
        // currentPopUp.classList.add('show');

        // console.log("Files added.......")
    })
}

// uploadFiles.forEach(up => up.addEventListener('change', addPopUp));