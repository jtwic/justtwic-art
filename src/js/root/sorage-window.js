
export class StorageWindow {
  getCookieItem(key) {
    let cookie = {};

    document.cookie.split(';').forEach(function (el) {
      let [key, val] = el.split('=');
      cookie[key.trim()] = val;
    })
    return cookie[key];
  }

  setCookieItem(key, value, expires) {
    document.cookie = `${key} = ${value}${expires ? ';expires=' + expires : ''}`;
  }

  clearCookie() {
    let cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let pos = cookie.indexOf('=');
      let name = pos > -1 ? cookie.substr(0, pos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  }

  getStorageItem(name) {
    return window.localStorage.getItem(name);
  }

  setStorageItem(name, param) {
    window.localStorage.setItem(name, param);
  }

  getSessionItem(name) {
    return sessionStorage.getItem(name);
  }

  setSessionItem(name, param) {
    sessionStorage.setItem(name, param);
  }
}
