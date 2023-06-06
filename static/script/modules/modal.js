// the toggleModal(param1, param2, param3, param4) function will be exported as DEFAULT when this file is imported to other js files with 'export default' keyword as similar as exporting the component in React.js...

export default function toggleModal(modalArr, modalOpenBtnArr, modalCloseBtnArr, isFromTask) {
    modalArr.forEach((modal, index) => {
        modalOpenBtnArr[index].addEventListener('click', () => {
            modal.showModal();  // displays the modal with .showModal() method for dialog elements, to show dialog just use show() inbuilt() method...
            if (isFromTask) modal.style.left = "20vw";
        })
        
        modalCloseBtnArr[index].addEventListener('click', () => {
            modal.close();  // closes the modal...
            if (isFromTask) modal.style.left = "100vw";
        })
    })
}