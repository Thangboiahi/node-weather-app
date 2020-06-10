console.log("client side js is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#message");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  message.textContent = "Loading...";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
  response.json()
    .then((data = {}) => {
      if (data.error) {
        message.textContent = data.error;
      } else {
        message.textContent = `${data.location} : ${data.forecast}`;
      }
    })
  })
})