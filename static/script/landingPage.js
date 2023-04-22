const hamburgerIcon = document.querySelector('.hamburger-icon');
const navSubContainer = document.querySelector('.nav-sub-container');   // this <div> contains everything except the logo...

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle('active');
    navSubContainer.classList.toggle('active');
})