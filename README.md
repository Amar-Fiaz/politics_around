# Politics Around | Political Intelligence & Analytics Platform

**Politics Around** is a comprehensive, production-ready platform designed for political transparency, data-driven analysis, and public engagement. It provides detailed intelligence for cities, constituencies, and politicians, featuring real-time voting, surveys, and AI-powered election predictions.

---

## 🚀 Features

- **Candidate Intelligence:** Detailed profiles with career timelines, projects, and promise trackers.
- **AI Analytics:** Sentiment analysis of public reviews and ML-based election win probability.
- **Public Engagement:** Real-time surveys and voting with live result updates via Socket.io.
- **City Dashboards:** Interactive statistics and demographic data for constituencies.
- **News Aggregator:** Latest political news with AI-generated summaries.
- **Comparison Tool:** Select and compare candidates based on influence scores and performance.
- **Admin Dashboard:** Full control over candidates, elections, news, and surveys.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI**
- **Framer Motion** (Animations)
- **Recharts** (Data Visualization)

### Backend
- **Node.js & Express**
- **Prisma ORM**
- **PostgreSQL** (via Supabase)
- **JWT** (Authentication)
- **Socket.io** (Real-time features)

### AI Service
- **Python FastAPI**
- **Scikit-learn** (Sentiment & Prediction models)
- **Pandas**

---

## 📂 Project Structure

```bash
politics-around
├── frontend       # Next.js + Tailwind + ShadCN
├── backend        # Node.js + Express + Prisma
├── ai-service     # Python FastAPI for ML
├── database       # PostgreSQL schema & seeds
├── docs           # Project documentation
└── scripts        # Automation scripts
```

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/Amar-Fiaz/politics_around.git
cd politics-around
```

### 2. Environment Setup
Create a `.env` file in the root with:
```env
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret
VERCEL_TOKEN=your_token
RENDER_TOKEN=your_token
```

### 3. Setup Backend
```bash
cd backend
npm install
npx prisma db push
npx prisma db seed
npm start
```

### 4. Setup AI Service
```bash
cd ai-service
pip install -r requirements.txt
python app/main.py
```

### 5. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🚢 Deployment

- **Frontend:** Deployed on **Vercel**.
- **Backend & AI:** Deployed on **Render** or **Railway**.
- **Database:** Hosted on **Supabase**.

---

## 🤝 Contact
Developed by **Amar Fiaz**  
GitHub: [@Amar-Fiaz](https://github.com/Amar-Fiaz)  
Project Link: [Politics Around](https://github.com/Amar-Fiaz/politics_around.git)
