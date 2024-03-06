import { Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
export default function App() {
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
            <li className="categories--list--items item--1">smartphones</li>
            <li className="categories--list--items item--2">laptops</li>
            <li className="categories--list--items item--3">fragrances</li>
            <li className="categories--list--items item--4">skincare</li>
            <li className="categories--list--items item--5">groceries</li>
            <li className="categories--list--items item--6">home-decoration</li>
            <li className="categories--list--items item--7">furniture</li>
            <li className="categories--list--items item--8">tops</li>
            <li className="categories--list--items item--9">womens-dresses</li>
            <li className="categories--list--items item--10">womens-shoes</li>
            <li className="categories--list--items item--11">mens-shirts</li>
            <li className="categories--list--items item--12">mens-shoes</li>
            <li className="categories--list--items item--13">mens-watches</li>
            <li className="categories--list--items item--14">womens-watches</li>
            <li className="categories--list--items item--15">womens-bags</li>
            <li className="categories--list--items item--16">womens-jewellery</li>
            <li className="categories--list--items item--17">sunglasses</li>
            <li className="categories--list--items item--18">automotive</li>
            <li className="categories--list--items item--19">motorcycle</li>
            <li className="categories--list--items item--20">lighting</li>
          </ul>
        </aside>
        <div className="product--section">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
