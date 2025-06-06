function locomotiveScroll(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();


}
locomotiveScroll()

function cursorEffect(){
    var page1Content = document.querySelector("#page1-content");
    var cursor = document.querySelector("#cursor");

    page1Content.addEventListener("mousemove", function(dets){
        gsap.to(cursor,{
            x: dets.x,
            y: dets.y
        })
        // cursor.style.left = dets.x + "px";
        // cursor.style.top = dets.y + "px";
    })

    page1Content.addEventListener("mouseenter", function(dets){
        gsap.to(cursor,{
            scale: 1,
            opacity: 1,
        })
    })

    page1Content.addEventListener("mouseleave", function(dets){
        gsap.to(cursor,{
            scale: 0,
            opacity: 0,
        })
    })
}

function navbarAnim(){
    gsap.to(".navbar", {
    scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "bottom top",   // When hero section fully scrolls out
        end: "bottom top",
        scrub: true,
        onEnter: () => document.querySelector(".navbar").classList.add("fixed-navbar"),
        onLeaveBack: () => document.querySelector(".navbar").classList.remove("fixed-navbar")
        },
    });

    var navInnerElems = document.querySelectorAll(".menu h4");

    navInnerElems.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        gsap.to(elem, {
            y: -2, // Slight lift effect
            textShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)", // Drop shadow
            // filter: "blur(2px)", // Slight blur effect
            duration: 0.3,
            ease: "power3.out",
        });

        let underline = document.createElement("span");
        underline.classList.add("underline-effect");
        elem.appendChild(underline);

        gsap.fromTo(
            underline,
            { width: "0%" }, 
            { width: "100%", duration: 0.4, ease: "power3.out" }
        );
    });

    elem.addEventListener("mouseleave", function () {
        gsap.to(elem, {
            y: 0,
            textShadow: "none",
            filter: "blur(0px)",
            duration: 0.3,
            ease: "power3.out",
        });

        let underline = elem.querySelector(".underline-effect");
        if (underline) {
            gsap.to(underline, {
                width: "0%",
                duration: 0.3,
                ease: "power3.out",
                onComplete: () => underline.remove(),
                });
            }
        });
    });

}

function loaderAnim(){
    var tl = gsap.timeline();
    tl.from(".loader h3",{
        x:70,
        opacity:0,
        duration:1.2,
        stagger:0.1,
        ease: "power3.out",
    })

    tl.to(".loader h3",{
        x:-40,
        opacity:0,
        duration:1,
        stagger:0.1,
        ease: "power3.out",
    })

    tl.to(".loader",{
        opacity:0,
        ease: "power3.out",
    })

    tl.from("#page1-content h1 span",{
        y:100,
        opacity:0,
        stagger:0.1,
        duration:0.5,
        delay:-0.5,
        ease: "power3.out",
    })

    tl.to(".loader",{
        display:"none",
        ease: "power3.out",
    })

}

gsap.from(".temp",{
    y: -45,
    opacity: 1,
    stagger: 0.2,
    duration: 0.8,
})

function page2Animation(){
    gsap.from(".upper-left h1, .upper-right h1", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        skewY:12,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page2",     // The section to watch
            start: "top 70%",      // When #page2's top reaches 50% of viewport
            end: "top 40%",        // (Optional) Helps refine the trigger
            scroller: "#main",
            toggleActions: "play none none none",
            scrub: false,          // Ensures animation plays once without scrubbing
            // once: true             // Ensures it runs only once
        }
    });

    var clutter ="";
    document.querySelector(".pag2-middle-text").textContent.split("").forEach(function(e){
        if(e === " ")clutter += `<span>&nbsp;</span>`
        clutter += `<span>${e}</span>`
    })
    document.querySelector(".pag2-middle-text").innerHTML = clutter;

    gsap.set(".pag2-middle-text span", {opacity: .1})
    gsap.to(".pag2-middle-text span", {
        scrollTrigger:{
            trigger:"#page2",
            start: "top 60%",
            end: "top 20%",
            scrub: 2,
            scroller: "#main",
        },
        opacity: 1,
        stagger: .03,
        ease: Power4,
    })

    gsap.from(".lower-left h2", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        skewY:12,
        scrollTrigger: {
            trigger: "#page2",     
            start: "bottom 140%",      
            end: "bottom 60%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });

    gsap.from(".lower-right p", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        skewY:12,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page2",     
            start: "bottom 140%",      
            end: "bottom 30%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });
}

function page3Anim(){
    gsap.from(".page3-top h4, .page3-top h2", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scale:.2,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page3",     
            start: "top 70%",      
            end: "top 40%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });

    gsap.from("#box1", {
        y: 100,
        x:600,
        opacity: .5,
        duration: 1.2,
        ease: "power3.out",
        scale:.1,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page3",     
            start: "top 60%",      
            end: "top 10%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });

    gsap.from("#box2", {
        y: 100,
        opacity: .2,
        duration: 1.2,
        ease: "power3.out",
        scale:.1,
        delay:.5,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page3",     
            start: "top 60%",      
            end: "top 10%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });

    gsap.from("#box3", {
        y: 100,
        x:-600,
        opacity: .2,
        duration: 1.2,
        ease: "power3.out",
        scale:.1,
        delay:.5,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page3",     
            start: "top 60%",      
            end: "top 10%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });

    gsap.from(".page3-lower-top-text h2", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        skewY:12,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page3",     
            start: "bottom 180%",      
            end: "bottom 60%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });

    var clutter ="";
    document.querySelector(".page3-lower-bottom-text-para").textContent.split("").forEach(function(e){
        if(e === " ")clutter += `<span>&nbsp;</span>`
        clutter += `<span>${e}</span>`
    })
    document.querySelector(".page3-lower-bottom-text-para").innerHTML = clutter;
    gsap.set(".page3-lower-bottom-text-para span", {opacity: .1})
    gsap.to(".page3-lower-bottom-text-para span", {
        scrollTrigger:{
            trigger:"#page3",
            start: "bottom 180%",      
            end: "bottom 100%",  
            scrub: 2,
            scroller: "#main",
        },
        opacity: 1,
        stagger: .03,
        ease: Power4,
    })
}   

function page5Anim(){
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
    });

    let imgBlock = document.querySelectorAll(".page5-svg-block img");

    imgBlock.forEach(function(elem){
        console.log(elem)
        
        elem.addEventListener("mouseenter",function(){
            gsap.to(elem,{
                scale:1.5,
                duration:.8,
            })
        })

        elem.addEventListener("mouseleave",function(){
            gsap.to(elem,{
                scale:1,
                duration:.8,
            })
        })
    })
}

function page6Anim(){
    let rivian = document.querySelectorAll(".page6-p1-text-block h1");
    rivian.forEach(function(elem){
        elem.addEventListener("mouseenter", function(){
        gsap.to(elem,{
            y:-55,
            duration:.4,
            })
        })

        elem.addEventListener("mouseleave", function(){
            gsap.to(elem,{
                y:0,
                duration:.4,
            })
        })
    })

    let workBlocks = document.querySelectorAll(".page6-part1");
    workBlocks.forEach(function(elem){
        gsap.to(elem, {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scale:1.5,
            scrollTrigger: {
                trigger: "#page6",     
                start: "top 60%",      
                end: "bottom top",        
                scroller: "#main",        
                scrub: 2,          
            }
        });
    })
}

function page7Anim(){
    var clutter ="";
    document.querySelector(".page7-top-text-para").textContent.split("").forEach(function(e){
        if(e === " ")clutter += `<span>&nbsp;</span>`
        clutter += `<span>${e}</span>`
    })
    document.querySelector(".page7-top-text-para").innerHTML = clutter;

    gsap.set(".page7-top-text-para span", {opacity: .1})
    gsap.to(".page7-top-text-para span", {
        scrollTrigger:{
            trigger:"#page7",
            start: "top 60%",
            end: "top 20%",
            scrub: 2,
            scroller: "#main",
        },
        opacity: 1,
        stagger: .03,
        ease: Power4,
    })

    gsap.from(".second-text-left h3", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        skewY:12,
        scrollTrigger: {
            trigger: "#page7",     
            start: "bottom 140%",      
            end: "bottom 60%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });

    gsap.from(".right-list h3, .right-para p", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        skewY:12,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page7",     
            start: "bottom 140%",      
            end: "bottom 30%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });
}

function page8Anim(){
    var tl = gsap.timeline();
    tl.from(".page8-top-left h1 span",{
        scrollTrigger:{
            trigger:"#page8",
            start: "top 70%",
            end: "top 30%",
            scrub: 2,
            scroller: "#main",
        },
        y:100,
        opacity:0,
        stagger:0.1,
        duration:0.5,
        delay:-0.5,
        ease: "power3.out",  
    })

    tl.from(".page8-top-right h1",{
        scrollTrigger:{
            trigger:"#page8",
            start: "top 70%",
            end: "top 30%",
            scrub: 2,
            scroller: "#main",
        },
        y:100,
        opacity:0,
        stagger:0.1,
        duration:0.5,
        delay:-0.5,
        ease: "power3.out",  
    })

    gsap.from(".page8-second-text-left h3, .page8-right-list h3", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        skewY:12,
        stagger:.2,
        scrollTrigger: {
            trigger: "#page8",     
            start: "bottom 140%",      
            end: "bottom 80%",        
            scroller: "#main",        
            scrub: 2,          
        }
    });
}

function page9_10Anim(){
    var tl = gsap.timeline();
    tl.from(".page9-vid-div video",{
        scrollTrigger:{
            trigger:"#page9",
            start: "top 80%",
            end: "top 20%",
            scrub: 2,
            scroller: "#main",
        },
        y:100,
        scale:0.2,
        opacity:0,
        stagger:0.1,
        duration:0.5,
        ease: "power3.out",  
    })

    var clutter ="";
    document.querySelector(".page10-top-text-para").textContent.split("").forEach(function(e){
        if(e === " ")clutter += `<span>&nbsp;</span>`
        clutter += `<span>${e}</span>`
    })
    document.querySelector(".page10-top-text-para").innerHTML = clutter;

    gsap.set(".page10-top-text-para span", {opacity: .1})
    gsap.to(".page10-top-text-para span", {
        scrollTrigger:{
            trigger:"#page10",
            start: "top 70%",
            end: "top 40%",
            scrub: 2,
            scroller: "#main",
        },
        opacity: 1,
        stagger: .03,
        ease: Power4,
    })
}

function page11Anim(){
    var tl = gsap.timeline();
    let page11Text = document.querySelectorAll(".page11-inner-text-box h2");

    page11Text.forEach(function(elem){
        elem.addEventListener("mouseenter", function(){
            tl.to(elem, {
                y:-65,
                duration:1,
                ease: "power3.out", 
                cursor:"pointer"
            })
            tl.to(document.querySelector(".page11-below-line"),{
                width:"40%",
                duration:1,
                ease: "power3.out", 
            })
        })
        elem.addEventListener("mouseleave", function(){
            tl.to(elem, {
                y:0,
                duration:1,
                ease: "power3.out", 
                cursor:"pointer",
            })
            tl.to(document.querySelector(".page11-below-line"),{
                width:"32%",
                duration:1,
                ease: "power3.out", 
            })
        })
    })
} 

function page12Anim(){
        var tl = gsap.timeline();
    tl.from(".page12-top-left h1, .form-container h2",{
        scrollTrigger:{
            trigger:"footer",
            start: "top 80%",
            end: "top 40%",
            scrub: 2,
            scroller: "#main",
        },
        x:-100,
        opacity:0,
        stagger:0.1,
        duration:0.5,
        ease: "power3.out",  
    })

    tl.from(".form-div input, .form-div button",{
        scrollTrigger:{
            trigger:"footer",
            start: "top 70%",
            end: "top 30%",
            scrub: 2,
            scroller: "#main",
        },
        x:-100,
        opacity:0,
        stagger:0.1,
        duration:0.5,
        ease: "power3.out",  
    })

    tl.from(".page12-top-list h3, .page12-bottom-list h3",{
        scrollTrigger:{
            trigger:"footer",
            start: "top 70%",
            end: "top 30%",
            scrub: 2,
            scroller: "#main",
        },
        x:100,
        opacity:0,
        stagger:0.1,
        duration:0.5,
        ease: "power3.out",  
    })

    tl.from(".page12-bottom-main-text h1 span",{
        scrollTrigger:{
            trigger:"footer",
            start: "top 40%",
            end: "top -10%",
            scrub: 2,
            scroller: "#main",
        },
        x:-100,
        opacity:0,
        stagger:0.1,
        duration:1,
        ease: "power3.out",
    })
}

cursorEffect()
navbarAnim()
loaderAnim()
page2Animation()
page3Anim()
page5Anim()
page6Anim()
page7Anim()
page8Anim()
page9_10Anim()
page11Anim()
page12Anim()

