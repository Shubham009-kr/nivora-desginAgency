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
            markers: true,         // Debugging: Shows start/end points (REMOVE in production)
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

    console.log(clutter)


    gsap.set(".pag2-middle-text span", {opacity: .1})
    gsap.to(".pag2-middle-text span", {
        scrollTrigger:{
            trigger:"#page2",
            start: "top 60%",
            end: "top 20%",
            scrub: 2,
            scroller: "#main",
            // markers:true,
        },
        opacity: 1,
        stagger: .03,
        ease: Power4,
    })
}

    

cursorEffect()
page2Animation()

