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
    slideUpOne = document.querySelectorAll('.slideUpOne');
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
}); // progress bar 

var buySection = document.querySelector('.buy'),
    subscriptionSection = document.querySelector('.subscription');

if (buySection) {
  var buySectionLine = buySection.querySelector('.progress-bar progress');
  progressBarFunc(buySection, buySectionLine);
}

if (subscriptionSection) {
  var subscriptionSectionLine = subscriptionSection.querySelector('.progress-bar progress');
  progressBarFunc(subscriptionSection, subscriptionSectionLine);
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
      stagger: 0.2,
      duration: 1,
      ease: "power4.out"
    });
  }
});