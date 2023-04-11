const form = document.getElementById('form');
const userName = document.getElementById('name');
const password = document.getElementById('password');

// fires when the form is submitted...
form.addEventListener('submit', function(e){
    e.preventDefault();
    validateInputs();
})

// helper function to setError to the specific element container...
function setError(element, msg) {
    const parent = element.parentElement;
    const errorNode = parent.lastElementChild;

    errorNode.textContent = msg;
}

// helper function to remove Error from the specific element container...
function removeError(element) {
    const parent = element.parentElement;
    const errorNode = parent.lastElementChild;

    errorNode.textContent = ""; // js property: textContent
}

function validateInputs() {
    validateUserName();
    validatePassword();
}

function validateUserName() {
    if (userName.value === "") {
        setError(userName, "Please enter username !");
    } else if (/\d/.test(userName.value)) {
        setError(userName, "Username shouldn't contain a number");  // here '\d' is a regular expression equivalent to [0-9] and test() will return true if the string contains any numbers otherwise false...
    } else {
        removeError(userName);
    }
}

function validatePassword() {
    const patternForPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/; // regExp pattern to check atleast one letter or number present in the password value...

    if(password.value === "") {
        setError(password, "Please enter the password !");
    } else if (password.value.split("").length < 8) {  // split() the string to the array of characters...
        setError(password, "Minimum 8 charaters required!");
    }
    else if (!password.value.match(patternForPass)) {
        setError(password, "Password must contain at least 1 letter & 1 number");
    } else {
        removeError(password);
    }
}