const heroText = document.querySelector(".hero-text");
const heroThumbnailsDiv = document.querySelectorAll(".thumbnails .thumb-img");
const splashTimeout = 3500;

// for splash screen page 
gsap.to(".back-text tspan", {
  strokeDashoffset: "0",
  duration: 3,
  stagger: 0.1,
  delay: 1
});

document.body.classList.toggle("no-scroll");

setTimeout(() => {
    document.body.classList.toggle("no-scroll");
    document.querySelector(".splash-screen").style.display = "none"
}, splashTimeout);

// for hero heading animation on page startup
gsap.from(".hero-text tspan", {
  attr: { dy: 50 },
  duration: 1,
  opacity: 0,
  stagger: 0.2,
  delay: 1 + (splashTimeout/1000),
});
// for zooming in image animation on page startup
gsap.from(".thumbnails .thumb-img img", {
  opacity: 0,
  width: 0,
  height: 0,
  duration: 1.5,
  stagger: 0.4,
  delay: 1.5  + (splashTimeout/1000),
  onComplete: function () {
    gsap.set(".thumbnails .thumb-img img", { clearProps: "height" });
    gsap.set(".thumbnails .thumb-img img", { clearProps: "width" });
    gsap.set(".thumbnails .thumb-img img", { clearProps: "opacity" });
  },
});

// on a image hover, change opacity for every other image and the main text
setTimeout(() => {
    heroThumbnailsDiv.forEach((container, index) => {
        container.addEventListener("mouseenter", (details) => {
            // Changing for every image
            heroThumbnailsDiv.forEach((container, idx) => {
                if (idx != index) {
                    container.children[0].classList.toggle("non-active");
                }else if(window.innerWidth > 1050){
                    container.children[0].children[1].style.display= "block";
                }
            });
            heroText.classList.toggle("hero-text-hover")
        });
        container.addEventListener("mouseleave", (details) => {
            // Reverting changes for every image
            heroThumbnailsDiv.forEach((container, idx) => {
                if (idx != index) {
                    container.children[0].classList.toggle("non-active");
                }else if(window.innerWidth > 1050){
                    container.children[0].children[1].style.display= "none";
                }
        });
        heroText.classList.toggle("hero-text-hover")
      });
    });    
}, 3000 + splashTimeout);

// move the image with the mouse pointer when it is inside the container
const thumbImgContainer = document.querySelectorAll(".thumb-img");
setTimeout(() => {
    thumbImgContainer.forEach((path, index) => {
        let insidePath = false;
      
        path.addEventListener("mouseleave", (details) => {
          // path.nextElementSibling.style.top =
          insidePath = false;
          let rect = path.getBoundingClientRect();
          let imgHeight = path.children[0].clientHeight;
          let imgWidth = path.children[0].clientWidth;
          gsap.to(path.children[0], {
            top: (rect.height - imgHeight) / 2 + "px",
            left: rect.width - imgWidth + "px",
            duration: 4,
            delay: 0.3,
            ease: "power1.out",
            onComplete: function() {
              gsap.set(path.children[0], { clearProps: "top" });
              gsap.set(path.children[0], { clearProps: "left" });
            }
          });
        });
        path.addEventListener("mousemove", (details) => {
          let rect = path.getBoundingClientRect();
          let imgHeight = path.children[0].clientHeight;
          let imgWidth = path.children[0].clientWidth;
          if (
            details.clientY < rect.top ||
            details.clientY > rect.bottom ||
            details.clientX < rect.left ||
            details.clientX > rect.right
          ) {
            insidePath = false;
            gsap.to(path.children[0], {
              top: (rect.height - imgHeight) / 2 + "px",
              left: rect.width - imgWidth + "px",
              duration: 4,
              delay: 0.3,
              ease: "power1.out",
              onComplete: function() {
                  gsap.set(path.children[0], { clearProps: "top" });
                  gsap.set(path.children[0], { clearProps: "left" });
              }
            });
            // path.children[0].setAttribute("style","")
          } else if (window.innerWidth > 700) {
            insidePath = true;
            gsap.to(path.children[0], {
              top: insidePath
                ? details.clientY - rect.top - imgHeight / 2 + "px"
                : "",
              left: insidePath
                ? details.clientX - rect.left - imgWidth / 4 + "px"
                : "",
              duration: 1,
              ease: "power1.out",
            });
          }
        });
      });
}, 2000 + splashTimeout);

// changing nav menu clicks
//    M6 18 18 6M6 6l12 12    |  M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5
const navbarLi = document.querySelectorAll(".navbar-nav li");
var isOpen = false;
const navbarCollapse = document.querySelector(".navbar-collapse");
document.querySelector(".nav-menu").addEventListener("click", () => {
  // disabling the scroll when menu-item are shown
  document.body.classList.toggle("no-scroll");

  if (!isOpen) {
    // showing the navbar collapse screen
    navbarCollapse.classList.toggle("show");
    // animating navbar collapse screen
    gsap.to(navbarCollapse, {
      // y: 0,
      top: "52px",
      height: "calc(100vh + 200px)",
      ease: "circ.out",
      duration: 0.5,
    });
    // hiding the navbar brand image
    document.querySelector(".navbar-brand").style.opacity = "0";
    // animating the navbar items
    gsap.to(navbarLi, {
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.3,
      stagger: 0.1,
    //   onComplete: function () {
    //     gsap.set(navbarLi, { clearProps: "y" });
    //   },
    });
    // Animating the menu button
    gsap.to(".nav-menu-line1", {
      attr: { x1: 5, y2: 35 },
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(".nav-menu-line2", {
      attr: { y1: 35, x2: 35, y2: 0 },
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(".nav-menu-line3", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  } else {
    // delaying the hiding of navbar collapsing screen
    setTimeout(() => {
      navbarCollapse.classList.toggle("show");
    }, 1000);
    // animating the closing of navbar collapsing screen
    gsap.to(navbarCollapse, {
      // y: "-16rem",
      top: "-20rem",
      height: 0,
      ease: "circ.out",
      duration: 0.8,
      delay: 0.7,
    //   onComplete: function () {
    //     gsap.set(navbarLi, { clearProps: "style" });
    //   },
    });
    // animating the nav items closing of navbar collapsing screen
    gsap.to(navbarLi, {
      y: "100vh",
      duration: 1,
      delay: 0.1,
      ease: "power2.out",
      stagger: { each: 0.1, from: "end" },
            onComplete: function () {
        gsap.set(navbarLi, { clearProps: "y" });
      },
    });
    // showing the navbar brand image but with dealy
    setTimeout(() => {
      document.querySelector(".navbar-brand").style.opacity = "1";
    }, 800);
    // animating the navbar menu icon
    gsap.to(".nav-menu-line1", {
      attr: { x1: 0, y2: 0 },
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(".nav-menu-line2", {
      attr: { y1: 16.5, x2: 40, y2: 16.5 },
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(".nav-menu-line3", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }

  isOpen = !isOpen;
});

//  y="55"
//  y="155"
//  y="255"
//  y="355"
// y="455"
let svgTextList = [55, 155, 255, 355, 455];
const svgText = document.querySelectorAll(".svg-text");
let pagePointer = -1;
// page responsive
window.addEventListener("resize", () => {
  resize();
});
function resize() {
  if (pagePointer != 0 && window.innerWidth > 1280) {
    svgText.forEach((ele, index) => {
      gsap.to(ele, {
        attr: {
          y: svgTextList[index],
        },
        duration: 1,
      });
      pagePointer = 0;
      // ele.setAttribute("y",svgTextList[index])
    });
  } else if (pagePointer != 1 && window.innerWidth > 1050) {
    pagePointer = 1;
    svgText.forEach((ele, index) => {
      gsap.to(ele, {
        attr: {
          y: svgTextList[index] - 16 * index,
        },
        duration: 1,
      });
      // ele.setAttribute("y",svgTextList[index] - 10 * index)
    });
  } else if (pagePointer != 2 && window.innerWidth < 1051) {
    pagePointer = 2;
    svgText.forEach((ele, index) => {
      gsap.to(ele, {
        attr: {
          y: svgTextList[index] - 40 * index,
        },
        duration: 1,
      });
    });
  }
  
      if(isOpen && window.innerWidth > 1050){
        isOpen = false;
        // delaying the hiding of navbar collapsing screen
        navbarCollapse.classList.toggle("show");
      // animating the closing of navbar collapsing screen
      gsap.to(navbarCollapse, {
        top: "-20rem",
        height: 0,
      });
      // animating the nav items closing of navbar collapsing screen
      gsap.to(navbarLi, {
        y: "0",
              onComplete: function () {
          gsap.set(navbarLi, { clearProps: "y" });
        },
      });
      // showing the navbar brand image but with dealy
      document.querySelector(".navbar-brand").style.opacity = "1";

      // animating the navbar menu icon
      gsap.to(".nav-menu-line1", {
        attr: { x1: 0, y2: 0 },
        ease: "power2.inOut",
      });
      gsap.to(".nav-menu-line2", {
        attr: { y1: 16.5, x2: 40, y2: 16.5 },
        ease: "power2.inOut",
      });
      gsap.to(".nav-menu-line3", {
        opacity: 1,
        ease: "power2.inOut",
      });
      }
}

resize();
