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
        return test.filter((item) => item.category === filterProp);
      });
    }
  }, [items, filterProp, value]);

  return [filterProp, setFilterProp, resultList];
}

// const resultList = ((list) => {
//   let test = list.filter(item => item.category)

//   if (filterProp === value) return list;

//   return test.filter((item) => {

//     if(item.category.includes(filterProp)) return true
//     return false
//   });
// })(items);

// return test.filter((item) => {

//   if(item.category.includes(filterProp)) return true
//   return false
// });
