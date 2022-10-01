/**
 * convert RegExp to string without slashes
 * @param regex
 * @returns
 */
const regexpString = (regex: RegExp) => {
  const str = String(regex);
  // remove slashes at begining and end
  return str.substring(1, str.length - 1);
};

export default regexpString;
