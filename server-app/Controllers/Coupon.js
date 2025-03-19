import Coupon from "../Models/Coupon.js";

async function getCoupon(request, response) {
    try {
        const user = request.user;
        const isActive = true;
        const coupon = await Coupon.findOne({ userId: user._id, isActive: isActive });
        response.json(coupon || null);
    } catch (error) {
        console.log("Error in getCoupon controller", error.message);
        response.status(500).json({ message: "Server Error", error: error.message });
    }
}

async function validateCoupon(request, response) {
    try {
        const { code } = request.body;
        const user = request.user;
        const coupon = await Coupon.findOne({ code: code, userId: user._id, isActive: true });

        if (!coupon) {
            return response.status(404).json({ message: "Coupon not found" });
        }

        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return response.status(404).json({ message: "Coupon expired" });
        }

        response.json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        });

    } catch (error) {
        console.log("Error in validCoupon controller", error.message);
        response.status(500).json({ message: "Server error", error: error.message });
    }
}
export { getCoupon, validateCoupon };