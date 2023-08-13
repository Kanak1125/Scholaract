export function showPopup() {
    const popUp = [...document.querySelectorAll('.popup')];
    
    for ( let i = 0; i < popUp.length; i++ ) {
        const uploadFiles = [...document.querySelectorAll('.upload_files')][i];
        const msg = [...document.querySelectorAll('.msg')][i];
        const taskSubmitBtn = [...document.querySelectorAll('.task-submit-btn')][i];
        let timer;
        const p = popUp[i];
        
        uploadFiles.addEventListener('change', () => {
                p.classList.add("show");
                msg.textContent = uploadFiles.files.length > 1 ? 
                'File(s) recently added' :
                'File recently added'
                taskSubmitBtn.classList.remove('btn-disabled');

                clearInterval(timer);
            
                timer = setTimeout(() => {
                    p.classList.remove('show');
                }, 2500);
            })
            // const currentPopUp = [...document.querySelectorAll('.popup')][i];
            // currentPopUp.classList.add('show');
    
            // console.log("Files added.......")
    }
}

showPopup();

export function submissionSuccessPopup() {
    console.log("Running.......");
    const popUp = [...document.querySelectorAll('.popup')];

    // const taskSubmissionForm = [...document.querySelectorAll('.task-submission-form')];
    
    // taskSubmissionForm.forEach((form, i) => {
    //     form.addEventListener('submit', () => {
    //         console.log("Your task has been submitted...");
    //     })
    // })
    for ( let i = 0; i < popUp.length; i++ ) {
        const taskSubmissionForm = [...document.querySelectorAll('.task-submission-form')][i];
        const msg = [...document.querySelectorAll('.msg')][i];
        const taskSubmitBtn = [...document.querySelectorAll('.task-submit-btn')][i];
        let timer;
        const p = popUp[i];
        
        if (taskSubmissionForm) {
            taskSubmissionForm.addEventListener('submit', () => {
                    p.classList.add("show");
                    msg.textContent = taskSubmitBtn.classList.contains('btn-disabled') ? "Please upload your work above" : "Form submitted successfully";
            
                    clearInterval(timer);
                
                    timer = setTimeout(() => {
                        p.classList.remove('show');
                    }, 2500);
                })
                // const currentPopUp = [...document.querySelectorAll('.popup')][i];
                // currentPopUp.classList.add('show');
        
                // console.log("Files added.......")
        }
    }
}

submissionSuccessPopup();