import React from "react";

function CategorySection({ categoryList, updateFilter }: any) {
  const porkIndex = categoryList.findIndex(
    (item: any) => item.name.toLowerCase() === "pork"
  );
  console.log("porkIndex = ", categoryList);
  let list = [];
  if (porkIndex !== -1) {
    list = categoryList;
    const pork = list.splice(porkIndex, 1); // Remove 'pork' from the array
    list.push(pork[0]); // Push 'pork' to the end
    console.log("PORK = ", list);
  } else {
    list = categoryList;
  }
  return (
    <>
      {categoryList.length > 0 && (
        <ul className="food-menu-filter mt-5">
          <li
            className="active"
            data-filter="*"
            onClick={() => updateFilter("All")}
          >
            All
          </li>
          {list.map((item: any) => {
            return (
              <li
                key={`category${item.id}`}
                data-filter={`.${item.name.replace(/ +/g, "")}_${item.id}`}
                onClick={() => updateFilter(item.name)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default CategorySection;
