export function useDropdown(props: DropdownProps): DropdownData;
export type DropdownHandler = {
    thisEl: React.Ref<any> & any;
    listEl: React.Ref<any> & any;
    isActive: any;
    dropdownClick: any;
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
