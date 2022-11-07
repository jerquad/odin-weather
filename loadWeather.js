// Fetches Open Weather data based on the Open Weather Geolocator search results
async function getWeatherData(search) {
    try{
        const data = await search;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=adf5af2a65ec517047f615b7f33f3ad8&units=imperial`);
        const responseData = await response.json();
        manageDisplay(responseData);
    } catch (e) {
        console.log(e);
    }
}

// Sets all variables in the page with collected data.
function manageDisplay(data) {
    const processed = processData(data);
    const location = document.getElementById('head-location');
    const epoch = data.list[0].dt;
    const dateToday = new Date(epoch * 1000);
    const dayOfWeek = Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateToday);
    const dayOfMonth = dayHelper(dateToday.getDate());
    const month = Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateToday);
    
    location.innerHTML = data.city.name.toUpperCase();
    document.getElementById('today-weekday').innerHTML = dayOfWeek;
    document.getElementById('today-day').innerHTML = dayOfMonth;
    document.getElementById('today-month').innerHTML = month;
    document.getElementById('today-weather').innerHTML = weatherHelper(data.list[0].weather[0].id)
    document.getElementById('today-temp').innerHTML = temperatureHelper(Math.floor(data.list[0].main.temp));
    document.getElementById('today-real').innerHTML = temperatureHelper(Math.floor(data.list[0].main.feels_like));
    document.getElementById('today-lo').innerHTML = temperatureHelper(Math.floor(data.list[0].main.temp_min));
    document.getElementById('today-hi').innerHTML = temperatureHelper(Math.floor(data.list[0].main.temp_max));
    document.getElementById('today-wind').innerHTML = windHelper(data.list[0].wind.speed);

    for (let i = 1; i < 5; i++) {
        const day = processed[i];
        const date = document.getElementById(`date-${i - 1}`);
        const forecast = document.getElementById(`forecast-${i - 1}`);
        const foreString = `${day.weather} weather, with an average of ${day.avg} degrees and highs and lows of ${day.hi} and ${day.lo} degrees`
        date.innerHTML = day.date;
        forecast.innerHTML = foreString;
    }
}

/* Return an array containing an array of objects with processed string representation of 
 * all date data. Index 0 is the information for right now, it then advances to the first 
 * step of the next day and calculates each subsequent day's avereages. Each day being a 
 * subsequent index
*/
function processData(data) {
    const today = new Date(data.list[0].dt * 1000);
    const processed = [];
    let offset = 1 + Math.floor((24 - today.getHours()) / 3);
    
    // Today's infor
    processed.push({
        date: getDateString(today),
        weather: weatherHelper(data.list[0].weather[0].id),
        temp: temperatureHelper(Math.floor(data.list[0].main.temp)),
        real: temperatureHelper(Math.floor(data.list[0].main.feels_like)),
        wind: windHelper(data.list[0].wind.speed)
    })

    // Next four days
    const limit = offset + 28;
    while (offset < limit) {
        const date = new Date(data.list[offset].dt * 1000);
        let avg = 0;
        let hi = Number.NEGATIVE_INFINITY;
        let lo = Number.POSITIVE_INFINITY;
        const weatherCodes = new Map();
        for (let i = 0; i < 7; i++) {
            avg += data.list[offset + i].main.temp;
            if (data.list[offset + i].main.temp_min > hi) { 
                hi = data.list[offset + i].main.temp_min;
            }
            if (data.list[offset + i].main.temp_max < lo) { 
                lo = data.list[offset + i].main.temp_max;
            }
            const code = data.list[offset + i].weather[0].id;
            if (weatherCodes.has(code)) {
                weatherCodes.set(code, weatherCodes.get(code) + 1);
            } else {
                weatherCodes.set(code, 1);
            }
        }
        let mostCode = [0,0];
        for (let key of weatherCodes.keys()) {
            if (weatherCodes.get(key) > mostCode[1]) {
                mostCode[0] = key;
                mostCode[1] = weatherCodes.get(key);
            }
        }
        processed.push({
            date: getDateString(date),
            weather: weatherHelper(mostCode[0]),
            avg: temperatureHelper(Math.floor(avg / 7)),
            lo: temperatureHelper(Math.floor(lo)),
            hi: temperatureHelper(Math.floor(hi))
        });
        offset += 8;
    }
    return processed;
}

// Initial load-in, gets weather information for Boston, MA
getWeatherData({ 'lon': -71.0605, 'lat': 42.3554 });
