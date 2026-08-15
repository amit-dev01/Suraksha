<div align="center">
  <img src="./assets/images/suraksha-logo.jpg" alt="Safe Route Logo" width="120" />
  
  # Safe Route (Suraksha)
  **Your Trusted Personal Safety Companion**

  <p align="center">
    <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" /></a>
    <a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 54" /></a>
    <a href="https://reactnavigation.org/"><img src="https://img.shields.io/badge/React_Navigation-8A2BE2?style=for-the-badge&logo=react&logoColor=white" alt="React Navigation" /></a>
  </p>
</div>

---

## 🛡️ About Safe Route

Safe Route (Suraksha) is a modern, mobile-first personal safety application built with React Native and Expo. Designed to keep you safe in any situation, it provides real-time location tracking, rapid SOS activation, and intelligent routing based on safety metrics like street lighting and crowd density.

Whether you're walking home late at night or traveling through unfamiliar areas, Safe Route acts as your digital guardian.

## ✨ Key Features

- 🚨 **Smart SOS Activation**: A prominent, pulsating SOS button with a built-in 5-second cancellation timer to prevent accidental triggers.
- 📍 **Live Location Sharing**: Instantly broadcast your real-time coordinates to trusted family and friends.
- 🗺️ **Safety-Scored Routing**: Get walking or driving directions optimized for safety rather than just speed. Routes are scored based on lighting and crowd levels.
- 🚓 **Emergency Directory**: One-tap access to nearby police stations, hospitals, and emergency dispatchers.
- 📶 **Offline Mode**: Download offline maps and emergency contact data for areas without cellular service.

## 📱 Screenshots

*(Add screenshots here)*
<div style="display: flex; flex-direction: row; gap: 10px;">
  <img src="https://via.placeholder.com/250x500.png?text=Home+Screen" width="200" />
  <img src="https://via.placeholder.com/250x500.png?text=SOS+Active" width="200" />
  <img src="https://via.placeholder.com/250x500.png?text=Safe+Routes" width="200" />
</div>

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo Go](https://expo.dev/client) app installed on your iOS or Android device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amit-dev01/Suraksha.git
   cd Suraksha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start -c
   ```

4. **Run on your device**
   - **iOS:** Open the Camera app and scan the QR code generated in the terminal.
   - **Android:** Open the Expo Go app and scan the QR code.
   - Alternatively, press `a` to run on an Android Emulator or `i` for an iOS Simulator.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/)
- **Build Tool / SDK**: [Expo](https://expo.dev/) (SDK 54)
- **Navigation**: [React Navigation v7](https://reactnavigation.org/)
- **Icons**: `@expo/vector-icons` (MaterialCommunityIcons)
- **Animations**: `lottie-react-native` & `react-native-reanimated`
- **Maps**: `react-native-maps`

## 📁 Project Structure

```
Suraksha/
├── assets/             # Images, fonts, and icons
├── src/
│   ├── components/     # Reusable UI components (Buttons, Cards, Headers)
│   ├── context/        # React Context for Auth and App State
│   ├── navigation/     # Stack and Tab navigators (AppNavigator, MainTabs)
│   ├── screens/        # UI Screens categorized by feature
│   │   ├── auth/       # Login, OTP, Onboarding
│   │   ├── home/       # Main Dashboard
│   │   ├── route/      # Safe Routing & Map views
│   │   ├── safety/     # Police Stations, Live Tracking
│   │   └── sos/        # SOS trigger and active modes
│   ├── theme/          # Design System (colors, typography, spacing)
│   └── utils/          # Helper functions and mock data
├── App.js              # Application entry point
└── app.json            # Expo configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/amit-dev01/Suraksha/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
