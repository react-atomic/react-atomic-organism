import React from "react";
export type DropdownHandler = {
    thisEl: React.Ref<any> & import("react").MutableRefObject;
    listEl: React.Ref<any> & import("react").MutableRefObject;
    isActive: import("react").MutableRefObject;
    dropdownClick: import("react").MouseEventHandler;
    listClick: Function;
    touchStart: Function;
};
export type DropdownExpose = {
    open: Function;
    close: Function;
    isOpen: Function;
};
export type DropdownData = {
    className: string;
    listStyle: object;
    handler: DropdownHandler;
    expose: DropdownExpose;
    hideList: boolean;
    restProps: object;
};
export type DropdownProps = {
    simple?: boolean;
    alwaysOpen?: boolean;
    right?: boolean;
    upward?: boolean;
    item?: boolean;
    className?: string;
    listStyle?: object;
};
/**
 * @typedef {object} DropdownHandler
 * @property {React.Ref<any>&import("react").MutableRefObject} thisEl
 * @property {React.Ref<any>&import("react").MutableRefObject} listEl
 * @property {import("react").MutableRefObject} isActive
 * @property {import("react").MouseEventHandler} dropdownClick
 * @property {Function} listClick
 * @property {Function} touchStart
 */
/**
 * @typedef {object} DropdownExpose
 * @property {Function} open
 * @property {Function} close
 * @property {Function} isOpen
 */
/**
 * @typedef {object} DropdownData
 * @property {string} className
 * @property {object} listStyle
 * @property {DropdownHandler} handler
 * @property {DropdownExpose} expose
 * @property {boolean} hideList
 * @property {object} restProps
 */
/**
 * @typedef {object} DropdownProps
 * @property {boolean} [simple]
 * @property {boolean} [alwaysOpen]
 * @property {boolean} [right]
 * @property {boolean} [upward]
 * @property {boolean} [item]
 * @property {string} [className]
 * @property {object} [listStyle]
 */
/**
 * @param {DropdownProps} props
 * @returns {DropdownData}
 */
export declare const useDropdown: (props: DropdownProps) => DropdownData;
