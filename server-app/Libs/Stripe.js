import Stripe from "stripe";
import dotEnv from "dotenv";

dotEnv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;