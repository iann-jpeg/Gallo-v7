# Backend Deployment Quick Guide

## 📁 What to Upload to Aplin

### CORRECT: Upload Entire Backend Folder
```
backend/                    ← Upload THIS entire folder
├── dist/                  ← Compiled JavaScript (PRODUCTION FILES)
│   ├── main.js           ← Entry point (Aplin runs this)
│   ├── controllers/      ← API endpoints (compiled)
│   ├── services/         ← Business logic (compiled)
│   └── ... all compiled files
├── package.json          ← Required for dependencies
├── node_modules/         ← Dependencies (or install via npm)
├── prisma/              ← Database schema
├── .env                 ← Environment variables
└── uploads/             ← File storage
```

### ❌ WRONG: Don't upload only dist/
```
dist/                      ← DON'T upload only this
├── main.js
├── controllers/
└── services/
```

## 🚀 Aplin Configuration

### 1. Node.js App Settings
- **App Type**: Node.js
- **Startup File**: `dist/main.js`
- **Node Version**: 18.x+
- **Port**: 3000

### 2. File Structure on Aplin Server
```
/your-nodejs-app/
├── dist/main.js          ← Aplin runs this file
├── package.json          ← Lists dependencies
├── .env                  ← Your production config
└── node_modules/         ← Installed via npm install
```

### 3. Commands Aplin Runs
```bash
# 1. Install dependencies
npm install --production

# 2. Start application  
node dist/main.js
```

## 🔍 Testing Backend Deployment

### Check if backend is running:
1. **Health Check**: `https://api.galloways.co.ke/api/health`
2. **API Response**: Should return JSON status
3. **Logs**: Check Aplin app logs for errors

### Common Issues:
- **502 Error**: Backend not running (check startup file path)
- **404 Error**: Wrong domain/subdomain configuration  
- **500 Error**: Environment variables not set correctly

## 📞 Need Help?
- Check `APLIN_DEPLOYMENT_GUIDE.md` for complete instructions
- Verify all environment variables are set in Aplin control panel
- Ensure SSL is enabled for api.galloways.co.ke
