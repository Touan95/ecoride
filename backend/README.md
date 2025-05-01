# EcoRide Backend

This is the backend API for **EcoRide**, built with **Node.js**, **Express**, **TypeORM** and **PostgreSQL**.

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Make sure your .env.local file exists and contains necessary variables (cf. .env.example file)

## API Routes map

`Router` → Routeur principal `/`
├─ `publicRouter = Router()` → jwtMiddleware
│ ├─ `authenticationRouter` (Authentification routes)
│ │ ├─ **POST** `/register`
│ │ ├─ **POST** `/login`
│ │ ├─ **POST** `/testMail`
│ │ └─ **POST** `/refresh`
│ └─ `publicRideRouter` (Public rides routes)
│ ├─ **GET** `/rides`
│ ├─ **GET** `/ride/:rideId`
│ └─ **GET** `/ride/:rideId/reviews`
│
├─ `userRouter = Router().use(jwtMiddleware({}))` → jwtMiddleware (auth protected)
│ ├─ **GET** `/user/me`
│ ├─ **PATCH** `/user/:userId/type`
│ ├─ **PATCH** `/user/password`
│ ├─ **PATCH** `/user/:userId/driver`
│ ├─ **GET** `/user/:userId`
│ ├─ `userCarRouter` (User's cars management)
│ │ ├─ **POST** `/user/:userId/car`
│ │ ├─ **PUT** `/user/:userId/car/:carId`
│ │ └─ **PATCH** `/user/:userId/car/:carId`
│ └─ `userRideRouter` (User's rides management)
│ ├─ **POST** `/user/:userId/ride/add`
│ ├─ **PUT** `/user/ride/:rideId/book`
│ ├─ **GET** `/user/rides/passenger`
│ ├─ **GET** `/user/rides/driver`
│ ├─ **PATCH** `/user/ride/:rideId/cancel/passenger`
│ ├─ **PATCH** `/user/ride/:rideId/cancel/driver`
│ ├─ **PATCH** `/user/ride/:rideId/start`
│ ├─ **PATCH** `/user/ride/:rideId/end`
│ └─ **POST** `/user/ride/:rideId/review`
│
├─ `staffRouter = Router().use(jwtMiddleware({ requiresStaff: true }))` → jwtMiddleware (STAFF auth protected)
│ ├─ **GET** `/staff/reviews`
│ ├─ **GET** `/staff/review/:reviewId`
│ ├─ **PATCH** `/staff/review/:reviewId/approve`
│ └─ **PATCH** `/staff/review/:reviewId/dispute`
│
└─ `adminRouter = Router().use(jwtMiddleware({ requiresAdmin: true }))` → jwtMiddleware (ADMIN auth protected)
├─ **GET** `/admin/statistics`
├─ **GET** `/admin/staff`
├─ **PATCH** `/admin/user/:userId/block`
├─ **PATCH** `/admin/user/:userId/unblock`
├─ **GET** `/admin/users/blocked`
├─ **PATCH** `/admin/user/:email/staff`
└─ **GET** `/admin/user`
