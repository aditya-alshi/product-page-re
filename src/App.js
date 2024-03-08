import React from "react";
import { Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [category, setCategory] = React.useState("all");
  
  const finalProductArray = products.filter(product=>product.category === category)
  
  React.useEffect(() => {
    const callfecth = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products?limit=100&select=title,price,brand,category,thumbnail,images,discountPercentage,id"
        );
  
        const jsonConverted = await res.json();
        const data = jsonConverted.products;
        // console.log(data);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    callfecth();
  }, []);
  
  function handleCategoryClick(event) {
    const categoryName = event.target.getAttribute('name');
    setCategory(categoryName);
    // copy pasted default switch case from handlePriceSelect function
    // and manipulated select element to change to index 0
    setProducts([...products].sort((a,b)=>a.id - b.id))
    document.querySelector('.select--price').selectedIndex=0;
  }

  function handlePriceSelect(event){
    const selectedValue = event.target.value;
    switch(selectedValue){
      case "low-to-high":
        setProducts([...products].sort((a,b)=>{
          const aDiscountedPrice = a.price -
          a.price * (a.discountPercentage / 100)
          const bDisCountedPrice = b.price -
          b.price * (b.discountPercentage / 100)
          return aDiscountedPrice - bDisCountedPrice;
        }))
        break;

      case "high-to-low":
        setProducts([...products].sort((a,b)=>{
          const aDiscountedPrice = a.price -
          a.price * (a.discountPercentage / 100)
          const bDisCountedPrice = b.price -
          b.price * (b.discountPercentage / 100)
          return bDisCountedPrice - aDiscountedPrice;
        }))
        break;

      default:
        setProducts([...products].sort((a,b)=>a.id - b.id))
    }
  }
  



  return (
    <div className="app--wrapper">
      <header className="header--wrapper">
        <div className="header--elements heading--name">ShopWhop</div>
        <div className="header--elements the-search-section">
          <input
            className="header--searchBar"
            type="text"
            placeholder="Search..."
          />
          <CiSearch className="search--icon" />
        </div>
        <div className="header--elements heading--product">Products</div>
        <FaUser className="header--elements header--icons icon--login" />
        <div className="header--elements">Login</div>
        <IoCartOutline className=" header--elements header--icons icon--cart" />
        <div className="cart--count--absolute">1</div>
      </header>
      <main className="main--wrapper">
        <aside className="categories--wrapper">
          <p className="categories--title">Categoies</p>
          <ul className="categories--list">
            <li
              className="categories--list--items item--1"
              name="all"
              onClick={handleCategoryClick}
            >
              allProducts
            </li>
            <li
              className="categories--list--items item--1"
              name="smartphones"
              onClick={handleCategoryClick}
            >
              smartphones
            </li>
            <li
              className="categories--list--items item--2"
              name="laptops"
              onClick={handleCategoryClick}
            >
              laptops
            </li>
            <li
              className="categories--list--items item--3"
              name="fragrances"
              onClick={handleCategoryClick}
            >
              fragrances
            </li>
            <li
              className="categories--list--items item--4"
              name="skincare"
              onClick={handleCategoryClick}
            >
              skincare
            </li>
            <li
              className="categories--list--items item--5"
              name="groceries"
              onClick={handleCategoryClick}
            >
              groceries
            </li>
            <li
              className="categories--list--items item--6"
              name="home-decoration"
              onClick={handleCategoryClick}
            >
              home-decoration
            </li>
            <li
              className="categories--list--items item--7"
              name="furniture"
              onClick={handleCategoryClick}
            >
              furniture
            </li>
            <li
              className="categories--list--items item--8"
              name="tops"
              onClick={handleCategoryClick}
            >
              tops
            </li>
            <li
              className="categories--list--items item--9"
              name="womens-dresses"
              onClick={handleCategoryClick}
            >
              womens-dresses
            </li>
            <li
              className="categories--list--items item--10"
              name="womens-shoes"
              onClick={handleCategoryClick}
            >
              womens-shoes
            </li>
            <li
              className="categories--list--items item--11"
              name="mens-shirts"
              onClick={handleCategoryClick}
            >
              mens-shirts
            </li>
            <li
              className="categories--list--items item--12"
              name="mens-shoes"
              onClick={handleCategoryClick}
            >
              mens-shoes
            </li>
            <li
              className="categories--list--items item--13"
              name="mens-watches"
              onClick={handleCategoryClick}
            >
              mens-watches
            </li>
            <li
              className="categories--list--items item--14"
              name="womens-watches"
              onClick={handleCategoryClick}
            >
              womens-watches
            </li>
            <li
              className="categories--list--items item--15"
              name="womens-bags"
              onClick={handleCategoryClick}
            >
              womens-bags
            </li>
            <li
              className="categories--list--items item--16"
              name="womens-jewellery"
              onClick={handleCategoryClick}
            >
              womens-jewellery
            </li>
            <li
              className="categories--list--items item--17"
              name="sunglasses"
              onClick={handleCategoryClick}
            >
              sunglasses
            </li>
            <li
              className="categories--list--items item--18"
              name="automotive"
              onClick={handleCategoryClick}
            >
              automotive
            </li>
            <li
              className="categories--list--items item--19"
              name="motorcycle"
              onClick={handleCategoryClick}
            >
              motorcycle
            </li>
            <li
              className="categories--list--items item--20"
              name="lighting"
              onClick={handleCategoryClick}
            >
              lighting
            </li>
          </ul>
        </aside>
        <div className="product--section">
          <Outlet
            context={[category === "all"?products:finalProductArray, handlePriceSelect]}
          />
        </div>
      </main>
    </div>
  );
}
