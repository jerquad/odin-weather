/*
 * Collection of helper functions used to convert weather data
 * into text based display data
*/

// Convert numbers 1 - 31 into text representation
function dayHelper(day) {
    const counters = new Map([
        [1, 'first'],
        [2, 'second'],
        [3, 'third'],
        [4, 'fourth'],
        [5, 'fifth'],
        [6, 'sixth'],
        [7, 'seventh'],
        [8, 'eighth'],
        [9, 'ninth'],
        [10, 'tenth'],
        [11, 'eleventh'],
        [12, 'twelfth'],
        [13, 'thirteenth'],
        [14, 'fourteenth'],
        [15, 'fifteenth'],
        [16, 'sixteenth'],
        [17, 'seventeenth'],
        [18, 'eighteenth'],
        [19, 'nineteenth'],
        [20, 'twentieth'],
        [30, 'thirtieth']
    ]);
    if (day > 20 && day < 30) {
        return 'twenty '.concat(counters.get(day - 20));
    } else if (day > 30) {
        return 'thirty '.concat(counters.get(day - 30));
    } else {
        return counters.get(day);
    }
}

// Builds out a sring representation of integer temperatures ranging from -199 to 199
function temperatureHelper(temp) {
    let tempString = '';
    if (temp < 0) {
        tempString = tempString.concat('negative ');
        temp *= -1;
    }
    if (temp === 100) { return tempString.concat('one hundred'); }
    if (temp > 100) { 
        tempString = tempString.concat('one hundred and ');
        temp -= 100;
    }

    if (temp >= 10 && temp < 20) {
        const tens = new Map([
            [10, 'ten'],
            [11, 'eleven'],
            [12, 'twelve'],
            [13, 'thirteen'],
            [14, 'fourteen'],
            [15, 'fifteen'],
            [16, 'sixteen'],
            [17, 'seventeen'],
            [18, 'eighteen'],
            [19, 'nineteen']
        ]);
        return tempString.concat(tens.get(temp));
    }
    switch (Math.floor(temp / 10)) {
        case 2:
            tempString = tempString.concat('twenty ');
            break;
        case 3:
            tempString = tempString.concat('thirty ');
            break;
        case 4:
            tempString = tempString.concat('forty ');
            break;
        case 5:
            tempString = tempString.concat('fifty ');
            break;
        case 6:
            tempString = tempString.concat('sixty ');
            break;
        case 7:
            tempString = tempString.concat('seventy ');
            break;
        case 8:
            tempString = tempString.concat('eighty ');
            break;
        case 9:
            tempString = tempString.concat('ninety ');
            break;
    }

    switch (temp % 10) {
        case 0:
            return tempString.slice(0, -1);
        case 1: 
            return tempString.concat('one');
        case 2:
            return tempString.concat('two');
        case 3:
            return tempString.concat('three');
        case 4:
            return tempString.concat('four');
        case 5:
            return tempString.concat('five');
        case 6:
            return tempString.concat('six');
        case 7:
            return tempString.concat('seven');
        case 8:
            return tempString.concat('eight');
        case 9:
            return tempString.concat('nine');
    }
}

// Windspeed in mph to severity
function windHelper(speed) {
    if (speed < 4) { return 'not'; }
    if (speed < 15) { return 'a bit'; }
    if (speed < 31) { return 'quite'; }
    if (speed < 46) { return 'extremely'; }
    return 'dangerously'; 
}

// Utilizes OpenWeather's weather codes, somewhat streamlined.
function weatherHelper(code) {
    switch (Math.floor(code / 100)) {
        case 2:
            return 'thunderstorming';
        case 3:
            return 'drizzling';
        case 5:
            const rain = code - 500;
            if (rain === 0 || rain === 20) { return 'lightly raining'; }
            else if (rain === 11) { return 'freezing rain'; }
            else if (rain === 1 || rain === 21) { return 'raining'; }
            else { return 'raining heavily'; }
        case 6:
            const snow = code - 600;
            if (snow === 0 || snow === 12 || snow === 20) { return 'lightly snowing'; }
            else if (snow === 11 || snow === 13) { return 'sleeting'; }
            else if (snow === 2 || snow === 22) { return 'heavily snowing'; }
            else { return 'snowing'; }
        case 7:
            if (code === '701' || code === '741') { return 'foggy'; }
            else if (code === '721') { return 'hazy'; }
            else { return 'pretty wild'; }
        case 8:
            if (code === 800) { return 'clear'; }
            else if (code === '804') { return 'overcast'; }
            else { return 'partly cloudy'; }
        default:
            return 'unexpected';
    }
}

// returns a formated date string
function getDateString(date) {
    return ''.concat(Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date))
        .concat(' the ')
        .concat(dayHelper(date.getDate()))
        .concat(' of ')
        .concat(Intl.DateTimeFormat('en-US', { month: 'long' }).format(date));
}