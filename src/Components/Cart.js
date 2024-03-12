
export default function Cart({cart, deleteProducts}){

  // feature to be added:
  //  1. Cart Total

    let cartTotal = 0;
    const cartRenderer = cart.map(item=>(
        <div key={item.id} className="cart--item--wrapper">
          <img className="cart--item--thumbnail" src={item.thumbnail} alt="product" />
          <div className="info--section">
            <p className="cart--item--title">{item.title}</p>
            <p className="cart--item--price">${item.finalPrice}</p>
          </div>
          <button onClick={deleteProducts} 
            id={item.id} 
            type="button">Remove</button>
        </div>
      ))

      cart.forEach(item => {
        cartTotal += parseInt(item.finalPrice)
      });


    return(
        <div className="cart--section">
          {cartRenderer.length>0?cartRenderer: <h1>Empty</h1>}
          <div className="cart--total">Total : ${cartTotal}</div>
        </div>
        
    )
}