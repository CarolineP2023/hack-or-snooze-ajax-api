"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $("#submit-form").hide();
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
  putStoriesOnPage();
  $loginForm.hide();
  $signupForm.hide();

}

/** function to submit form */
function navSubmitClick(evt) {
  console.debug("navSubmitClick",evt);

  hidePageComponents();
  $submitForm.show();
  $allStoriesList.show();
  $userStories.show();
}
$navSubmit.on("click", navSubmitClick);

/** click event for users list of favorite stories */

function navFavoritesClick(evt) {
  console.debug("navFavoriteClick",evt);
  $submitForm.hide();
  hidePageComponents();
  $userFavorites.show();
  $userStories.hide();
}

$navFavorites.on("click", navFavoritesClick);

function navUserStoriesClick(evt) {
  console.debug("navUserStoriesClick",evt);
  $submitForm.hide();
  hidePageComponents();
  addUserStoriesToList();
  $userStories.show();
  $userFavorites.hide();
}

$navUserStories.on("click", navUserStoriesClick);
