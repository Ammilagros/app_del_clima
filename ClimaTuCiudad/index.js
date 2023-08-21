
const APP_ID = 'a60916b33fe0d19e31be3b9c297bfa8b'; // Llamar weather app para obtener informacion del clima

const fechData = position =>{ //Obtener la data del clima
    const { latitude, longitude} = position.coords; //obtener las coordenadas
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
    //una vez obtenida la respuesta
    .then(response => response.json()) //respuesta del servidor
    .then(data =>setWeatherData(data));
    console.log(position);
}

const setWeatherData = data =>{
    //Juntar toda la info recolecta en una sola variarible
    const weatherData = {
        Location:    data.name,
        Description: data.weather[0].main,
        Humidity:    data.main.humidity,
        Pressure:    data.main.pressure,
        Temperature: data.main.temp,
        Date:        getDate()
    }

    //Recorrer el objeto y visualizarlo en el HTML
    Object.keys(weatherData).forEach( key =>{
        document.getElementById(key).textContent=`${weatherData[key]}`;
   });

   cleanUp();
}

//Mientras la info termina de cargar, el usuario visualizará un spinner
function cleanUp() {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');
    loader.style.display = 'none';
    container.style.display = 'flex';
}

//Fecha del día
const getDate = () =>{
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`; //
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fechData); //Obtener la localización del usuario
}