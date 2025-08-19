import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { productsData } from './productsData.js';
import Stripe from 'stripe';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const storeItemsMap = new Map(productsData.map(item => [item.id, item]));
console.log(storeItemsMap);


app.post('/create-checkout-session', async (req, res) => {
  console.log('Received request to create checkout session');
  console.log('Request body:', req.body.items);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = storeItemsMap.get(item.id);
        return {
          price_data: {
            currency: 'USD',
            product_data: {
              name: storeItem.title
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,

        }
      }),
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel'
    });
    return res.json({ redirectUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));