# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

### Frontend
```bash
cd frontend
npm install
```

### Backend
```bash
cd backend
npm install
```

## Step 2: Run the Application

### Option A: Run Both (Recommended)

**Terminal 1 - Frontend**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend**
```bash
cd backend
npm start
```

### Option B: Frontend Only (For UI Demo)

```bash
cd frontend
npm run dev
```

> The frontend will work with mock data even without the backend running!

## Step 3: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Step 4: Login

Use these demo credentials:

**Student Account**
- Email: `student@college.edu`
- Password: `password`

**Teacher Account**
- Email: `teacher@college.edu`
- Password: `password`

---

## 🎯 For Hackathon Demo

### Minimum Setup (5 minutes)

```bash
# 1. Install frontend dependencies
cd frontend && npm install

# 2. Start frontend
npm run dev

# 3. Open browser
# Go to http://localhost:3000
```

That's it! The app will work with mock data.

### Full Setup with Blockchain (15 minutes)

1. Install both frontend and backend
2. Get Algorand TestNet account
3. Add mnemonic to backend/.env
4. Start both servers
5. Test blockchain integration

---

## 📦 What's Included

### Frontend
- ✅ Login page with beautiful UI
- ✅ Student & Teacher dashboards
- ✅ Attendance tracking with QR codes
- ✅ Voting system with receipts
- ✅ Certificates with verification
- ✅ Analytics with charts
- ✅ Public verification portal

### Backend (Optional)
- ✅ Express API server
- ✅ Algorand blockchain integration
- ✅ RESTful endpoints
- ✅ Mock data storage

---

## 🐛 Troubleshooting

### "Module not found" error
```bash
cd frontend (or backend)
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Change port in vite.config.js (frontend)
# or .env (backend)
```

### Blockchain errors
- These won't affect the frontend demo
- Frontend works independently with mock data
- Blockchain is optional for visual demo

---

## 🎨 Demo Tips

1. **Start with Login** - Show the beautiful gradient design
2. **Dashboard First** - Impressive cards and animations
3. **Show Attendance** - QR code generation is eye-catching
4. **Voting Receipt** - Blockchain transaction ID visible
5. **Certificates** - Beautiful cards with QR codes
6. **Analytics** - Charts are very impressive
7. **Verification** - Public portal shows transparency

---

## 📱 Features to Highlight

- 🎨 Modern, gradient-based UI
- 🔄 Smooth animations and transitions
- 📊 Interactive charts (Recharts)
- 🔐 Blockchain integration visible
- ✅ QR code generation
- 🎯 One-click actions
- 📈 Real-time updates
- 🌐 Public verification

---

**That's it! You're ready to demo! 🎉**
