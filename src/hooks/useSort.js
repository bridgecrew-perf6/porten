import React, { useEffect, useState } from "react";

export function useSort(items) {
  const [sortMode, setSortMode] = useState(false);
  const [sortedList, setSortedList] = useState(items);

  useEffect(() => {
    if (!sortMode) {
      setSortedList(
        items.slice().sort((a, b) => {
          if (a.date > b.date) return -1;
          else if (b.date > a.date) return 1;
          else return 0;
        })
      );
    } else {
      setSortedList(
        items.slice().sort((a, b) => {
          if (a.date > b.date) return 1;
          else if (b.date > a.date) return -1;
          else return 0;
        })
      );
    }
  }, [sortMode, items]);

  return [sortMode, setSortMode, sortedList];
}
