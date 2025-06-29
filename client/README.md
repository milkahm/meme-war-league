# 🥷🏽 Meme War League 🔥

A fun full-stack meme battle app where users submit memes, start battles, and vote for the best meme. Built with Flask + React.

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), React Router, Formik, Yup  
- **Backend**: Flask, SQLAlchemy, Flask-Migrate, Flask-CORS  
- **Database**: SQLite (dev) / PostgreSQL (prod)  
- **Deployment**: Render.com (API), Vercel/Netlify (Frontend)

---

## 🔧 Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/meme-war-league.git
cd meme-war-league
2. Backend Setup (/server)
bash
Copy
Edit
cd server
pipenv install
pipenv shell
flask db init
flask db migrate -m "initial"
flask db upgrade
python seed.py   # optional
flask run
Server runs at http://localhost:5000

3. Frontend Setup (/client)
bash
Copy
Edit
cd client
npm install
npm run dev
Vite dev server runs at http://localhost:5173

🔐 Authentication Flow
Register: POST /auth/register

Login: POST /auth/login

Session Check: GET /auth/check_session

Logout: DELETE /auth/logout

Frontend uses credentials: 'include' to support cookies.

🔁 API Routes
✅ Users & Auth
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login existing user
GET	/auth/check_session	Check current session
DELETE	/auth/logout	Log out user

🖼 Memes
Method	Endpoint	Description
GET	/memes	Get all memes
POST	/memes	Add new meme
PATCH	/memes/:id	Edit a meme
DELETE	/memes/:id	Delete a meme

⚔️ Battles
Method	Endpoint	Description
GET	/battles	Get all meme battles
POST	/battles	Start new battle

🗳 Votes
Method	Endpoint	Description
POST	/votes	Vote on a meme battle