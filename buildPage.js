// Script to build all HTML, each section called as a function

function makeHeader() {
    const container = document.createElement('div');
    const headTextDiv = document.createElement('div');
    const headText = document.createElement('h1');
    const locationText = document.createElement('h1');
    const headLocation = '<span id="head-location">(loading...)</span>';
    const headImgDiv = document.createElement('div');
    const headImg = document.createElement('img');
    const headImgCaption = document.createElement('div');

    container.setAttribute('id', 'head');
    headTextDiv.setAttribute('id', 'head-text-div');
    headText.setAttribute('id', 'head-text');
    locationText.setAttribute('id', 'head-location-text');
    headText.innerHTML = `LET'S TALK ABOUT THE WEATHER`;
    locationText.innerHTML = `IN ${headLocation}`;
    headImgDiv.setAttribute('id', 'head-img-div');
    headImg.setAttribute('id', 'head-img');
    headImgCaption.setAttribute('id', 'head-caption');
    headImg.src = './img/clouds.png';
    headImgCaption.innerHTML = 'Try clicking on the location to change it.';

    headTextDiv.appendChild(headText);
    headImgDiv.appendChild(headImg);
    headImgDiv.appendChild(headImgCaption);
    container.appendChild(headTextDiv);
    container.appendChild(headImgDiv);
    container.appendChild(locationText);

    return container;
}

function makeToday() {
    const container = document.createElement('div');
    const head = document.createElement('h5');
    const content = document.createElement('p');

    const weekDay = '<span id="today-weekday">(loading...)</span>';
    const day = '<span id="today-day">(loading...)</span>';
    const month = '<span id="today-month">(loading...)</span>';
    const weather = '<span id="today-weather">(loading...)</span>';
    const temp = '<span id="today-temp">(loading...)</span>';
    const real = '<span id="today-real">(loading...)</span>';
    const high = '<span id="today-hi">(loading...)</span>';
    const low = '<span id="today-lo">(loading...)</span>';
    const wind = '<span id="today-wind">(loading...)</span>';

    head.innerHTML = 'TALKING ABOUT RIGHT NOW';
    container.setAttribute('id', 'today-container');
    content.innerHTML = `Today is ${weekDay} the ${day} of ${month}. The weather today is ${weather}. Currently it is ${temp} degrees outside and is ${wind} windy, so you can expect it to feel like ${real} degrees.  We can expect a high of ${high} degrees and a low of ${low} degrees.`;
    container.appendChild(head);
    container.appendChild(content);

    return container;
}

function makeFourDay() {
    const container = document.createElement('div');
    const head = document.createElement('h5');
    const content = document.createElement('div');

    const day1 = document.createElement('p');
    const day2 = document.createElement('p');
    const day3 = document.createElement('p');
    const day4 = document.createElement('p');
    const date1 = '<span id="date-0">(loading...)</span>';
    const date2 = '<span id="date-1">(loading...)</span>';
    const date3 = '<span id="date-2">(loading...)</span>';
    const date4 = '<span id="date-3">(loading...)</span>';
    const forecast1 = '<span id="forecast-0">(loading...)</span>';
    const forecast2 = '<span id="forecast-1">(loading...)</span>';
    const forecast3 = '<span id="forecast-2">(loading...)</span>';
    const forecast4 = '<span id="forecast-3">(loading...)</span>';

    head.innerHTML = 'WHAT ABOUT THE FUTURE?'
    container.setAttribute('id', 'five-day-container');
    day1.innerHTML = `Tomorrow is ${date1} and we can expect ${forecast1}.`;
    day2.innerHTML = `The day after that is ${date2} and we can expect ${forecast2}.`;
    day3.innerHTML = `Next is ${date3} with ${forecast3}.`;
    day4.innerHTML = `And finally it will be ${date4} and we expect ${forecast4}.`;
    content.appendChild(day1);
    content.appendChild(day2);
    content.appendChild(day3);
    content.appendChild(day4);
    container.appendChild(head);
    container.appendChild(content);

    return container;
}

function buildPage() {
    const container = document.createElement('div');
    const body = document.createElement('div');
    container.setAttribute('id', 'content');
    body.setAttribute('id', 'content-body');
    body.appendChild(makeToday());
    body.appendChild(makeFourDay());
    container.appendChild(makeHeader());
    container.appendChild(body);
    document.body.appendChild(container);
}

buildPage();