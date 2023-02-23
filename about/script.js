// Add some space at the top to accomodate fixed menu
accountForFixedMenu(0.5);
// Enable smooth scroll when navigating to various sections
sectionSmoothScroll();
// Change nav from transparent to white on scroll
navDynamicStyles(100);
// Add fade effect on page scroll to feature image and highlight main text
fadeFeatureImgOnScroll(250, 0.4);
// Soft transition effect to all portfolio thumbs
jQuery(".project-thumb").addClass("soft-transition");
$(document).on("click", nextSlide);

// Create cross browser requestAnimationFrame method:
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (f) {
    setTimeout(f, 1000 / 60);
  };

/*-- Parallax Effect --*/
// Target the background element to which effect will be applied
var jumbotron = document.querySelector(".jumbotron");
var container = jumbotron.children[0];
var parallaxBg = container.children[0];

function parallax() {
  var scrolltop = window.pageYOffset; // get number of pixels document has scrolled vertically
  parallaxBg.style.top = scrolltop * 0.2 + "px"; // move parallaxBg at 20% of scroll rate
}

// Attach the effect to the window scroll
window.addEventListener(
  "scroll",
  function () {
    // on page scroll
    requestAnimationFrame(parallax); // call parallax() on next available screen paint
  },
  false
);

/** -----------------------------------------------------------------
* Function Definitions
-------------------------------------------------------------------*/
// Add an event listener to any element
/*
 * When calling this function, make sure to enclose the element and listner
 * tags in quotes - i.e. addListener(myElement, "onload", doThisFunction)
 */
function addListener(elementTag, listener, func) {
  var element = document.querySelectorAll(elementTag);

  for (i = 0; i < element.length; i++) {
    element[i].addEventListener(listener, func, false);
  }
}

function accountForFixedMenu(factor) {
  // factor from 0 - 1 (% to offset)
  var jumbotron = document.querySelector(".jumbotron");
  var navbar = document.querySelector(".navbar");

  // Add navbar height + percentage of jumbotron' bottom padding
  var targetTopPadding =
    Number(navbar.offsetHeight) +
    Number($(jumbotron).css("padding-bottom").replace("px", "") * factor);

  // Set top padding of jumbotron
  jumbotron.style.paddingTop = targetTopPadding + "px";
}

function navDynamicStyles(buffer) {
  $(window).scroll(function (i) {
    var scrollDistance = $(window).scrollTop(); // How far window id from top
    // Reference the navbar elements
    var navbar = jQuery(".navbar");
    var brandImage = jQuery(".navbar-brand > img");
    var siteTitle = jQuery(".navbar-brand p");
    var navLinks = jQuery(".navbar-default .navbar-nav>li>a");
    var navDropMenu = jQuery(
      ".navbar-default .navbar-collapse, .navbar-default .navbar-form"
    );

    /* -----------------------------
    --	 Scrolled Nav Settings		--
    ------------------------------*/
    // If the window is scrolled beyond the buffer
    if (scrollDistance > buffer) {
      navbar.css({
        backgroundColor: "#2f2f2f",
        background: "linear-gradient(#2f2f2f, #f8f8f8)",
        background: "-webkit-linear-gradient(#2f2f2f, #f8f8f8)",
        background: "-o-linear-gradient(#2f2f2f, #f8f8f8)",
        background: "-moz-linear-gradient(#2f2f2f, #f8f8f8)",
      });

      brandImage.css({
        background: "none",
        boxShadow: "none",
      });

      siteTitle.css({
        color: "White",
      });

      siteTitle.hover(
        function () {
          jQuery(this).css("color", "#eca1c0");
        },
        function () {
          jQuery(this).css("color", "white");
        }
      );

      navLinks.css({
        color: "White",
      });

      navLinks.hover(
        function () {
          jQuery(this).css("color", "#eca1c0");
        },
        function () {
          jQuery(this).css("color", "white");
        }
      );

      navDropMenu.css({
        borderColor: "#e7e7e7",
      });
    } else if (scrollDistance < buffer) {
      navbar.css({
        background: "none",
      });

      brandImage.css({
        backgroundColor: "#ccc",
        boxShadow: "0 0 3px #ccc",
      });

      siteTitle.css({
        color: "black",
      });

      siteTitle.hover(
        function () {
          jQuery(this).css("color", "gray");
        },
        function () {
          jQuery(this).css("color", "black");
        }
      );

      navLinks.css({
        color: "black",
      });

      navLinks.hover(
        function () {
          jQuery(this).css("color", "gray");
        },
        function () {
          jQuery(this).css("color", "black");
        }
      );

      navDropMenu.css({
        borderColor: "#444",
      });
    } // END else if
  });
}

function fadeFeatureImgOnScroll(scrollDistance, parallaxFactor) {
  $(window).scroll(function (i) {
    // Scroll distance from window top
    var scrollVar = $(window).scrollTop();
    // The featured image
    var profileImage = $(".jumbotron .container").children(".profile-img");
    // The heading Text
    var headText = $(".jumbotron .container h1");
    var subHeadText = $(".jumbotron .container h4");

    profileImage.css({
      top: parallaxFactor * scrollVar,
      opacity: (scrollDistance - scrollVar) / 100,
    });

    // Add soft transition to head text
    headText.addClass("soft-transition");

    // If the window is scrolled beyond the scrollDistance
    // and featured image is invisible
    if (scrollVar > scrollDistance) {
      // Add a text hightlight to the head text
      headText.css({
        textShadow: "0 0 20px #ccc",
      });
      subHeadText.css({
        textShadow: "0 0 20px #ccc",
      });
    } else {
      // Otherwise, remove the effect
      headText.css({
        textShadow: "none",
      });
      subHeadText.css({
        textShadow: "none",
      });
    }
  });
}

function sectionSmoothScroll() {
  jQuery(".navbar a").click(function () {
    var screenWidth = $(window).width();

    // If mobile menu is visible
    if (screenWidth < 768) {
      // Toggle drop down menu
      $(".btn-navbar").click(); //bootstrap 2.x
      $(".navbar-toggle").click(); //bootstrap 3.x
    }

    // Store the link's href attribute
    var href = jQuery(this).attr("href");

    // Store the added padding to account for fixed nav
    var jumbotron = document.querySelector(".jumbotron");
    var extraPadding = Number(
      $(jumbotron).css("padding-bottom").replace("px", "")
    );

    //console.log(extraPadding);

    // Animate the window to the top of the referenced element minus extra padding
    $("html, body").animate(
      {
        scrollTop: jQuery(href).offset().top - extraPadding,
      },
      500
    );
    return false;
  });
}

function loadModal(title, thumb, body, launchLink) {
  // Reference modal elements
  var modalTitle = document.querySelector(".modal-title");
  var modalThumb = document.querySelector(".modal-thumb img");
  var modalBody = document.querySelector(".modal-body");
  var modalFooterLink = document.querySelector(".modal-footer a");

  // Dynamically fill content of modal with function call
  modalTitle.innerHTML = title;
  modalThumb.src = "https://i.postimg.cc/" + thumb;
  modalBody.innerHTML = body;
  modalFooterLink.setAttribute("href", launchLink);
}

function nextSlide() {
  console.log($(".active + .slide").length);
  if ($(".active + .slide").length > 0) {
    $(".active + .slide").addClass("active");
    $($(".active")[0]).removeClass("active");
  } else {
    $(".active").removeClass("active");
    $(".slide:nth-child(1)").addClass("active");
  }
}

function slider(selector, options) {
  options = options || {};
  options.duration = options.duration == undefined ? 0.6 : options.duration;

  function getOffsetRect(el) {
    return {
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
  }

  var slider = document.querySelector(selector),
    itemsContainer = slider.querySelector(".slider-items-container"),
    items = itemsContainer.querySelector(".slider-items"),
    slides = items.querySelectorAll(".slider-slide"),
    prevControl = slider.querySelector(".slider-prev"),
    nextControl = slider.querySelector(".slider-next");

  var currentSlideIndex = 0;

  var itemsContainerRect;

  function updateMetrics() {
    itemsContainerRect = getOffsetRect(itemsContainer);

    items.style.width = itemsContainerRect.width * slides.length + "px";

    for (var i = 0, ien = slides.length; i < ien; i++) {
      slides[i].style.left = i * itemsContainerRect.width + "px";
      slides[i].style.width = itemsContainerRect.width + "px";
    }
  }

  updateMetrics();

  function onClickPrev(ev) {
    console.log("prev");
    var toIndex =
      currentSlideIndex == 0 ? slides.length - 1 : currentSlideIndex - 1;
    slideTo(toIndex);
  }

  function onClickNext(ev) {
    console.log("next");
    var toIndex =
      currentSlideIndex == slides.length - 1 ? 0 : currentSlideIndex + 1;
    slideTo(toIndex);
  }

  function slideTo(slideIndex, instantly) {
    if (slideIndex == 0) {
      slider.classList.add("slider_start");
      slider.classList.remove("slider_end");
    } else if (slideIndex == slides.length - 1) {
      slider.classList.remove("slider_start");
      slider.classList.add("slider_end");
    } else {
      slider.classList.remove("slider_start");
      slider.classList.remove("slider_end");
    }

    var toBePrevSlideIndex = slideIndex == 0 ? null : slideIndex - 1,
      toBeNextSlideIndex =
        slideIndex == slides.length - 1 ? null : slideIndex + 1;

    var toBeCurrentSlide = slides[slideIndex],
      toBePrevSlide =
        toBePrevSlideIndex === null ? null : slides[toBePrevSlideIndex],
      toBeNextSlide =
        toBeNextSlideIndex === null ? null : slides[toBeNextSlideIndex];

    var currentSlide = slides[currentSlideIndex],
      prevSlide = items.querySelector(".slider-slide_prev"),
      nextSlide = items.querySelector(".slider-slide_next");

    currentSlide.classList.remove("slider-slide_current");
    prevSlide && prevSlide.classList.remove("slider-slide_prev");
    nextSlide && nextSlide.classList.remove("slider-slide_next");

    toBeCurrentSlide.classList.add("slider-slide_current");
    toBePrevSlide && toBePrevSlide.classList.add("slider-slide_prev");
    toBeNextSlide && toBeNextSlide.classList.add("slider-slide_next");

    if (instantly) {
      TweenMax.set(items, {
        x: -slideIndex * itemsContainerRect.width,
        ease: Power1.easeInOut,
      });
    } else {
      TweenMax.to(items, options.duration, {
        x: -slideIndex * itemsContainerRect.width,
        ease: Power1.easeInOut,
      });
    }

    onSlide && onSlide(slideIndex);

    currentSlideIndex = slideIndex;
  }

  prevControl && prevControl.addEventListener("click", onClickPrev);
  nextControl && nextControl.addEventListener("click", onClickNext);

  slideTo(slides.length - 1, true);

  var resizeTimeout;
  window.addEventListener("resize", function (ev) {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(function () {
      updateMetrics();
      slideTo(currentSlideIndex, true);
      resizeTimeout = null;
    }, 100);
  });

  var onSlide;

  return {
    slideTo: slideTo,
    slide: function (index) {
      return slides[index];
    },
    currentSlideIndex: function () {
      return currentSlideIndex;
    },
    onSlide: function (handler) {
      onSlide = handler;
    },
  };
}

var photo = slider(".image-slider", { duration: 0.7 }),
  text = slider(".text-slider", { duration: 0.5 });

photo.onSlide(function (index) {
  text.slideTo(index);
});
