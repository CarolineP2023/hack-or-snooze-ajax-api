"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const favoriteIcon = Boolean(currentUser);
 
  return $(`
      <li id="${story.storyId}">
        ${favoriteIcon ? heartHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>'
    `);
  
}
/** Make delete button HTML for story */


/** make favorite/non-favorite star for story */
function heartHTML(evt){
  const $target = $(evt.target);
  const heartType = $target ? "far" : "fas";
  return `
        <span class="heart">
          <i class="${heartType} fa-heart"></i>
        </span>`;
}
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
/** handle deleting a story */
 function deleteStory(evt){
  console.debug("deleteStory");

  if(story.username === currentUser){
  storyList.removeStory($closestLi);
  console.log("it was clicked")
 };
//regenerate story list
  
 }
 $(".trash").on("click", deleteStory);


 //handle for submitting a new story form


 async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  // grab all info from form
  const title = $("#new-title").val();
  const url = $("#new-url").val();
  const author = $("#new-author").val();
  const username = currentUser.username
  const storyData = {title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $story.addClass("user-story").prepend("<button class='trash'>x</delete>")
  $allStoriesList.prepend($story);
  
}

$submitForm.on("submit", submitNewStory);



/** function used to toggle the heart favorites on and off */

async function toggleStoryFavorite(evt){
  console.debug("toggleStoryFavorite");


  const $target = $(evt.target);
  const $closestLi = $target.closest("li");
  const storyId = $closestLi.attr ("id");
  const story = storyList.stories.find(s=> s.storyId === storyId);


  if ($target.hasClass("fas")) {
    $target.closest("i").toggleClass("fas far");
    $favoriteStoriesList.remove(story);
    await currentUser.removeFavorite(story);

  } else{
    $target.closest("i").toggleClass("fas far");
    $favoriteStoriesList.append($closestLi);
    await currentUser.addFavorite(story);
   //console.log(currentUser.username);
  }
}

$("#all-stories-list").on("click", ".heart", toggleStoryFavorite);
$("#favorite-list").on("click", ".heart", toggleStoryFavorite);
