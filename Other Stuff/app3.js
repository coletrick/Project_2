

var studentItem = document.getElementsByClassName('student-item');
var studentUl = studentItem[0].parentNode;
var studentName = document.getElementsByTagName('h3');
var studentEmail = document.getElementsByClassName('email');
var studentElementsArr = [];
var studentNameArr = [];


for (var i = 0; i < studentItem.length; i++) {
  studentElementsArr.push(studentItem[i]);
  studentNameArr.push(studentName[i].innerText + " " + studentEmail[i].innerText);
}


function createPagination() {
  //
  var numOfPages = (studentItem.length / 10) + 1;
  //Get div that contains main page to create pagination in
  var pageDiv = document.getElementsByClassName('page')[0];
  //Create div to house pagination
  var createDiv = document.createElement('div');
  //Create Ul for page
  var createUl = document.createElement('ul');
  //Add class to newly created div
  createDiv.className = 'pagination';
  //
  createUl.id = 'paginationUl';
  //Append the div to the header div
  pageDiv.appendChild(createDiv);
  //
  createDiv.appendChild(createUl);

  for (var i = 1; i < numOfPages; i++) {
    //Create Li for page
    var createLi = document.createElement('li');
    //Create anchor link for page
    var createAnchor = document.createElement('a');
    //Add the href location
    createAnchor.href = '#';
    //
    createAnchor.id = 'pageNum' + i;
    //Add the text with correct page number
    createAnchor.innerText = i;
    //
    createUl.appendChild(createLi);
    //
    createLi.appendChild(createAnchor);
  }
    var active = document.getElementById('pageNum1');
      active.className = 'active';
}
  createPagination();


//Create search bar and append to header
function createSearchBar() {
  //Get div that contains header
  var headerDiv = document.getElementsByClassName('page-header')[0];
  //Create div to append to header
  var createDiv = document.createElement('div');
  //Create input for search box
  var createInput = document.createElement('input');
  //Create search button
  var createButton = document.createElement('button');

  //Add class to newly created div
  createDiv.className = "student-search";
  //Add the placeholder text to the search input
  createInput.placeholder = "Search for students...";
  //
  createInput.id = 'buttonInput';
  //
  createInput.type = 'text';
  //Add the text search to the button
  createButton.innerText = "Search";
  //Append the div to the header div
  headerDiv.appendChild(createDiv);
  //Append the new search input
  createDiv.appendChild(createInput);
  //Append the search button
  createDiv.appendChild(createButton);
  //
  var button = document.getElementsByTagName('button')[0];
  //
  button.addEventListener("click", function() {
    search();
  });
}
  //Run the function, if JS is not installed/blocked then the search bar will not show up. (Unobstrusive JavaScript)
  createSearchBar();


  function showOrHideAll(show,hide) {
    if (hide) {
      while (studentUl.firstChild) {
        studentUl.removeChild(studentUl.firstChild);
      }
    } else if (show) {
        for (var i = 0; i < studentElementsArr.length; i++)
          studentUl.appendChild(studentElementsArr[i]);
    }
  }
    showOrHideAll(false,true);




  // function hideAll() {
  //   while (studentUl.firstChild) {
  //     studentUl.removeChild(studentUl.firstChild);
  //   }
  // }
  //   hideAll();


var showPage = function() {
    showOrHideAll(false,true);
    var active = document.getElementsByClassName('active');
    var pageNumber = parseInt(this.children[0].innerText) * 10 - 10;
    var lastPage = studentElementsArr.length - pageNumber;

      if (lastPage > 9) {
        for (var i = pageNumber; i < pageNumber + 10; i++) {
          studentUl.appendChild(studentElementsArr[i]);
        }
      } else {
          for (var x = pageNumber; x < pageNumber + lastPage; x++) {
            studentUl.appendChild(studentElementsArr[x]);
          }
        }

        for (var y = 0; y < active.length; y++) {
          active[y].className = '';
        }

        this.children[0].className = 'active';
};

function paginationLinks() {
var paginationUl = document.getElementById('paginationUl');
  for (var i = 0; i < paginationUl.children.length; i++) {
    paginationUl.children[i].onclick = showPage;
  }
}
paginationLinks();


function firstPage() {
  showOrHideAll(false,true);
  var active = document.getElementsByClassName('active');
  var firstPage = document.getElementById('pageNum1');

    for (var i = 0; i < 10; i++) {
      studentUl.appendChild(studentElementsArr[i]);
    }
    for (var x = 0; x < active.length; x++) {
      active[x].className = '';
    }
      firstPage.className = 'active';
}
firstPage();


function message() {
  var page = document.getElementsByClassName('student-list')[0];
  var message = document.createElement('h4');

    page.appendChild(message);
    message.innerText = 'Sorry we could not find anyone by that name or email address. Please try your search again!';
}



function search() {
  showOrHideAll(false,true);
  var buttonInput = document.getElementById('buttonInput');
  var foundName = '';
    if (!buttonInput.value) {
      firstPage();
    }

    if (buttonInput.value) {
      for (var i = 0; i < studentNameArr.length; i++) {
        if (studentNameArr[i].match(buttonInput.value.toLowerCase())) {
          foundName += studentUl.appendChild(studentElementsArr[i]);
        }
      }
    }
    // createPagination(numOfPages);
    if (buttonInput.value && !foundName) {
      message();
    }
}
