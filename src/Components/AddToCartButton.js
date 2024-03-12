

// Created a seperate component for reusability in products overview section. and others too.
// it is imported in the AllProducts Component(Check AllProducts component)
// that AllProuduct component passes the id and addProducts function (Check how addProducts function is brought into the AllProduct Component)

export default function AddToCartButton({id, addProducts}){
    return(
        <button id={id} onClick={addProducts} type="button">
            Add to cart
        </button>
    )
}