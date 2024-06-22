// @ts-check
import { useState, useRef, useEffect } from "react";
import { useRefUpdate } from "reshow-hooks";
import callFunc from "call-func";

/**
 * @typedef {import("../../types").SortData} SortData
 */

/**
 * @typedef {object} SortListProps
 * @property {any[]} items
 * @property {function(any):string=} sortIdLocator
 * @property {function(any[]):void=} onSort
 * @property {function(any[]):void=} onSortEnd
 */

/**
 * @template T
 * @typedef {import("reshow-constant").useState<T>} useState
 */

/**
 * @param {SortListProps} props
 */
export const useSortItems = ({
  items: propsItems,
  sortIdLocator = (/**@type any*/ item) => item.id,
  onSort = (/**@type any*/ _items) => {},
  onSortEnd = (/**@type any*/ _items) => {},
}) => {
  /** @type {useState<SortData>} */
  const [{ sortId, targetId, reverseOrder, isDraging }, setSortData] = useState(
    () =>
      /**@type SortData*/ ({
        sortId: null,
        targetId: null,
        reverseOrder: null,
      })
  );
  const lastProps = useRefUpdate({ onSort, onSortEnd });
  const lastIsDraging =
    /**@type {React.MutableRefObject<boolean>}*/ useRef(false);
  const lastSortMap = /**@type any*/ useRef({});

  const lastSortOrder = useRefUpdate(propsItems, (propsItems) => {
    propsItems.forEach((/**@type any*/ item) => {
      const itemId = sortIdLocator(item);
      lastSortMap.current[itemId] = item;
    });
    return propsItems;
  });
  /** @type {useState<any[]>} */
  const [nextItems, setNextItems] = useState(lastSortOrder.current);
  const sortOrder = [];
  useEffect(() => {
    if (sortId) {
      lastSortOrder.current?.forEach((/**@type any*/ item) => {
        const itemId = sortIdLocator(item);
        if (sortId === itemId) {
          if (sortId === targetId) {
            sortOrder.push(item);
          }
        } else if (targetId === itemId) {
          if (reverseOrder) {
            sortOrder.push(lastSortMap.current[sortId]);
            sortOrder.push(item);
          } else {
            sortOrder.push(item);
            sortOrder.push(lastSortMap.current[sortId]);
          }
        } else {
          sortOrder.push(item);
        }
      });
      lastSortOrder.current = sortOrder;
      callFunc(lastProps.current?.onSort, [sortOrder]);
      setNextItems(sortOrder);
    }
  }, [sortId, targetId, reverseOrder]);

  useEffect(() => {
    if (!isDraging) {
      if (lastIsDraging.current) {
        callFunc(lastProps.current?.onSortEnd, [lastSortOrder.current]);
      }
    }
    lastIsDraging.current = isDraging;
  }, [isDraging]);

  return {
    items: nextItems,
    prevItems: propsItems,
    isDraging,
    setSortData,
  };
};
