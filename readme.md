# 🎉 Birthday Bot

A Telegram bot that helps you keep track of and celebrate birthdays! 🎂

📱find bot at **@official_birthday_bot**

## 🚀 Features
- `/start` - Start the bot and see a welcome message.
- `/addbirthday` - Add a birthday to the list.
- `/deletebirthday` - Remove a birthday from the list.
- `/upcomingbirthdays [time range]` - View upcoming birthdays within a given time range.
- `/listbirthdays` - Show all saved birthdays.
- Automatically sends birthday wishes on the special day! 🎈

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/Brooksolomon/Birthday-bot.git
 cd Birthday-bot
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add the following:
```env
BOT_TOKEN=your-telegram-bot-token
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_MEASUREMENT_ID=your-firebase-measuerment-id
```
Make sure **not** to share your API keys!

### **4️⃣Compile and Run the Bot**
```sh
npx tsc
node bot.js
```

---

## 🤝 Contributing
We welcome contributions to improve **Birthday Bot**! Follow these steps to contribute:

### **1️⃣ Fork the Repository**
Click on the **Fork** button at the top-right of this repo to create your own copy.

### **2️⃣ Clone Your Fork**
```sh
git clone https://github.com/your-username/Birthday-bot.git
cd Birthday-bot
```

### **3️⃣ Create a New Branch**
```sh
git checkout -b feature-name
```

### **4️⃣ Make Your Changes**
Modify the code and add your improvements.

### **5️⃣ Commit Your Changes**
```sh
git add .
git commit -m "Added new feature"
```

### **6️⃣ Push to Your Fork**
```sh
git push origin feature-name
```

### **7️⃣ Submit a Pull Request**
Go to the **original repo** and create a **Pull Request** from your fork.



