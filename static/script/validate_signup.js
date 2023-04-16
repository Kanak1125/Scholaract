const form = document.getElementById('form');
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('c_password');
const submitBtn = document.getElementById('login-btn');


submitBtn.setAttribute('disabled');
// fires when the form is submitted...
// form.addEventListener('submit', function(e){
//     e.preventDefault();
//     validateInputs();
// })

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

// function validateInputs() {
//     validateUserName(fName, "Please enter firstname!");
//     validateUserName(lName, "Please enter lastname!");
//     validateEmail();
//     validatePassword();
//     validateConfirmPassword();
// }

function validateUserName(userName, errMsg) {
    if (userName.value === "") {
        setError(userName, errMsg);
        return false;
    } else if (/\d/.test(userName.value)) {
        setError(userName, "Shouldn't contain number!");  // here '\d' is a regular expression equivalent to [0-9] and test() will return true if the string contains any numbers otherwise false...
        return false;
    } else {
        removeError(userName);
        return true;
    }
}

function validateEmail() {
    const pattern = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;    // regular expression pattern to validate the existence of the characters in the email...

    if (email.value === "") {
        setError(email, "Please enter your email !");
        return false;
    } else if (!email.value.match(pattern)) {
        // console.log(email.value.match(pattern));
        setError(email, "Invalid Email !");
        return false;
    } else {
        removeError(email);
        return true;
    }
}

function validatePassword() {
    const patternForPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/; // regExp pattern to check atleast one letter or number present in the password value...

    if(password.value === "") {
        setError(password, "Please enter the password !");
        return false;
    } else if (password.value.split("").length < 8) {  // split() the string to the array of characters...
        setError(password, "Minimum 8 charaters required!");
        return false;
    }
    else if (!password.value.match(patternForPass)) {
        setError(password, "Password must contain at least 1 letter & 1 number");
        return false;
    } else {
        removeError(password);
        return true;
    }
}

function validateConfirmPassword() {
    if(confirmPassword.value === "") {
        setError(confirmPassword, "Please enter the password !");
        return false;
    } else if (confirmPassword.value != password.value) {  // split() the string to the array of characters...
        setError(password, "Password not match!");
        setError(confirmPassword, "Password not match!");
        return false;
    } else {
        removeError(confirmPassword);
        return true;
    }
}