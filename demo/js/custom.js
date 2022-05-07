//sticky navbar
const collapse = document.querySelector('.navbar-toggler');
const sideNav = document.querySelector('.sideNav');

collapse.addEventListener('click', (event) => {
    document.querySelector('.sideNav').style.left = '0px';
    collapse.style.opacity = '0';
    event.stopPropagation();
});


window.addEventListener('click', () => {
    collapse.style.opacity = '1';
    document.querySelector('.sideNav').style.left = '-100%';
})


window.onload = function() {
    const menu = document.getElementById("navbar");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        menu.classList.add('fixed-top');
    } else {
        menu.classList.remove('fixed-top');
    }
}

window.onscroll = function() {scrollNav()};

const scrollNav = () => {
    const menu = document.getElementById("navbar");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        menu.classList.add('fixed-top');
    } else {
        menu.classList.remove('fixed-top');
    }
}


//============================
/*works shorting*/
//============================
const btns = document.querySelectorAll(".filter-gallery");
const workItems = document.querySelectorAll(".work-item");

workItems.forEach(item => {
    item.classList.add('active');
});

let workActive = document.querySelectorAll(".work-items .active");
const wrapper = document.querySelector("#works .wrapper");

const mappingActive = (column) => {
    const width = wrapper.clientWidth / column;
    const height = workActive[0].clientHeight;
    
    const wrapperHeight = Math.ceil(workActive.length / column);
    wrapper.style.height = `${wrapperHeight * height}px`;
    
    for (i = 0; i < workActive.length; i++) {
        const index = i + 1;
        const x = index % column === 0 ? column : index % column;
        const y = Math.ceil(index / column);
        workActive[i].style.left = `${(x * width) - width}px`;
        workActive[i].style.top = `${(y * height) - height}px`;
    }
}

const runShorting = (column) => {
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute("data-filter");
            if (filter === "all") {
                workItems.forEach(item => {
                    item.classList.add("active");
                    item.classList.remove("none");
                })
            } else {
                workItems.forEach(item => {
                    if (item.getAttribute("data-type") != filter){
                        item.classList.add("none");
                        item.classList.remove("active");
                    } else if (item.getAttribute("data-type") === filter) {
                        item.classList.add("active");
                        item.classList.remove("none");
                    }
                })
            }
            workActive = document.querySelectorAll(".work-items .active");
            mappingActive(column);
        })
    });
}

const resize = () => {
    if (window.innerWidth >= 992) {
        mappingActive(3);
        runShorting(3);
    } else if (window.innerWidth >= 768) {
        mappingActive(2);
        runShorting(2);
    } else {
        mappingActive(1);
        runShorting(1);
    }
}

resize();

window.addEventListener('resize', () => {
    resize();
})




//============================
/*Testimony Carousel*/
//============================
$(document).ready(function(){
    $(".owl").owlCarousel({
        loop:true,
        nav:false,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            720:{
                items: 1
            },
            992:{
                items: 2
            } 
        }
    });
});


//============================
/*Smooth Scroll*/
//============================
$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
        } // End if
    });
});

//============================
/*Header Slider img*/
//============================
const items = document.querySelector(".img-item");
let itemImg = document.querySelectorAll(".img-item .item");
const firstClone = itemImg[0].cloneNode(true);
const lastClone = itemImg[itemImg.length - 1].cloneNode(true);
const slideDot = document.querySelectorAll(".dot");
let activeDot = document.querySelectorAll(".dots .active");
const slideDotWrapper = document.querySelector(".dots");
let slideId;

let index = 1;
const itemHeight = 80;
const interval = 5000;

items.append(firstClone);
items.prepend(lastClone);

itemImg = document.querySelectorAll(".img-item .item");

items.style.transform = `translateY(${-itemHeight * index}vh)`;

const dotAction = () => {
    
}

const startSlide = () => {
    slideId = setInterval(() => {
        index++;

        if (index >= 4) {
            slideDot[0].classList.add('active');
        } else {
            slideDot[index-1].classList.add('active');
        }
        
        activeDot[0].classList.remove('active');
        activeDot = document.querySelectorAll(".dots .active");

        items.style.transform = `translateY(${-itemHeight * index}vh)`;
        items.style.transition = `2s`;
        setTimeout(() => {
            if (index >= 4) {
                index = 1;
                items.style.transform = `translateY(${-itemHeight * index}vh)`;
                items.style.transition = `none`;
                return;
            }
        }, 2000)
    }, interval);
};

slideDotWrapper.addEventListener('mouseenter', () => {
    slideDotWrapper.style.backgroundColor = '#030f259f'; 
    clearInterval(slideId);
});

slideDotWrapper.addEventListener('mouseleave', () => {
    startSlide();
    slideDotWrapper.style.background = 'none';
});

slideDot.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i + 1;

        
        activeDot[0].classList.remove('active');
        slideDot[i].classList.add('active');
        activeDot = document.querySelectorAll(".dots .active");

        items.style.transform = `translateY(${-itemHeight * index}vh)`;
        items.style.transition = `2s`;
    })
})

startSlide();





