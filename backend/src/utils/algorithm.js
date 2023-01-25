'use strict';

const crypto = require('crypto');

const genereateApiKey = () => {
    const signature = 'xxxxxxx-xxxx-xxxxxx-xxxx-xxxxxxxx';
    return signature.replace(/x/g, () =>
        Math.floor(Math.random() * 16).toString(16)
    );
};

const gereratePassword = (size) => {
    const lowerAlpha = [...new Array(26).keys()].map((c) =>
        String.fromCharCode(c + 97)
    );
    const upperAlpha = [...lowerAlpha].map((c) => c.toUpperCase());
    const numerics = '1234567890'.split('');
    const specifics = '!?&#@_$ù"'.split('');
    const allChar = lowerAlpha
        .concat(upperAlpha, numerics, specifics)
        .sort((a, b) => 0.5 - Math.random());

    return 'x'
        .repeat(size)
        .replace(
            /x/g,
            () => allChar[Math.floor(Math.random() * allChar.length)]
        );
};

const md5 = (data) => crypto.createHash('md5').update(data).digest('hex');

module.exports = {
    genereateApiKey: genereateApiKey,
    gereratePassword: gereratePassword,
    md5: md5,
};
