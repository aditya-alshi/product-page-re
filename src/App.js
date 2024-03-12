import React from "react";
import { Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { cartReducer } from "./cartReducer";

import Cart from "./Components/Cart";


export default function App() {
  const [products, setProducts] = React.useState([]); //Updated as soon as useEffect is called. Stores all products from the fetched api
  const [category, setCategory] = React.useState("all"); //Stores one value at a time, which the name attribute of the li elements stores. State is changed 
                                                         // when handleCategoryClick is triggered
  

  // Cart
  // Reducer is used.
  // cart will contain an array of Objects. with products thumbnail, id, title, finalPrice.
  // note: need refactorin because the AllProducts component might handle all the require logic.
  const [cart, dispatch] = React.useReducer(cartReducer, []);


  // addProducts function
  // gets the id of the products from the id attribute of 'Add to cart' button
  // iterate through all the 'products' in the products state and filter out that one product id which mathches the 'clickedProuductId' and assign
  // it to the clickedProduct variable 
  // the clickedProduct is destructured first element from the array returned by filter products. Since is contains only one elements. 
  // dispatch with that clickedProduct to the reducer function. 
  // note: needs refactoring 
  function addProducts(event){
    const clickedProductId = event.target.getAttribute('id');
    const [clickedProduct] = products.filter(product => product.id == clickedProductId)
    dispatch({type: "add", clickedProduct})
  }
  

  // deleteProducts function
  // the cart--section contains delete button for every cart item
  // that delete button contains the id attribute with id of the product mapped in in the Cart Component(Check Cart Component)
  // that id is passed to the 'cartProductId' variable 
  // that 'cartProductId' is needed to filter out the cart array. 
  // dispatch accepts the 'cartProductId'
  // this function and 
  function deleteProducts(event){
    const cartProductId = event.target.getAttribute('id');
    dispatch({
      type:"delete",
      id: cartProductId
      })
  }

  const finalProductArray = products.filter(
    (product) => product.category === category
  );

  React.useEffect(() => {
    const callfecth = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products?limit=100&select=title,price,brand,category,thumbnail,images,discountPercentage,id"
        );

        const jsonConverted = await res.json();
        const data = jsonConverted.products;
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    callfecth();
  }, []);

  function handleCategoryClick(event){
    // send the category innerText to dynamic string in AllProducts span with id #listing--category--heading

    const queriedCategoriesWrapper = document.querySelector(
      ".queried--categories--wrapper"
    );
    queriedCategoriesWrapper.classList.toggle("active");

    const categoryInnerText = event.target.innerHTML;

    const categoryName = event.target.getAttribute("name");
    setCategory(categoryName);
    // copy pasted default switch case from handlePriceSelect function
    // and manipulated select element to change to index 0
    setProducts([...products].sort((a, b) => a.id - b.id));
    document.querySelector(".select--price").selectedIndex = 0;
    document.querySelector("#listing--category--heading").innerHTML =
      categoryInnerText;
  }

  function handlePriceSelect(event) {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case "low-to-high":
        setProducts(
          [...products].sort((a, b) => {
            const aDiscountedPrice =
              a.price - a.price * (a.discountPercentage / 100);
            const bDisCountedPrice =
              b.price - b.price * (b.discountPercentage / 100);
            return aDiscountedPrice - bDisCountedPrice;
          })
        );
        break;

      case "high-to-low":
        setProducts(
          [...products].sort((a, b) => {
            const aDiscountedPrice =
              a.price - a.price * (a.discountPercentage / 100);
            const bDisCountedPrice =
              b.price - b.price * (b.discountPercentage / 100);
            return bDisCountedPrice - aDiscountedPrice;
          })
        );
        break;

      default:
        setProducts([...products].sort((a, b) => a.id - b.id));
    }
  }

  function toggleCartSection(){
    document.querySelector('.cart--transparent--background').classList.toggle('appear')
    document
    .querySelector('.cart--section')
    .classList.toggle('appear');
  }

  function handleLoginClick() {
    document
      .querySelector(".transparent--background")
      .classList.toggle("appear");
    document.querySelector("#login--form").classList.toggle("appear");
  }

  return (
    <div className="app--wrapper">
      <div className="cart--transparent--background" onClick={toggleCartSection}></div>
      <Cart deleteProducts={deleteProducts} cart={cart} />
      <header className="header--wrapper">
        <div className="header--elements heading--name">ShopWhop</div>
        <div className="header--other--section">
          <div className="header--elements the-search-section">
            <input
              className="header--searchBar"
              type="text"
              placeholder="Search..."
            />
            <CiSearch className="search--icon header--icons" />
          </div>
          <div className="header--elements heading--product">Products</div>
          <FaUser className="header--elements header--icons icon--login" />
          <div
            className="header--elements header--login"
            onClick={handleLoginClick}
          >
            Login
          </div>
          <div className="cart--icon">
            <IoCartOutline
              onClick={toggleCartSection}
              className=" header--elements header--icons icon--cart"
            />
            <div className="cart--count--absolute">{cart.length}</div>
          </div>
        </div>
      </header>

      <main className="main--wrapper">
        <aside className="categories--wrapper">
          <p className="categories--title">Categoies</p>
          <ul className="categories--list">
            <li
              name="all"
              className={`categories--list--items ${
                category === "all" ? "sky--blue" : ""
              } item--1`}
              onClick={handleCategoryClick}
            >
              allProducts
            </li>
            <li
              className={`categories--list--items ${
                category === "smartphones" ? "sky--blue" : ""
              } item--1`}
              name="smartphones"
              onClick={handleCategoryClick}
            >
              smartphones
            </li>
            <li
              className={`categories--list--items ${
                category === "laptops" ? "sky--blue" : ""
              } item--2`}
              name="laptops"
              onClick={handleCategoryClick}
            >
              laptops
            </li>
            <li
              className={`categories--list--items ${
                category === "fragrances" ? "sky--blue" : ""
              } item--3`}
              name="fragrances"
              onClick={handleCategoryClick}
            >
              fragrances
            </li>
            <li
              className={`categories--list--items ${
                category === "skincare" ? "sky--blue" : ""
              } item--4`}
              name="skincare"
              onClick={handleCategoryClick}
            >
              skincare
            </li>
            <li
              className={`categories--list--items ${
                category === "groceries" ? "sky--blue" : ""
              } item--5`}
              name="groceries"
              onClick={handleCategoryClick}
            >
              groceries
            </li>
            <li
              className={`categories--list--items ${
                category === "home-decoration" ? "sky--blue" : ""
              } item--6`}
              name="home-decoration"
              onClick={handleCategoryClick}
            >
              home-decoration
            </li>
            <li
              className={`categories--list--items ${
                category === "furniture" ? "sky--blue" : ""
              } item--7`}
              name="furniture"
              onClick={handleCategoryClick}
            >
              furniture
            </li>
            <li
              className={`categories--list--items ${
                category === "tops" ? "sky--blue" : ""
              } item--8`}
              name="tops"
              onClick={handleCategoryClick}
            >
              tops
            </li>
            <li
              className={`categories--list--items ${
                category === "womens-dresses" ? "sky--blue" : ""
              } item--9`}
              name="womens-dresses"
              onClick={handleCategoryClick}
            >
              womens-dresses
            </li>
            <li
              className={`categories--list--items ${
                category === "womens-shoes" ? "sky--blue" : ""
              } item--10`}
              name="womens-shoes"
              onClick={handleCategoryClick}
            >
              womens-shoes
            </li>
            <li
              className={`categories--list--items ${
                category === "mens-shirts" ? "sky--blue" : ""
              } item--11`}
              name="mens-shirts"
              onClick={handleCategoryClick}
            >
              mens-shirts
            </li>
            <li
              className={`categories--list--items ${
                category === "mens-shoes" ? "sky--blue" : ""
              } item--12`}
              name="mens-shoes"
              onClick={handleCategoryClick}
            >
              mens-shoes
            </li>
            <li
              className={`categories--list--items ${
                category === "mens-watches" ? "sky--blue" : ""
              } item--13`}
              name="mens-watches"
              onClick={handleCategoryClick}
            >
              mens-watches
            </li>
            <li
              className={`categories--list--items ${
                category === "womens-watches" ? "sky--blue" : ""
              } item--14`}
              name="womens-watches"
              onClick={handleCategoryClick}
            >
              womens-watches
            </li>
            <li
              className={`categories--list--items ${
                category === "womens-bags" ? "sky--blue" : ""
              } item--15`}
              name="womens-bags"
              onClick={handleCategoryClick}
            >
              womens-bags
            </li>
            <li
              className={`categories--list--items ${
                category === "womens-jewellery" ? "sky--blue" : ""
              } item--16`}
              name="womens-jewellery"
              onClick={handleCategoryClick}
            >
              womens-jewellery
            </li>
            <li
              className={`categories--list--items ${
                category === "sunglasses" ? "sky--blue" : ""
              } item--17`}
              name="sunglasses"
              onClick={handleCategoryClick}
            >
              sunglasses
            </li>
            <li
              className={`categories--list--items ${
                category === "automotive" ? "sky--blue" : ""
              } item--18`}
              name="automotive"
              onClick={handleCategoryClick}
            >
              automotive
            </li>
            <li
              className={`categories--list--items ${
                category === "motorcycle" ? "sky--blue" : ""
              } item--19`}
              name="motorcycle"
              onClick={handleCategoryClick}
            >
              motorcycle
            </li>
            <li
              className={`categories--list--items ${
                category === "lighting" ? "sky--blue" : ""
              } item--20`}
              name="lighting"
              onClick={handleCategoryClick}
            >
              lighting
            </li>
          </ul>
        </aside>

        <div className="product--section">
          <aside className="queried--categories--wrapper">
            <p className="categories--title">Categoies</p>
            <ul className="categories--list">
              <li
                name="all"
                className={`categories--list--items ${
                  category === "all" ? "sky--blue" : ""
                } item--1`}
                onClick={handleCategoryClick}
              >
                allProducts
              </li>
              <li
                className={`categories--list--items ${
                  category === "smartphones" ? "sky--blue" : ""
                } item--1`}
                name="smartphones"
                onClick={handleCategoryClick}
              >
                smartphones
              </li>
              <li
                className={`categories--list--items ${
                  category === "laptops" ? "sky--blue" : ""
                } item--2`}
                name="laptops"
                onClick={handleCategoryClick}
              >
                laptops
              </li>
              <li
                className={`categories--list--items ${
                  category === "fragrances" ? "sky--blue" : ""
                } item--3`}
                name="fragrances"
                onClick={handleCategoryClick}
              >
                fragrances
              </li>
              <li
                className={`categories--list--items ${
                  category === "skincare" ? "sky--blue" : ""
                } item--4`}
                name="skincare"
                onClick={handleCategoryClick}
              >
                skincare
              </li>
              <li
                className={`categories--list--items ${
                  category === "groceries" ? "sky--blue" : ""
                } item--5`}
                name="groceries"
                onClick={handleCategoryClick}
              >
                groceries
              </li>
              <li
                className={`categories--list--items ${
                  category === "home-decoration" ? "sky--blue" : ""
                } item--6`}
                name="home-decoration"
                onClick={handleCategoryClick}
              >
                home-decoration
              </li>
              <li
                className={`categories--list--items ${
                  category === "furniture" ? "sky--blue" : ""
                } item--7`}
                name="furniture"
                onClick={handleCategoryClick}
              >
                furniture
              </li>
              <li
                className={`categories--list--items ${
                  category === "tops" ? "sky--blue" : ""
                } item--8`}
                name="tops"
                onClick={handleCategoryClick}
              >
                tops
              </li>
              <li
                className={`categories--list--items ${
                  category === "womens-dresses" ? "sky--blue" : ""
                } item--9`}
                name="womens-dresses"
                onClick={handleCategoryClick}
              >
                womens-dresses
              </li>
              <li
                className={`categories--list--items ${
                  category === "womens-shoes" ? "sky--blue" : ""
                } item--10`}
                name="womens-shoes"
                onClick={handleCategoryClick}
              >
                womens-shoes
              </li>
              <li
                className={`categories--list--items ${
                  category === "mens-shirts" ? "sky--blue" : ""
                } item--11`}
                name="mens-shirts"
                onClick={handleCategoryClick}
              >
                mens-shirts
              </li>
              <li
                className={`categories--list--items ${
                  category === "mens-shoes" ? "sky--blue" : ""
                } item--12`}
                name="mens-shoes"
                onClick={handleCategoryClick}
              >
                mens-shoes
              </li>
              <li
                className={`categories--list--items ${
                  category === "mens-watches" ? "sky--blue" : ""
                } item--13`}
                name="mens-watches"
                onClick={handleCategoryClick}
              >
                mens-watches
              </li>
              <li
                className={`categories--list--items ${
                  category === "womens-watches" ? "sky--blue" : ""
                } item--14`}
                name="womens-watches"
                onClick={handleCategoryClick}
              >
                womens-watches
              </li>
              <li
                className={`categories--list--items ${
                  category === "womens-bags" ? "sky--blue" : ""
                } item--15`}
                name="womens-bags"
                onClick={handleCategoryClick}
              >
                womens-bags
              </li>
              <li
                className={`categories--list--items ${
                  category === "womens-jewellery" ? "sky--blue" : ""
                } item--16`}
                name="womens-jewellery"
                onClick={handleCategoryClick}
              >
                womens-jewellery
              </li>
              <li
                className={`categories--list--items ${
                  category === "sunglasses" ? "sky--blue" : ""
                } item--17`}
                name="sunglasses"
                onClick={handleCategoryClick}
              >
                sunglasses
              </li>
              <li
                className={`categories--list--items ${
                  category === "automotive" ? "sky--blue" : ""
                } item--18`}
                name="automotive"
                onClick={handleCategoryClick}
              >
                automotive
              </li>
              <li
                className={`categories--list--items ${
                  category === "motorcycle" ? "sky--blue" : ""
                } item--19`}
                name="motorcycle"
                onClick={handleCategoryClick}
              >
                motorcycle
              </li>
              <li
                className={`categories--list--items ${
                  category === "lighting" ? "sky--blue" : ""
                } item--20`}
                name="lighting"
                onClick={handleCategoryClick}
              >
                lighting
              </li>
            </ul>
          </aside>
          
          <Outlet
            context={[
              category === "all" ? products : finalProductArray,
              handlePriceSelect,addProducts
            ]}
          />
        </div>
      </main>
      <div className="transparent--background" onClick={handleLoginClick}></div>
      <form id="login--form" action="">
        <div className="close--button" onClick={handleLoginClick}>
          ×
        </div>
        <h1>Login</h1>
        <input
          className="login--form--elements"
          type="email"
          placeholder="Enter Email"
        />
        <input
          className="login--form--elements"
          type="password"
          placeholder="Enter Password"
        />
        <button type="button" className="login--form--elements">
          Submit
        </button>
        <div className="form--message">
          No Account? <span className="register--link">Register</span>
        </div>
      </form>
    </div>
  );
}
