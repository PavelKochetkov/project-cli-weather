#!/usr/bin/env node
import { getArgs } from './helpers/args_helper.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

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
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    language === 'ru' ? printSuccess('Город сохранён') : printSuccess('City saved');
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
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const language = process.env.LANGUAGE ?? await getKeyValue(TOKEN_DICTIONARY.language);
    const weather = await getWeather(city, language);
    printWeather(weather, getIcon(weather.weather[0].icon), language);
  } catch (e) {
      const language = process.env.LANGUAGE ?? await getKeyValue(TOKEN_DICTIONARY.language);
      if (e?.response?.status == 404) {
        language === 'ru' ? printError('Неверно указан город') : printError('The city is incorrectly specified');
      } else if (e?.response?.status == 401) {
        language === 'ru' ? printError('Неверно указан токен') : printError('Token is incorrect');
      } else {
        printError(e.message);
      }
    }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  const language = process.env.LANGUAGE ?? await getKeyValue(TOKEN_DICTIONARY.language);
 
  if (args.h) {
    return printHelp(language);
  }

  if (args.s) {
    return saveCity(args.s, language);
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