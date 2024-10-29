const images = [
  'img1', 'img2', 'img3', 'img4', 'img5'
];

let imageContainer = document.getElementById('image-container');
let resetButton = document.getElementById('reset');
let verifyButton = document.getElementById('verify');
let message = document.getElementById('para');
let selectedImages = [];
let selectedIndices = [];

function initialize() {
  // Clear existing images
  imageContainer.innerHTML = '';
  message.innerHTML = '';
  selectedImages = [];
  selectedIndices = [];
  
  // Randomly choose an image to duplicate
  let duplicateIndex = Math.floor(Math.random() * images.length);
  let imagesWithDuplicate = [...images];
  imagesWithDuplicate.splice(duplicateIndex, 0, images[duplicateIndex]);

  // Shuffle the images
  imagesWithDuplicate = imagesWithDuplicate
    .map(img => ({ img, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ img }) => img);

  // Render images
  imagesWithDuplicate.forEach((imgClass, index) => {
    const imgElement = document.createElement('img');
    imgElement.className = imgClass;
    imgElement.dataset.index = index;
    imgElement.addEventListener('click', () => handleImageClick(index, imgClass));
    imageContainer.appendChild(imgElement);
  });

  // Hide buttons initially
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
}

function handleImageClick(index, imgClass) {
  // Prevent duplicate selection of the same image
  if (selectedIndices.includes(index)) return;

  selectedImages.push(imgClass);
  selectedIndices.push(index);

  // Show reset button after the first click
  if (selectedImages.length === 1) {
    resetButton.style.display = 'inline';
  }

  // Show verify button only after two different images are selected
  if (selectedImages.length === 2) {
    verifyButton.style.display = 'inline';
  }
}

resetButton.addEventListener('click', () => {
  initialize();
});

verifyButton.addEventListener('click', () => {
  verifyButton.style.display = 'none';
  resetButton.style.display = 'inline';
  
  if (selectedImages[0] === selectedImages[1]) {
    message.innerHTML = "You are a human. Congratulations!";
  } else {
    message.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize the app on page load
initialize();
