//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(event){
  //Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // local storage test
  //localStorage.setItem('test', 'hello world');
  //test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to localStorage
    //json array and turn it into a string before it gets saved in local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else { //if there is something in bookmark
    //fetch it from local storage
    //create var that takes in the string that gets parsed back into json
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //set it back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


  }

  //prevent form from submitting
  event.preventDefault();
}
//delete bookmarks

function deleteBookmarks(url){
  //fetch bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    //use conditionals to see if current one looped matches url
    if(bookmarks[i].url === url){
      //if it does, splice is out and reset localStorage
      bookmarks.splice(i , 1);
    }
  }



}

// fetch bookmarks

function fetchBookmarks(){
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    //take the var we just made and .inner function will put wtvr html we give it into that spot thru js
    bookmarksResults.innerHTML = '';

    //we want to loop through the bookmarks that are in localStorage and output them 1 by 1 inside of a div
    for (var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div class ="well">' +
                                    '<h3>' + name +
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                    '</h3>' +
                                    '</div>';

    }
}
