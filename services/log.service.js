import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ' + ' ' + error));
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ' + ' ' + message));
};

const printHelp = (language = 'en') => {
  if (language == 'ru') {
    console.log(
      dedent`${chalk.bgCyan(' HELP ')}
       Без параметров - вывод погоды
      -s [CITY] для установки города
      -h для вывода помощи
      -t [API_KEY] для сохранения токена
      -l [LANGUAGE] для сохранения языка (en, ru)
      `
    );
  } else {
    console.log(
      dedent`${chalk.bgCyan(' HELP ')}
       No parameters - output weather
      -s [CITY] to set city
      -h for help
      -t [API_KEY] to save token
      -l [LANGUAGE] to save language (en, ru)
      `
    );
  }  
};

const printWeather = (res, icon, language = 'en') => {
  if (language == 'ru') {
    console.log(
      dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
       ${icon}  ${res.weather[0].description}
       Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
       Влажность: ${res.main.humidity}%
       Скорость ветра: ${res.wind.speed}
      `
    );
  } else {
    console.log(
      dedent`${chalk.bgYellow(' WEATHER ')} Weather in ${res.name}
       ${icon}  ${res.weather[0].description}
       Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
       Humidity: ${res.main.humidity}%
       Wind speed: ${res.wind.speed}
      `
    );
  }
};

export { printError, printSuccess, printHelp, printWeather };