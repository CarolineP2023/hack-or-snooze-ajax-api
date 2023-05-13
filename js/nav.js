"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $loginForm.hide();
  $signupForm.hide();
}
/** when a user clicks on submit in the navbar the UI will show the submit form */
function navSubmitClick(evt){
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
  
}

$navSubmitStory.on("click", navSubmitClick);

/** when user clicks on favorites from nav bar the UI will show a list of favorited stories */

function navFavoriteStories(evt){
  console.debug("navFavoriteStories");
  hidePageComponents();
  $submitForm.hide();
  $favoriteStoriesList.show();
}

$("#nav-favorite-story").on("click", navFavoriteStories);

function navMyStories(evt){
  console.debug("navMyStories");
  hidePageComponents();
  $submitForm.hide();
  $(".my-list").show();
}

$("#nav-my-story").on("click", navMyStories);

