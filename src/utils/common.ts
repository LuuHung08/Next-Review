const ROUTE_PATH = {
  Home: '/',
};

export const memoize = (fn: any) => {
  let cache: any = {};
  return (...args: any) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};

export { ROUTE_PATH };

export function validateEmail(email: string) {
  //Validates the email address
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegex.test(email);
}

export function replacePhoneOrEmail(value: string) {
  if (!value) return '';
  if (value.slice(0, 1).toString() === '0' && value.indexOf('@') === -1) {
    return '84' + value.slice(1);
  } else return value?.trim()?.toLocaleLowerCase();
}

export function validatePhone(phone: string) {
  const re = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  return re.test(phone);
}
