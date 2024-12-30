import 'dotenv/config'; // This ensures your .env variables are loaded properly

export default {
  expo: {
    name: 'YourApp',
    slug: 'your-app',
    platforms: ['ios', 'android'],
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,  // Your Firebase API Key from the .env file
    },
  },
};
