"use strict";

window.QG = window.QG || {};

/*==-------------------------------------------------------------------====
    FUNCTIONS 
====-------------------------------------------------------------------==*/
QG.navigation = function() {
    var navToggle = $(".icon-menu-toggle");

    $(".icon-menu-toggle").click(function() {
        if (navToggle.hasClass('active')) {
            navToggle.removeClass('active');
            $(".primary-nav-container").slideUp(300);
        }
        else {
            navToggle.addClass('active');
            $(".primary-nav-container").slideDown(300);
        }
    });
};


QG.accordion = function() {
    function closeAccordionItem (li, button) {
    	li.removeClass("active")
    	li.find(".accordion-content").slideUp(300)
    	button.attr("aria-expanded", "false")
    }
    
    function openAccordionItem (li, button) {
    	li.addClass("active")
    	li.find(".accordion-content").slideDown(300)
    	button.attr("aria-expanded", "true")
    }
    
    var accordion = $("ul.accordion") 
    
    accordion.find("button.accordion-trigger").click(function() {

        var myButton = $(this)
        var currentItem = myButton.closest("li.accordion-item")
        
        // A. if our accordion item is open, close it (always do this for both single and multiple)
        if (currentItem.hasClass("active")) {
        	closeAccordionItem(currentItem, myButton)
        }
        
        else { // opening
        
        	// B. always open the currently clicked item 
        	openAccordionItem(currentItem, myButton)
        
        	// C. if accordion is a single type, then close the previously opened item.	
        	if ($(".accordion").data("accordionType") == "single") {
        		var previousItem = accordion.find("li.accordion-item.active").not(currentItem) // should only be  one
        		closeAccordionItem(previousItem, previousItem.find("button")) 
        	}
        }
    })
};


QG.fancybox = function() {
    $(".content-image.active a").fancybox();
    $(".image-gallery a").fancybox();
};

QG.slickslider = function() {
    $(".image-carousel").slick({
        adaptiveHeight: false
    });
};

QG.fatFooter = function() {
    var footerToggle = $(".fat-footer .expand-toggle");

    $(footerToggle).click(function(e) {
        var footerItem = $(this).parent();
        e.preventDefault();
        
        if (footerItem.hasClass('active')) {
            footerItem.parent().find("ul").slideUp(150);
            footerItem.removeClass('active');
        }
        else {
            footerItem.addClass('active');
            footerItem.parent().find("ul").slideDown(150);
        }
    });
};

/*==---------------------------------------------------------====
    Global Alerts
====---------------------------------------------------------====
    Check the alert state of the session storage variable and 
    only display it if the state does not equal "closed"
====---------------------------------------------------------==*/
QG.globalAlert = function() {
    // sessionStorage.setItem("alertState","");
    var windowClosed = sessionStorage.getItem("alertState");
    
    if ( windowClosed === "closed" ) {
        $(".global-alert").remove();
    }
    else {
        $(".global-alert").show();
        $(".close-alert").click(function() {
            sessionStorage.setItem("alertState","closed");
            $(".global-alert").slideUp(150);
        });
    }
};


/*==-------------------------------------------------------------------====
    INITIALISATION 
====-------------------------------------------------------------------==*/
QG.init = QG.init || [];
QG.init.unshift(QG.navigation, QG.globalAlert, QG.accordion, QG.fancybox, QG.slickslider, QG.fatFooter);

$(document).ready(function() {
    QG.init.forEach(function(f) {
        f();
    });
});
