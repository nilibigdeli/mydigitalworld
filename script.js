let photoCount = 0;

function uploadPhoto() {
    const fileInput = document.getElementById('photo-upload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addPhotoToGallery(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a photo to upload.');
    }
}

function addPhotoToGallery(photoSrc) {
    const photoContainer = document.getElementById('photos-container');

    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');

    // Create photo element
    const photoElement = document.createElement('img');
    photoElement.src = photoSrc;

    // Create like button
    const likeButton = document.createElement('button');
    likeButton.innerText = 'Like';
    likeButton.classList.add('like-btn');
    likeButton.onclick = function() {
        this.classList.toggle('liked');
        this.innerText = this.classList.contains('liked') ? 'Liked' : 'Like';
    };

    // Create comments section
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';

    const commentList = document.createElement('div');
    
    commentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const commentText = commentInput.value.trim();
            if (commentText !== "") {
                const comment = document.createElement('p');
                comment.innerText = commentText;
                commentList.appendChild(comment);
                commentInput.value = '';
            }
        }
    });

    commentsSection.appendChild(commentInput);
    commentsSection.appendChild(commentList);

    // Add elements to photo card
    photoCard.appendChild(photoElement);
    photoCard.appendChild(likeButton);
    photoCard.appendChild(commentsSection);

    // Add photo card to gallery
    photoContainer.appendChild(photoCard);
}
