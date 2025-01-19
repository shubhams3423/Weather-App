export const weatherIconsObj = {
  day: {
    1000: require("./assets/Icons/WeatherIcons/day/clear.png"),
    1003: require("./assets/Icons/WeatherIcons/day/cloudy.png"),
    1006: require("./assets/Icons/WeatherIcons/day/partially_cloudy.png"),
  },
  night: {
    1000: require("./assets/Icons/WeatherIcons/night/clear.png"),
    1003: require("./assets/Icons/WeatherIcons/night/partially_cloudy.png"),
    1006: require("./assets/Icons/WeatherIcons/night/partially_cloudy.png"),
    1183: require("./assets/Icons/WeatherIcons/night/light_rain.png"),
  },
  commonIcon: {
    1183: require("./assets/Icons/WeatherIcons/moderate_rain.png"),
    1009: require("./assets/Icons/WeatherIcons/cloudy.png"),
    1030: require("./assets/Icons/WeatherIcons/moderate_rain.png"),
    1072: require("./assets/Icons/WeatherIcons/freezing_drizzle.png"),
    1150: require("./assets/Icons/WeatherIcons/freezing_drizzle.png"),
    1063: require("./assets/Icons/WeatherIcons/patchy_rain.png"),
    1180: require("./assets/Icons/WeatherIcons/patchy_rain.png"),
    1066: require("./assets/Icons/WeatherIcons/patchy_snow.png"),
    1069: require("./assets/Icons/WeatherIcons/patchy_snow.png"),
    1087: require("./assets/Icons/WeatherIcons/thunder.png"),
    1192: require("./assets/Icons/WeatherIcons/heavy_rain.png"),
    1135: require("./assets/Icons/WeatherIcons/fog.png"),
    1147: require("./assets/Icons/WeatherIcons/fog.png"),
    1195: require("./assets/Icons/WeatherIcons/heavy_rain.png"),
    1186: require("./assets/Icons/WeatherIcons/heavy_rain.png"),
    1189: require("./assets/Icons/WeatherIcons/moderate_rain.png"),
    1243: require("./assets/Icons/WeatherIcons/moderate_rain.png"),
    1213: require("./assets/Icons/WeatherIcons/light_snow.png"),
    1219: require("./assets/Icons/WeatherIcons/moderate_snow.png"),
    1216: require("./assets/Icons/WeatherIcons/moderate_snow.png"),
    1114: require("./assets/Icons/WeatherIcons/light_shower.png"),
    1117: require("./assets/Icons/WeatherIcons/blizzard.png"),
    1255: require("./assets/Icons/WeatherIcons/light_shower.png"),
    1210: require("./assets/Icons/WeatherIcons/light_snow.png"),
    1261: require("./assets/Icons/WeatherIcons/light_snow.png"),
    1264: require("./assets/Icons/WeatherIcons/light_snow.png"),
    1258: require("./assets/Icons/WeatherIcons/moderate_snow.png"),
    1249: require("./assets/Icons/WeatherIcons/light_shower.png"),
    1237: require("./assets/Icons/WeatherIcons/light_shower.png"),
    1198: require("./assets/Icons/WeatherIcons/light_shower.png"),
    1240: require("./assets/Icons/WeatherIcons/light_shower.png"),
    1168: require("./assets/Icons/WeatherIcons/light_shower.png"),
    1225: require("./assets/Icons/WeatherIcons/heavy_snow.png"),
    1201: require("./assets/Icons/WeatherIcons/heavy_snow.png"),
    1222: require("./assets/Icons/WeatherIcons/heavy_snow.png"),
    1171: require("./assets/Icons/WeatherIcons/heavy_snow.png"),
    1207: require("./assets/Icons/WeatherIcons/heavy_snow.png"),
    1252: require("./assets/Icons/WeatherIcons/moderate_snow.png"),
    1282: require("./assets/Icons/WeatherIcons/thunder_with_snow.png"),
    1279: require("./assets/Icons/WeatherIcons/thunder_rain.png"),
    1273: require("./assets/Icons/WeatherIcons/thunder_rain.png"),
    1276: require("./assets/Icons/WeatherIcons/thunder_rain.png"),
    1153: require("./assets/Icons/WeatherIcons/light_drizzle.png"),
    1204: require("./assets/Icons/WeatherIcons/light_drizzle.png"),
    1246: require("./assets/Icons/WeatherIcons/light_drizzle.png"),
  },
};

export const getWeatherIcon = (isDay, code) => {
  if (weatherIconsObj[isDay][code]) {
    return weatherIconsObj[isDay][code];
  } else if (weatherIconsObj["commonIcon"][code]) {
    return weatherIconsObj["commonIcon"][code];
  }
  return;
};
