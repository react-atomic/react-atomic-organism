const getDateObject = (t) => (null != t ? new Date(t) : new Date());

const getTimestamp = (t) => +getDateObject(t);

const getRandom = () => getTimestamp() + "" + Math.random();

export default getRandom;

export { getDateObject, getTimestamp };
