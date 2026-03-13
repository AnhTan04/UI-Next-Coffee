// Validation function for customer information
export const validateCustomerInfo = (customerInfo) => {
    const requiredFields = {
        name: 'Họ tên',
        phone: 'Số điện thoại',
        email: 'Email',
        address: 'Địa chỉ',
        city: 'Tỉnh/thành',
        district: 'Quận/huyện',
        ward: 'Phường/xã',
    };
    const missingFields = [];
    const phoneRegex = /^0\d{9,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const [field, label] of Object.entries(requiredFields)) {
        if (!customerInfo[field]?.trim()) {
            missingFields.push(label);
        }
    }

    if (customerInfo.phone && !phoneRegex.test(customerInfo.phone)) {
        missingFields.push('Số điện thoại phải bắt đầu bằng 0 và có 10-11 chữ số');
    }

    if (customerInfo.email && !emailRegex.test(customerInfo.email)) {
        missingFields.push('Email không đúng định dạng');
    }

    return missingFields;
};

// Get full address from customer info
export const getFullAddress = (customerInfo) => {
    const parts = [customerInfo.address, customerInfo.ward, customerInfo.district, customerInfo.city].filter(part => part);
    return parts.join(', ');
}; 