document.getElementById('siteForm').addEventListener('submit' , bookmarkSite);

// function bookmark site
function bookmarkSite(e){
  // stop submiting form
  e.preventDefault();

  // get siteName and siteURL
  let siteName = document.querySelector('#siteName').value,
      siteURL  = document.querySelector('#siteURL').value;

if(!siteName || !siteURL){
  alert('please enter valid name and url');
  return false;
}
if(!checkURL(siteURL)){
  alert('url is invalid');
  return false;
}
let bookmark = {
  'site' : siteName,
  'URL'  : siteURL
};
  // bookMarks array that will hold bookMarks
  let bookmarks = [];

  // check if there are bookmarks or not to add new bookmark
  if(localStorage.getItem('bookmarks') !== null){
    // get stored bookmarks
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }
  // add the new bookmark to the array
  bookmarks.push(bookmark);
  // add the bookmarks array to localStorage
  localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
  fetchBookmarks();

}

function checkURL(url){
  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (url.match(regex))
    return true;

  return false;

}

function fetchBookmarks(){
  document.querySelector('#siteName').value = '';
  document.querySelector('#siteURL').value  = '';

  let result = document.querySelector('#bookmarkResults');
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  let content = '';
  for(let i=0; i<bookmarks.length; i++){
    let site = bookmarks[i].site,
        url = bookmarks[i].URL;
    content += `<div class="well">
                  <h3> ${site}
                    <a href="${url}" target="_blank" class="btn btn-primary">Visit</a>
                    <a href="#" class="btn btn-danger" onclick="event.preventDefault();deleteBookmark('${url}')">delete</a>
                  </h3>
                </div>`;
  }

  result.innerHTML = content;
}

function deleteBookmark(siteURL){

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(let i=0; i<bookmarks.length; i++){
    if(bookmarks[i].URL == siteURL){
      bookmarks.splice(i , 1);
      break;
    }
  }
  localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
  fetchBookmarks();
}
