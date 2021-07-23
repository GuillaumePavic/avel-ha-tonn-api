function generateSuggestions(sgData) {
    const { airTemperature, waterTemperature, waveDirection, waveHeight, wavePeriod, windDirection, windSpeed } = sgData;
    let { precipitation } = sgData;
    const suggestions = [];

    //Surf
    const wvHeight = (waveHeight >= 0.5);
    const wvDir = (waveDirection >= 180 && waveDirection <= 300);
    const wvPeriod = (wavePeriod > 6);
    const windDir = ((windDirection > 120 && windDirection < 320) && windSpeed > 8);
    if(wvHeight && wvDir && wvPeriod && !windDir) suggestions.push({id: 1, text: "Surf"});

    //Beach
    if(airTemperature >= 18 && waterTemperature >= 17 && !precipitation) {
        suggestions.push({id: 2, text: "Plage"})
        //sometimes Stormglass doesn't provide data for precipitation, therefore =>
        precipitation = 0;
    };
    
    //Sail
    if(waveHeight <= 4 && windSpeed >= 5) suggestions.push({id: 3, text: "Voile"});

    //If nothing matches
    if(suggestions.length === 0) suggestions.push({id: 4, text: "Pas grand chose à faire à la plage"});

    return suggestions;

}

module.exports = generateSuggestions;
