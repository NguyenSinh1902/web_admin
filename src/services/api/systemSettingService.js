import { apiGet, apiPost } from '../apiHelpers';

// Base URL cho SystemSetting API
const SYSTEM_SETTING_API = '/system-settings';

/**
 * Lấy cài đặt mới nhất
 */
export const getLatestSetting = () => {
    return apiGet(`${SYSTEM_SETTING_API}/latest`);
};

/**
 * Lấy cài đặt theo ID
 * @param {string} id
 */
export const getSettingById = (id) => {
    return apiGet(`${SYSTEM_SETTING_API}/${id}`);
};

/**
 * Tạo mới cài đặt
 * @param {object} data - { commissionRate, passwordAdmin }
 */
export const createSetting = (data) => {
    return apiPost(SYSTEM_SETTING_API, data);
};

// Lấy lịch sử thay đổi cài đặt
const getAllSettings = async () => {
    try {
        const res = await apiGet(`${SYSTEM_SETTING_API}/history`);
        return res.data;
    } catch (err) {
        throw new Error('Không thể lấy lịch sử thay đổi');
    }
};

// Export object để dễ import theo nhóm
export default {
    getLatestSetting,
    getSettingById,
    createSetting,
    getAllSettings
};
