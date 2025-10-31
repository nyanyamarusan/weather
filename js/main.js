$("#prefecture").change(function() {
    let prefecture = $(this).val();

    $(".icon").hide();
    $(".icon").text("Loading...").addClass("loading").fadeIn();

    async function callApi() {
        let area = await fetch("https://msearch.gsi.go.jp/address-search/AddressSearch?q=" + prefecture);
        let areaData = await area.json();
        let lat = areaData[0].geometry.coordinates[1];
        let lng = areaData[0].geometry.coordinates[0];

        let weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lng + "&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia/Tokyo");
        let weatherData = await weather.json();
        let todayMin = weatherData.daily.temperature_2m_min[0];
        let todayMax = weatherData.daily.temperature_2m_max[0];
        let tomorrowMin = weatherData.daily.temperature_2m_min[1];
        let tomorrowMax = weatherData.daily.temperature_2m_max[1];
        let todayWeatherCode = weatherData.daily.weather_code[0];
        let tomorrowWeatherCode = weatherData.daily.weather_code[1];

        function weatherIcon(weatherCode) {
            switch (weatherCode) {
                case 0:
                case 1:
                    return "☀️";
                case 2:
                    return "⛅️";
                case 3:
                    return "☁️";
                case 45:
                case 48:
                    return "🌫️";
                case 51:
                case 53:
                case 55:
                case 56:
                case 57:
                case 61:
                case 63:
                case 65:
                case 66:
                case 67:
                    return "🌧️";
                case 71:
                case 73:
                case 75:
                case 77:
                    return "⛄";
                case 80:
                case 81:
                case 82:
                    return "🌦️";
                case 85:
                case 86:
                    return "🌨️";
                case 95:
                case 96:
                case 99:
                    return "⛈️";
            }
        }

        $(".icon").removeClass("loading");

        $("#todayMin").text(todayMin + "℃");
        $("#todayMax").text(todayMax + "℃");
        $("#tomorrowMin").text(tomorrowMin + "℃");
        $("#tomorrowMax").text(tomorrowMax + "℃");

        $("#todayWeatherIcon").text(weatherIcon(todayWeatherCode));
        $("#tomorrowWeatherIcon").text(weatherIcon(tomorrowWeatherCode));
    }
    callApi();
});
