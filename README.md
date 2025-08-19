React E-Commerce Stripe Demo

A simple React + Node.js (Express) demo project to showcase Stripe Checkout integration for handling online payments.
This project is designed for learning purposes and demonstrates how to build a small e-commerce app with payment functionality.

🚀 Features
Frontend (React + Vite)
Product listing with sample data
Shopping cart functionality (add/remove items, quantity update)
Checkout flow with Stripe
Success & Cancel pages

Backend (Node.js + Express)
REST API with Express
Stripe Checkout Session creation
Product data served from a simple productsData.js file
CORS enabled for frontend communication


🛠️ Tech Stack
Frontend: React, Vite, Context API
Backend: Node.js, Express
Payments: Stripe API


📦 Installation & Setup
1. Clone the repository
git clone https://github.com/Siraj-Ansari3/react-ecommerce-stripe-demo.git
cd react-ecommerce-stripe-demo

2. Frontend Setup
Move into the client folder and install dependencies:
cd client
npm install
npm run dev
The frontend will start at:
👉 http://localhost:5173

3. Backend Setup
Move into the server folder and run the backend (no install needed because node_modules are included):
cd server
npm run dev
The backend will run at:
👉 http://localhost:8000


4. Stripe Setup
Create a Stripe account
Get your Secret Key from the Stripe Dashboard.
Paste the secret Key in .env file in server folder.

"STRIPE_SECRET_KEY=your_secret_key_here"


✅ Usage
Open the frontend (http://localhost:5173).
Add products to the cart.
Proceed to checkout → redirects to Stripe Checkout.
Pay using test card numbers (e.g., 4242 4242 4242 4242).
On success, redirect to /success.
On cancel, redirect to /cancel.


🤝 Contributing
Contributions are welcome! 🎉
If you’d like to improve this project:
Fork the repository
Create a new branch (git checkout -b feature-name)
Commit your changes (git commit -m "Add some feature")
Push to your branch (git push origin feature-name)
Open a Pull Request
