const form = document.getElementById('form');
const inputs = Array.from(document.querySelectorAll('.input')); // creates an Array from all the nodes in DOM with the class name of '.input'...
const formError = document.querySelector('.error');

console.log(inputs);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isEmptyInput = inputs.some(input => input.value === '');  // returns 'false' even if atleast one of the input value is an empty string...
    const areAllFilled = !isEmptyInput;

    formError.textContent = areAllFilled ? "" : "Please fill up the fields!";

    if (areAllFilled) {
        form.submit();
    }
});

console.log(form, inputs);
