# 🎾 My Tennis App

A web application designed to manage tennis leagues, matches, and player statistics.  
Built with **Next.js** and **Prisma**, it provides an intuitive interface for uploading match results, tracking scores, and viewing season standings.

---

## 📌 Features

- **Match Updating** – Create, edit, and view upcoming matches.
- **Player Profiles** – Track individual player stats and records.
- **Season Standings** – Automatically updated rankings based on match results.
- **Responsive UI** – Optimized for both desktop and mobile viewing.
- **Database Integration** – Stores and retrieves data using Prisma and PostgreSQL.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Next.js API Routes
- **Database:** PostgreSQL (via Prisma ORM)
- **Hosting:** Vercel
- **Version Control:** Git + GitHub

---

📸 GIF of Web Application


![chrome-capture-2025-08-11](https://github.com/user-attachments/assets/ef49c852-052b-4310-a2e8-d5c940043e27)

## 🗒️ Notes
Uploading matches are locked with passwords that are only known by me and my competitors so anyone accessing the web app cannot add matches.
Used Prisma Schema to make models and fields that are required by my tennis web app.
Prisma dataabse is connected via Vercel storage.

## 🚀 Getting Started

### Clone the repository
```
git clone https://github.com/yourusername/tennis-app.git
cd tennis-app
```
2. Install dependencies
```
npm install
```
4. Set up environment variables
Create a .env file in the root directory and add:
```
DATABASE_URL="your_postgresql_connection_string"
```

4. Run database migrations
```
npx prisma migrate dev
```


5. Start the development server
```
npm run dev
```

The app will be available at http://localhost:3000

## Reference
Profile images are created with [Dicebear]((https://www.dicebear.com/)).
