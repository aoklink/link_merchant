const TOKEN_NAME = 'token';

export function isLogin () {
    return Boolean(localStorage.getItem(TOKEN_NAME));
}

export function logout () {
    localStorage.removeItem(TOKEN_NAME);
}

export function login () {
    localStorage.setItem(TOKEN_NAME, true);
}
