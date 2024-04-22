export const validateFullName = (value: string):string => {
  if (value.trim().length === 0) {
    return 'Bạn không được bỏ trống họ tên!';
  } else if (value.trim().length < 10) {
    return 'Họ tên phải nhiều hơn 10 ký tự!';
  } else if (value.trim().length > 40) {
    return 'Họ tên không được quá 40 ký tự!';
  } else {
    return '';
  }
};

export const validateEmail = (value: string):string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value.trim().length === 0) {
    return 'Bạn không được bỏ trống email!';
  } else if (emailRegex.test(value.trim())) {
    return 'Sai định dạng email. Ex: example@gmail.com';
  } else {
    return '';
  }
};
