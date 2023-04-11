const form = document.getElementById('form');
const userName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('c_password');

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
    // console.log(parent, errorNode);
}

// helper function to remove Error from the specific element container...
function removeError(element) {
    const parent = element.parentElement;
    const errorNode = parent.lastElementChild;

    errorNode.textContent = ""; // js property: textContent
}

function validateInputs() {
    validateUserName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
}

function validateUserName() {
    if (userName.value === "") {
        setError(userName, "Username should not be empty!");
    } else if (/\d/.test(userName.value)) {
        setError(userName, "Username shouldn't contain a number");  // here '\d' is a regular expression equivalent to [0-9] and test() will return true if the string contains any numbers otherwise false...
    } else {
        removeError(userName);
    }
}

function validateEmail() {
    const pattern = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;    // regular expression pattern to validate the existence of the characters in the email...

    if (email.value === "") {
        setError(email, "Email should not be empty!");
    } else if (!email.value.match(pattern)) {
        // console.log(email.value.match(pattern));
        setError(email, "Invalid Email!");
    } else {
        removeError(email);
    }
}

function validatePassword() {
    const patternForPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/; // regExp pattern to check atleast one letter or number present in the password value...

    if(password.value === "") {
        setError(password, "Password should not be empty!");
    } else if (password.value.split("").length < 8) {  // split() the string to the array of characters...
        setError(password, "Minimum 8 charaters required!");
    }
    else if (!password.value.match(patternForPass)) {
        setError(password, "Password must contain at least 1 letter & 1 number");
    } else {
        removeError(password);
    }
}

function validateConfirmPassword() {
    if(confirmPassword.value === "") {
        setError(confirmPassword, "Password should not be empty!");
    } else if (confirmPassword.value != password.value) {  // split() the string to the array of characters...
        setError(password, "Password not match!");
        setError(confirmPassword, "Password not match!");
    } else {
        removeError(confirmPassword);
    }
}