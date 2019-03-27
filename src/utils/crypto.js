import CryptoJS from 'crypto-js';

/**
 *
 * @param {String} str
 * @returns {String}
 */
export const md5 = function (str) {
    return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
};
