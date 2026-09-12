# JhatkaByte Customer Website

This folder contains the React customer website for browsing products, selecting pincode, cart, checkout, registration, login, address book, and orders.

## Before Deployment

1. Deploy the backend first.

   The website needs the backend API URL before it is built.

2. Configure environment variables.

   Copy `.env.example` and set production values in your hosting provider. Do not commit `.env`.

   Required values:

   ```env
   REACT_APP_API_BASE_URL=https://your-backend-domain.com
   REACT_APP_UPLOAD_URL=https://your-backend-domain.com/uploads
   ```

3. Make sure backend CORS allows the customer website domain.

   In the backend env, include the deployed website URL:

   ```env
   CORS_ORIGINS=https://your-customer-domain.com
   ```

4. Install dependencies.

   ```bash
   npm ci
   ```

5. Build the website.

   ```bash
   npm run build
   ```

6. Check the main website routes after deployment.

   ```text
   /
   /products
   /cart
   /checkout
   /login
   /signup
   /my-account
   ```

## Docker Deployment

The Dockerfile builds the React app and serves it with nginx.

Build with direct backend URLs:

```bash
docker build \
  --build-arg REACT_APP_API_BASE_URL=https://your-backend-domain.com \
  --build-arg REACT_APP_UPLOAD_URL=https://your-backend-domain.com/uploads \
  -t jhatkabyte-web .
```

Run:

```bash
docker run -p 8080:8080 jhatkabyte-web
```

If the website container should proxy API calls through nginx, build with the default `/api` and `/uploads` values and set:

```env
BACKEND_ORIGIN=http://your-backend-service:3000
NGINX_PORT=8080
```

## Useful Commands

```bash
npm start
npm run build
```

## Final Checklist

- Backend is already deployed and healthy.
- Website env points to the correct backend.
- Backend `CORS_ORIGINS` includes the website domain.
- `npm run build` passes.
- Pincode check works.
- Product list loads for a serviceable pincode.
- Cart and checkout work for guest and registered users.
- Login, signup, password reset with secret code, address book, and order cancellation work.
