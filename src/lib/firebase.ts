/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Using the configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyB7F3sfLA6TfkPyHFtxQCvmV60ltsia-P0",
  authDomain: "voltify-2a671.firebaseapp.com",
  projectId: "voltify-2a671",
  storageBucket: "voltify-2a671.firebasestorage.app",
  messagingSenderId: "734092794334",
  appId: "1:734092794334:web:e8c90e477f51eec97ae54f",
  measurementId: "G-RD91F6P920"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
