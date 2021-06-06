"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var windowWidth = window.innerWidth; // menu 

  var menuItemsContent = document.querySelectorAll('.header-menu-content-item'),
      menuItems = document.querySelectorAll('.header-menu-nav li');
  menuItems.forEach(function (menuItem) {
    var eventCustom;
    var parentMenuItem = document.querySelector('#header-menu');

    if (windowWidth > 1024) {
      eventCustom = 'mouseenter';
    } else {
      eventCustom = 'click';
      var headerMenuBack = document.querySelector('#header-back-menu');
      hideBlockMenu(menuItems, menuItemsContent);

      if (headerMenuBack) {
        headerMenuBack.addEventListener('click', function () {
          hideBlockMenu(menuItems, menuItemsContent);
          parentMenuItem.classList.remove('active');
        });
      }
    }

    menuItem.addEventListener(eventCustom, function () {
      menuItems.forEach(function (menuItemsOther) {
        menuItemsOther.classList.remove('item-active');
        parentMenuItem.classList.remove('active');
      });
      var dataBox = menuItem.getAttribute('data-box-id');

      if (dataBox) {
        menuItem.classList.add('item-active');
        parentMenuItem.classList.add('active');
        menuItemsContent.forEach(function (menuItemsContentCurrent) {
          var attrDataBox = menuItemsContentCurrent.id;

          if (attrDataBox) {
            if (dataBox == attrDataBox) {
              var boxShowCurrent = document.getElementById(attrDataBox);
              menuItemsContent.forEach(function (menuItemsContentEl) {
                menuItemsContentEl.classList.add('hide');
              });
              boxShowCurrent.classList.remove('hide');
            }
          }
        });
      }
    });
  }); // header fixed 

  var header = document.querySelector('#header');
  var oldScrollY = 0;

  if (header) {
    window.addEventListener('scroll', function () {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop,
          height_el = header.offsetHeight,
          height_client = document.documentElement.clientHeight / 2;

      if (window.pageYOffset > height_el && window.pageYOffset < height_client) {
        header.classList.add('sticky');
        header.classList.remove('fixed');
      } else if (window.pageYOffset > height_client) {
        header.classList.add('fixed');
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
        header.classList.remove('fixed');
      }

      oldScrollY = scrolled;
    });
  } // autoresize 1/1


  var squareBlockAll = document.querySelectorAll('.auto-res-block');
  squareBlockAll.forEach(function (squareBlock) {
    if (squareBlock) {
      autoRes(squareBlock);
      resizeFunc(function () {
        autoRes(squareBlock);
      });
    }
  }); // team click photo 

  if (window.innerWidth < 1025) {
    var teamItems = document.querySelectorAll('.team-grid-item.wrap-icon-hover');
    teamItems.forEach(function (teamItemCurrent) {
      if (teamItemCurrent) {
        teamItemCurrent.addEventListener('click', function () {
          teamItems.forEach(function (teamItem) {
            teamItem.classList.remove('active');
          });
          teamItemCurrent.classList.add('active');
        });
      }
    });
  } // accordion 


  var questionsAccordion = document.querySelector('.questions-accordion');

  if (questionsAccordion) {
    var questionsAccordionItems = questionsAccordion.querySelectorAll('.questions-accordion-item');
    questionsAccordionItems.forEach(function (questionsAccordionItem) {
      var questionsAccordionName = questionsAccordionItem.querySelector('.questions-accordion-item-question'),
          questionsAccordionAnswer = questionsAccordionItem.querySelector('.questions-accordion-item-answer');
      questionsAccordionName.addEventListener('click', function () {
        if (questionsAccordionItem.classList.contains('active')) {
          questionsAccordionItem.classList.remove('active');
          questionsAccordionAnswer.style.maxHeight = 0;
        } else {
          questionsAccordionItem.classList.add('active');
          questionsAccordionAnswer.style.maxHeight = questionsAccordionAnswer.scrollHeight + 'px';
        }
      });
    });
  }

  var clientsLogoSlider = document.querySelector('.clients-logo-slider'),
      reviewsSlider = document.querySelector('.reviews-slider'),
      casesSlider = document.querySelector('.cases-slider');

  if (clientsLogoSlider) {
    var clientsLogoSwiper = new Swiper(clientsLogoSlider, {
      loop: true,
      slidesPerView: 5,
      slidesPerGroup: 1,
      speed: 6000,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      }
    });
  }

  if (reviewsSlider) {
    var reviewsSwiper = new Swiper(reviewsSlider, {
      loop: true,
      slidesPerView: 3.4,
      slidesPerGroup: 1,
      speed: 1500,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      centeredSlides: true,
      spaceBetween: 64,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false
      }
    });
    reviewsSlider.addEventListener('mouseenter', function () {
      reviewsSwiper.autoplay.stop();
    });
    reviewsSlider.addEventListener('mouseleave', function () {
      reviewsSwiper.autoplay.start();
    });
  }

  if (casesSlider) {
    var casesArrowPrev = casesSlider.closest('.cases-section').querySelector('.swiper-button-prev'),
        casesArrowNext = casesSlider.closest('.cases-section').querySelector('.swiper-button-next');
    var casesSwiper = new Swiper(casesSlider, {
      loop: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      allowTouchMove: false,
      navigation: {
        nextEl: casesArrowNext,
        prevEl: casesArrowPrev
      }
    });
  }
});

function autoRes(currentBlock) {
  var currentBlockWidth = Math.floor(currentBlock.offsetWidth),
      currentBlockHeight = Math.floor(currentBlock.offsetHeight);

  if (currentBlockWidth !== currentBlockHeight) {
    currentBlock.style.height = currentBlockWidth + 'px';
  }
}

function resizeFunc(currentFunc) {
  window.addEventListener('resize', function () {
    currentFunc();
  });
}

function hideBlockMenu(menuItems, menuItemsContent) {
  menuItems.forEach(function (menuItemsOther) {
    menuItemsOther.classList.remove('item-active');
  });
  menuItemsContent.forEach(function (menuItemsContentEl) {
    menuItemsContentEl.classList.add('hide');
  });
}

var tl = new TimelineMax();
gsap.registerPlugin(ScrollToPlugin);
var slideDown = document.querySelectorAll('.slideDown'),
    slideLeft = document.querySelectorAll('.slideLeft'),
    slideRight = document.querySelectorAll('.slideRigt'),
    slideUpOne = document.querySelectorAll('.slideUpOne'),
    slideFade = document.querySelectorAll('.slideFade');
var body = document.querySelector('body');
var headerMenu = document.querySelector('#header-menu'),
    headerMenuBlock = document.querySelector('#header-menu-block'),
    headerMenuGumb = document.querySelector('#header-nav-gumb'),
    headerMenuClose = document.querySelector('#header-menu-close'); // slideUpOne

slideUpOne.forEach(function (slideUpOneCurrent) {
  gsap.from(slideUpOneCurrent, 1.5, {
    scrollTrigger: {
      trigger: slideUpOneCurrent,
      start: 'top 90%'
    },
    opacity: 0,
    y: 100,
    ease: Power4.easeOut
  });
}); // slideDown 

slideDown.forEach(function (slideDownCurrent) {
  gsap.from(slideDownCurrent, 1.5, {
    scrollTrigger: {
      trigger: slideDownCurrent,
      start: 'top 90%'
    },
    opacity: 0,
    y: -100,
    ease: Power4.easeOut
  });
}); // slideCenter

var slideWrapAll = document.querySelectorAll('.slideCenter'),
    direction1 = -100,
    direction = 100;
slideWrapAll.forEach(function (slideWrapCurrent) {
  if (slideWrapCurrent) {
    var slideFirst = slideWrapCurrent.querySelector('.slideFirst'),
        slideSecond = slideWrapCurrent.querySelector('.slideSecond');
    gsap.from(slideFirst, 1.5, {
      scrollTrigger: {
        trigger: slideWrapCurrent,
        start: 'top bottom'
      },
      opacity: 0.2,
      x: direction1,
      ease: Power4.easeOut
    });
    gsap.from(slideSecond, 1.5, {
      scrollTrigger: {
        trigger: slideWrapCurrent,
        start: 'top bottom'
      },
      opacity: 0.2,
      x: direction,
      ease: Power4.easeOut
    });
  }
}); // slideFade

slideFade.forEach(function (slideFadeCurrent) {
  gsap.from(slideFadeCurrent, 2, {
    scrollTrigger: {
      trigger: slideFadeCurrent,
      start: 'top 50%'
    },
    opacity: 0,
    ease: Power4.easeOut
  });
}); // progress bar 

var buySection = document.querySelector('.buy'),
    subscriptionSection = document.querySelector('.subscription'),
    resultSection = document.querySelector('.results-section'),
    sloganSection = document.querySelector('.slogan');

if (buySection) {
  var buySectionLine = buySection.querySelector('.progress-bar progress');
  progressBarFunc(buySection, buySectionLine);
}

if (subscriptionSection) {
  var subscriptionSectionLine = subscriptionSection.querySelector('.progress-bar progress');
  progressBarFunc(subscriptionSection, subscriptionSectionLine);
}

if (resultSection) {
  var resultSectionLine = resultSection.querySelector('.progress-bar progress');
  progressBarFunc(resultSection, resultSectionLine);
}

if (sloganSection) {
  var sloganSectionLine = sloganSection.querySelector('.progress-bar progress');
  progressBarFunc(sloganSection, sloganSectionLine);
} // show/hide menu 


if (headerMenu) {
  headerMenuGumb.addEventListener('click', function () {
    body.classList.add('hidden');
    gsap.to(headerMenu, .3, {
      opacity: 1,
      autoAlpha: 1,
      ease: Power4.easeOut
    });
    gsap.to(headerMenuBlock, .5, {
      bottom: 0,
      ease: Power4.easeOut
    });
  });
  headerMenuClose.addEventListener('click', function () {
    body.classList.remove('hidden');
    gsap.to(headerMenu, .3, {
      opacity: 0,
      autoAlpha: 0,
      ease: Power4.easeOut
    });
    gsap.to(headerMenuBlock, .5, {
      bottom: '100%',
      ease: Power4.easeOut
    });
    resetFunc();
  });
  headerMenu.addEventListener('click', function (e) {
    if (!e.target.closest('.header-menu-block')) {
      body.classList.remove('hidden');
      gsap.to(headerMenu, .3, {
        opacity: 0,
        autoAlpha: 0,
        ease: Power4.easeOut
      });
      gsap.to(headerMenuBlock, .5, {
        bottom: '100%',
        ease: Power4.easeOut
      });
      resetFunc();
    }
  });
} // functions 


function resetFunc() {
  if (window.innerWidth < 1025) {
    var menuItemsContentAnim = document.querySelectorAll('.header-menu-content-item'),
        menuItemsAnim = document.querySelectorAll('.header-menu-nav li');
    document.querySelector('#header-menu').classList.remove('active');
    menuItemsAnim.forEach(function (menuItemsOther) {
      menuItemsOther.classList.remove('item-active');
    });
    menuItemsContentAnim.forEach(function (menuItemsContentEl) {
      menuItemsContentEl.classList.add('hide');
    });
  }
}

function progressBarFunc(section, progressLine) {
  gsap.to(progressLine, {
    scrollTrigger: {
      trigger: section,
      scrub: .3,
      start: "top 60%",
      end: "top 100px"
    },
    value: 100,
    ease: 'none'
  });
}

var gridBlocks = document.querySelectorAll('.slideBlock');
gridBlocks.forEach(function (gridBlockCurrent) {
  if (gridBlockCurrent) {
    var gridItems = gridBlockCurrent.querySelectorAll('.slideUp');
    var timeline = gsap.timeline({
      scrollTrigger: {
        trigger: gridBlockCurrent,
        start: "top 80%"
      }
    }).from(gridItems, {
      y: "100%",
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out"
    });
  }
});
var workPlanSection = document.querySelector('.work-plan-steps');

if (workPlanSection) {
  var workPlanSteps = workPlanSection.querySelectorAll('.work-plan-steps-item');
  workPlanSteps.forEach(function (workPlanStepCurrent) {
    var timeline = gsap.timeline({
      scrollTrigger: {
        trigger: workPlanSection,
        start: "top 60%"
      }
    }).to(workPlanSteps, {
      className: "work-plan-steps-item active",
      stagger: .5,
      ease: "none"
    });
  });
} // steps color 


var workingStepSection = document.querySelector('.working-steps');

if (workingStepSection) {
  var workingSteps = workingStepSection.querySelectorAll('.working-step');
  workingSteps.forEach(function (workingStep) {
    var workingStepLabel = workingStep.querySelectorAll('.label-step');
    gsap.to(workingStepLabel, 1.5, {
      scrollTrigger: {
        trigger: workingStep,
        start: 'top 50%'
      },
      className: "label-step active"
    });
  });
}