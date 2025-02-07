import { apiGet, apiPost, apiPut, apiDelete } from '../apiHelpers';

// Base URL for user-related endpoints
const USER_API = '/users';

/**
 * Lấy thông tin người dùng hiện tại
 * @returns {Promise} - Promise với thông tin người dùng hiện tại
 */
export const getCurrentUser = () => {
    return apiGet(`${USER_API}/me`);
};

/**
 * Cập nhật thông tin người dùng hiện tại
 * @param {Object} userData - Dữ liệu người dùng cần cập nhật (fullName, phoneNumber, address, avatar)
 * @returns {Promise} - Promise với thông tin người dùng đã cập nhật
 */
export const updateCurrentUser = (userData) => {
    return apiPut(`${USER_API}/me`, userData);
};

/**
 * Lấy danh sách tất cả người dùng với phân trang và tìm kiếm
 * @param {number} page - Trang hiện tại
 * @param {number} limit - Số lượng mục trên mỗi trang
 * @param {string} search - Từ khóa tìm kiếm
 * @returns {Promise} - Promise với danh sách người dùng và thông tin phân trang
 */
export const getAllUsers = (page = 1, limit = 10, search = '') => {
    return apiGet(USER_API, { page, limit, search });
};

/**
 * Lấy danh sách người dùng theo vai trò với phân trang và tìm kiếm
 * @param {string} role - Vai trò người dùng (CUSTOMER, STAFF, MANAGER, ADMIN)
 * @param {number} page - Trang hiện tại
 * @param {number} limit - Số lượng mục trên mỗi trang
 * @param {string} search - Từ khóa tìm kiếm
 * @returns {Promise} - Promise với danh sách người dùng và thông tin phân trang
 */
export const getUsersByRole = (role, page = 1, limit = 10, search = '') => {
    return apiGet(`${USER_API}/role/${role}`, { page, limit, search });
};

/**
 * Lấy thông tin chi tiết của người dùng theo ID
 * @param {string} userId - ID của người dùng
 * @returns {Promise} - Promise với thông tin chi tiết người dùng bao gồm thông tin theo vai trò
 */
export const getUserById = (userId) => {
    return apiGet(`${USER_API}/${userId}`);
};

/**
 * Cập nhật thông tin người dùng theo ID
 * @param {string} userId - ID của người dùng
 * @param {Object} userData - Dữ liệu người dùng cần cập nhật
 * @returns {Promise} - Promise với thông tin người dùng đã cập nhật và thông báo
 */
export const updateUserById = (userId, userData) => {
    return apiPut(`${USER_API}/${userId}`, userData);
};

/**
 * Xóa người dùng theo ID
 * @param {string} userId - ID của người dùng cần xóa
 * @returns {Promise} - Promise với thông báo kết quả và thông tin người dùng đã xóa
 */
export const deleteUserById = (userId) => {
    return apiDelete(`${USER_API}/${userId}`);
};

/**
 * Thay đổi trạng thái kích hoạt của người dùng
 * @param {string} userId - ID của người dùng
 * @returns {Promise} - Promise với thông tin người dùng đã cập nhật và thông báo
 */
export const toggleUserStatus = (userId) => {
    return apiPut(`${USER_API}/${userId}/toggle-status`);
};

/**
 * Lấy danh sách nhân viên khả dụng cho việc phân công
 * @param {string} serviceGroupId - ID nhóm dịch vụ (tùy chọn)
 * @returns {Promise} - Promise với danh sách nhân viên khả dụng
 */
export const getAvailableStaff = (serviceGroupId = null) => {
    return apiGet(`${USER_API}/staff/available`, serviceGroupId ? { serviceGroupId } : {});
};

/**
 * Lấy danh sách nhân viên hệ thống với nhóm dịch vụ
 * @param {string} search - Từ khóa tìm kiếm (tùy chọn)
 * @returns {Promise} - Promise với danh sách nhân viên và nhóm dịch vụ
 */
export const fetchStaffsWithServiceGroups = async (search = '') => {
    const params = search ? { search } : {};
    return apiGet(`${USER_API}/staff/staffs-with-service-groups`, params);
};

/**
 * Thay đổi trạng thái sẵn sàng của nhân viên
 * @param {string} staffId - ID của user là nhân viên
 * @returns {Promise} - Promise với thông tin nhân viên đã cập nhật và thông báo
 */
export const toggleStaffAvailability = (staffId) => {
    return apiPut(`${USER_API}/staff/${staffId}/toggle-availability`);
};

/**
 * Cập nhật nhóm dịch vụ cho nhân viên
 * @param {string} staffId - ID của user là nhân viên
 * @param {Array} serviceGroups - Mảng chứa các ID nhóm dịch vụ
 * @returns {Promise} - Promise với thông tin các nhóm dịch vụ đã cập nhật và thông báo
 */
export const updateStaffServices = (staffId, serviceGroups) => {
    return apiPut(`${USER_API}/staff/${staffId}/update-services`, { serviceGroups });
};

/**
 * Cập nhật phòng ban cho quản lý
 * @param {string} managerId - ID của user là quản lý
 * @param {string} department - Tên phòng ban
 * @returns {Promise} - Promise với thông tin quản lý đã cập nhật và thông báo
 */
export const updateManagerDepartment = (managerId, department) => {
    return apiPut(`${USER_API}/manager/${managerId}/update-department`, { department });
};

/**
 * Cập nhật quyền hạn cho quản trị viên
 * @param {string} adminId - ID của user là quản trị viên
 * @param {Array} permissions - Mảng chứa các quyền hạn
 * @returns {Promise} - Promise với thông tin quản trị viên đã cập nhật và thông báo
 */
export const updateAdminPermissions = (adminId, permissions) => {
    return apiPut(`${USER_API}/admin/${adminId}/update-permissions`, { permissions });
};


/**
 * Lấy danh sách địa chỉ của khách hàng
 * @param {string} customerId - ID của Customer (không phải userId)
 * @returns {Promise} - Promise với danh sách địa chỉ
 */
export const getCustomerAddresses = (customerId) => {
    return apiGet(`/addresses`, { customerId });
};

/**
 * Thêm địa chỉ mới cho khách hàng
 * @param {Object} addressData - Dữ liệu địa chỉ
 * @returns {Promise} - Promise với thông tin địa chỉ đã thêm
 */
export const addCustomerAddress = (addressData) => {
    return apiPost(`/addresses`, addressData);
};

/**
 * Cập nhật địa chỉ của khách hàng
 * @param {string} addressId - ID của địa chỉ
 * @param {Object} addressData - Dữ liệu địa chỉ cần cập nhật
 * @returns {Promise} - Promise với thông tin địa chỉ đã cập nhật
 */
export const updateCustomerAddress = (addressId, addressData) => {
    return apiPut(`/addresses/${addressId}`, addressData);
};

/**
 * Xóa địa chỉ của khách hàng
 * @param {string} addressId - ID của địa chỉ cần xóa
 * @returns {Promise} - Promise với thông báo kết quả
 */
export const deleteCustomerAddress = (addressId) => {
    return apiDelete(`/addresses/${addressId}`);
};

/**
 * Đặt địa chỉ làm mặc định
 * @param {string} addressId - ID của địa chỉ
 * @returns {Promise} - Promise với thông tin địa chỉ đã cập nhật
 */
export const setDefaultAddress = (addressId) => {
    return apiPut(`/addresses/${addressId}/set-default`);
};

export const getAvailableStaffsByGroupService = (groupServiceId) => {
    return apiGet(`${USER_API}/staff/available-by-group-service?groupServiceId=${groupServiceId}`);
};

export default {
    getCurrentUser,
    updateCurrentUser,
    getAllUsers,
    getUsersByRole,
    getUserById,
    updateUserById,
    deleteUserById,
    toggleUserStatus,
    getAvailableStaff,
    toggleStaffAvailability,
    updateStaffServices,
    updateManagerDepartment,
    updateAdminPermissions,
    getCustomerAddresses,
    addCustomerAddress,
    updateCustomerAddress,
    deleteCustomerAddress,
    setDefaultAddress,
    fetchStaffsWithServiceGroups,
    getAvailableStaffsByGroupService
};