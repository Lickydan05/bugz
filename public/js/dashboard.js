"use strict";
/*  syntax error: typos, calling functions or variables by the wrong name
reference error: code refers to something that can't be accessed or doesn't exist
Logic error: Code runs but there's a mistake in the logic preventing it from producing the expected results.
runtime error: code can be run but has an issue once it runs.
thrown error: dev explicitly throws an error when certain code is run.

console.log: outputs a message to the web console.
console.warn: outputs a warning message to the Web console.
console.error: outputs an error message to the Web console.
console.trace: logs the function that called it, then the function that called that one, and the one that called that one, until it gets to global context (logged as anonymous) which calls everything

const $ = (selector) => document.querySelector(selector); makes it so that $("#id") selects the id.

REGEX
/Character classes/
.	         any character except newline
\w\d\s	   word, digit, whitespace
\W\D\S	   not word, digit, whitespace
[abc]   	 any of a, b, or c
[^abc]  	 not a, b, or c
[a-g]	     character between a & g

/Anchors/
^abc$	     start / end of the string
\b\B	     word, not-word boundary

/Escaped characters/
\.\*\\	   escaped special characters
\t\n\r	   tab, linefeed, carriage return

/Groups & Lookaround/
(abc)	     capture group
\1	       backreference to group #1
(?:abc)	   non-capturing group
(?=abc)	   positive lookahead
(?!abc)	   negative lookahead

/Quantifiers & Alternation/
a*a+a?	   0 or more, 1 or more, 0 or 1
a{5}a{2,}	 exactly five, two or more
a{1,3}	   between one & three
a+?a{2,}?	 match as few as possible
ab|cd	     match ab or cd

evt = events 
HTML events are "things" that happen to HTML elements.
When JavaScript is used in HTML pages, JavaScript can "react" on these events.
Types:
onchange	An HTML element has been changed
onclick	The user clicks an HTML element
onmouseover	The user moves the mouse over an HTML element
onmouseout	The user moves the mouse away from an HTML element
onkeydown	The user pushes a keyboard key
onload	The browser has finished loading the page

.checked = sets or returns the checked state of a checkbox
.value = sets or returns the value attribute of a text field
.textContent = is all text contained by an element and all its children that are for formatting purposes only.
.innerText = returns all text contained by an element and all its child elements.
.innerHtml = returns all text, including html tags, that is contained by an element.
.length = of an array, represents the # of elements in the array
window.location = object that can be used to get the current page address (URL) and to redirect the browser to a new page. //see faq.js line 15
The clearInterval() method clears a timer set with the setInterval() method.
The setInterval() method calls a function at specified intervals (in milliseconds). It continues calling the function until clearInterval() is called, or the window is closed. (1 second = 1000 milliseconds) i.e. setInterval(var, 1000) = every second


*/

const $ = (selector) => document.querySelector(selector);

const postalRegEx =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

const onReset = (evt) => {
  //TODO:: Reset the reset-able fields
  resetErrors();

  $("#notifications").checked = true;

  $("#eco").checked = true;
  $("#temperature").value = 21;
  $("#location").value = "L7W 4T8";

  evt.preventDefault();
};

const resetErrors = () => {
  $("#temperature_error").textContent = "";
  $("#location_error").textContent = "";
  console.error("Fields Reset");
};

const onSubmit = (evt) => {
  //TODO::Reset any errors before submitting
  resetErrors();

  //TODO:: Set notifications since it doesn't need to be validated
  let notificationsOn = $("#notifications").checked;

  $("#setting_notifications").textContent = notificationsOn ? "On" : "Off";

  //TODO:: Set lighting mode with a for loop since it doesn't need to be validated
  //querySelectorAll returns an array of everything that matches the argument
  let lightingModeOptions = document.querySelectorAll("[name='lighting_mode']");

  for (let i = 0; i < lightingModeOptions.length; i++) {
    if (lightingModeOptions[i].checked) {
      //Set setting_lighting_mode to the value of the selected radio button
      $("#setting_lighting_mode").textContent = lightingModeOptions[i].value;
    }
  }

  //TODO:: Validate the postal code with the Regular Expression,
  //TODO:: Display an error if not valid
  let location = $("#location").value;

  if (postalRegEx.test(location)) {
    //if the postal code is valid this code will run
    $("#setting_location").textContent = location;
  } else {
    //Add your logic here if the postal code is not valid
    $("#location_error").textContent =
      "The postal code did not match the format required.";
  }

  //TODO:: Validate the temperature by checking the range and if it's a number
  //TODO:: Display an error if not valid
  let temperature = $("#temperature").value;
  let temperatureError = $("#temperature_error");

  if (isNaN(temperature) || temperature == "") {
    temperatureError.textContent = "This is not a valid temperature selection.";
  } else if (temperature > 25) {
    temperatureError.textContent =
      "Max temperature is 25C, setting temperature to Max";
    $("#setting_temperature").textContent = 25;
  } else if (temperature < 10) {
    temperatureError.textContent =
      "Min temperature is 10C, setting temperature to Min";
    $("#setting_temperature").textContent = 10;
  } else {
    $("#setting_temperature").textContent = temperature;
  }

  evt.preventDefault();
};

document.addEventListener("DOMContentLoaded", () => {
  //TODO:: Add current date
  $("#date_display").textContent = new Date().toDateString();
  //TODO:: Add Reset Form listener
  $("#reset_form").addEventListener("reset", onReset);
  //TODO:: Add Submit Form listener
  $("#update_settings").addEventListener("click", onSubmit);
});
