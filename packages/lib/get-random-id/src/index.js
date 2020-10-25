const getDateObject = (t) => (null != t ? new Date(t) : new Date());

const getTimestamp = (t) => getDateObject(t).getTime();

const getRandom = () => getTimestamp() + "" + Math.random();

export default getRandom;

export { getDateObject, getTimestamp };
