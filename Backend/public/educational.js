// Get references to elements
const categoryLinks = document.querySelectorAll(".side-bar ul li a");
const singleVideos = document.querySelectorAll(".single-video");
document.getElementById("mutualFundCalculator").style.display = "none";
document.getElementById("sipCalculator").style.display = "none";

// Function to show or hide videos based on the selected category
function filterVideos(category) {
  singleVideos.forEach((video) => {
    const videoCategory = video.getAttribute("data-category");
    if (category === "all" || videoCategory === category) {
      video.style.display = "flex"; // Show the video
    } else {
      video.style.display = "none"; // Hide the video
    }
  });
}

// Event listeners for the category links
categoryLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedCategory = link.getAttribute("data-category");
    filterVideos(selectedCategory);
    handleCategoryClick(selectedCategory);
  });
});

// Initial filtering (show all videos)
filterVideos("all");

// Get all the <li> elements
const liElements = document.querySelectorAll(".side-bar ul li");

// Add a click event listener to each <li> element
liElements.forEach((li) => {
  li.addEventListener("click", function () {
    // Remove the "active" class from all <li> elements
    liElements.forEach((element) => {
      element.classList.remove("active");
    });

    // Add the "active" class to the clicked <li> element
    this.classList.add("active");
  });
});

function showSIPCalculator() {
  document.getElementById("sipCalculator").style.display = "block";
  document.getElementById("mutualFundCalculator").style.display = "none";
}

// Function to show the Mutual Fund Calculator section
function showMutualFundCalculator() {
  document.getElementById("mutualFundCalculator").style.display = "block";
  document.getElementById("sipCalculator").style.display = "none";
}

// Function to handle category clicks and show/hide calculators
function handleCategoryClick(category) {
  if (category === "sip") {
    showSIPCalculator();
  } else if (category === "mutual") {
    showMutualFundCalculator();
  } else {
    document.getElementById("mutualFundCalculator").style.display = "none";
    document.getElementById("sipCalculator").style.display = "none";
    filterVideos(category);
  }
}
