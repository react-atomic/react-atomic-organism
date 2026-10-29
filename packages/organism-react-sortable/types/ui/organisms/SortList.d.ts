export type SortData = import("../../types").SortData;
export type SortListProps = {
    items: any[];
    sortIdLocator?: ((item: any) => string) | undefined;
    onSort?: ((items: any[]) => void) | undefined;
    onSortEnd?: ((items: any[]) => void) | undefined;
};
export type useState<T> = import("reshow-constant").useState<T>;
/**
 * @typedef {import("../../types").SortData} SortData
 */
/**
 * @typedef {object} SortListProps
 * @property {any[]} items
 * @property {((item: any) => string)=} sortIdLocator
 * @property {((items: any[]) => void)=} onSort
 * @property {((items: any[]) => void)=} onSortEnd
 */
/**
 * @template T
 * @typedef {import("reshow-constant").useState<T>} useState
 */
/**
 * @param {SortListProps} props
 */
export declare const useSortItems: ({ items: propsItems, sortIdLocator, onSort, onSortEnd, }: SortListProps) => {
    items: any[];
    prevItems: any[];
    isDraging: boolean;
    setSortData: import("reshow-constant").DispatchSetStateAction<import("../../types").SortData>;
};
