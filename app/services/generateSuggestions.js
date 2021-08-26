function generateSuggestions(sgData) {
    const { airTemperature, waterTemperature, waveDirection, waveHeight, wavePeriod, windDirection, windSpeed, precipitation } = sgData;

    const suggestions = [];

    //Surf
    const waveHeightOk = (waveHeight >= 0.5);
    const waveDirectionOk = (waveDirection >= 180 && waveDirection <= 300);
    const wavePeriodOk = (wavePeriod > 6);
    const windDirectionOk = ((windDirection > 120 && windDirection < 320) && windSpeed > 8);
    if(waveHeightOk && waveDirectionOk && wavePeriodOk && !windDirectionOk) suggestions.push({id: 1, text: "Surf"});

    //Beach
    if(airTemperature >= 18 && waterTemperature >= 17 && !precipitation) {
        suggestions.push({id: 2, text: "Plage"})
    };
    
    //Sail
    if(waveHeight <= 4 && windSpeed >= 5) suggestions.push({id: 3, text: "Voile"});

    //If nothing matches
    if(suggestions.length === 0) suggestions.push({id: 4, text: "Pas grand chose à faire à la plage"});

    return suggestions;

}

module.exports = generateSuggestions;
