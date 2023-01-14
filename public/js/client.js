const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

let User = {};
User.loggedin = false;
const original = document.querySelector(".gallery").innerHTML

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetSectionId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetSectionId);


    sections.forEach(section => {
      section.classList.remove('active');
    });

    targetSection.classList.add('active');
  });
});

function filter(elem) {
  document.querySelector(".gallery").innerHTML = original
  let list_photos = document.querySelectorAll("#photo_item")
  for (i = 0; i < list_photos.length; i++) {
    if ((list_photos[i].dataset.photo) !== elem.dataset.photo.toString()) {
      list_photos[i].remove()
    }
  }
}

function adminbar() {
  const li = document.querySelector("#bar").appendChild(document.createElement("li"))
  li.innerHTML = `<a href="#">Manage Literature</a>`
  const li2 = document.querySelector("#bar").appendChild(document.createElement("li"))
  li2.innerHTML = `<a href="#">Manage Sources</a>`
}

function clearbar() {
  document.querySelector("#bar").removeChild(document.querySelector("#bar").lastChild)
  document.querySelector("#bar").removeChild(document.querySelector("#bar").lastChild)
}

function submitLogin() {
  if (User.loggedin === false) {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("login_form").elements["username"].value,
        psw: document.getElementById("login_form").elements["psw"].value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        User = json
        if (User.loggedin === true) {
          if (User.isadmin === true) {
            document.querySelector('#login_response').innerHTML = "<p style=\"font-family:Lucida Handwriting;\">" + "Logged in succesfully as Admin " + User.username; + "</p>"
            console.log("Admin " + User.username);
            adminbar()
          }
          else {
            document.querySelector('#login_response').innerHTML = "<p style=\"font-family:Lucida Handwriting;\">" + "Logged in succesfully as User " + User.username + "</p>"
            console.log("User " + User.username)
          }
        }
        else {
          console.log("Wrong Credentials")
          document.querySelector('#login_response').innerHTML = "<p style=\"font-family:Lucida Handwriting;\">" + "Wrong Credentials" + "</p>"
          setTimeout(clearLoginMessage, 3500);
        }
      })
  } else {
    alert("Logout First")
  }
}

function clearLoginMessage() {
  document.querySelector('#login_response').innerHTML = "";
}

function logout() {
  if (User.isadmin) {
    clearbar()
  }
  User = {};
  User.loggedin = false;
  clearLoginMessage()
}

async function books(id) {
  const bookfetch = await fetch("../books.json")
  const bookread = await bookfetch.json()
  let bookarray = bookread.books
  let bookinfo = bookarray[id - 1]
  const title = bookinfo.title
  const pages = bookinfo.pages
  const desc = bookinfo.description
  document.querySelector("#book_container").innerHTML = "<br>" + "<h1 style=\"font-family:Lucida Handwriting;\">" + title + "</h1>" + "<br>" + "<br>" + "<h2 style=\"font-family:Lucida Handwriting;\">" + "Pages: " + pages + "</h2>" + "<br>" + "<br>" + "<p style=\"font-family:Lucida Handwriting;\">" + desc + "</p>"
}