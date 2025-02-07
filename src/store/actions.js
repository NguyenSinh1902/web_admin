import {
    SET_MESSAGESFB,
    SET_MESSAGESZL,
    SET_CUSTOMERINFOR,
    SET_EDITCUSTOMER,
    SET_MESSAGESFB_FOLLOW,
    SET_MESSAGESZL_FOLLOW,
    SET_FB_COUNT_NOTIFY,
    SET_LANG,
    SET_WF_Item,
    SET_OFFICERLIST,
    SET_OFFICERS,
    SET_ROLE,
    SET_ISAUTH,
    SET_MODULE_ACTIVE,
    SET_SHOW_SIDEBAR,
    SET_MESSAGESWEB,
    SET_SHOW_LOADING,
    SET_OUTBOUND,
    DATA_DETAIL_PAYMENT,
    DATA_PAYMENT,
    UPDATE_NOTIFICATION_FCM,
    HANDLE_PICKUP_DETAIL,
    HANDLE_DELIVERY_DETAIL,
    HANDLE_INTERNAL_DETAIL,
    HANDLE_SET_ACTIVE_TABS,
    SET_WAYBILLS_LOCAL,
    HANDLE_PICKUP_TAB,
    HANDLE_PICKUP_DATA,
    LADING_CREATE_DATA,
    HANDLE_TRANSIT_TAB,
    HANDLE_TRANSIT_DATA,
} from './contants';

export const set_messagesFb = (payload) => ({
    type: SET_MESSAGESFB,
    payload,
});

export const set_messagesWb = (payload) => ({
    type: SET_MESSAGESWEB,
    payload,
});

export const set_messagesZl = (payload) => ({
    type: SET_MESSAGESZL,
    payload,
});

export const set_customerinfor = (payload) => ({
    type: SET_CUSTOMERINFOR,
    payload,
});
export const set_editcustomer = (payload) => ({
    type: SET_EDITCUSTOMER,
    payload,
});
export const set_messagesFbfollow = (payload) => ({
    type: SET_MESSAGESFB_FOLLOW,
    payload,
});
export const set_messagesZlfollow = (payload) => ({
    type: SET_MESSAGESZL_FOLLOW,
    payload,
});
export const set_fb_count_notify = (payload) => ({
    type: SET_FB_COUNT_NOTIFY,
    payload,
});
export const setLang = (payload) => ({
    type: SET_LANG,
    payload,
});
export const set_wf_item = (payload) => ({
    type: SET_WF_Item,
    payload,
});
export const setOfficerList = (payload) => ({
    type: SET_OFFICERLIST,
    payload,
});
export const setIsAuth = (payload) => ({
    type: SET_ISAUTH,
    payload,
});

export const setRole = (payload) => ({
    type: SET_ROLE,
    payload,
});

export const setOfficers = (payload) => ({
    type: SET_OFFICERS,
    payload,
});

export const set_module = (payload) => ({
    type: SET_MODULE_ACTIVE,
    payload,
});
export const updateNotification_FCM = (payload) => ({
    type: UPDATE_NOTIFICATION_FCM,
    payload,
});

export const setShowSidebar = (payload) => ({
    type: SET_SHOW_SIDEBAR,
    payload,
});

export const showLoading = (payload) => ({
    type: SET_SHOW_LOADING,
    payload,
});

export const setOutbound = (payload) => ({
    type: SET_OUTBOUND,
    payload,
});

export const dataPaymentList = (payload) => {
    return {
        type: DATA_PAYMENT,
        payload,
    };
};

export const dataDetailPayment = (payload) => {
    return {
        type: DATA_DETAIL_PAYMENT,
        payload,
    };
};
//lay hang
export const handlePickupTab = (payload) => {
    return {
        type: HANDLE_PICKUP_TAB,
        payload,
    };
};
export const handlePickupData = (payload) => {
    return {
        type: HANDLE_PICKUP_DATA,
        payload,
    };
};
//end

// trung chuyen
export const handleTransitTab = (payload) => {
    return {
        type: HANDLE_TRANSIT_TAB,
        payload,
    };
};
export const handleTransitData = (payload) => {
    return {
        type: HANDLE_TRANSIT_DATA,
        payload,
    };
};
//end

export const handlePickupDetail = (payload) => {
    return {
        type: HANDLE_PICKUP_DETAIL,
        payload,
    };
};

export const handleDeliveryDetail = (payload) => {
    return {
        type: HANDLE_DELIVERY_DETAIL,
        payload,
    };
};

export const handleInternalDetail = (payload) => {
    return {
        type: HANDLE_INTERNAL_DETAIL,
        payload,
    };
};

export const handleSetActiveTabs = (payload) => {
    return {
        type: HANDLE_SET_ACTIVE_TABS,
        payload,
    };
};

export const setWaybillsLocal = (payload) => {
    return {
        type: SET_WAYBILLS_LOCAL,
        payload,
    };
};

export const ladingCreateData = (payload) => {
    return {
        type: LADING_CREATE_DATA,
        payload,
    };
};
