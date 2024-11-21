// @ts-check

// Component
export { default as Accordion } from "./ui/organisms/Accordion";
export { default as SideMenu } from "./ui/organisms/SideMenu";
export {
  default as HorizontalToVerticalMenu,
  getHorizontalToVerticalMenu,
} from "./ui/organisms/HorizontalToVerticalMenu";
export { default as Pagination } from "./ui/organisms/Pagination";
export { default as PaginationController } from "./ui/organisms/PaginationController";
export { default as Breadcrumb } from "./ui/organisms/Breadcrumb";
export { default as Tab } from "./ui/organisms/Tab";
export { default as TabView } from "./ui/organisms/TabView";

// template
export { default as getDocTemplate } from "./ui/templates/getDocTemplate";

/* Dropdown */
export { useDropdown } from "./hooks/useDropdown";
export { useSelect } from "./hooks/useSelect";
export { default as Dropdown } from "./ui/organisms/Dropdown";
export { default as Select } from "./ui/organisms/Select";
export { default as SelectField } from "./ui/molecules/SelectField";
export { default as SelectUI } from "./ui/molecules/SelectUI";

// library
export { default as paginationCalculator } from "./paginationCalculator";
export { default as defaultLocator } from "./defaultLocator";

/**
 * @typedef {import("./paginationCalculator").PageListTS} PageListTS
 */

/**
 * @typedef {import("./paginationCalculator").NavigateTS} NavigateTS
 */
import { TOTAL, PER_PAGE_NUM } from "./paginationCalculator";
export const options = {
  TOTAL,
  PER_PAGE_NUM,
};

// Stores
export {
  default as navigationStore,
  navigationDispatch,
} from "./stores/navigationStore";
