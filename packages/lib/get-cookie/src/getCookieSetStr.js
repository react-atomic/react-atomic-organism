// @ts-check

/**
 * @param {string} cname
 * @param {string} cvalue
 * @param {number} [millisecond]
 * @param {string} [domain]
 * @returns {string}
 */
export const getCookieSetStr = (
  cname,
  cvalue = "",
  millisecond = 0,
  domain
) => {
  domain = domain || "";
  let expires = "";
  if (millisecond) {
    const d = new Date();
    d.setTime(d.getTime() + millisecond);
    expires = "expires=" + d.toUTCString() + ";";
  }
  if (domain) {
    domain = "domain=" + domain + ";" || "";
  }
  const cStr = cname + "=" + cvalue + ";" + expires + domain + "path=/";
  return cStr;
};
