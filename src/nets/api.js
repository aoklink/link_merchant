// const PREFIX = process.env.NODE_ENV === 'production' ? 'http://www.linkfeeling.cn' : 'http://www.linkfeeling.cn';
//const PREFIX = process.env.NODE_ENV === 'production' ? 'http://bg.linkfeeling.cn' : 'http://bg.linkfeeling.cn';
const PREFIX = process.env.NODE_ENV === 'production' ? 'http://test.linkfeeling.cn' : 'http://test.linkfeeling.cn';
// const PREFIX =
//     process.env.NODE_ENV === 'production'
//         ? 'http://47.99.180.180:11002'
//         : 'http://192.168.9.37:10002';

export const LOGIN = `${PREFIX}/api/account/platform/login`;
// export const GET_OSS_SESSION = `http://47.111.161.136:3990`;
export const GET_OSS_SESSION = `http://oss.linkfeeling.cn/access_callback`;

export const USER_ADD = `${PREFIX}/api/account/add`;
export const USER_VERIFY = `${PREFIX}/api/account/verify`;
export const GYM_ADMIN_USER_ADD = `${PREFIX}/api/account/gym_admin_user/add`;
export const GYM_ADMIN_USER_LIST = `${PREFIX}/api/account/gym_admin_user/list`;
export const GYM_ADMIN_USER_UPDATE = `${PREFIX}/api/account/gym_admin_user/update`;
export const GYM_ADMIN_USER_VERIFY = `${PREFIX}/api/account/gym_admin_user/verify`;
export const GYM_ADMIN_USER_GET_BIND = `${PREFIX}/api/account/gym_admin_user/get_bind`;
export const GYM_CLASS_ADD = `${PREFIX}/api/platform/gym_class/add`;
export const GYM_CLASS_GET = `${PREFIX}/api/platform/gym_class/get`;
export const GYM_CLASS_UPDATE = `${PREFIX}/api/platform/gym_class/update`;
export const GYM_CLASS_DELETE = `${PREFIX}/api/platform/gym_class/delete`;
export const GYM_CLASS_LIST = `${PREFIX}/api/platform/gym_class/list`;
export const GYM_CLASS_GET_ME = `${PREFIX}/api/platform/gym_class/get_me`;
export const GYM_CLASS_ADD_ME = `${PREFIX}/api/platform/gym_class/add_me`;
export const GYM_CLASS_DELETE_ME = `${PREFIX}/api/platform/gym_class/delete_me`;
export const GYM_CLASS_UPDATE_ME = `${PREFIX}/api/platform/gym_class/update_me`;
export const GYM_CLASS_LIST_ALL = `${PREFIX}/api/platform/gym_class/list_all`;
export const GYM_CLASS_LIST_ME = `${PREFIX}/api/platform/gym_class/list_me`;
export const GYM_COACH_ADD = `${PREFIX}/api/platform/gym_coach/add`;
export const GYM_COACH_GET = `${PREFIX}/api/platform/gym_coach/get`;
export const GYM_COACH_UPDATE = `${PREFIX}/api/platform/gym_coach/update`;
export const GYM_COACH_DELETE = `${PREFIX}/api/platform/gym_coach/delete`;
export const GYM_COACH_LIST = `${PREFIX}/api/platform/gym_coach/list`;
export const GYM_COACH_GET_ME = `${PREFIX}/api/platform/gym_coach/get_me`;
export const GYM_COACH_ADD_ME = `${PREFIX}/api/platform/gym_coach/add_me`;
export const GYM_COACH_DELETE_ME = `${PREFIX}/api/platform/gym_coach/delete_me`;
export const GYM_COACH_UPDATE_ME = `${PREFIX}/api/platform/gym_coach/update_me`;
export const GYM_COACH_LIST_ALL = `${PREFIX}/api/platform/gym_coach/list_all`;
export const GYM_COACH_LIST_ME = `${PREFIX}/api/platform/gym_coach/list_me`;
export const GYM_COMMON_GET = `${PREFIX}/api/platform/gym_common/get`;
export const GYM_COMMON_DELETE = `${PREFIX}/api/platform/gym_common/delete`;
export const GYM_COMMON_GET_ME = `${PREFIX}/api/platform/gym_common/get_me`;
export const GYM_GROUP_USER_ADD = `${PREFIX}/api/platform/gym_group_user/add`;
export const GYM_GROUP_USER_UPDATE = `${PREFIX}/api/platform/gym_group_user/update`;
export const GYM_GROUP_USER_VERIFY = `${PREFIX}/api/platform/gym_group_user/verify`;
export const GYM_INFO_ADD = `${PREFIX}/api/platform/gym_info/add`;
export const GYM_INFO_GET = `${PREFIX}/api/platform/gym_info/get`;
export const GYM_INFO_GET_ME = `${PREFIX}/api/platform/gym_info/get_me`;
export const GYM_INFO_LIST_GROUP = `${PREFIX}/api/platform/gym_info/list_group`;
export const GYM_INFO_LIST_ALL = `${PREFIX}/api/platform/gym_info/list_all`;
export const GYM_INFO_UPDATE_ME = `${PREFIX}/api/platform/gym_info/update_me`;
export const GYM_INFO_UPDATE = `${PREFIX}/api/platform/gym_info/update`;
export const GYM_INFO_DELETE = `${PREFIX}/api/platform/gym_info/delete`;

// 教练管理
export const GYM_PLAY_COACH_LIST = `${PREFIX}/api/platform/gym/play/coach/list`;
export const GYM_PLAY_COACH_DELETE = `${PREFIX}/api/platform/gym/play/coach/unbind`;
export const GYM_PLAY_COACH_ADD = `${PREFIX}/api/platform/gym/play/coach/bind`;
export const GYM_PLAY_COACH_GET = `${PREFIX}/api/platform/gym/play/coach/get`;
export const GYM_PLAY_MEMBER_LIST = `${PREFIX}/api/platform/gym/play/member/list`;
export const GYM_PLAY_MEMBER_GET = `${PREFIX}/api/platform/gym/play/member/get`;
export const GYM_PLAY_MEMBER_TRANS = `${PREFIX}/api/platform/gym/play/member/trans`;
export const GYM_PLAY_MEMBER_ADDSTUDENT = `${PREFIX}/api/platform/gym/play/member/add_student`;
