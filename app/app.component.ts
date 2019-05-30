import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EncryptionDecryptionSample';

  plainText: string;
  encryptText: string;
  encPassword: string;
  decPassword: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  pass = 'jGIw0TblynaMYjDRNuXKdiste1riAAGU';

  constructor() {
  }
  // method is used to encrypt and decrypt the text
  convertText(conversion: string) {
    if (conversion === 'encrypt') {
      this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
      this.conversionEncryptOutput = this.encrypt(this.plainText.trim());
    } else {
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

    }
  }


  private encrypt(text: string): string {
    // random salt for derivation
    const keySize = 256;
    const salt = CryptoJS.lib.WordArray.random(16);
    // well known algorithm to generate key
    const key = CryptoJS.PBKDF2(this.pass, salt, {
      keySize: keySize / 32,
      iterations: 100
    });
    // random IV
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    // specify everything explicitly
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    // combine everything together in base64 string
    const result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return result;
  }
}
