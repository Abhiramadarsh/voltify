/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Using environment variables for configuration with hardcoded fallbacks for the preview environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB7F3sfLA6TfkPyHFtxQCvmV60ltsia-P0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "voltify-2a671.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "voltify-2a671",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "voltify-2a671.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "734092794334",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:734092794334:web:e8c90e477f51eec97ae54f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RD91F6P920"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
