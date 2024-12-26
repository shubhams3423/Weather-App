export const weatherIconsObj = {
  day: {
    1000: require("./assets/Icons/WeatherIcons/day/clear.png"),
    1183: require("./assets/Icons/WeatherIcons/day/lightRain.png"),
    1003: require("./assets/Icons/WeatherIcons/day/cloudy.png"),
    1006: require("./assets/Icons/WeatherIcons/day/partiallyCloudy.png"),
  },
  night: {
    1000: require("./assets/Icons/WeatherIcons/night/clear.png"),
    1003: require("./assets/Icons/WeatherIcons/night/partlyCloudy.png"),
    1006: require("./assets/Icons/WeatherIcons/night/partlyCloudy.png"),
    1183: require("./assets/Icons/WeatherIcons/night/lightRain.png"),
  },
  commonIcon: {
    1009: require("./assets/Icons/WeatherIcons/cloudy.png"),
    1030: require("./assets/Icons/WeatherIcons/mist.png"),
    1072: require("./assets/Icons/WeatherIcons/freezingDrizzle.png"),
    1150: require("./assets/Icons/WeatherIcons/freezingDrizzle.png"),
    1063: require("./assets/Icons/WeatherIcons/patchyRain.png"),
    1180: require("./assets/Icons/WeatherIcons/patchyRain.png"),
    1066: require("./assets/Icons/WeatherIcons/patchySnow.png"),
    1069: require("./assets/Icons/WeatherIcons/patchySnow.png"),
    1087: require("./assets/Icons/WeatherIcons/thunder.png"),
    1192: require("./assets/Icons/WeatherIcons/heavyRain.png"),
    1135: require("./assets/Icons/WeatherIcons/fog.png"),
    1147: require("./assets/Icons/WeatherIcons/fog.png"),
    1195: require("./assets/Icons/WeatherIcons/heavyRain.png"),
    1186: require("./assets/Icons/WeatherIcons/heavyRain.png"),
    1189: require("./assets/Icons/WeatherIcons/moderateRain.png"),
    1243: require("./assets/Icons/WeatherIcons/moderateRain.png"),
    1213: require("./assets/Icons/WeatherIcons/lightSnow.png"),
    1219: require("./assets/Icons/WeatherIcons/moderateSnow.png"),
    1216: require("./assets/Icons/WeatherIcons/moderateSnow.png"),
    1114: require("./assets/Icons/WeatherIcons/lightShower.png"),
    1117: require("./assets/Icons/WeatherIcons/blizzard.png"),
    1255: require("./assets/Icons/WeatherIcons/lightShower.png"),
    1210: require("./assets/Icons/WeatherIcons/lightSnow.png"),
    1261: require("./assets/Icons/WeatherIcons/lightSnow.png"),
    1264: require("./assets/Icons/WeatherIcons/lightSnow.png"),
    1258: require("./assets/Icons/WeatherIcons/moderateSnow.png"),
    1249: require("./assets/Icons/WeatherIcons/lightShower.png"),
    1237: require("./assets/Icons/WeatherIcons/lightShower.png"),
    1198: require("./assets/Icons/WeatherIcons/lightShower.png"),
    1240: require("./assets/Icons/WeatherIcons/lightShower.png"),
    1168: require("./assets/Icons/WeatherIcons/lightShower.png"),
    1225: require("./assets/Icons/WeatherIcons/heavySnow.png"),
    1201: require("./assets/Icons/WeatherIcons/heavySnow.png"),
    1222: require("./assets/Icons/WeatherIcons/heavySnow.png"),
    1171: require("./assets/Icons/WeatherIcons/heavySnow.png"),
    1207: require("./assets/Icons/WeatherIcons/heavySnow.png"),
    1252: require("./assets/Icons/WeatherIcons/moderateSnow.png"),
    1282: require("./assets/Icons/WeatherIcons/thunderWithSnow.png"),
    1279: require("./assets/Icons/WeatherIcons/thunderRain.png"),
    1273: require("./assets/Icons/WeatherIcons/thunderRain.png"),
    1276: require("./assets/Icons/WeatherIcons/thunderRain.png"),
    1153: require("./assets/Icons/WeatherIcons/lightDrizzle.png"),
    1204: require("./assets/Icons/WeatherIcons/lightDrizzle.png"),
    1246: require("./assets/Icons/WeatherIcons/lightDrizzle.png"),
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
