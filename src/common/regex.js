// 正则表达式
export const REGEX = {
  USERNAME: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{7,}/,
  PHONE: /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
  NUMBER10: /^\d{10}$/,
  NUMBER: /^[1-9]\d*(\.\d+)?$/,
  POSITIVE_INT_NUMBER: /^[1-9]\d*$/,
  LINUX_PATH: /(\/([0-9a-zA-Z]+))+/,
  LINUX_FILE_NAME: /[^/\\\\]+$/,
};
