const section = document.querySelector("section");
const input = document.querySelector("#input");
const endpoint = 'cities.json'
const cities = [];

window.onbeforeunload = input.value = "";

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    })
}

input.addEventListener("input", func);

function func() {
    if(input.value === "") {
        section.innerHTML = `<label>Search for a city</label>`
    } else {
        section.innerHTML = ""
        const foundCities = findMatches(input.value, cities);
        foundCities.forEach(city => {
            let text = document.createElement("p");
            text.innerHTML = `
            <h2>${city.city} ${city.state}</h2> <br>
                <label>Population: ${city.population}</label><br>
                 <label>Latitude: ${city.latitude}</label><br>
                <label>Longitude: ${city.longitude}</label>
                <label>Growth from 2000 to 2013: ${city.growth_from_2000_to_2013}</label><br>
                <label>Rank: ${city.rank}</label><br>
            `
            let hr = document.createElement("hr");
            section.appendChild(text);
            section.appendChild(hr)
        })
    }
   
}

// const p = document.querySelectorAll("p");

// p.forEach(p => {
//     p.addEventListener("click", (event)=>{
//         event.target.classList.add("positioned");
//         p.innerHTML = `
//             <h2>${city.city} ${city.state}</h2>
//             <label>Population: ${city.population}</label><br>
//             <label>Latitude: ${city.latitude}</label><br>
//             <label>Longitude: ${city.longitude}</label>
//         `
//     })
// })