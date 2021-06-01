const contactform = document.querySelector(".form-container");

//get iputs
let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");

contactform.addEventListener("submit", (e) => {
  e.preventDefault();
  //submit clicked
  console.log("submit clicked");
  //collect data
  let formData = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  //send data request(ajax)
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if ((xhr.responseText = "success")) {
      alert("Email sent");
      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      alert("Something went wrong!");
    }
  };
  //send data to backend
  xhr.send(JSON.stringify(formData));
});
