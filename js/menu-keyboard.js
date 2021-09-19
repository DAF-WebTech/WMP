
$(".primary-nav ul").parent().addClass("has-submenu");

var menuItems1 = document.querySelectorAll('.primary-nav li.has-submenu');
var timer1, timer2;

Array.prototype.forEach.call(menuItems1, function (el, i) {
	// Hover
	el.addEventListener("mouseover", function (event) {
		$(".primary-nav li.has-submenu.open").removeClass("open");
		this.className = "has-submenu open";
		clearTimeout(timer1);
	});

	// Mouse out
	el.addEventListener("mouseout", function (event) {
		timer1 = setTimeout(function (event) {
			var opennav = document.querySelector(".primary-nav li.has-submenu.open");
			if (opennav) {
				opennav.className = "has-submenu";
				opennav.querySelector('a').setAttribute('aria-expanded', "false");
			}
		}, 1000);
	});

	// Click
	el.querySelector('a').addEventListener("click", function (event) {
		if (this.parentNode.className == "has-submenu") {
			this.parentNode.className = "has-submenu open";
			this.setAttribute('aria-expanded', "true");
		}
		else {
			this.parentNode.className = "has-submenu";
			this.setAttribute('aria-expanded', "false");
		}
		//event.preventDefault();
	});

	var links = el.querySelectorAll('a');
	Array.prototype.forEach.call(links, function (el, i) {
		el.addEventListener("focus", function () {
			if (timer2) {
				clearTimeout(timer2);
				timer2 = null;
			}
		});
		el.addEventListener("blur", function (event) {
			timer2 = setTimeout(function () {
				var opennav = document.querySelector(".primary-nav .has-submenu.open")
				if (opennav) {
					opennav.className = "has-submenu";
					opennav.querySelector('a').setAttribute('aria-expanded', "false");
				}
			}, 10);
		});
	});
});


// mbi is an li
var focusNextMenuBarItem = function(mbi) {
    menuClose(mbi.firstElementChild)
    var next = mbi.nextElementSibling;
    var a
    if (next)
        a = next.firstElementChild
    else
        a = mbi.parentElement.firstElementChild.firstElementChild
    
    a.focus()
    menuOpen(a)

}

// mbi is an li
var focusPreviousMenuBarItem = function(mbi) {
    menuClose(mbi.firstElementChild)
    var prev = mbi.previousElementSibling;
    var a
    if (prev)
        a = prev.firstElementChild
    else
        a = mbi.parentElement.lastElementChild.firstElementChild

    a.focus()
    menuOpen(a)
}

// target is <a>
var menuOpen = function (target) {
	target.setAttribute("aria-expanded", true)
	target.parentElement.classList.add("open")
}

//called by a menu list item
var menuClose = function (a) {
	a.removeAttribute("aria-expanded")
	a.parentElement.classList.remove("open")
	a.focus()
}

var isPrintableCharacter = function (str) {
	return str.length === 1 && str.match(/\S/);
}

var onmenubarkeydown = function (evt) {

	var a = evt.currentTarget;
	var li = a.parentElement
	var ul = li.parentElement

	switch (evt.key) {
		case " ":
		case "ArrowDown":
			// Opens submenu and moves focus to first item in the submenu.
			menuOpen(a)
			var subMenu = li.getElementsByTagName("ul")
			if (subMenu.length) {
			    subMenu[0].firstElementChild.firstElementChild.focus()
			}
			break;

		case "ArrowUp":
			// open the menu list and focus on the bottom list item
			menuOpen(a)
			var subMenu = li.getElementsByTagName("ul")
			if (subMenu.length) {
			    subMenu[0].lastElementChild.firstElementChild.focus()
			}
			break;

		case "Enter":
		    // w3 org says "Opens submenu and moves focus to first item in the submenu."
            // but we have active links (landing pages) in the menu bar items, so we send a mouse click instead
            return;
            //this code is not needed. By returning here, we avoid the stopPropagation and preventDefault and rely on the default handling
// 			a.dispatchEvent(new MouseEvent('click', {
// 				'view': window,
// 				'bubbles': true,
// 				'cancelable': true
// 			}));
			break;

		case "ArrowRight":
            // Moves focus to the next item in the menubar.
            // If focus is on the last item, moves focus to the first item.
            focusNextMenuBarItem(li);
			break;

		case "ArrowLeft":
			// Moves focus to the previous item in the menubar.
            // If focus is on the first item, moves focus to the last item.
			focusPreviousMenuBarItem(li)
			break;

		case "Home":
			// move to the first menu bar item
			ul.firstElementChild.firstElementChild.focus();
			break;

		case "End":
			// move to the last menu bar item
			ul.lastElementChild.firstElementChild.focus();
			break;

		default:
            // Moves focus to next item in the menubar having a name that starts with the typed character.
            // If none of the items have a name starting with the typed character, focus does not move.

			// see if there's a listItem that matches the first letter, and if so, move to it
			if (isPrintableCharacter(evt.key)) {
				var menuBarListItems = Array.prototype.slice.call(ul.children)
				var startIndex = menuBarListItems.indexOf(li)
				var found = false;
				// check menu bar items after this one
				for (var i = startIndex + 1; i < menuBarListItems.length; ++i) {
					var thisItem = menuBarListItems[i]
					if (evt.key.toUpperCase() === thisItem.firstElementChild.textContent[0].toUpperCase()) {
						thisItem.firstElementChild.focus()
						found = true
						break;
					}
				}
				if (!found) {
					// check list items starting at front until this one
					for (var i = 0; i < startIndex; ++i) {
						var thisItem = menuBarListItems[i]
						if (evt.key.toUpperCase() === thisItem.firstElementChild.textContent[0].toUpperCase()) {
							thisItem.firstElementChild.focus()
							break;
						}
					}
				}    
			}
	}

	if (evt.key != "Tab") {
		// if it's a tab key, then we can use the standard behaviour
		// otherwise tell the browser we've handled the event
		evt.stopPropagation();
		evt.preventDefault();
	}

}

var getSubTopicItems = function(li) {
	return Array.prototype.slice.call(li.querySelectorAll("div.sub-nav-topics a"))
}

var onlistitemkeydown = function(evt) {
	
	var a = evt.currentTarget
	var li = a.parentElement
	var ul = li.parentElement        
	var menuBarItem = ul.parentElement
	var menuBarList = menuBarItem.parentElement
	var subTopicItems = getSubTopicItems(li) 
	var hasSubTopicItems = subTopicItems.length > 0

	switch(evt.key) {
		case "Enter":
		    // Activates menu item, causing the link to be activated.
			// do this by sending the mouse click to the <a> element, which is already defined
			// commented out: simply by not calling the stopPropagation, the default action will occur
		    return;
			//a.dispatchEvent(new MouseEvent("click", {
			//	"view": window,
			//	"bubbles": true,
			//	"cancelable": true
			//}));
		break;

	    case "Escape":
            // Closes submenu.
            // Moves focus to parent menubar item.
			menuClose(menuBarItem.firstElementChild)
			break;

		case "ArrowDown":
		case " ":
            // Moves focus to the next item in the submenu.
            // If focus is on the last item, moves focus to the first item.
            if (hasSubTopicItems) {
            	subTopicItems[0].focus()
            }
            else {
                focusNextMenuBarItem(li)
            }
            break;

		case "ArrowUp":
            // Moves focus to the previous item in the submenu.
            // If focus is on the first item, moves focus to the last item.
            if (li.previousElementSibling && getSubTopicItems(li.previousElementSibling).length > 0) {
            	var subtopics = getSubTopicItems(li.previousElementSibling)
            	subtopics[subtopics.length-1].focus()
            }
            else if (li.previousElementSibling == null) {
            	var subtopics = getSubTopicItems(ul.lastElementChild)
            	if (subtopics.length > 0) {
            		subtopics[subtopics.length - 1].focus()
            	}
            	else {
                   focusPreviousMenuBarItem(li)
            	}
            }
            else {
                focusPreviousMenuBarItem(li)
            }
            break;

        case "ArrowRight":
			// Closes submenu.
			// Moves focus to next item in the menubar.
			// Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
			menuClose(menuBarItem.firstElementChild)
			focusNextMenuBarItem(menuBarItem)
            break;

        case "ArrowLeft":
            // Closes submenu.
            // Moves focus to previous item in the menubar.
            // Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
    		menuClose(menuBarItem.firstElementChild)
	    	focusPreviousMenuBarItem(menuBarItem)
            break;

		case "Home":
			//Moves focus to the first item in the submenu.
			ul.firstElementChild.firstElementChild.focus()
			break;

		case "End":
			//Moves focus to the last item in the submenu.
			ul.lastElementChild.firstElementChild.focus() 
			break;

		case "Tab":
		    // we didn't like the w3 approach which was send focus to next element after menu
		    // generally the default tab behaviour was just as we want
		    // the only exception is where we are on the last element of a list
		    // in which case, we want it to behave like it's a right arrow
		    // but if it's last item in last menu, move on
		    // and if it's first item in first menu, and a shift tab, close it.
            if (!evt.shiftKey && li == ul.lastElementChild) {
            	if (!hasSubTopicItems )  {
            	    menuClose(menuBarItem.firstElementChild)
            	}
            	else {
            		subTopicItems[0].focus;
            	}
		    }
		    if (evt.shiftKey && li == ul.firstElementChild) {
		    	menuClose(menuBarItem.firstElementChild)
		    }
		    break; 



		default:
			// Moves focus to the next item having a name that starts with the typed character.
			// If none of the items have a name starting with the typed character, focus does not move.
			// see if there's a item that matches the first letter, and if so, move to it
			if (isPrintableCharacter(evt.key)) {
				var listItems = Array.prototype.slice.call(ul.children)
				var startIndex = listItems.indexOf(li)
				var found = false;
				// check menu bar items after this one
				for (var i = startIndex + 1; i < listItems.length; ++i) {
					var thisItem = listItems[i]
					if (evt.key.toUpperCase() === thisItem.firstElementChild.textContent[0].toUpperCase()) {
						thisItem.firstElementChild.focus()
						found = true
						break;
					}
				}
				if (!found) {
					// check menu bar items before this one
					for (var i = 0; i < startIndex; ++i) {
						var thisItem = listItems[i]
						if (evt.key.toUpperCase() === thisItem.firstElementChild.textContent[0].toUpperCase()) {
							thisItem.firstElementChild.focus()
							break;
						}
					}
				}    
		    }
    }

	if (evt.key != "Tab") {
		// if it's a tab key, then we can use the standard behaviour
		// otherwise tell the browser we've handled the event
		evt.stopPropagation();
		evt.preventDefault();
	}
}

var onsubtopicitemkeydown = function(evt) {
	var a = evt.currentTarget
	var li = a.parentElement.parentElement
	var ul = li.parentElement        
	var menuBarItem = ul.parentElement
	var menuBarList = menuBarItem.parentElement

	switch(evt.key) {
		case "Enter":
		    return; 
		    break;
	    case "Escape":
            // Closes submenu.
            // Moves focus to parent menubar item.
			menuClose(menuBarItem.firstElementChild)
			break;

		case "ArrowDown":
		case " ":
            // Moves focus to the next item in the submenu.
            // If focus is on the last item, moves focus to the first item.
            if (a.nextElementSibling) {
            	a.nextElementSibling.focus()
            }
            else {
                focusNextMenuBarItem(li)
            }
            break;

		case "ArrowUp":
            // Moves focus to the previous item in the submenu.
            // If focus is on the first item, moves focus to the last item.
            if (a.previousElementSibling && a.previousElementSibling.tagName == "A") {
            	a.previousElementSibling.focus()
            }
            else {
                li.firstElementChild.focus()
            }
            break;


        case "ArrowRight":
			// Move focus to next list item
			if (li.nextElementSibling)
			    li.nextElementSibling.firstElementChild.focus()
		    else {
		    	ul.firstElementChild.firstElementChild.focus() // it's the last, so return to first
		    }
            break;

        case "ArrowLeft":
			// Move focus to previous list item
			// Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
			if (li.previousElementSibling)
			    li.previousElementSibling.firstElementChild.focus()
		    else {
		    	ul.lastElementChild.firstElementChild.focus() // it's the first, so set to last//todo  or previous menu bar?
		    }
            break;

		case "Home":
			//Moves focus to the first item in the submenu.
			getSubTopicItems(li)[0].focus()
			break;

		case "End":
			//Moves focus to the last item in the submenu.
			a.parentElement.lastElementChild.focus() 
			break;

		case "Tab":
            if (!evt.shiftKey && li == ul.lastElementChild && a == a.parentElement.lastElementChild) {
                menuClose(menuBarItem.firstElementChild)
		    }
		    break; 			

		default:
			// Moves focus to the next item having a name that starts with the typed character.
			// If none of the items have a name starting with the typed character, focus does not move.
			// see if there's a item that matches the first letter, and if so, move to it
			if (isPrintableCharacter(evt.key)) {
				var listItems = getSubTopicItems(li)
				var startIndex = listItems.indexOf(a)
				// check menu bar items after this one
				for (var i = startIndex + 1; i < listItems.length; ++i) {
					var thisItem = listItems[i]
					if (evt.key.toUpperCase() === thisItem.textContent.trim()[0].toUpperCase()) {
						thisItem.focus()
						break;
					}
				}
				// check menu bar items before this one
				for (var i = 0; i < startIndex; ++i) {
					var thisItem = listItems[i]
					if (evt.key.toUpperCase() === thisItem.textContent.trim()[0].toUpperCase()) {
						thisItem.focus()
						break;
					}
				}
		    }
    }
	

	if (evt.key != "Tab") {
		// if it's a tab key, then we can use the standard behaviour
		// otherwise tell the browser we've handled the event
		evt.stopPropagation();
		evt.preventDefault();
	}
}


// set click events on the <a>
// menu bar items
Array.prototype.slice.call(document.querySelectorAll("ul.primary-nav > li")).forEach(function (mbi) {
	mbi.firstElementChild.addEventListener("keydown", onmenubarkeydown)
	// list items
	Array.prototype.slice.call(mbi.querySelectorAll("li")).forEach(function(menuListItem) {
		menuListItem.firstElementChild.addEventListener("keydown", onlistitemkeydown)
	    //sub list items
	    Array.prototype.slice.call(menuListItem.querySelectorAll("div.sub-nav-topics a")).forEach(function(subTopicItem) {
	    	subTopicItem.addEventListener("keydown", onsubtopicitemkeydown)
	    })	
	})
})//
