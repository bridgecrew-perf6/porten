import React, { useEffect, useState } from "react";

export function useFilter(items, value) {
  const [filterProp, setFilterProp] = useState(value);
  const [resultList, setResultList] = useState(items);

  useEffect(() => {
    let test = items.filter((item) => item.category);

    if (filterProp === value) {
      setResultList(items);
    } else {
      setResultList(() => {
        return test.filter(
          (item) =>
            item.category.toLowerCase() === filterProp.toLowerCase() ||
            item.category.toLowerCase().includes(filterProp.toLowerCase())
        );
      });
    }
  }, [items, filterProp, value]);

  return [filterProp, setFilterProp, resultList];
}
