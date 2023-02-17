export function useDropdown(props: DropdownProps): DropdownData;
export type DropdownProps = {
    simple?: boolean;
    alwaysOpen?: boolean;
    right?: boolean;
    upward?: boolean;
    item?: boolean;
    className?: string;
    listStyle?: object;
};
export type DropdownExpose = {
    open: Function;
    close: Function;
    isOpen: Function;
};
export type DropdownHandler = {
    thisEl: React.Ref<any>;
    listEl: React.Ref<any>;
    dropdownClick: Function;
    listClick: Function;
    touchStart: Function;
};
export type DropdownData = {
    className: string;
    listStyle: object;
    handler: DropdownHandler;
    expose: DropdownExpose;
    hideList: boolean;
    restProps: object;
};
