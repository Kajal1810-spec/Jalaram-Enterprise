# Jalaram-Enterprise
Its ecommerce website 
Jalaram Enterprise — All-in-one package (Upgraded)
=====================================================

What's new (implemented):
- SQLite database for persistence (server/db.sqlite)
- User authentication: register/login (JWT), endpoints: /api/auth/register, /api/auth/login
- Orders table and admin orders endpoint (/api/orders)
- Image upload support for products (admin UI uploads via multipart/form-data); uploaded files are stored in /public/uploads
- Stripe checkout skeleton: if STRIPE_SECRET is set in env, checkout will return Stripe session URL
- Admin endpoints still use X-Admin-Key header (default: jalaram-admin)
- Frontend updated: login, register, admin upload, orders view, cart checkout integration

How to run:
1. Install Node.js (v18+ recommended).
2. In `server` folder:
   ```bash
   npm install
   npm start
   ```
3. Open http://localhost:3000
4. Admin default key: jalaram-admin (set ADMIN_KEY env var to change)
5. To enable Stripe checkout, set STRIPE_SECRET env var to your Stripe secret key before running.

Security note:
- JWT secret, admin key, and Stripe secret should be set via environment variables in production.
- Never commit real keys to version control.

Files:
- public/: frontend (index, product, cart, admin, login, register)
- server/: Node.js Express server with SQLite persistence and file uploads

If you want, I can:
- Deploy this to Render/Vercel/Heroku with instructions.
- Add email verification or password reset via SMTP.
- Add user order history page (frontend).
- Harden security (rate limits, helmet, input validation).

Enjoy!


Additional features added in this final package:
- Email verification on registration (requires SMTP config)
  - Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS as env vars.
  - /api/auth/verify endpoint handles clicks from email.
- Password reset
  - POST /api/auth/forgot with { email } to request reset link (sends email if SMTP configured).
  - Reset page: /pages/reset.html?token=...
- User order history
  - Frontend page: /pages/orders.html
  - Server endpoint: GET /api/user/orders (requires Authorization: Bearer <token>)
- Razorpay integration
  - Set RAZORPAY_KEY and RAZORPAY_SECRET env vars.
  - POST /api/razorpay/create with { amount } to create a Razorpay order (returns order object).
- Paytm skeleton endpoint
  - POST /api/paytm/create - requires PAYTM_MID and PAYTM_KEY environment variables; sample skeleton provided.

Environment variables (summary):
- ADMIN_KEY (default: jalaram-admin)
- JWT_SECRET (default: change_this_secret)
- STRIPE_SECRET (optional)
- RAZORPAY_KEY, RAZORPAY_SECRET (for Razorpay)
- PAYTM_MID, PAYTM_KEY (for Paytm skeleton)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (for email)

