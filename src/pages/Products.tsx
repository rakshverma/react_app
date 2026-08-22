import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadingSection from "../components/Shared/HeadingSection";
import CategorySection from "../components/Products/CategorySection";
import ProductListSection from "../components/Products/ProductListSection";
import {
  getAllCategoryAction,
  getAllProductsAction,
} from "../store/actions/productAction";
import { resetPinCodeStatusAction } from "../store/actions/cartAction";
import { useLocation } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigationState = location.state;
  const { categoryList, productList } = useSelector(
    (state: any) => state.product
  );
  const [filter, setFilter] = useState("All");
  const pinCode = localStorage.getItem("pincode");

  useEffect(() => {
    if (navigationState?.updatePincode) {
      dispatch(resetPinCodeStatusAction());
    }
    dispatch(getAllCategoryAction());
    dispatch(getAllProductsAction(pinCode));
  }, [dispatch, pinCode, navigationState?.updatePincode]);

  const updateFilter = (category: any) => {
    console.log("category = ", category);
    setFilter(category);
  };

  return (
    <>
      <HeadingSection heading={"Our Products"} />
      <section className="food-menu bg-grey padding">
        <div className="container">
          <CategorySection
            categoryList={categoryList}
            updateFilter={updateFilter}
          />
          <ProductListSection productList={productList} filter={filter} />
        </div>
      </section>
    </>
  );
}

export default Products;
