import { apiGet, apiPost, apiPatch } from '../apiHelpers';

const ORDER_ENDPOINT = '/orders';

/**
 * Tạo đơn hàng mới
 * @param {Object} orderData - Dữ liệu đơn hàng
 * @returns {Promise}
 */
export const createOrder = (orderData) => {
    return apiPost(ORDER_ENDPOINT, orderData);
};

/**
 * Phân công nhân viên cho đơn hàng
 * @param {string} orderId - ID đơn hàng
 * @param {string} staffId - ID nhân viên
 * @returns {Promise}
 */
export const assignStaffToOrder = (orderId, staffId) => {
    return apiPatch(`${ORDER_ENDPOINT}/${orderId}/assign`, { staffIds: [staffId] });
};

/**
 * Bắt đầu thực hiện đơn hàng
 * @param {string} orderId - ID đơn hàng
 * @returns {Promise}
 */
export const startOrder = (orderId, staffId) => {
    return apiPatch(`${ORDER_ENDPOINT}/${orderId}/start`, { staffId });
};

/**
 * Hoàn thành đơn hàng
 * @param {string} orderId - ID đơn hàng
 * @returns {Promise}
 */
export const completeOrder = (orderId, staffId) => {
    return apiPatch(`${ORDER_ENDPOINT}/${orderId}/complete`, { staffId });
};

/**
 * Đánh giá đơn hàng
 * @param {string} orderId - ID đơn hàng
 * @param {number} rating - Điểm đánh giá
 * @param {string} comment - Nhận xét
 * @returns {Promise}
 */
export const rateOrder = (orderId, rating, comment) => {
    return apiPatch(`${ORDER_ENDPOINT}/${orderId}/rate`, { rating: rating, reviewComment: comment });
};

/**
 * Hủy đơn hàng
 * @param {string} orderId - ID đơn hàng
 * @param {string} reason - Lý do hủy
 * @returns {Promise}
 */
export const cancelOrder = (orderId, reason) => {
    return apiPatch(`${ORDER_ENDPOINT}/${orderId}/cancel`, { reason });
};

/**
 * Lấy danh sách đơn hàng theo trạng thái
 * @param {Object} params - Tham số query (ví dụ: { status: 'PENDING' })
 * @returns {Promise}
 */
export const getOrdersByStatus = (params = {}) => {
    return apiGet(ORDER_ENDPOINT, params);
};

/**
 * Lấy chi tiết đơn hàng theo ID
 * @param {string} orderId - ID đơn hàng
 * @returns {Promise}
 */
export const getOrderById = (orderId) => {
    return apiGet(`${ORDER_ENDPOINT}/${orderId}`);
};


/** 
 * Lấy danh sách đơn hàng theo người dùng và trạng thái
 * @param {*} userId 
 * @param {*} params { status, processStatus, fromDate, toDate }
 * @returns 
 */
export const getOrdersByUserAndStatus = async (userId, params) => {
    const url = `api/orders/by-user/${userId}`;
    return apiGet(url, params);
};

export default {
    createOrder,
    assignStaffToOrder,
    startOrder,
    completeOrder,
    rateOrder,
    cancelOrder,
    getOrdersByStatus,
    getOrderById,
    getOrdersByUserAndStatus
};
