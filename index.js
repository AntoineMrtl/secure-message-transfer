var colors = require('colors');
const prompts = require('prompts');

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; // Base-64 values

const main = async function() {
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose encode / decode : ',
      choices: [
        { title: 'Encode', value: '#1' },
        { title: 'Decode', value: '#2'},
      ],
      initial: 1
    });
  
    if (response.value == "#1") {
        Encode();
    } else {
        Decode();
    }
};

var Encode = async function() {
    let response = await prompts({
      type: 'text',
      name: 'value',
      message: 'Text to encode',
    });

    encrypt(response.value);

    main();
}

var Decode = async function() {
    let encodedText = await prompts({
      type: 'text',
      name: 'value',
      message: 'Encoded text',
    });
  
    let key = await prompts({
      type: 'number',
      name: 'value',
      message: 'Key',
    });

    decrypt(encodedText.value, key.value);

    main();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

const retreiveOffset = (x) => {
    if (x >= 0) {
        return x;
    } else {
        return ALPHABET.length + x;
    }
}

const encrypt = function(baseText) {
    let encodedText = Buffer.from(baseText, 'binary').toString('base64');

    let key = getRandomInt(12,10000);

    for (i=0; i < encodedText.length; i++) {
        encodedText[i] = ALPHABET[(ALPHABET.indexOf(i)+key)%i]
    }

    console.log("ENCODED TEXT : ".red + encodedText)
    console.log("KEY : ".blue + key)
};

const decrypt = function(encodedText, key) {
    for (i=0; i < encodedText.length; i++) {
        encodedText[i] = ALPHABET[retreiveOffset(ALPHABET.indexOf(i)-key)]
    }
    
    console.log("DECODED TEXT : ".red + Buffer.from(encodedText, 'base64').toString());
};

main();