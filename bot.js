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
const grammy_1 = require("grammy");
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const botFirebase_1 = require("./botFirebase");
const botToken = process.env.BOT_TOKEN;
if (!botToken) {
    throw new Error("BOT_TOKEN is not defined in the environment variables");
}
const bot = new grammy_1.Bot(botToken);
const birthdayMessages = [
    "🎂 Wishing you a day filled with love, laughter, and all your favorite things. Happy Birthday, {username}! 🎉",
    "🎉 May this special day bring you endless joy and happiness. Have a fantastic birthday, {username}! 🥳",
    "🥳 Happy Birthday, {username}! May this year be your best one yet, filled with success, love, and adventure! 🎈",
    "🎁 Sending you warm hugs and lots of love on your special day, {username}. Hope it's as amazing as you are! ❤️",
    "🎊 Another year older, wiser, and even more awesome! Happy Birthday, {username}! Have a fantastic day! 🎂",
    "🌟 Wishing you a birthday that's as special and wonderful as you are, {username}. Have an amazing day! 🎉",
    "🎈 May all your dreams and wishes come true this year, {username}. Have a spectacular birthday! 🥳",
    "🎂 Cheers to another year of blessings and new opportunities, {username}. Wishing you happiness always! 🎊",
    "🎉 On your special day, I hope you're surrounded by love, laughter, and everything that makes you happy. Happy Birthday, {username}! 🎁",
    "🥳 Today is all about you, {username}! Enjoy your day to the fullest! Wishing you a year full of happiness and success. 🎂",
    "🎊 May today bring you endless joy and may the year ahead be full of wonderful surprises, {username}! Happy Birthday! 🎈",
    "🎉 Wishing you sunshine, love, and laughter on your birthday, {username}! May this be your best year yet! 🥳",
    "🥂 Here's to another amazing year ahead, {username}! May your birthday be filled with all the things you love most. 🎂",
    "🎈 Happy Birthday, {username}! May today be as bright and beautiful as your smile. Keep shining! 🌟",
    "🎂 Hope this birthday brings you closer to all your dreams, {username}. Have a fantastic day ahead! 🥳",
    "🎊 The world is a better place with you in it, {username}. Wishing you a day filled with love and joy! ❤️",
    "🎉 May this birthday be the start of a wonderful year ahead. Enjoy your special day, {username}! 🎂",
    "🥳 Another year of greatness ahead! Wishing you the happiest of birthdays, {username}! 🎈",
    "🎁 Your kindness and warmth make the world brighter. Happy Birthday, {username}! Hope your day is as wonderful as you! 🌟",
    "🎂 Sending you all the love and happiness in the world, {username}. Have an amazing birthday! 🥳",
    "🎈 Wishing you a birthday that's as fun and fantastic as you are, {username}! Enjoy your day to the fullest! 🎉",
    "🥂 May today be a celebration of all the amazing things that make you special, {username}! Happy Birthday! 🎊",
    "🎉 Every moment with you is special, but today is extra special. Happy Birthday, {username}! Have a blast! 🎂",
    "🎈 May your birthday be filled with love, joy, and unforgettable memories, {username}. Cheers to another great year! 🥳",
    "🎊 Another trip around the sun, another chance to make amazing memories. Happy Birthday, {username}! 🎁",
    "🎂 Wishing you laughter, love, and everything wonderful on your birthday, {username}. Have an incredible day! 🎉",
    "🎈 Your presence is a gift to the world, {username}. Wishing you the happiest birthday ever! 🥂",
    "🥳 May this year bring you all the happiness and success you deserve, {username}. Have an amazing birthday! 🎂",
    "🎊 You make the world a brighter place. Hope your birthday is just as bright and joyful, {username}! 🎉",
    "🎁 Every birthday is a new beginning. Wishing you endless possibilities and happiness, {username}! 🥳",
    "🎈 The best things in life are yet to come! Enjoy your special day to the fullest, {username}! 🎂",
    "🎉 You bring joy to so many people. May today bring that same joy back to you, {username}! Happy Birthday! 🎊",
    "🎂 A wonderful person like you deserves the best birthday ever! Hope you have a fantastic day, {username}! 🥳",
    "🎊 Life is a journey, and yours is truly inspiring! Wishing you an amazing year ahead, {username}! 🎁",
    "🥂 Every candle on your cake is a wish come true. Hope all your dreams come true too, {username}! 🎂",
    "🎉 Happy Birthday, {username}! May this year be full of love, laughter, and success! 🎊",
    "🎈 On this day, a star was born! Keep shining, {username}! Wishing you the happiest of birthdays! 🎂",
    "🥳 Cheers to another year of making unforgettable memories, {username}! Hope your day is fantastic! 🎊",
    "🎂 Wishing you nothing but love and happiness today and always, {username}. Have a fantastic birthday! 🎉",
    "🎈 May your birthday be filled with good vibes, great friends, and unforgettable moments, {username}! 🥂",
    "🎊 Sending you warm wishes and lots of love on your special day, {username}. Hope it’s the best one yet! 🎁",
    "🎂 Life is a gift, and so are you! Hope your birthday is as amazing as you are, {username}! 🎉",
    "🥳 Today is all about celebrating YOU! Wishing you a wonderful birthday, {username}! 🎊",
    "🎈 Birthdays come and go, but amazing people like you make the world a better place! Happy Birthday, {username}! 🎁",
    "🎉 May this day bring you closer to your dreams, {username}. Wishing you happiness and success always! 🎂",
    "🎊 Wishing you a birthday filled with love, joy, and all the cake you can eat, {username}! 🥳",
    "🎂 Your kindness and positivity inspire everyone around you, {username}. Have a truly fantastic birthday! 🎉",
    "🎈 May your birthday be as bright and joyful as your beautiful soul, {username}! 🎁",
    "🎊 No matter how many birthdays come and go, you’ll always be young at heart, {username}! Stay awesome! 🎂"
];
const sendBirthdayMessage = (chatId, username) => __awaiter(void 0, void 0, void 0, function* () {
    // Select a random message
    const message = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)]
        .replace("{username}", username);
    try {
        yield bot.api.sendMessage(chatId, message);
        console.log(`Sent birthday message to ${username}`);
    }
    catch (error) {
        console.log(`Failed to send message to ${username}: ${error}`);
    }
});
const checkBirthdays = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Checking birthdays...");
    const today = new Date();
    const todayFormatted = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    const birthdays = yield botFirebase_1.FireFunc.getAllBirthdays();
    Object.keys(birthdays).forEach(chatId => {
        birthdays[chatId].forEach(birthday => {
            if (birthday.date === todayFormatted) {
                sendBirthdayMessage(chatId, birthday.username);
            }
        });
    });
});
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Function to validate the date format (dd-mm)
function isValidDate(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])$/; // dd-mm format
    return dateRegex.test(date);
}
// Handle /addbirthday command
bot.command("addbirthday", (ctx) => {
    if (!ctx.message || !ctx.message.text) {
        return ctx.reply("⚠️ Unable to process the message.");
    }
    const text = ctx.message.text.trim();
    const args = text.split(" ");
    if (args.length !== 3 || !args[1].startsWith("@")) {
        return ctx.reply("⚠️ Incorrect format!\nUse: `/addbirthday @username dd-mm`", { parse_mode: "Markdown" });
    }
    const username = args[1];
    const date = args[2];
    if (!isValidDate(date)) {
        return ctx.reply("⚠️ Invalid date format!\nPlease enter the date in `dd-mm` format. (e.g., `05-09` for 5th Sept)", { parse_mode: "Markdown" });
    }
    console.log();
    botFirebase_1.FireFunc.addBirthday(String(ctx.message.chat.id), username, date)
        .then(response => ctx.reply(response || "Birthday added successfully"))
        .catch(error => ctx.reply(`Failed to add birthday: ${error}`));
});
bot.command("deletebirthday", (ctx) => {
    if (!ctx.message || !ctx.message.text) {
        return ctx.reply("⚠️ Unable to process the message.");
    }
    const text = ctx.message.text.trim();
    const args = text.split(" ");
    if (args.length !== 2 || !args[1].startsWith("@")) {
        return ctx.reply("⚠️ Incorrect format!\nUse: `/deletebirthday @username`", { parse_mode: "Markdown" });
    }
    const username = args[1];
    const chatId = String(ctx.message.chat.id);
    botFirebase_1.FireFunc.deleteBirthday(String(ctx.message.chat.id), username)
        .then(response => ctx.reply(response || "Birthday deleted successfully"))
        .catch(error => ctx.reply(`Failed to delete birthday: ${error}`));
});
bot.command("upcomingbirthdays", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ctx.message || !ctx.message.text) {
        return ctx.reply("⚠️ Unable to process the message.");
    }
    const text = ctx.message.text.trim();
    const args = text.split(" ");
    if (args.length !== 2) {
        return ctx.reply("⚠️ Incorrect format!\nUse: `/upcomingbirthdays 1w or 1m or 3m`", { parse_mode: "Markdown" });
    }
    const range = args[1];
    const chatId = String(ctx.message.chat.id);
    if (range !== "1w" && range !== "1m" && range !== "3m") {
        return ctx.reply("⚠️ Incorrect format!\nUse: `/upcomingbirthdays 1w or 1m or 3m`", { parse_mode: "Markdown" });
    }
    const upcomingBirthdays = yield botFirebase_1.FireFunc.getUpcomingBirthdays(chatId, range);
    if (upcomingBirthdays.length === 0) {
        return ctx.reply("🎉 No upcoming birthdays found!");
    }
    const message = upcomingBirthdays.map((b) => `👤 ${b.username} - ${b.date}`).join("\n");
    ctx.reply(`🎉 Upcoming birthdays:\n${message}`);
}));
bot.command("listbirthdays", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ctx.message || !ctx.message.text) {
        return ctx.reply("⚠️ Unable to process the message.");
    }
    const chatId = String(ctx.message.chat.id);
    const birthdays = yield botFirebase_1.FireFunc.getBirthdays(chatId);
    if (birthdays.length === 0) {
        return ctx.reply("🎉 No birthdays found!");
    }
    const message = birthdays.map((b) => `👤 ${b.username} - ${b.date}`).join("\n");
    ctx.reply(`🎉 Birthdays:\n${message}`);
}));
node_cron_1.default.schedule('0 5 * * *', checkBirthdays);
bot.start();
