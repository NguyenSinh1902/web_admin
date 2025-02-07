import { apiGet, apiPost } from '../apiHelpers';

const TRANSACTION_ENDPOINT = 'transactions';

/**
 * Tạo transaction mới
 * @param {Object} data - { staffUserId, amount, type, createByUserId, note }
 */
export const createTransaction = (data) => {
  console.log(data);
  return apiPost(`${TRANSACTION_ENDPOINT}/create`, data);
};

/**
 * Lấy danh sách transaction
 * @param {Object} params - { staffUserId, page, pageSize, startDate, endDate }
 */
export const getTransactions = (params) => {
  return apiGet(TRANSACTION_ENDPOINT, params);
};

export default {
  createTransaction,
  getTransactions,
};