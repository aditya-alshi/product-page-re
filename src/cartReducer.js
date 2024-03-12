export const cartReducer = (cart, action)=>{
    switch (action.type){
        case "add":{
            // corresponds to addProducts function
            // creates a new object 'thisProduct' which will be add to the cart
            // 'thisProduct' contains id, title, price(need to calculate the final price), discountPercentage
            // thumbnail etc. 
            // all this will be passed to the Cart Component to map it. 
            // returns a new cart array with added 'thisProduct'
            const clickedProduct = action.clickedProduct
            const thisProduct = {
                id: clickedProduct.id,
                title: clickedProduct.title,
                price: clickedProduct.price,
                discountPercentage: clickedProduct.discountPercentage,
                finalPrice: (clickedProduct.price - clickedProduct.price * (clickedProduct.discountPercentage / 100)).toFixed(2),
                thumbnail: clickedProduct.thumbnail
            }
            return [...cart,thisProduct]
        }
        
        case "delete":{
            //the 'cartProductId' is passed to the filter function
            // notice the inequality operator != is not !== which is strict inequality. 
            // It's because the Id attribute passed to cartProduct is a string.
            // filterout taking a copy and returns a brandnew cart array to re-render.
            return [...cart].filter(item=>item.id != action.id)

        }

        default: {
            throw Error('Unknown action: ' + action.type);

        }
    }
}