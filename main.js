window.addEventListener('DOMContentLoaded', function() {
  
    let InputText = document.getElementById('input_area');
    let UserSelectStep = document.getElementById('encrypt_step');
    let UserStep = Number(UserSelectStep.value);
    let result = document.getElementById('output_area');
    let Encrypt = document.getElementById('encrypt-btn');
    let Decrypt = document.getElementById('decrypt-btn');
    let TextToWork;
    let pos;
    
    let EngAlfUp = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let EngAlfLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','m','o','p','q','r','s','t','u','v','w','x','y','z'];
    let EngAlfUpEncrypt = Array(26); 
    let EngAlfLowerEncrypt = Array(26);
    
    initEncrypt();
    UserSelectStep.addEventListener('change', function() {
      UserStep = Number(this.value);
      initEncrypt();
    });
    
    function initEncrypt() {
      EngAlfUpEncrypt = CezarEncrypt(UserStep, EngAlfUp);
      EngAlfLowerEncrypt = CezarEncrypt(UserStep, EngAlfLower);
    }
    
    function CezarEncrypt(step, arr) {
      let CopyAlf = arr.slice();
      let i = 0;
      
      while ((i + step) < (CopyAlf.length)) {
        let buff = CopyAlf[i];
        CopyAlf[i] = CopyAlf[i + step];
        CopyAlf[i + step] = buff;
        i++;     
      }
      return CopyAlf;
    }
    
    function contains(symb, arr) {
      let letter = symb;
      pos = 0;
      for (let i = 0; i < arr.length; i++) {
        if (letter === arr[i]) {
          pos = i;
          return true;
          break;
        }
      }
    }
    
    function encrypt(text) {
      let result = '';
      for (let i = 0; i <= text.length; i++) {
        let symbol = text[i];
        if (contains(symbol, EngAlfUp)) {
            symbol = EngAlfUpEncrypt[pos];
            result += symbol;
        }
        if ((contains(symbol, EngAlfLower))) {
            symbol = EngAlfLowerEncrypt[pos];
            result += symbol;
        }
      }
      return result;
    }
    
    function decrypt(text) {
      let result = '';
      for (let i = 0; i <= text.length; i++) {
        let symbol = text[i];
        if (contains(symbol, EngAlfUpEncrypt)) {
            symbol = EngAlfUp[pos];
            result += symbol;
        }
        if ((contains(symbol, EngAlfLowerEncrypt))) {
            symbol = EngAlfLower[pos];
            result += symbol;
        }
      }
      return result;
    }
  
    Encrypt.addEventListener('click', function() {
      TextToWork = InputText.value;
      result.value = encrypt(TextToWork);
    });
    Decrypt.addEventListener('click', function() {
      TextToWork = InputText.value;
      result.value = decrypt(TextToWork);
    });
  });