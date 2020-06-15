const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#message");
const mapElement = document.getElementById("map");

const renderMap = coords => {
  if (!google) {
    mapElement.textContent = "Google Map Service not working!"
    return;
  }

  const map = new google.maps.Map(
    mapElement,
    {
      center: coords,
      zoom: 15
    }
  )

  new google.maps.Marker({
    position: coords,
    map
  })
}

const fetchData = () => {
  const location = search.value;
  fetch(`/weather?address=${location}`).then(response => {
  response.json()
    .then((data = {}) => {
      if (data.error) {
        message.textContent = data.error;
        mapElement.textContent = "Could not get location of unspecified address!";
      } else {
        message.textContent = `${data.location} : ${data.forecast}`;
        console.log(data.coordinates);
        renderMap(data.coordinates);
      }
    })
  })
};

const submitHandler  = event => {
  event.preventDefault();
  message.textContent = "Loading...";
  mapElement.textContent = "Loading...";
  fetchData();
}

weatherForm.addEventListener("submit", submitHandler);