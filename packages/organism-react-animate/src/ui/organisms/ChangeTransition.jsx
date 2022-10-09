// @ts-check

import CSSTransition from "../organisms/CSSTransition";

import { build } from "react-atomic-molecule";

const ChangeTransition = ({ in: PropsIn = true, children }) => {
  return build(CSSTransition)({ in: PropsIn }, children);
};

export default ChangeTransition;
