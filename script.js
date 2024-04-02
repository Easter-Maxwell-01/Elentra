/* website navigation */
document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.mobile-nav');
    sidebar.style.display = 'none';
});

function show_mobile_nav() {
    const sidebar = document.querySelector('.mobile-nav');
    sidebar.style.display = 'block';
}

function hide_mobile_nav() {
    const sidebar = document.querySelector('.mobile-nav');
    sidebar.style.display = 'none';
}

/* preloader */
document.addEventListener('DOMContentLoaded', function () {
    const progressText = document.getElementById('progress');
    let progressValue = 0;

    function updateProgress() {
        progressText.innerText = `${progressValue}%`;

        if (progressValue < 100) {
            progressValue += 2;
            setTimeout(updateProgress, 30);
        } else {
            // Wait for 0.5s before hiding the preloader
            setTimeout(function () {
                document.querySelector('.preloader').style.display = 'none';
            }, 500);
        }
    }

    updateProgress();
});

/* main site loader */
$(document).ready(function() {
    let loader = $('.loader'), // Store loader element
        loading = $('.loading').wrapInner('<div></div>'),
        min = 20,
        max = 70,
        minMove = 10,
        maxMove = 20;

    startAnimation(loading);

    loading.on('animationend webkitAnimationEnd oAnimationEnd', 'span:last-child', e => {
        startAnimation(loading);
    });

    // Set CSS vars & generate spans if needed
    function setCSSVars(elem, min, max, minMove, maxMove) {
        let width = Math.ceil(elem.width()),
            text = elem.text();
        for(let i = 1; i < width; i++) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min,
                numMove = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
                dir = (i % 2 == 0) ? 1 : -1,
                spanCurrent = elem.find('span:eq(' + i + ')'),
                span = spanCurrent.length ? spanCurrent : $('<span />');
            span.css({
                '--x': i - 1 + 'px',
                '--move-y': num * dir + 'px',
                '--move-y-s': ((i % 2 == 0) ? num * dir - numMove : num * dir + numMove) + 'px',
                '--delay': i * 10 + 'ms'
            });
            if(!spanCurrent.length) {
                elem.append(span.text(text));
            }
        }
    }

    // Start animation
    function startAnimation(elem) {
        elem.removeClass('start');
        setCSSVars(elem, min, max, minMove, maxMove);
        void elem[0].offsetWidth;
        elem.addClass('start');

        // Hide loader and show site content after 3 seconds
        setTimeout(function() {
            loader.fadeOut(); // Fade out loader
            // Show site content or execute any other actions
            // Example: $('.site-content').fadeIn();
        }, 3400);
    }  
});



/* custom cursor */
document.addEventListener('mousemove', function(e) {
    document.querySelectorAll('.cursor')[0].style.left = e.clientX + 'px';
    document.querySelectorAll('.cursor')[0].style.top = e.clientY + 'px';

    setTimeout(function() {
        document.querySelectorAll('.cursor')[1].style.left = e.clientX + 'px';
        document.querySelectorAll('.cursor')[1].style.top = e.clientY + 'px';
    }, 120);
});

document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('mouseenter', function() {
        document.querySelectorAll('.cursor').forEach(function(cursor) {
            cursor.classList.add('big');
        });
    });

    link.addEventListener('mouseleave', function() {
        document.querySelectorAll('.cursor').forEach(function(cursor) {
            cursor.classList.remove('big');
        });
    });
});



/* image slider */
var i_col1 = 0;
var i_col2 = 0;

var images_col1 = [
    'assets/tour-dp-1.jpg',
    'assets/tour-dp-2.jpg' 
];
var images_col2 = [
    'assets/tour-dp-3.jpg',
    'assets/tour-dp-4.jpg' 
]; 

var time_col1 = 8000; // Time for col-1
var time_col2 = 5000; // Time for col-2

function changeImgCol1() {
    document.getElementById('slide1').src = images_col1[i_col1];

    if (i_col1 < images_col1.length - 1) {
        i_col1++;
    } else {
        i_col1 = 0;
    }

    setTimeout(changeImgCol1, time_col1);
}

function changeImgCol2() {
    document.getElementById('slide2').src = images_col2[i_col2];

    if (i_col2 < images_col2.length - 1) {
        i_col2++;
    } else {
        i_col2 = 0;
    }

    setTimeout(changeImgCol2, time_col2);
}

window.onload = function() {
    changeImgCol1();
    changeImgCol2();
};



/* tour carousel */
//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}
prevDom.onclick = function(){
    showSlider('prev');    
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)

function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

/* content reveal */
window.addEventListener('scroll', reveal);

function reveal()
{
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++)
    {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint)
        {
            reveals[i].classList.add('active');
        }
        else
        {
            reveals[i].classList.remove('active');
        }
    }
}
