// the toggleModal(param1, param2, param3) function will be exported as DEFAULT when this file is imported to other js files with 'export default' keyword as similar as exporting the component in React.js...

export default function toggleModal(modalArr, modalOpenBtnArr, modalCloseBtnArr) {
    modalArr.forEach(modal => {
        modalOpenBtnArr.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.showModal();  // displays the modal with .showModal() method for dialog elements, to show dialog just use show() inbuilt() method...
            })
        })
        
        modalCloseBtnArr.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.close();  // closes the modal...
            })
        })
    })
}