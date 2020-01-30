document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e) {
    // Get from values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

   if(!validateForm(siteName, siteUrl)) {
       return false;
   }

    var bookmark = {
        name:siteName,
        url:siteUrl
    };

    // Local Storage Test
    // localStorage.setItem('test', 'HelloWorld');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));

    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else {
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // clear form after a valid submitting
    document.getElementById('myForm').reset();
    //Re-fetch / reload bookmarks
    fetchBookmarks();
    // prevents form  from submitting
    e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch / reload bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if(bookmarks == null) return;

    var bookmarksResults = document.getElementById('bookmarksReults');

    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<h3>' + name +
                                    '<br><a href="'+ url +'">Visit</a>' +
                                    '<br><a onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a>' +
                                    '</h3>';
    }
}

function validateForm(siteName, siteUrl) {
    // checks if form is empty
    if(!siteName || ! siteUrl) {
        alert('Please fill in the Form');
        return false;
    }    
    // checks if it is a valid url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}