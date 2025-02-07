import {
    SET_LANG,
    SET_ISAUTH,
    SET_ROLE,
    SET_SHOW_SIDEBAR,
    SET_SHOW_LOADING,
} from './contants';

export const initState = {
    // Auth & Role
    isAuth: false,
    role: 'user',

    // UI states
    showSidebar: true,
    showLoading: false,

    // App settings
    language: 'vn',
    lang: 'vn',
};

export const reducer = (state, action) => {
    const handlers = {
        [SET_LANG]: (state, payload) => ({ ...state, language: payload, lang: payload }),
        [SET_ISAUTH]: (state, payload) => ({ ...state, isAuth: payload }),
        [SET_ROLE]: (state, payload) => ({ ...state, role: payload }),
        [SET_SHOW_SIDEBAR]: (state, payload) => ({ ...state, showSidebar: payload }),
        [SET_SHOW_LOADING]: (state, payload) => ({ ...state, showLoading: payload }),
    };

    return handlers[action.type] ? handlers[action.type](state, action.payload) : state;
};
