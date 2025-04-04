import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name required"]
    },
    description: {
        type: String,
        required: [true, "Product description required"]
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Product price is requred and should not -ve!"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    category: {
        type: String,
        required: [true, "Product category required"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;