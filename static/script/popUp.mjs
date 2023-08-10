export function showPopup() {
    const popUp = [...document.querySelectorAll('.popup')];
    
    for ( let i = 0; i < popUp.length; i++ ) {
        const uploadFiles = [...document.querySelectorAll('.upload_files')][i];
        const msg = [...document.querySelectorAll('.msg')][i];
        let timer;
        const p = popUp[i];
        
        uploadFiles.addEventListener('change', () => {
                p.classList.add("show");
                msg.textContent = uploadFiles.files.length > 1 ? 
                'File(s) recently added' :
                'File recently added'
        
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