"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireFunc = void 0;
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, lite_1.getFirestore)(app);
function addBirthday(chatId, username, date) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chatRef = (0, lite_1.doc)(db, "chats", chatId);
        const chatDoc = yield (0, lite_1.getDoc)(chatRef);
        let birthdays = [];
        if (chatDoc.exists()) {
            birthdays = ((_a = chatDoc.data()) === null || _a === void 0 ? void 0 : _a.birthdays) || [];
        }
        // Check for duplicates
        const duplicate = birthdays.some(birthday => birthday.username === username && birthday.date === date);
        if (duplicate) {
            return `Birthday for ${username} on ${date} already exists.`;
        }
        birthdays.push({ username, date });
        yield (0, lite_1.setDoc)(chatRef, { birthdays });
        return `Added birthday for ${username}`;
    });
}
function deleteBirthday(chatId, username) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chatRef = (0, lite_1.doc)(db, "chats", chatId);
        const chatDoc = yield (0, lite_1.getDoc)(chatRef);
        if (!chatDoc.exists()) {
            return 'No birthdays found for this chat';
        }
        const birthdays = ((_a = chatDoc.data()) === null || _a === void 0 ? void 0 : _a.birthdays) || [];
        const updatedBirthdays = birthdays.filter(birthday => birthday.username !== username);
        if (updatedBirthdays.length === birthdays.length) {
            return `No birthday found for ${username}`;
        }
        yield (0, lite_1.setDoc)(chatRef, { birthdays: updatedBirthdays });
        return `Successfully deleted birthday for ${username}`;
    });
}
function getBirthdays(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chatRef = (0, lite_1.doc)(db, "chats", chatId);
        const chatDoc = yield (0, lite_1.getDoc)(chatRef);
        if (!chatDoc.exists()) {
            return [];
        }
        return ((_a = chatDoc.data()) === null || _a === void 0 ? void 0 : _a.birthdays) || [];
    });
}
function getUpcomingBirthdays(chatId, range) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chatRef = (0, lite_1.doc)(db, "chats", chatId);
        const chatDoc = yield (0, lite_1.getDoc)(chatRef);
        if (!chatDoc.exists()) {
            return [];
        }
        const birthdays = ((_a = chatDoc.data()) === null || _a === void 0 ? void 0 : _a.birthdays) || [];
        const now = new Date();
        const start = new Date(now);
        let end = new Date(now);
        if (range === "1w") {
            end.setDate(now.getDate() + 7);
        }
        else if (range === "1m") {
            end.setMonth(now.getMonth() + 1);
        }
        else if (range === "3m") {
            end.setMonth(now.getMonth() + 3);
        }
        return birthdays.filter(birthday => {
            const [day, month] = birthday.date.split("-").map(Number);
            const birthdayDate = new Date(now.getFullYear(), month - 1, day);
            return birthdayDate >= start && birthdayDate <= end;
        });
    });
}
function getAllBirthdays() {
    return __awaiter(this, void 0, void 0, function* () {
        const chatRef = (0, lite_1.collection)(db, "chats");
        const chatDocs = yield (0, lite_1.getDocs)(chatRef);
        const birthdays = chatDocs.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data().birthdays || [];
            return acc;
        }, {});
        return birthdays;
    });
}
exports.FireFunc = {
    addBirthday,
    deleteBirthday,
    getBirthdays,
    getUpcomingBirthdays,
    getAllBirthdays
    // checkBirthdays
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        //  await addBirthday('123', '@Alice', '14-02');
    });
}
run();
