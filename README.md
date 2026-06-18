# Zion AI - AI-Powered Website Builder 🚀

Zion AI is a premium, full-stack AI-powered website builder that allows users to instantly generate, customize, preview, and deploy high-quality, fully responsive websites using natural language prompts. Built on the MERN stack with modern UI/UX practices, this project showcases advanced state management, real-time AI generation, sandboxed live previews, and secure user sessions.

---

## 🌟 Key Features

### 1. **Instant AI Generation**
- Input a prompt (e.g., "Create a modern restaurant page with proper layout and menu") and instantly generate clean, production-ready HTML, CSS, and JavaScript.
- Utilizes OpenRouter/LLM models behind a specialized prompt engineering layer to output responsive, modern layouts.

### 2. **Interactive AI Chat Assistant**
- Refine existing sites by chatting with the AI. Type modifications (e.g., "add a contact form" or "change background to a dark gold gradient"), and watch changes apply in real-time.
- Inputs clear instantly upon sending, supporting quick iterations with key submission handlers (`Enter` key to submit, `Shift+Enter` for new lines).

### 3. **Live Sandbox Preview & Code Editor**
- Watch changes render live in a sandboxed, isolated iframe environment.
- Integrated **Monaco Editor** (the engine behind VS Code) for developer-level code inspection and direct manual code overrides.
- Device preview toggles for desktop, tablet, and mobile layouts.

### 4. **User Dashboard**
- Manage generated projects in a clean grid layout.
- Access instant preview thumbnails rendering code directly inside dashboard cards.
- Premium features: copy deployed URLs to clipboard, deploy drafts to live URLs, and securely delete projects with inline warning overlays.

### 5. **Credit & Payment System**
- Integrated credits system (10 credits per creation, 5 per update) to manage API consumption.
- Subscription and credit purchasing workflows ready to scale.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, React Router, Tailwind CSS, Monaco Editor (`@monaco-editor/react`), Framer Motion (for smooth transitions & premium animations), Lucide React (Icons) |
| **Backend** | Node.js, Express.js, JWT (Authentication), Cookie Parser, CORS, REST APIs |
| **Database** | MongoDB, Mongoose (Schemas & Database modeling) |
| **AI Integration** | OpenRouter API / LLM Prompt Engineering, JSON Output Parsing |
| **Hosting & Deploy** | Sandboxed preview rendering via Blob URLs & dynamic slug routing |

---

## 📂 Project Structure

```text
├── backend/
│   ├── config/             # DB & API client configs (OpenRouter, etc.)
│   ├── controllers/        # Express request handlers & controller logic
│   ├── databse/            # Database connection handlers
│   ├── middlewares/        # Authentication & protection middleware
│   ├── models/             # Mongoose schemas (User, Website)
│   ├── routes/             # API routes (auth, website, payment)
│   └── index.js            # Main entry point for backend
│
├── frontend/
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── assets/         # App-wide visual elements & loaders
│   │   ├── components/     # Reusable layout components (Navbar, LoginModal)
│   │   ├── pages/          # Page views (Dashboard, WebsiteEditor, Pricing, Home)
│   │   ├── redux/          # Redux Toolkit store, slices (user slice)
│   │   ├── main.jsx        # App entry point
│   │   └── App.jsx         # App router & layout configuration
│   └── vite.config.js      # Vite configuration & development server specs
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed (v16.x or higher recommended)
- MongoDB account (local instance or MongoDB Atlas cluster)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENROUTER_API_KEY=your_openrouter_api_token
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_SERVER_URL=http://localhost:3000
   ```
4. Start the frontend Vite server:
   ```bash
   npm run dev
   ```

Open your browser and navigate to `http://localhost:5173` to see Zion AI running!

---

## 🗄️ Database Schemas

### User Schema (`User`)
- Tracks user registrations, email verification, active session cookies, and remaining credit balances.

### Website Schema (`Website`)
```javascript
{
  user: { type: ObjectId, ref: 'User' },
  title: { type: String, default: "Untitled Website" },
  latestCode: { type: String, required: true },
  conversation: [
    {
      role: { type: String, enum: ["user", "ai"] },
      content: { type: String }
    }
  ],
  deployed: { type: Boolean, default: false },
  deployUrl: { type: String },
  slug: { type: String, unique: true, sparse: true }
}
```

---

## 💡 Key Learning Outcomes (Showcase)

As a fresh full-stack developer project, Zion AI illustrates expertise in:
1. **Component Lifecycle & State Syncing**: Managing Monaco editor code changes syncing directly with a sandbox iframe without page reloads.
2. **LLM Structured Output Parsing**: Custom error-correction loop parsing raw AI completions into clean, syntax-valid JSON objects.
3. **Advanced CSS & Animations**: Responsive layouts implementing CSS flex/grid, custom animations using Framer Motion, and consistent HSL palettes for premium visual feel.
4. **Security & Session Persistence**: Implementing cookie-based JWT user authentication to restrict access to authorized actions (like website modifications and project deletion).
