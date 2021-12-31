const toggleWeather = document.getElementById("toggle-weather");
let weatherArray = [];
console.log(weatherArray);
function toggle_weather() {
  weatherArray = weatherData.map(
    ({ id, icon, month, highC, highF, lowC, lowF }) => {
      return (
        <div
          key={id}
          class="
      rounded-lg
      sm:h-auto
      bg-white
      text-black text-2xl
      font-light
      p-4
      hover:scale-105
      transform
      transition
      duration-300
      ease-out
      flex flex-col
      space-y-2
    "
        >
          <div class="flex justify-left">
            <img src={icon} alt="" />
          </div>
          <div>
            <p class="font-medium text-black">{month}</p>
            <div class="flex font-normal text-gray-600 space-x-4">
              <span>{highC}</span>
              <span>{lowC}</span>
            </div>
          </div>
        </div>
      );
      // return (data = "<li>" + data + "</li>");
      // return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    }
  );
}

// console.log(weatherArray);

// toggleWeather();
for (const element of weatherArray) {
  document.getElementById("demo").appendChild(element);
}
