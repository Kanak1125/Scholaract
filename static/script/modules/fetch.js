// there is no use of the this module at this time...

export function fetchMaterials(pk) {

    var url = `/class/${pk}/`;
    console.log(url);
    fetch(url,  {
        headers: {
          'Accept': 'application/json'
        }
      })
    .then(response => response.json())
    .then(data => {
        // Handle the JSON response course_list
        console.log(data);
        const template = document.querySelector('.stream-template');
        const materialContainer = document.querySelector('.material-container');
    
        data.course_list.forEach(material => {
    
          const materialTemplate = document.querySelector(".stream-template");
          // Clone the new material card template so that the original template does not get overwritten for future use and insert it into the section.classes container...
          const clone = materialTemplate.content.cloneNode(true); // here is when the template is cloned...
          let title = clone.querySelector('.title');
          let uploader = clone.querySelector('.uploader');
          let description = clone.querySelector('.description');
    
          title.textContent = `${material.title}`;
          uploader.textContent = `${material.uploaded_by}`;
          description.textContent = `${material.description}`;
    
          const fileContainer = clone.querySelector('.file-container');
    
          // for every material.files array we will be performing the mapping and creating image thumbnails for every material card
          material.files.map(file => {
            const fileTemplate = document.querySelector(".file-template");
            const clone2 = fileTemplate.content.cloneNode(true);
    
            let fileLink = clone2.querySelector('.file_link');
            let fileImage = clone2.querySelector('.file_image');
            let imgFileName = clone2.querySelector('.img-file-name');
    
            if (file.file_url) {
              fileLink.href = `${file.file_url}`;
              imgFileName.textContent = file.file_name;
            } else {
              fileLink.style.display = 'none';
            }
    
            if (file.file_extension == '.pdf') {
              fileImage.src = "../../static/images/pdf watermark img.png";
            } else {
              fileImage.src = '../../static/images/image watermark img.png';
            }
            fileContainer.appendChild(clone2);
          });
    
          materialContainer.appendChild(clone);
        });
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }