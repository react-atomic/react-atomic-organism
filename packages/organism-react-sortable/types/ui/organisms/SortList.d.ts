export function useSortItems({ items, sortIdLocator, onSort, }: {
    items: any;
    sortIdLocator?: (item: any) => any;
    onSort?: (_items: any) => void;
}): {
    items: any;
    prevItems: any;
    setSortData: import("react").Dispatch<import("react").SetStateAction<import("../../types").SortData>>;
};
export type SortData = import("../../types").SortData;
export type useState<T> = import("reshow-constant").useState<T>;
