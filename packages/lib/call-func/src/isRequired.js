const isRequired = (name) => {
  throw new Error(`${name || "param"} is required`);
};

export default isRequired;
