const ucfirst = (s) => {
  const f = (s ?? "")[0]?.toUpperCase();
  return f ? f + s.slice(1) : null;
};

export default ucfirst;
