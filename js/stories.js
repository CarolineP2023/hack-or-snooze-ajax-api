"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showHeart = Boolean(currentUser);
  return $(`
      <li id="${story.storyId}">
      ${showDeleteBtn ? getDeleteBtnHTML() : "" }
      ${showHeart ? getHeartHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** making a delete button for HTML */

function getDeleteBtnHTML(){
  return `<button class="trash">x</button>`;
}

/** delete a story event */
async function deleteStory(evt){
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);
  await addUserStoriesToList();
}

$userStories.on("click", ".trash", deleteStory);
/** making the heart icon for html */
function getHeartHTML(story, currentUser){
  const isFavorite = currentUser.isFavorite(story);
  let heartType = isFavorite ? "fas" : "far";
  return `
      <span class="heart">
        <i class="${heartType} fa-heart"> </i>
      </span>`;
}

/** favorite and unfavorite stories */
async function toggleFavoriteStories(evt){
  console.debug("toggleFavoriteStories");

  const $target = $(evt.target);
  const $closestLi = $target.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(story =>(story.storyId === storyId));
  if($target.hasClass("fas")){
     await currentUser.removeFavorite(story);
     $target.closest("i").toggleClass("fas far");
  } else{
     await currentUser.addFavorite(story);
     $target.closest("i").toggleClass("fas far")
  }
}

$allStoriesList.on("click", ".heart", toggleFavoriteStories);


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
/** function to get data from the form and call the .addStory 
 * to put new story on the page
 */
async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  // grab all info from form
  let title = $("#new-title").val();
  let url = $("#new-url").val();
  let author = $("#new-author").val();
  const username = currentUser.username
  const storyData = {title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $story.addClass("user-story");
  $allStoriesList.prepend($story);
  
}

$submitForm.on("submit", submitNewStory);

function addFavoritesToList(){
  $userFavorites.empty();

  if(currentUser.favorites.length === 0){
    $userFavorites.append("<h5>No favorites added!</h5>")
  } else {
    for(let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $userFavorites.append($story);
    }
  }
  $userStories.hide();
  $userFavorites.show();
}

function addUserStoriesToList(){
  $userStories.empty();

  if(currentUser.ownStories.length === 0){
    $userStories.append("<h5>No stories added!</h5>")
  } else {
    for(let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story, true);
      $userStories.append($story);
    }
  }
  $userStories.show();
  $userFavorites.hide();
}

