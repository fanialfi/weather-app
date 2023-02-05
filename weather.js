const appid = "26dc71ad2e6842ad35899ee1dad4a0a0";
function getUrl(city = "Jakarta") {
  return `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&appid=${appid}&q=${city}`;
}
function searchWeather(city) {
  const url = getUrl(city);
  return fetch(url, {
    method: "GET",
  });
}

function buttonClick() {
  clearData();
  try {
    const promise = searchWeather(document.getElementById("keyword").value);
    promise
      .then((response) => response.json())
      .then(function (data) {
        if (data.cod == 200) {
          createElement("h1", data.name, data.sys.country);
          createElement(
            "p",
            `location = longitude : ${data.coord.lon}`,
            `latitude : ${data.coord.lat}`
          );
          createElement("p", "cuaca = ", data.weather[0].description);
          createElement("p", "temperatur = ", `${data.main.temp}\u00B0 C`);
          createElement("p", "kecepatan angin = ", `${data.wind.speed} m/s`);
        } else {
          createElement("h1", "pesan = ", data.message);
        }
      });
  } catch (error) {
    createElement("h1", "data =", error.message);
  }
}

function createElement(elementBaru = "p", isiElementBaru, isiElementBaru2) {
  const parent = document.querySelector("#display-hasil");
  const child = document.createElement(elementBaru);
  child.textContent = `${isiElementBaru} ${isiElementBaru2}`;
  parent.append(child);
}
function clearData() {
  const parent = document.querySelector("#display-hasil");
  parent.textContent = "";
}
