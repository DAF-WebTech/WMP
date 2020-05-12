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
    var accType = $(".accordion").data("accordion-type");

    $('.accordion .accordion-title').click(function() {
        var accItem = $(this).parent();

        if (accType == "multiple") {
            if (accItem.hasClass('active')) {
                accItem.removeClass('active');
                accItem.find(".accordion-content").slideUp(300);
            }
            else {
                accItem.addClass('active');
                accItem.find('.accordion-content').slideDown(300);
            }
        } 
        else {
            if (accItem.hasClass('active')) {
                accItem.removeClass('active');
                accItem.find(".accordion-content").slideUp(300);
            }
            else {
                $(".accordion .accordion-item").removeClass('active');
                $(".accordion .accordion-content").slideUp(300);
                accItem.addClass('active');
                accItem.find('.accordion-content').slideDown(300);
            }
        }
    });
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

QG.leaveFeedback = function() {
    var feedbackPanel = $(".feedback-container");
    var feedbackButton = $(".feedback-button");
    
    feedbackButton.click(function(e) {
        e.preventDefault();

        if (feedbackPanel.hasClass('active')) {
            feedbackPanel.slideUp(350).removeClass('active');
        }
        else {
            feedbackPanel.addClass('active').slideDown(350);
        }
        
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
QG.init.unshift(QG.navigation, QG.globalAlert, QG.accordion, QG.fancybox, QG.slickslider, QG.leaveFeedback, QG.fatFooter);

$(document).ready(function() {
    QG.init.forEach(function(f) {
        f();
    });
});