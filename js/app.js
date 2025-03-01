document.addEventListener("DOMContentLoaded", function () {
  // Dark theme toggler logic
  const themeSwitcherButtons = document.querySelectorAll(".switcher");

  // Default to light theme if no preference is set in localStorage
  // if (localStorage.getItem("color-theme") === "dark") {
  //   document.documentElement.classList.add("dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  //   localStorage.setItem("color-theme", "light"); // Set default to light
  // }

  themeSwitcherButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentTheme = localStorage.getItem("color-theme");

      if (currentTheme === "light") {
        // Switch to dark theme
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        // Switch to light theme
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    });
  });

  // FAQ Accordion Logic
  let faqs = document.querySelectorAll(".faq");
  for (let faq of faqs) {
    let answer = faq.querySelector(".faq-answer");
    let arrow = faq.querySelector(".arrow-down");
    
    faq.addEventListener("click", () => {
      for (let otherFaq of faqs) {
        let otherAnswer = otherFaq.querySelector(".faq-answer");
        let otherArrow = otherFaq.querySelector(".arrow-down");

        if (faq !== otherFaq) {
          otherAnswer.style.maxHeight = "0px";
          otherArrow.classList.replace("rotate-180", "rotate-0");
        }
      }

      if (arrow.classList.contains("rotate-180")) {
        answer.style.maxHeight = "0px";
        arrow.classList.replace("rotate-180", "rotate-0");
      } else {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        arrow.classList.replace("rotate-0", "rotate-180");
      }
    });
  }

  // Tab and Panel Logic (example code for tab functionality)
  let tabs = document.querySelectorAll(".tab");
  let tabIndicator = document.querySelector(".tab-indicator");
  let panels = document.querySelectorAll(".panel");
  let panelPreviews = document.querySelectorAll(".panel-preview");

  if (tabIndicator !== null) {
    tabIndicator.style.width = `${tabs[0].getBoundingClientRect().width}px`;
    tabIndicator.style.left = `${tabs[0].getBoundingClientRect().left - tabs[0].parentElement.getBoundingClientRect().left}px`;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      let activePanelId = tab.getAttribute("aria-controls");

      // Update the tab indicator position and width
      tabIndicator.style.width = `${tab.getBoundingClientRect().width}px`;
      tabIndicator.style.left = `${tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left}px`;

      panels.forEach((panel) => {
        let panelId = panel.getAttribute("id");

        if (activePanelId === panelId) {
          panel.classList.remove("invisible", "opacity-0", "scale-90");
          panel.classList.add("visible", "opacity-100", "scale-100");
        } else {
          panel.classList.add("invisible", "opacity-0", "scale-90");
          panel.classList.remove("visible", "opacity-100", "scale-100");
        }

        panelPreviews.forEach((preview) => {
          let previewTarget = preview.getAttribute("data-target");

          if (activePanelId === previewTarget) {
            preview.classList.replace("translate-y-[100%]", "translate-y-0");
            preview.classList.replace("scale-75", "scale-100");
            preview.classList.replace("opacity-50", "opacity-100");
            preview.classList.replace("z-0", "z-10");
          } else {
            preview.classList.replace("scale-100", "scale-75");
            preview.classList.replace("opacity-100", "opacity-50");
            preview.classList.replace("z-10", "z-0");

            setTimeout(() => {
              preview.classList.replace("translate-y-0", "translate-y-[100%]");
            }, 300);
          }
        });
      });
    });
  });

  // Hamburger Menu Logic (for mobile view)
  const hamburger = document.querySelector("#hamburger");
  const navbar = document.querySelector("#navbar");

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("navbar-active");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  
  // Function to toggle the visibility of the slider
  function toggleSlider(sliderId) {
    // Get the selected slider by ID
    const selectedSlider = document.getElementById(sliderId);

    // Check if the selected slider is already open
    if (selectedSlider && selectedSlider.classList.contains('hidden')) {
      // If it's hidden, remove the 'hidden' class and show it
      selectedSlider.classList.remove('hidden');
    } else if (selectedSlider) {
      // If it's already visible, add the 'hidden' class and hide it
      selectedSlider.classList.add('hidden');
    }

    // Get all sliders and hide them (except for the clicked one)
    const allSliders = document.querySelectorAll('.slider');
    allSliders.forEach(slider => {
      // Hide all sliders except the selected one
      if (slider !== selectedSlider) {
        slider.classList.add('hidden');
      }
    });
  }

  // Show "wire-slider" by default on page load (this part is new)
  const wireSlider = document.getElementById("wire-slider");
  if (wireSlider) {
    wireSlider.classList.remove('hidden');  // "wire-slider" will be visible by default
  }

  // Add the toggleSlider function to the global scope so it can be used in the button's onclick
  window.toggleSlider = toggleSlider;
  
  // Slider Logic for "wire-slider"
  const wirePrevButton = document.getElementById("prev");
  const wireNextButton = document.getElementById("next");
  const wireSliderContainer = document.getElementById("slider-container");

  let wireCurrentIndex = 0;
  const wireSlides = wireSliderContainer.children;
  const wireTotalSlides = wireSlides.length;
  const wireSlidesVisible = 4;

  // Function to update the slider's visible slides for wire-slider
  function updateSliderVisibility() {
    for (let i = 0; i < wireTotalSlides; i++) {
      if (i >= wireCurrentIndex && i < wireCurrentIndex + wireSlidesVisible) {
        wireSlides[i].style.display = 'block';
      } else {
        wireSlides[i].style.display = 'none';
      }
    }

    wirePrevButton.style.display = wireCurrentIndex <= 0 ? 'none' : 'block';
    wireNextButton.style.display = wireCurrentIndex >= wireTotalSlides - wireSlidesVisible ? 'none' : 'block';
  }

  wireNextButton.addEventListener("click", function() {
    if (wireCurrentIndex < wireTotalSlides - wireSlidesVisible) {
      wireCurrentIndex++;
    } else {
      wireCurrentIndex = 0;
    }
    updateSliderVisibility();
  });

  wirePrevButton.addEventListener("click", function() {
    if (wireCurrentIndex > 0) {
      wireCurrentIndex--;
    } else {
      wireCurrentIndex = wireTotalSlides - wireSlidesVisible;
    }
    updateSliderVisibility();
  });

  // Initialize the wire slider
  updateSliderVisibility();

  // Slider Logic for "ultra-precision-slider"
  const ultraPrevButton = document.getElementById("prev-ultra");
  const ultraNextButton = document.getElementById("next-ultra");
  const ultraSliderContainer = document.getElementById("slider-container-ultra-precision");

  let ultraCurrentIndex = 0;
  const ultraSlides = ultraSliderContainer.children;
  const ultraTotalSlides = ultraSlides.length;
  const ultraSlidesVisible = 4;

  function updateUltraSliderVisibility() {
    for (let i = 0; i < ultraTotalSlides; i++) {
      if (i >= ultraCurrentIndex && i < ultraCurrentIndex + ultraSlidesVisible) {
        ultraSlides[i].style.display = 'block';
      } else {
        ultraSlides[i].style.display = 'none';
      }
    }

    ultraPrevButton.style.display = ultraCurrentIndex <= 0 ? 'none' : 'block';
    ultraNextButton.style.display = ultraCurrentIndex >= ultraTotalSlides - ultraSlidesVisible ? 'none' : 'block';
  }

  ultraNextButton.addEventListener("click", function() {
    if (ultraCurrentIndex < ultraTotalSlides - ultraSlidesVisible) {
      ultraCurrentIndex++;
    } else {
      ultraCurrentIndex = 0;
    }
    updateUltraSliderVisibility();
  });

  ultraPrevButton.addEventListener("click", function() {
    if (ultraCurrentIndex > 0) {
      ultraCurrentIndex--;
    } else {
      ultraCurrentIndex = ultraTotalSlides - ultraSlidesVisible;
    }
    updateUltraSliderVisibility();
  });

  // Initialize the ultra-precision slider
  updateUltraSliderVisibility();

  // Slider Logic for "diamond-gifts-slider"
  const diamondPrevButton = document.getElementById("prev-diamond");
  const diamondNextButton = document.getElementById("next-diamond");
  const diamondSliderContainer = document.getElementById("slider-container-diamond-gifts");

  let diamondCurrentIndex = 0;
  const diamondSlides = diamondSliderContainer.children;
  const diamondTotalSlides = diamondSlides.length;
  const diamondSlidesVisible = 4;

  function updateDiamondSliderVisibility() {
    for (let i = 0; i < diamondTotalSlides; i++) {
      if (i >= diamondCurrentIndex && i < diamondCurrentIndex + diamondSlidesVisible) {
        diamondSlides[i].style.display = 'block';
      } else {
        diamondSlides[i].style.display = 'none';
      }
    }

    diamondPrevButton.style.display = diamondCurrentIndex <= 0 ? 'none' : 'block';
    diamondNextButton.style.display = diamondCurrentIndex >= diamondTotalSlides - diamondSlidesVisible ? 'none' : 'block';
  }

  diamondNextButton.addEventListener("click", function() {
    if (diamondCurrentIndex < diamondTotalSlides - diamondSlidesVisible) {
      diamondCurrentIndex++;
    } else {
      diamondCurrentIndex = 0;
    }
    updateDiamondSliderVisibility();
  });

  diamondPrevButton.addEventListener("click", function() {
    if (diamondCurrentIndex > 0) {
      diamondCurrentIndex--;
    } else {
      diamondCurrentIndex = diamondTotalSlides - diamondSlidesVisible;
    }
    updateDiamondSliderVisibility();
  });

  // Initialize the diamond gifts slider
  updateDiamondSliderVisibility();

});


// Function to set active menu based on URL
function updateActiveMenu() {
  const currentPath = window.location.pathname.split("/").pop(); // Get the current filename
  // Remove 'active' class from all menu items
  document.querySelectorAll(".activeMenu").forEach((menu) => {
    menu.classList.remove("active");
  });
  // Find the menu item with matching href and set it as active
  document.querySelectorAll(".activeMenu").forEach((item) => {
    if (item.getAttribute("href") === currentPath) {
      item.classList.add("active");
    }
  });
}
// Apply active menu on page load
window.addEventListener("DOMContentLoaded", updateActiveMenu);
// Handle menu item click event
document.querySelectorAll(".activeMenu").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Navigate to the clicked menu link
    window.location.href = this.getAttribute("href");

    // Update active menu based on new URL
    setTimeout(updateActiveMenu, 100); // Short delay to ensure page updates
  });
});
// Handle logo click (Always go to Home)
document.getElementById("logo").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "index.html";
  setTimeout(updateActiveMenu, 100);
});
// Detect back/forward button press and update active menu
window.addEventListener("popstate", updateActiveMenu);


// ---------------------------Contact Form--------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  var phoneInput = document.getElementById("phone");
  if (phoneInput) {
  var statusMessage = document.getElementById("status-message");
  var isSubmitting = false; // Flag to prevent multiple submissions

  var iti = window.intlTelInput(phoneInput, {
    initialCountry: "in",
    preferredCountries: ["in"],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple clicks

    isSubmitting = true; // Set flag
    var submitButton = document.getElementById("submit-button");
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="relative text-base font-semibold text-white dark:text-dark">Processing...</span>';

    emailjs.init("4d1t5NgfRXRx1C1zz");

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = iti.getNumber();
    var message = document.getElementById("message");

    let isValid = true;
    document.querySelectorAll(".text-sm.text-red-500").forEach((error) => error.classList.add("hidden"));

    if (!name.value.trim()) {
      document.getElementById("name-error").classList.remove("hidden");
      document.getElementById("name-error").innerText = "Name is required.";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.value.trim()) {
      document.getElementById("email-error").classList.remove("hidden");
      document.getElementById("email-error").innerText = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      document.getElementById("email-error").classList.remove("hidden");
      document.getElementById("email-error").innerText = "Please enter a valid email.";
      isValid = false;
    }

    if (!phone.trim()) {
      document.getElementById("phone-error").classList.remove("hidden");
      document.getElementById("phone-error").innerText = "Phone is required.";
      isValid = false;
    } else if (!iti.isValidNumber()) {
      document.getElementById("phone-error").classList.remove("hidden");
      document.getElementById("phone-error").innerText = "Please enter a valid phone number.";
      isValid = false;
    }

    if (!isValid) {
      submitButton.disabled = false;
      submitButton.innerHTML = '<span class="relative text-base font-semibold text-white dark:text-dark">Submit Application</span>';
      isSubmitting = false; // Reset flag
      return;
    }

    var templateParams = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone,
      message: message.value.trim(),
    };

    emailjs.send("service_pdfv3ss", "template_8thkpzi", templateParams)
      .then(function (response) {
        console.log("Email sent successfully:", response);
        statusMessage.innerText = "✅ Thanks for contacting us!";
        statusMessage.classList.remove("text-red-500");
        statusMessage.classList.add("text-green-900");

        // Clear form fields
        name.value = "";
        email.value = "";
        phoneInput.value = "";
        message.value = "";

        submitButton.disabled = false;
        submitButton.innerHTML = '<span class="relative text-base font-semibold text-white dark:text-dark">Submit Application</span>';
        isSubmitting = false; // Reset flag

        // Remove status message after 10 seconds
        setTimeout(() => {
          statusMessage.innerText = "";
          statusMessage.classList.remove("text-green-900");
        }, 10000);
      })
      .catch(function (error) {
        console.error("Error sending email:", error);
        statusMessage.innerText = "❌ Failed to send message. Please try again.";
        statusMessage.classList.add("text-red-500");

        submitButton.disabled = false;
        submitButton.innerHTML = '<span class="relative text-base font-semibold text-white dark:text-dark">Submit Application</span>';
        isSubmitting = false; // Reset flag
      });
  }

  document.getElementById("submit-button").addEventListener("click", handleSubmit);
  document.querySelector(".submit-link").addEventListener("click", function (e) {
    e.preventDefault();
    handleSubmit(e);
  });
  }
});









