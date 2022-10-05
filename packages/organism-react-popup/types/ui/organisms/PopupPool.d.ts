export default PopupPool;
declare function PopupPool({ component, name, ...restProps }: {
    [x: string]: any;
    component?: typeof SemanticUI;
    name?: any;
}): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
import { SemanticUI } from "react-atomic-molecule";
