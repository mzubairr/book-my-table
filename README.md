# 📱 Book My Table

Book tables at your favorite restaurants effortlessly without the hassle of calling or waiting.

## 🔧 Features

- 📆 Select booking date  
- 👥 Choose number of guests  
- ⏰ View available time slots  
- 📝 Non-logged-in users can also book by filling guest form  
- 🔥 Clean UI built with NativeWind  
- ☁️ Firebase Firestore & Authentication integration  

## 📸 App Screenshots

![Welcome Screen](https://github.com/user-attachments/assets/0f483ff7-2051-44af-8e38-c16ed28e5418)  
![Login Screen](https://github.com/user-attachments/assets/74d4227c-2a9d-498b-a033-f10b8c1492d3)  
![Home Screen](https://github.com/user-attachments/assets/dc0ce893-ec04-4149-b149-62d45ec4330c)  
![Restaurant Info Screen](https://github.com/user-attachments/assets/8da0e10c-7b23-46ab-8467-e0bfce309b74)
![Guest Booking Form](https://github.com/user-attachments/assets/66f1c14e-e387-49a6-affe-1f5fbecc3429)
![History Screen](https://github.com/user-attachments/assets/c618f137-cec5-475e-8f99-239f23e157b9)
![Profile Screen](https://github.com/user-attachments/assets/009f2090-333d-43ff-b8c8-becd866d2e4c)

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mzubairr/book-my-table.git
cd book-my-table
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npx expo start
```

> Open in Expo Go app or Android/iOS emulator.

## 📁 Folder Structure

```
BookMyTable/
├── app/         → All screens and navigation (Expo Router)
├── assets/      → App images and icons
├── components/  → Reusable UI components (Authentication, FindSlots)
├── lib/         → Firebase config and helper functions
└── utils/       → Form validation schema
```

## 🛠 Tech Stack

- React Native (Expo)
- Firebase Firestore & Authentication
- NativeWind (Tailwind CSS for React Native)
- Expo Router

## 🚀 Usage

- Users can browse restaurant listings, view details, and check available slots.
- Logged-in users can book instantly and view their booking history.
- Guests can also book by filling in basic info (name, number) without logging in.

## 📝 Notes

- The booking form uses **Yup** schema validation to ensure correct user input.
- Firebase handles bookings for both logged-in users and guests.
- Data is stored securely in Firestore and fetched in real-time.
