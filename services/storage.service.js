import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY ={
  token: 'token',
  city: 'city',
  cities: 'cities',
  language: 'language',
};

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);

    return data[key];
  }

  return undefined;
};

const addCity = async (city) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  
  if (!data[TOKEN_DICTIONARY.cities]) {
    data[TOKEN_DICTIONARY.cities] = [];
  }
  
  const cities = data[TOKEN_DICTIONARY.cities];
  if (!cities.includes(city)) {
    cities.push(city);
  }
  
  data[TOKEN_DICTIONARY.city] = city;
  
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getCities = async () => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[TOKEN_DICTIONARY.cities] || [];
  }
  return [];
};

const removeCity = async (city) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  
  if (!data[TOKEN_DICTIONARY.cities]) {
    return;
  }
  
  const cities = data[TOKEN_DICTIONARY.cities];
  const index = cities.indexOf(city);
  if (index !== -1) {
    cities.splice(index, 1);
    data[TOKEN_DICTIONARY.cities] = cities;
    await promises.writeFile(filePath, JSON.stringify(data));
  }
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY, addCity, getCities, removeCity };