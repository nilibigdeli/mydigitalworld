let photoData = JSON.parse(localStorage.getItem('photoGallery')) || [];

// Load photos from localStorage when the page loads
window.onload = function() {
    loadPhotosFromLocalStorage();
};

function uploadPhoto() {
    const fileInput = document.getElementById('photo-upload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoSrc = e.target.result;
            addPhotoToGallery(photoSrc, []);
            savePhotoToLocalStorage(photoSrc, []);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a photo to upload.');
    }
}

function addPhotoToGallery(photoSrc, comments, liked = false) {
    const photoContainer = document.getElementById('photos-container');

    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');

    // Create photo element
    const photoElement = document.createElement('img');
    photoElement.src = photoSrc;

    // Create like button
    const likeButton = document.createElement('button');
    likeButton.innerText = liked ? 'Liked' : 'Like';
    likeButton.classList.add('like-btn');
    if (liked) {
        likeButton.classList.add('liked');
    }
    likeButton.onclick = function() {
        this.classList.toggle('liked');
        this.innerText = this.classList.contains('liked') ? 'Liked' : 'Like';
        updateLikeStatusInLocalStorage(photoSrc, this.classList.contains('liked'));
    };

    // Create comments section
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';

    const commentList = document.createElement('div');
    
    // Add any existing comments from localStorage
    comments.forEach(commentText => {
        const comment = document.createElement('p');
        comment.innerText = commentText;
        commentList.appendChild(comment);
    });

    // Add new comment when pressing "Enter"
    commentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const commentText = commentInput.value.trim();
            if (commentText !== "") {
                const comment = document.createElement('p');
                comment.innerText = commentText;
                commentList.appendChild(comment);
                commentInput.value = '';

                // Save comment to localStorage
                addCommentToLocalStorage(photoSrc, commentText);
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

function savePhotoToLocalStorage(photoSrc, comments) {
    photoData.push({ photoSrc, comments, liked: false });
    localStorage.setItem('photoGallery', JSON.stringify(photoData));
}

function addCommentToLocalStorage(photoSrc, comment) {
    const photo = photoData.find(p => p.photoSrc === photoSrc);
    if (photo) {
        photo.comments.push(comment);
        localStorage.setItem('photoGallery', JSON.stringify(photoData));
    }
}

function updateLikeStatusInLocalStorage(photoSrc, liked) {
    const photo = photoData.find(p => p.photoSrc === photoSrc);
    if (photo) {
        photo.liked = liked;
        localStorage.setItem('photoGallery', JSON.stringify(photoData));
    }
}

function loadPhotosFromLocalStorage() {
    photoData.forEach(photo => {
        addPhotoToGallery(photo.photoSrc, photo.comments, photo.liked);
    });
}
