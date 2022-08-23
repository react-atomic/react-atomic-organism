const defaultLocator = {
  value: (d) => d.value ?? d.label,
  label: (d) => d.label,
  icon: (d) => d.icon,
  header: (d) => d.header,
  divider: (d) => d.divider,
  item: (d) => d,
  items: (d) => d ?? [],
};

export default defaultLocator;
