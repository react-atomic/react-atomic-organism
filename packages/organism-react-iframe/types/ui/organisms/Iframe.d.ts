export default Iframe;
/**
 * Add this type in top of your file, or if commonly used in some types file.
 */
export type useState<T> = [T, import('react').Dispatch<import('react').SetStateAction<T>>];
/**
 * @type React.ForwardRefExoticComponent<?, any>
 */
declare const Iframe: React.ForwardRefExoticComponent<unknown, any>;
import * as React from "react";
