/**
 * pass in target json name from ./public/static/locales/en/*
   to back fill translations in any other locale language de fr lt lv
  i.e. `npm run update:translations -- ChangeMePlease`
 */
const localeFilename = process.argv.slice(2)[0] || 'ChangeMePlease';
console.log(`${localeFilename}.json`);

const fs = require('fs');
const { mergeWith, isString } = require('lodash');
const path = require('path');
const fromScripts = (p) => path.join(__dirname, `../public/static/locales/${p}`);

// Will return a sorted translation json template object i.e. "translation_key1": "","translation_key2": ""...
function createTemplate(obj) {
  function sortObject(obj) {
    return Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, key) => {
        if (Array.isArray(obj[key])) {
          acc[key] = obj[key];
        } else if (typeof obj[key] === 'object') {
          acc[key] = sortObject(obj[key]);
        } else {
          acc[key] = '';
        }
        return acc;
      }, {});
  }
  let res = sortObject(obj);
  return JSON.stringify(res, null, 2);
}
// Fills empty template file with existing translations from target language
function fillJsonKeys(template, target, customizer) {
  const copyObjOrJson = (obj) => (typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : JSON.parse(obj));

  // Note: This method mutates object
  return mergeWith(copyObjOrJson(template), copyObjOrJson(target), customizer);
}

const EmptyStringCustomizer = (objValue, srcValue) => {
  if (isString(srcValue) && srcValue === '') {
    return `NEEDS TRANSLATION: ${objValue}`;
  }
};

function fillTemplates(languages) {
  languages.forEach(async (lng) => {
    let lngFile;
    const path = fromScripts(`${lng}/${localeFilename}.json`);
    try {
      lngFile = require(path);
    } catch {
      console.log(`path not found: ${path}`);
      lngFile = templateJson;
    }
    const beforeLineCount = await countFileLines(path);
    // fill the blank template file with existing translations
    const targetLngFile1 = fillJsonKeys(templateJson, lngFile);
    // second pass fill any missing translation keys with  `NEEDS TRANSLATION: ${english translation_key.property}`
    const targetLngFile2 = fillJsonKeys(en, targetLngFile1, EmptyStringCustomizer);

    // creates json file
    const json = JSON.stringify(targetLngFile2, null, 2);
    fs.writeFileSync(path, json);

    const afterLineCount = await countFileLines(path);
    console.log(`
     language: ${lng}
     lines before after: ${beforeLineCount} => ${afterLineCount}`);
  });
}

function countFileLines(file) {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    fs.createReadStream(file)
      .on('data', (buffer) => {
        let idx = -1;
        lineCount--; // Because the loop will run once for idx=-1
        do {
          idx = buffer.indexOf(10, idx + 1);
          lineCount++;
        } while (idx !== -1);
      })
      .on('end', () => {
        resolve(lineCount);
      })
      .on('error', reject);
  });
}

/** ---------------------------------------------- */

// 'en' is included in targetLanguages to sort the keys alphabetically
const targetLanguages = ['en', 'de', 'it', 'fr', 'es'];
const en = require(fromScripts(`en/${localeFilename}.json`));

const templateJson = createTemplate(en);
fillTemplates(targetLanguages);
