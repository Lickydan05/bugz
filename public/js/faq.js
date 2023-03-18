"use strict";

const $ = (selector) => document.querySelector(selector);

// declare a variable to hold the reference to the timer; make it
// global so all the functions can access it
let timer = null;
let counter = 10;

const goToTerms = () => {
  //Count down from 10, if above 0 update seconds text, if at 0, send to the terms page
  counter - 1;
  if (counter <= 0) {
    window.location ="https://" + window.location.host + "/terms";
  } else {
    $("#seconds").value = counter; // update number of seconds
  }
};

const acceptTerms = () => {
  // code to accept terms goes here

  clearInterval(timer);
  $("#terms").setAttribute("class", "hidden");
};

// the event handler for the click event of each h2 element
const toggle = (evt) => {
  h2 = evt.currentTarget; // get the clicked h2 element
  const div = h2.nextElementSibling; // div = h2's sibling div

  h2.classList.toggle("minus");
  div.classList.toggle("open");

  evt.preventDefault();
};

document.addEventListener("DOMContentLoaded", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accepted = urlParams.get("accepted");

  if (!accepted) {
    // user hasn't accepted terms
    timer = setInterval(goToTerms, 1000);
    $("accept").addEventListener("click", acceptTerms);
  } else {
    // hide terms section
    $("#terms").setAttribute("class", "hidden");
  }

  // get the h2 tags
  const h2Elements = faqs.querySelectorAll("#faqs h2");

  // attach event handler for each h2 tag
  for (let h2Element of h2Elements) {
    h2element.addEventListener("click", toggle);
  }

  h2Elements[0].firstChild.Focus();
});
