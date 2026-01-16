# 🚀 EthioVerifyPay - Backend API

This is the robust Node.js/Express backend for **EthioVerifyPay**, a fintech solution designed to eliminate payment fraud and manual entry errors in the Ethiopian merchant ecosystem.

## 🌍 The Problem
In Ethiopia, merchants often fall victim to fake payment screenshots (Telebirr/CBE). Additionally, customers frequently send money to the wrong account numbers due to manual typing errors.

## ✨ The Solution
EthioVerifyPay provides a secure verification layer. This API manages merchant authentication, stores account details securely, and generates unique verification codes used to build deep-linked USSD payment strings.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Deployment:** Render

## 🚀 Key Features
- **Merchant Auth:** Secure Registration and Login system.
- **Dynamic Verification:** Generates unique codes for every merchant to prevent URL spoofing.
- **CORS Configured:** Securely communicates with the React frontend.
- **Production Ready:** Optimized for deployment on Render with auto-sleep handling.

## ⚙️ Installation & Setup

1. **Clone the repo:**
bash
  git clone https://github.com/YOUR_USERNAME/ethio-verify-backend.git
  cd ethio-verify-backend
```

2. Install dependencies:
  
```

bash
  npm install

```

3. Environment Variables:
  Create a .env file in the root and add:
  
```
env
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000

  ```

4. Run the server:
  
```
bash
  node index.js

  ```

 🔗 Related Repositories
- Frontend Repository (https://github.com/YOUR_USERNAME/ethio-verify-frontend)

```
