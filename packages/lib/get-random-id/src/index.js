const getDateObject = (t) => (null != t ? new Date(t) : new Date());

const getTimestamp = (t) => +getDateObject(t);

const sn = {};

const getSN = (name) => {
  sn[name] = sn[name] ?? 0;
  return (name || "") + "_" + sn[name]++;
};

const getRandom = () => getTimestamp() + "" + Math.random();

export default getRandom;

export { getDateObject, getTimestamp, getSN };
