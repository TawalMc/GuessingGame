import * as CryptoJS from 'crypto-js';

const tokenGeneratorBasedOnPseudo = (pseudo: string) => {
    let token = CryptoJS.AES.encrypt(pseudo, Date.now().toString()).toString();
    
    return token
}

export {tokenGeneratorBasedOnPseudo};