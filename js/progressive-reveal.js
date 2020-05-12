"use strict"
document.addEventListener("DOMContentLoaded", function() {

	var listeners = document.querySelectorAll("div[data-publisher]");
	for (i = 0; i < listeners.length; ++i) {
		var listener = listeners[i]
		var publisher = document.getElementById(listener.dataset.publisher);
		publisher.addEventListener("change", function(evt) {
			publisher.checked ? $(listener).show(400) : listener.hide(400);
		});

	}
});