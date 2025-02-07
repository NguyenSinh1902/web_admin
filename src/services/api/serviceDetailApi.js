import { apiGet, apiPost, apiPut, apiDelete } from '../apiHelpers';

// Base URL for service detail related endpoints
const SERVICE_DETAIL_API = '/service-details-v2';

/**
 * Create a new service detail
 * @param {Object} serviceDetailData - The service detail data
 * @returns {Promise} Promise resolving to the created service detail
 */
export const createServiceDetail = (serviceDetailData) => {
    return apiPost(SERVICE_DETAIL_API, serviceDetailData);
};

/**
 * Update an existing service detail
 * @param {Object} serviceDetailData - The service detail data including ID
 * @returns {Promise} Promise resolving to the updated service detail
 */
export const updateServiceDetail = (serviceDetailData) => {
    // If ID is present, use apiPut, otherwise fallback to create
    return apiPut(`${SERVICE_DETAIL_API}/${serviceDetailData.id}`, serviceDetailData);
};

/**
 * Upsert a service detail (create or update)
 * @param {Object} serviceDetailData - The service detail data
 * @returns {Promise} Promise resolving to the created or updated service detail
 */
export const upsertServiceDetail = (serviceDetailData) => {
    return apiPost(`${SERVICE_DETAIL_API}`, serviceDetailData);
};

/**
 * Get a service detail by ID
 * @param {string} id - The service detail ID
 * @returns {Promise} Promise resolving to the service detail
 */
export const getServiceDetailById = (id) => {
    return apiGet(`${SERVICE_DETAIL_API}/${id}`);
};

/**
 * Get all service details
 * @param {Object} [params] - Optional query parameters
 * @returns {Promise} Promise resolving to the list of service details
 */
export const getAllServiceDetails = (params = {}) => {
    return apiGet(SERVICE_DETAIL_API, params);
};

/**
 * Get service details by service group ID
 * @param {string} serviceGroupId - The service group ID
 * @returns {Promise} Promise resolving to the list of service details
 */
export const getServiceDetailsByGroupId = (serviceGroupId) => {
    return apiGet(`${SERVICE_DETAIL_API}/group/${serviceGroupId}`);
};

/**
 * Delete a service detail
 * @param {string} id - The service detail ID to delete
 * @returns {Promise} Promise resolving to the deletion result
 */
export const deleteServiceDetail = (id) => {
    return apiDelete(`${SERVICE_DETAIL_API}/${id}`);
};

// Export all functions for use in components
export default {
    createServiceDetail,
    updateServiceDetail,
    upsertServiceDetail,
    getServiceDetailById,
    getAllServiceDetails,
    getServiceDetailsByGroupId,
    deleteServiceDetail
};