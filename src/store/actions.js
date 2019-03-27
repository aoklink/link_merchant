import * as types from './action_type';
import * as nets from '../nets';
import * as mutationTypes from './mutation_type';
import * as persistence from './persistence';

export default {
    async [types.LOGIN] ({
        commit
    }, payload) {
        let result = await nets.login(payload);
        if (result.success) {
            commit(mutationTypes.AUTHORIZATION, true);
            commit(mutationTypes.MUTATE_USERINFO, result.data.user);
            persistence.saveMyInfo(result.data.user);
        }
        return result;
    },
    [types.LOGOUT] ({
        commit
    }) {
        commit(mutationTypes.AUTHORIZATION, false);
    },
    async [types.VERIFY_AUTH] () {
        let result = await nets.gymInfoListAll();
        return result;
    },
    async [types.GET_ALL_GYM_INFO] ({
        commit
    }) {
        let result = await nets.gymInfoListAll();
        if (result.success) {
            commit(mutationTypes.MUTATE_GYM_INFO_LIST, result.data.map(item => ({
                city: item.gym_info && item.gym_info.city,
                id: item.gym_info && item.gym_info.id,
                name: item.gym_info && item.gym_info.name,
                memberCount: item.gym_info && item.gym_info.member_count,
                mini_program_code_url: item.gym_info && item.gym_info.mini_program_code_url,
                logo_url: item.gym_info && item.gym_info.logo_url,
                phone: item.gym_info && item.gym_info.phone,
                label: item.gym_info && item.gym_info.label,
                gymAdminUserId: item.gym_admin_user && item.gym_admin_user.id,
                gymAdminUserName: item.gym_admin_user && item.gym_admin_user.name,
                gymAdminUserPhone: item.gym_admin_user && item.gym_admin_user.phone
            })));
        }
        return result;
    },
    async [types.GET_GYM_INFO] ({commit}, payload) {
        let result = await nets.gymInfoGet(payload);
        return result;
    },
    async [types.ADD_GYM] ({dispatch}, payload) {
        let result = await nets.gymInfoAdd(payload);
        if (result.success) {
            dispatch(types.GET_ALL_GYM_INFO);
        }
        return result;
    },
    async [types.ADD_COASH] ({commit}, payload) {
        let result = await nets.gymCoachAdd(payload);
        return result;
    },
    async [types.DELETE_GYM] ({dispatch}, payload) {
        let result = await nets.gymInfoDelete(payload);
        if (result.success) {
            dispatch(types.GET_ALL_GYM_INFO);
        }
        return result;
    },
    async [types.GET_COACH_LIST_BY_GYMID] ({commit}, payload) {
        let result = await nets.gymCoachList(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_COACH_INFO_LIST_SELECTED, result.data);
        } else {
            console.error(new Error(result.data));
            commit(mutationTypes.MUTATE_COACH_INFO_LIST_SELECTED, {});
        }
        return result;
    },
    async [types.GET_CLASS_INFO_LIST_BY_GYMID] ({commit}, payload) {
        let result = await nets.gymClassList(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_CLASS_INFO_LIST_SELECTED, result.data);
        } else {
            console.error(new Error(result.data));
            commit(mutationTypes.MUTATE_CLASS_INFO_LIST_SELECTED, {});
        }
        return result;
    },
    async [types.GET_GYM_ADMIN_USER_GET_BIND] ({commit}, payload) {
        let result = await nets.gymAdminUserBindGet(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_GYM_ADMIN_INFO_SELECTED, result.data);
        } else {
            console.error(new Error(result.data));
            commit(mutationTypes.MUTATE_GYM_ADMIN_INFO_SELECTED, {});
        }
        return result;
    },
    async [types.ADD_GYM_ADMIN] (_, payload) {
        let result = await nets.gymAdminUserAdd(payload);
        return result;
    },
    async [types.GET_OSS_SESSION] ({commit}, payload) {
        let result = await nets.getOSSSession(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_OSS_SESSION, result.data);
        }
        return result;
    },
    async [types.ADD_CLASS_INFO] ({dispatch}, payload) {
        let result = await nets.gymClassAdd(payload);
        if (result.success) {
            dispatch(types.GET_CLASS_INFO_LIST_BY_GYMID, {gym_id: result.data.gym_id});
        }
        return result;
    },
    async [types.GET_CLASS_INFO_BY_ID] ({commit}, payload) {
        let result = await nets.gymClassGet(payload);
        if (result.success) {
            commit(mutationTypes.MUTATE_CLASS_INFO_SELECTED, {
                price_info: result.data.price_info,
                content: result.data.content,
                title: result.data.title,
                id: result.data.id,
                img_urls: result.data.img_urls,
                gym_id: result.data.gym_id
            });
        }
        return result;
    },
    async [types.UPDATE_GYM] ({dispatch}, payload) {
        let result = await nets.gymInfoUpdate(payload);
        if (result.success) {
            dispatch(types.GET_ALL_GYM_INFO);
        }
        return result;
    },
    async [types.UPDATE_CLASS_INFO_BY_ID] ({dispatch}, payload) {
        let result = await nets.gymClassUpdate(payload);
        if (result.success) {
            dispatch(types.GET_CLASS_INFO_LIST_BY_GYMID, {gym_id: payload.gym_id});
        }
        return result;
    },
    async [types.UPDATE_GYM_ADMIN_USER] (_, payload) {
        let result = await nets.gymAdminUserUpdate(payload);
        return result;
    },
    async [types.DELETE_GYM_COACH_BY_ID] (_, payload) {
        let result = await nets.gymCoachDelete(payload);
        return result;
    },
    async [types.DELETE_CLASS_BY_ID] (_, payload) {
        let result = await nets.gymClassDelete(payload);
        return result;
    },
    async [types.UPDATE_GYM_COACH_BY_ID] (_, payload) {
        let result = await nets.gymCoachUpdate(payload);
        return result;
    }
};
