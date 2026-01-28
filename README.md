# 📱 payment-verification - Frontend (Fintech UI)

EthioVerifyPay is a high-performance, mobile-first web application designed for the Ethiopian market. It allows merchants to generate "Verified" QR codes that customers can scan to pay accurately via Telebirr or CBE.

**🔗 Live Demo:** [Your Vercel Link Here]

## 🎯 Key Goals
- **Eliminate Fraud:** Customers see a "Verified" badge and the merchant's real name before paying.
- **Zero Typos:** The app generates the exact USSD string (e.g., `× 127 ×1*...#`) for Telebirr, opening the phone's dialer automatically.

## 🎨 Design System
- **UX:** Built with Framer Motion for smooth transitions and Lucide-React for tiny, fast-loading icons.
- **Printable:** Includes a "Flyer Mode" for merchants to print physical QR codes for their shops.

## 🛠 Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS 4.0
- **Animations:** Framer Motion
- **Deployment:** Vercel (Configured with `vercel.json` for SPA routing)

## ⚙️ Installation & Setup

1. **Clone the repo:**
bash
  git clone https://github.com/Ekram2004/payment-verify-frontend
  cd payment-verify-frontend
```

2. Install dependencies:
  
```
bash
  npm install
  ```

3. Update API Endpoint:
  In src/App.jsx and src/VerifyPage.jsx, update the axios base URL to your live Backend URL.
4. Run development server:
  
```
bash
  npm run dev
  ```

 🧩 Challenges Overcome
- SPA Routing: Solved the Vercel 404 error on page refresh by implementing a custom vercel.json rewrite rule.
- USSD Integration: Implemented URL encoding for # (%23) to ensure USSD strings dial correctly on mobile devices.

 🔗 Related Repositories
- Backend Repository (https://github.com/Ekram2004/payment-verify-backend)

```
