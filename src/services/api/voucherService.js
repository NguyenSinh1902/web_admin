import { apiGet, apiPost, apiPut, apiDelete } from '../apiHelpers';

const API_URL = '/vouchers';

// Lấy tất cả voucher
export const getAllVouchers = async () => {
  try {
    const response = await apiGet(API_URL);
    return response;
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    throw error;
  }
};

// Lấy voucher theo ID
export const getVoucherById = async (id) => {
  try {
    const response = await apiGet(`${API_URL}/id/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching voucher by ID:', error);
    throw error;
  }
};

// Lấy voucher theo code
export const getVoucherByCode = async (code) => {
  try {
    const response = await apiGet(`${API_URL}/code/${code}`);
    return response;
  } catch (error) {
    console.error('Error fetching voucher by code:', error);
    throw error;
  }
};

// Lấy vouchers đang hoạt động
export const getActiveVouchers = async () => {
  try {
    const response = await apiGet(`${API_URL}/active`);
    return response;
  } catch (error) {
    console.error('Error fetching active vouchers:', error);
    throw error;
  }
};

// Tạo voucher mới
export const createVoucher = async (voucherData) => {
  try {
    const response = await apiPost(API_URL, voucherData);
    return response;
  } catch (error) {
    console.error('Error creating voucher:', error);
    throw error;
  }
};

// Cập nhật voucher
export const updateVoucher = async (id, voucherData) => {
  try {
    const response = await apiPut(`${API_URL}/${id}`, voucherData);
    return response;
  } catch (error) {
    console.error('Error updating voucher:', error);
    throw error;
  }
};

// Xóa voucher
export const deleteVoucher = async (id) => {
  try {
    const response = await apiDelete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting voucher:', error);
    throw error;
  }
};

// Sử dụng voucher (tăng số lần sử dụng)
export const useVoucher = async (code) => {
  try {
    const response = await apiPut(`${API_URL}/use/${code}`);
    return response;
  } catch (error) {
    console.error('Error using voucher:', error);
    throw error;
  }
};

// Kiểm tra voucher có hợp lệ
export const validateVoucher = async (code, orderValue) => {
  try {
    // Lấy thông tin voucher
    const voucher = await getVoucherByCode(code);
    
    const now = new Date();
    const startDate = new Date(voucher.startDate);
    const endDate = new Date(voucher.endDate);
    
    // Kiểm tra voucher có còn hiệu lực
    if (!voucher.isActive || now < startDate || now > endDate) {
      return {
        isValid: false,
        message: 'Voucher is not active or expired'
      };
    }
    
    // Kiểm tra số lần sử dụng
    if (voucher.usageLimit && voucher.usageCount >= voucher.usageLimit) {
      return {
        isValid: false,
        message: 'Voucher usage limit reached'
      };
    }
    
    // Kiểm tra giá trị đơn hàng tối thiểu
    if (voucher.minOrderValue && orderValue < voucher.minOrderValue) {
      return {
        isValid: false,
        message: `Order value must be at least ${voucher.minOrderValue}`
      };
    }
    
    // Tính toán giá trị giảm giá
    let discountAmount = 0;
    
    // Nếu discountValue < 1, coi như là phần trăm
    if (voucher.discountValue < 1) {
      discountAmount = orderValue * voucher.discountValue;
      
      // Áp dụng giảm tối đa nếu có
      if (voucher.maxDiscount && discountAmount > voucher.maxDiscount) {
        discountAmount = voucher.maxDiscount;
      }
    } else {
      // Nếu không thì là số tiền cố định
      discountAmount = voucher.discountValue;
      
      // Đảm bảo không giảm nhiều hơn giá trị đơn hàng
      if (discountAmount > orderValue) {
        discountAmount = orderValue;
      }
    }
    
    return {
      isValid: true,
      discountAmount: discountAmount,
      voucher: voucher
    };
  } catch (error) {
    console.error('Error validating voucher:', error);
    return {
      isValid: false,
      message: 'Invalid voucher code'
    };
  }
};

export default {
  getAllVouchers,
  getVoucherById,
  getVoucherByCode,
  getActiveVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  useVoucher,  
  validateVoucher
};