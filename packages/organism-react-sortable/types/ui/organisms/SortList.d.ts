export function useSortItems({ items: propsItems, sortIdLocator, onSort, onSortEnd, }: SortListProps): {
    items: any[];
    prevItems: any[];
    isDraging: boolean;
    setSortData: import("reshow-constant").SetStateAction<import("../../types").SortData>;
};
export type SortData = import("../../types").SortData;
export type SortListProps = {
    items: any[];
    sortIdLocator?: ((arg0: any) => string) | undefined;
    onSort?: ((arg0: any[]) => void) | undefined;
    onSortEnd?: ((arg0: any[]) => void) | undefined;
};
export type useState<T> = import("reshow-constant").useState<T>;
