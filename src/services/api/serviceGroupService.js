import { apiGet, apiPost, apiPut, apiDelete } from '../apiHelpers';

// Base URL for service group related endpoints
const SERVICE_GROUP_API = '/service-groups';

/**
 * Lấy danh sách tất cả nhóm dịch vụ với phân trang và tìm kiếm
 * @param {number} page - Trang hiện tại
 * @param {number} limit - Số lượng mục trên mỗi trang
 * @param {string} search - Từ khóa tìm kiếm
 * @param {boolean} includeInactive - Có bao gồm các nhóm đã bị vô hiệu hóa không
 * @returns {Promise} - Promise với danh sách nhóm dịch vụ và thông tin phân trang
 */
export const getAllServiceGroups = (page = 1, limit = 10, search = '', includeInactive = false) => {
  return apiGet(SERVICE_GROUP_API, { page, limit, search, includeInactive });
};

/**
 * Lấy thông tin chi tiết của nhóm dịch vụ theo ID
 * @param {string} groupId - ID của nhóm dịch vụ
 * @param {boolean} includeInactive - Có bao gồm các dịch vụ đã bị vô hiệu hóa không
 * @returns {Promise} - Promise với thông tin chi tiết nhóm dịch vụ
 */
export const getServiceGroupById = (groupId, includeInactive = false) => {
  return apiGet(`${SERVICE_GROUP_API}/${groupId}`, { includeInactive });
};

/**
 * Tạo nhóm dịch vụ mới
 * @param {Object} groupData - Dữ liệu nhóm dịch vụ
 * @returns {Promise} - Promise với thông tin nhóm dịch vụ đã tạo
 */
export const createServiceGroup = (groupData) => {
  return apiPost(SERVICE_GROUP_API, groupData);
};

/**
 * Cập nhật thông tin nhóm dịch vụ
 * @param {string} groupId - ID của nhóm dịch vụ
 * @param {Object} groupData - Dữ liệu nhóm dịch vụ cần cập nhật
 * @returns {Promise} - Promise với thông tin nhóm dịch vụ đã cập nhật
 */
export const updateServiceGroup = (groupId, groupData) => {
  return apiPut(`${SERVICE_GROUP_API}/${groupId}`, groupData);
};

/**
 * Xóa nhóm dịch vụ
 * @param {string} groupId - ID của nhóm dịch vụ cần xóa
 * @returns {Promise} - Promise với thông báo kết quả
 */
export const deleteServiceGroup = (groupId) => {
  return apiDelete(`${SERVICE_GROUP_API}/${groupId}`);
};

/**
 * Thay đổi trạng thái kích hoạt của nhóm dịch vụ
 * @param {string} groupId - ID của nhóm dịch vụ
 * @returns {Promise} - Promise với thông tin nhóm dịch vụ đã cập nhật
 */
export const toggleServiceGroupStatus = (groupId) => {
  return apiPut(`${SERVICE_GROUP_API}/${groupId}/toggle-status`);
};

/**
 * Tải lên icon cho nhóm dịch vụ
 * @param {string} groupId - ID của nhóm dịch vụ
 * @param {File} iconFile - File icon cần tải lên
 * @returns {Promise} - Promise với thông tin nhóm dịch vụ đã cập nhật
 */

/**
 * Thêm chi tiết dịch vụ vào nhóm
 * @param {string} groupId - ID của nhóm dịch vụ
 * @param {Object} detailData - Dữ liệu chi tiết dịch vụ
 * @returns {Promise} - Promise với thông tin chi tiết đã thêm
 */
export const addServiceDetail = (groupId, detailData) => {
  return apiPost(`${SERVICE_GROUP_API}/${groupId}/details`, detailData);
};

/**
 * Cập nhật chi tiết dịch vụ
 * @param {string} detailId - ID của chi tiết dịch vụ
 * @param {Object} detailData - Dữ liệu chi tiết dịch vụ cần cập nhật
 * @returns {Promise} - Promise với thông tin chi tiết đã cập nhật
 */
export const updateServiceDetail = (detailId, detailData) => {
  return apiPut(`${SERVICE_GROUP_API}/details/${detailId}`, detailData);
};

/**
 * Xóa chi tiết dịch vụ
 * @param {string} detailId - ID của chi tiết dịch vụ cần xóa
 * @returns {Promise} - Promise với thông báo kết quả
 */
export const deleteServiceDetail = (detailId) => {
  return apiDelete(`${SERVICE_GROUP_API}/details/${detailId}`);
};

/**
 * Lấy tất cả tùy chọn dịch vụ
 * @param {number} page - Trang hiện tại
 * @param {number} limit - Số lượng mục trên mỗi trang
 * @param {string} search - Từ khóa tìm kiếm
 * @param {boolean} includeInactive - Có bao gồm các tùy chọn đã bị vô hiệu hóa không
 * @returns {Promise} - Promise với danh sách tùy chọn dịch vụ
 */
export const getAllServiceOptions = (page = 1, limit = 100, search = '', includeInactive = false) => {
  return apiGet(`${SERVICE_GROUP_API}/options`, { page, limit, search, includeInactive });
};

/**
 * Tạo tùy chọn dịch vụ mới
 * @param {Object} optionData - Dữ liệu tùy chọn dịch vụ
 * @returns {Promise} - Promise với thông tin tùy chọn đã tạo
 */
export const createServiceOption = (optionData) => {
  return apiPost(`${SERVICE_GROUP_API}/options`, optionData);
};

/**
 * Cập nhật tùy chọn dịch vụ
 * @param {string} optionId - ID của tùy chọn dịch vụ
 * @param {Object} optionData - Dữ liệu tùy chọn dịch vụ cần cập nhật
 * @returns {Promise} - Promise với thông tin tùy chọn đã cập nhật
 */
export const updateServiceOption = (optionId, optionData) => {
  return apiPut(`${SERVICE_GROUP_API}/options/${optionId}`, optionData);
};

/**
 * Xóa tùy chọn dịch vụ
 * @param {string} optionId - ID của tùy chọn dịch vụ cần xóa
 * @returns {Promise} - Promise với thông báo kết quả
 */
export const deleteServiceOption = (optionId) => {
  return apiDelete(`${SERVICE_GROUP_API}/options/${optionId}`);
};

/**
 * Thêm tùy chọn vào chi tiết dịch vụ
 * @param {string} detailId - ID của chi tiết dịch vụ
 * @param {string} optionId - ID của tùy chọn dịch vụ
 * @returns {Promise} - Promise với thông báo kết quả
 */
export const addOptionToDetail = (detailId, optionId) => {
  return apiPost(`${SERVICE_GROUP_API}/details/${detailId}/options/${optionId}`);
};

/**
 * Xóa tùy chọn khỏi chi tiết dịch vụ
 * @param {string} detailId - ID của chi tiết dịch vụ
 * @param {string} optionId - ID của tùy chọn dịch vụ
 * @returns {Promise} - Promise với thông báo kết quả
 */
export const removeOptionFromDetail = (detailId, optionId) => {
  return apiDelete(`${SERVICE_GROUP_API}/details/${detailId}/options/${optionId}`);
};

/**
 * Lấy tất cả nhóm dịch vụ với đầy đủ chi tiết và tùy chọn
 * @param {boolean} includeInactive - Có bao gồm các dịch vụ đã bị vô hiệu hóa không
 * @returns {Promise} - Promise với danh sách nhóm dịch vụ đầy đủ
 */
export const getAllServiceGroupsWithDetails = (includeInactive = false) => {
  return apiGet(`${SERVICE_GROUP_API}/all/details`, { includeInactive });
};

/**
 * Thêm hoạc chỉnh sửa service detail
 * @returns {Promise} - Promise với thông báo kết quả
 */
export const upsertServiceDetail = (params) => {
  return apiPost(`${SERVICE_GROUP_API}/service-detail`, params);
};


export default {
  getAllServiceGroups,
  getServiceGroupById,
  createServiceGroup,
  updateServiceGroup,
  deleteServiceGroup,
  toggleServiceGroupStatus,
  addServiceDetail,
  updateServiceDetail,
  deleteServiceDetail,
  getAllServiceOptions,
  createServiceOption,
  updateServiceOption,
  deleteServiceOption,
  addOptionToDetail,
  removeOptionFromDetail,
  getAllServiceGroupsWithDetails,
  upsertServiceDetail,
};