import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc, query, where, getDoc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import dotenv from "dotenv";
dotenv.config();

// Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function addBirthday(chatId: string, username: string, date: string) {
  const chatRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatRef);

  let birthdays: { username: string; date: string }[] = [];
  if (chatDoc.exists()) {
      birthdays = chatDoc.data()?.birthdays || [];
  }

  // Check for duplicates
  const duplicate = birthdays.some(birthday => birthday.username === username && birthday.date === date);
  if (duplicate) {
      return `Birthday for ${username} on ${date} already exists.`;
  }

  birthdays.push({ username, date });
  await setDoc(chatRef, { birthdays });

  return `Added birthday for ${username}`;
}

async function deleteBirthday(chatId: string, username: string) {
  const chatRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatRef);

  if (!chatDoc.exists()) {
    return 'No birthdays found for this chat';
  }

  const birthdays: { username: string; date: string }[] = chatDoc.data()?.birthdays || [];
  const updatedBirthdays = birthdays.filter(birthday => birthday.username !== username);

  if (updatedBirthdays.length === birthdays.length) {
      return `No birthday found for ${username}`;
  }

  await setDoc(chatRef, { birthdays: updatedBirthdays });

  return `Successfully deleted birthday for ${username}`;
}

async function getBirthdays (chatId: string) {
  const chatRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatRef);

  if (!chatDoc.exists()) {
    return [];
  }

  return chatDoc.data()?.birthdays || [];
}

async function getUpcomingBirthdays(chatId: string, range: "1w" | "1m" | "3m") {
  const chatRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatRef);

  if (!chatDoc.exists()) {
    return [];
  }

  const birthdays: { username: string; date: string }[] = chatDoc.data()?.birthdays || [];
  const now = new Date();
  const start = new Date(now);
  let end = new Date(now);

  if (range === "1w") {
      end.setDate(now.getDate() + 7);
  } else if (range === "1m") {
      end.setMonth(now.getMonth() + 1);
  } else if (range === "3m") {
      end.setMonth(now.getMonth() + 3);
  }  
  return birthdays.filter(birthday => {
    const [day, month] = birthday.date.split("-").map(Number);
    const birthdayDate = new Date(now.getFullYear(), month - 1, day);
      return birthdayDate >= start && birthdayDate <= end;
  });
}

async function getAllBirthdays() {
  const chatRef = collection(db, "chats");
  const chatDocs = await getDocs(chatRef);
  const birthdays = chatDocs.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data().birthdays || [];
    return acc;
  }, {} as { [key: string]: { username: string; date: string }[] });

  return birthdays;
}

export const FireFunc = {
  addBirthday,
  deleteBirthday,
  getBirthdays,
  getUpcomingBirthdays,
  getAllBirthdays
  // checkBirthdays
}

async function run() {
  //  await addBirthday('123', '@Alice', '14-02');

}

run();