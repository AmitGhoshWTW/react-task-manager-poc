export const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isPhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };
  
  export const isURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  export const isEmpty = (value) => {
    if (value == null) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  };
  
  export const isRequired = (value) => !isEmpty(value);
  
  export const minLength = (min) => (value) => {
    if (isEmpty(value)) return true; // Let required validator handle empty values
    return value.length >= min;
  };
  
  export const maxLength = (max) => (value) => {
    if (isEmpty(value)) return true;
    return value.length <= max;
  };