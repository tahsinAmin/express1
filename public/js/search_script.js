// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = document.querySelector(".autocom-box ");

// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value; // user enetered data
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestions.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    console.log(emptyArray);
    searchWrapper.classList.add("active");
    showSuggestions(userData, emptyArray);

    let altList = suggBox.querySelectorAll("li");
    for (let i = 0; i < altList.length; i++) {
      altList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active");
  }
};

function select(element) {
  let selectUserData = element.textContent;
  inputBox.value = selectUserData;
  searchWrapper.classList.remove("active");
}

function showSuggestions(userData, list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = "<li>" + userData + "</li>";
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}
