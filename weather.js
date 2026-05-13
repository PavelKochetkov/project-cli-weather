#!/usr/bin/env node
import { getArgs } from './helpers/args_helper.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue, addCity, getCities } from './services/storage.service.js';

const saveToken = async (token, language) => {
  if (!token.length) {
    language === 'ru' ? printError('Не передан token') : printError('Token is not provided');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    language === 'ru' ? printSuccess('Токен сохранён') : printSuccess('Token saved');
  } catch(e) {
    printError(e.message);
  }
};

const saveCity = async (city, language) => {
  if (!city.length) {
    language === 'ru' ? printError('Не передан город') : printError('City is not provided');
    return;
  }

  try {
    await addCity(city);
    language === 'ru' ? printSuccess(`Город "${city}" добавлен`) : printSuccess(`City "${city}" added`);
  } catch(e) {
    printError(e.message);
  }
};

const saveLanguage = async (language, langStore) => {
  if (language !== 'en' && language !== 'ru') {
    langStore === 'ru' ? printError('Неверно указан язык, допустимые значения en, ru') : printError('Invalid language specified, allowed values are en, ru');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.language, language);
    language === 'ru' ? printSuccess('Язык сохранён') : printSuccess('Language saved');
  } catch(e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const language = process.env.LANGUAGE ?? await getKeyValue(TOKEN_DICTIONARY.language);
    const cities = await getCities();
    let targetCities = cities;
    if (targetCities.length === 0) {
      const singleCity = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
      if (singleCity) {
        targetCities = [singleCity];
      } else {
        language === 'ru' ? printError('Не указан город. Используйте -s [CITY] для добавления города.') : printError('No city specified. Use -s [CITY] to add a city.');
        return;
      }
    }
    
    for (const city of targetCities) {
      try {
        const weather = await getWeather(city, language);
        printWeather(weather, getIcon(weather.weather[0].icon), language);
      } catch (e) {
        if (e?.response?.status == 404) {
          language === 'ru' ? printError(`Город "${city}" не найден`) : printError(`City "${city}" not found`);
        } else if (e?.response?.status == 401) {
          language === 'ru' ? printError('Неверно указан токен') : printError('Token is incorrect');
          break;
        } else {
          language === 'ru' ? printError(`Ошибка для города "${city}": ${e.message}`) : printError(`Error for city "${city}": ${e.message}`);
        }
      }
    }
  } catch (e) {
    printError(e.message);
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  const language = process.env.LANGUAGE ?? await getKeyValue(TOKEN_DICTIONARY.language);
 
  if (args.h) {
    return printHelp(language);
  }

  if (args.s) {
    const cities = Array.isArray(args.s) ? args.s : [args.s];
    for (const city of cities) {
      await saveCity(city, language);
    }
    return;
  }

  if (args.t) {
    return saveToken(args.t, language);
  }

  if (args.l) {
    return saveLanguage(args.l, language);
  }

  return getForecast();
};

await initCLI();