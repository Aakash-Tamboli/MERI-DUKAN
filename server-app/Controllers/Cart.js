import Product from "../Models/Product.js";
import User from "../Models/User.js";

async function addToCart(request, response) {
    try {
        const { productId } = request.body;
        const user = request.user;

        const existingItem = user.cartItems.find((item) => {
            return item.id === productId;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        }
        else {
            user.cartItems.push(productId);
        }

        await user.save();

        response.json(user.cartItems);

    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        response.status(500).json({ message: "Server error", error: error.message });
    }
}

async function updateQuantity(request, response) {
    try {
        const { productId } = request.params;

        const { quantity } = request.body;

        const user = request.user;

        const existingItem = user.cartItems.find((item) => {
            return item.id === productId;
        });

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => {
                    return item.id !== productId;
                });
                await user.save();
                return response.json(user.cartItems);
            }
            existingItem.quantity = quantity;
            await user.save();
            response.json(user.cartItems);
        }
        else {
            response.status(404).json({ message: "Product not found" });
        }

    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        response.status(500).json({ message: "Server error", error: error.message });
    }
}

async function getCartProducts(request, response) {
    try {
        const user = request.user;
        const cartItemsId = user.cartItems;
        const products = await Product.find({ _id: { $in: cartItemsId } });

        // associating quanitity acc. to user cart.

        const cartItems = products.map((product) => {
            const productIdWithQuantity = user.cartItems.find((item) => {
                return item.id === product.id;
            });
            return { ...product.toJSON(), quantity: productIdWithQuantity.quantity };
        });

        response.json(cartItems);

    } catch (error) {
        console.log("Error in getCartProducts controller", error.message);
        response.status(500).json({ message: "Server error", error: error.message });
    }
}

async function removeAllFromCart(request, response) {
    try {
        const { productId } = request.body;
        const user = request.user;

        if (!productId) {
            user.cartItems = [];
        }
        else {
            user.cartItems = user.cartItems.filter((item) => {
                return item.id !== productId;
            });
        }

        await user.save();

        response.json(user.cartItems);

    } catch (error) {

    }
}
export { addToCart, updateQuantity, getCartProducts, removeAllFromCart };