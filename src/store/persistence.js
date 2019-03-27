
const MY_INFO = 'myInfo';

export function getMyInfo () {
    return JSON.parse(localStorage.getItem(MY_INFO) || '{}');
}
export function saveMyInfo (info) {
    localStorage.setItem(MY_INFO, JSON.stringify(info));
}
