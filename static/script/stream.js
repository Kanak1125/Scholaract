// $(document).ready(function() {
//     $(".nav-bar-container").load("{% include '../../includes/navbar202.html' %}");
// });

const dropBtn = document.querySelector('.drop-btn');

// when the document is ready run the function inside of it...
function handleDropDownClick(e, btn, dropdown) {
    e.stopPropagation(); // prevent event bubbling
    btn.classList.toggle('active');
    $(dropdown).slideToggle('fast');   // slideToggle() method is performed everytime the button is clicked...
}

$(document).ready(function() {
    const userDropDown = document.querySelector('.drop-down');
    const materialCardDropDown = [...document.querySelectorAll('.update-drop-down')];
    const userDropDownBtn = dropBtn;
    const materialCardDropDownBtn = [...document.querySelectorAll('.edit-delete-menu')];

    $(userDropDownBtn).click(function (e) {     // when an element with '.drop-btn' in html is clicked it runs the function inside of click() method again...
        handleDropDownClick(e, userDropDownBtn, userDropDown);
    });

    materialCardDropDownBtn.forEach((dropDown, index) => {
        $(dropDown).click(function (e) {
            handleDropDownClick(e, dropDown, materialCardDropDown[index]);  // for Each materialCardDropDownBtn, same materialCardDropDown in its index is passed as argument to the handleDropDownClick() function...
        });
    })

    $(document).click(function (event) {
        event.stopPropagation();
        var target = $(event.target);
        if(!target.is('.drop-btn') && !target.closest('.drop-down').length) {
            $('.drop-down').slideUp('fast');
            dropBtn.classList.remove('active');
        }
    })

    // slideUp the drop-down even when the document is scrolled by the user...
    $(document).scroll(function () {
        $('.drop-down').slideUp('fast');
        dropBtn.classList.remove('active');
    })
});

// javaSCript code that will listen to the scoll event of the page and when the vertical scroll is more than '100px' '.scroll-active' class is added to the classInfoCard...
const classInfoCard = document.querySelector('.class-info-card');
document.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        classInfoCard.classList.add('scroll-active');
    } else {
        classInfoCard.classList.remove('scroll-active');
    }
})

const materialsArray = JSON.parse(document.querySelector('.material-container').dataset.materials);

console.log(materialsArray);

// // function to generate PDF thumbnail in js using PDF.js library...
// function generatePDFThumbnail(fileURL, callback) {
//     fetch(fileURL)
//     .then(function(response) {
//       if (!response.ok) {
//         throw new Error('HTTP error, status = ' + response.status);
//       }
//       if (response.blob) {
//         return response.blob();
//       }
//       return response.arrayBuffer();
//     })
//     .then(function(result) {
//       if (result instanceof ArrayBuffer) {
//         var arrayBuffer = result;
//         // Continue with the rest of the code...
//       } else {
//         var blob = result;
//         var reader = new FileReader();
//         reader.onload = function() {
//           var typedArray = new Uint8Array(reader.result);
        

//         // Load the PDF using PDF.js
//       pdfjsLib.getDocument(typedArray).promise.then(function(pdf) {
//         // Fetch the first page of the PDF
//         pdf.getPage(1).then(function(page) {
//           var viewport = page.getViewport({ scale: 1 });
//           var canvas = document.createElement('canvas');
//           var context = canvas.getContext('2d');
//           var maxSize = 100; // Maximum thumbnail size (adjust as needed)
//           var scale = maxSize / Math.max(viewport.width, viewport.height);
//           var scaledViewport = page.getViewport({ scale: scale });
          
//           canvas.width = scaledViewport.width;
//           canvas.height = scaledViewport.height;
          
//           var renderContext = {
//             canvasContext: context,
//             viewport: scaledViewport
//           };
          
//           // Render the page onto the canvas
//           page.render(renderContext).promise.then(function() {
//             var thumbnail = canvas.toDataURL('image/jpeg');
//             callback(thumbnail);
//           });
//         });
//       });
//         };
//       reader.readAsArrayBuffer(arrayBuffer);
//     };
//     })
//     .catch(function(error) {
//       console.error('Error fetching file:', error);
//     });
// }

// checking browser support...
if ('content' in document.createElement('template')) {
    materialsArray.map(material => {    // runs the following code for every object in classesArray and returns the array of Class cloned cards with their data in it...
        const materialTemplate = document.querySelector(".stream-template");
        // Clone the new material card template so that the original template doesnot get overwritten for future use and insert it into the section.classes container...
        const clone = materialTemplate.content.cloneNode(true);    // here is when the template is cloned...
            let title = clone.querySelector('.title');
            let uploader = clone.querySelector('.uploader');
            let description = clone.querySelector('.description');

            title.textContent = `${material.title}`;
            uploader.textContent = `${material.uploaded_by}`;
            description.textContent = `${material.description}`; 
            
            const fileContainer = clone.querySelector('.file-container');

            // for every material.files array we will be performing the mapping and creating image thumbnails for every material cards
            (material.files).map(file => {
                const fileTemplate = document.querySelector(".file-template");

                const clone2 = fileTemplate.content.cloneNode(true);

                let fileLink = clone2.querySelector('.file_link');
                let fileImage = clone2.querySelector('.file_image');
                let imgFileName = clone2.querySelector('.img-file-name');

                if (file.file_url){
                    fileLink.href = `${file.file_url}`;
                    imgFileName.textContent = file.file_name;
                }else{
                    fileLink.style.display = 'none';
                }

                if (file.file_extension == '.pdf') {
                    fileImage.src = "../../static/images/pdf watermark img.png";
                } else {
                  fileImage.src = '../../static/images/image watermark img.png'
                }

                fileContainer.appendChild(clone2);
            });
            // material.files.forEach(f =>{
            //     if (f.file_url){
            //         fileLink.href = `${f.file_url}`;
            //         imgFileName.textContent = f.file_name;
            //     }else{
            //         file.style.display = 'none';
            //     }

            //     if (f.file_extension == '.pdf') {
            //         fileImage.src = "../../static/images/pdf watermark img.png";
            //     } else {
            //       fileImage.src = '../../static/images/image watermark img.png'
            //     }
            // })
            // if (material.file_url){
            //     file.href = `${material.file_url}`;
            //     imgFileName.textContent = material.file_name;
            // }else{
            //     file.style.display = 'none';
            // }

            // if (material.file_extension == '.pdf') {
            //   fileImage.src = "../../static/images/pdf watermark img.png";
            // } else {
            //   fileImage.src = '../../static/images/image watermark img.png'
            // }
            
            const materialContainer = document.querySelector('.material-container');
            
            // generatePDFThumbnail(material.file_url, function(thumbnail) {
            //     var thumbnailImg = document.getElementById('file_thumbnail');
            //     thumbnailImg.src = thumbnail;
            // });
            materialContainer.appendChild(clone);
    })

} else {
    console.log("template not found!");
}

const editPost = [...document.querySelectorAll('.edit-post')];  // this selects every element with '.edit-post' class and assign it to 'editPost' array using querySelectorAll and spread operator(...) ...
const closeModal = [...document.querySelectorAll('.close-modal')];  // this selects every '.close-modal' as there are multiple material cards and store it in the 'closeModal' array as in above...

const updateModal = document.querySelector('.update-modal'); // selects the dialog element in HTML...

const updateForm = document.getElementById('update-form');

editPost.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.showModal();  // displays the modal with .showModal() method for dialog elements, to show dialog just use show() inbuilt() method...
    })
})

closeModal.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.close();  // closes the modal...
    })
})