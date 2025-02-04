FROM node:23

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy bot source code
COPY . .

RUN npm ci --omit=dev

# Build TypeScript files
RUN npm install typescript
RUN npx tsc

# Set environment variables
ENV NODE_ENV=production

# Start the bot
CMD ["node", "bot.js"]
