import { apiGet, apiPost, apiPut, apiDelete } from '../apiHelpers';

// Base URL for service related endpoints
const SERVICE_API = '/services';

// ======== Nhóm Dịch Vụ (Service Groups) ========

// Lấy tất cả nhóm dịch vụ (bao gồm dịch vụ chi tiết và tùy chọn)
export const fetchAllServiceGroups = () => {
  return apiGet(`${SERVICE_API}/groups`);
};

// Lấy thông tin chi tiết 1 nhóm dịch vụ
export const fetchServiceGroupById = (id) => {
  return apiGet(`${SERVICE_API}/groups/${id}`);
};

// Tạo mới nhóm dịch vụ
export const createServiceGroup = (data) => {
  return apiPost(`${SERVICE_API}/groups`, data);
};

// Cập nhật nhóm dịch vụ theo ID
export const updateServiceGroup = (id, data) => {
  return apiPut(`${SERVICE_API}/groups/${id}`, data);
};

// Xoá nhóm dịch vụ
export const deleteServiceGroup = (id) => {
  return apiDelete(`${SERVICE_API}/groups/${id}`);
};

// ======== Dịch Vụ Chi Tiết (Service Details) ========

// Lấy tất cả dịch vụ chi tiết (bao gồm tùy chọn)
export const fetchAllServiceDetails = () => {
  return apiGet(`${SERVICE_API}/details`);
};

// Lấy chi tiết dịch vụ theo ID
export const fetchServiceDetailById = (id) => {
  return apiGet(`${SERVICE_API}/details/${id}`);
};

// Tạo mới dịch vụ chi tiết
export const createServiceDetail = (data) => {
  return apiPost(`${SERVICE_API}/details`, data);
};

// Cập nhật dịch vụ chi tiết
export const updateServiceDetail = (id, data) => {
  return apiPut(`${SERVICE_API}/details/${id}`, data);
};

// Xoá dịch vụ chi tiết
export const deleteServiceDetail = (id) => {
  return apiDelete(`${SERVICE_API}/details/${id}`);
};

// ======== Tùy Chọn Dịch Vụ (Service Options) ========

// Lấy tất cả tùy chọn dịch vụ
export const fetchAllServiceOptions = () => {
  return apiGet(`${SERVICE_API}/options`);
};

// Lấy chi tiết tùy chọn theo ID
export const fetchServiceOptionById = (id) => {
  return apiGet(`${SERVICE_API}/options/${id}`);
};

// Tạo mới tùy chọn dịch vụ
export const createServiceOption = (data) => {
  return apiPost(`${SERVICE_API}/options`, data);
};

// Cập nhật tùy chọn dịch vụ
export const updateServiceOption = (id, data) => {
  return apiPut(`${SERVICE_API}/options/${id}`, data);
};

// Xoá tùy chọn dịch vụ
export const deleteServiceOption = (id) => {
  return apiDelete(`${SERVICE_API}/options/${id}`);
};

export default {
  fetchAllServiceGroups,
  fetchServiceGroupById,
  createServiceGroup, 
  updateServiceGroup,
  deleteServiceGroup,
  fetchAllServiceDetails,
  fetchServiceDetailById, 
  createServiceDetail,  
  updateServiceDetail,
  deleteServiceDetail,
  fetchAllServiceOptions,
  fetchServiceOptionById, 
  createServiceOption,  
  updateServiceOption,
  deleteServiceOption,
};