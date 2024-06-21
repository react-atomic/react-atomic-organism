// @ts-check
import { useState, useRef, useEffect } from "react";
import { useRefUpdate } from "reshow-hooks";
import callFunc from "call-func";

/**
 * @typedef {import("../../types").SortData} SortData
 */

/**
 * @template T
 * @typedef {import("reshow-constant").useState<T>} useState
 */

export const useSortItems = ({
  items,
  sortIdLocator = (/**@type any*/ item) => item.id,
  onSort = (/**@type any*/ _items) => {},
}) => {
  /** @type {useState<SortData>} */
  const [{ sortId, targetId, reverseOrder }, setSortData] = useState(
    () =>
      /**@type SortData*/ ({
        sortId: null,
        targetId: null,
        reverseOrder: null,
      })
  );
  const lastSortMap = /**@type any*/ useRef({});
  const lastSortOrder = useRefUpdate(items, (items) => {
    items.forEach((/**@type any*/ item) => {
      const itemId = sortIdLocator(item);
      lastSortMap.current[itemId] = item;
    });
    return items;
  });
  const sortOrder = [];
  useEffect(() => {
    if (sortId) {
      lastSortOrder.current.forEach((/**@type any*/ item) => {
        const itemId = sortIdLocator(item);
        if (sortId === itemId) {
          if (sortId === targetId) {
            sortOrder.push(item);
          }
        } else if (targetId === itemId) {
          if (reverseOrder) {
            sortOrder.push(item);
            sortOrder.push(lastSortMap.current[sortId]);
          } else {
            sortOrder.push(lastSortMap.current[sortId]);
            sortOrder.push(item);
          }
        } else {
          sortOrder.push(item);
        }
      });
      lastSortOrder.current = sortOrder;
      callFunc(onSort, [sortOrder]);
    }
  }, [sortId, targetId, reverseOrder]);

  return {
    items: lastSortOrder.current,
    prevItems: items,
    setSortData,
  };
};
