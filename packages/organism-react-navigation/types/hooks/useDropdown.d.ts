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
export type DropdownData = {
    className: string;
    listStyle: object;
    handler: object;
    hideList: boolean;
    restProps: object;
};
