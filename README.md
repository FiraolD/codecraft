# 🚀 CodeCraft Solutions

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
</div>

<br />

**CodeCraft** is a premium technology services company website that embodies innovation, precision, and cutting-edge excellence. The experience feels like stepping into a high-tech command center—sophisticated dark interfaces with vibrant accent glows, seamless animations that communicate technical capability, and a sense of forward-thinking mastery.

**[🌐 Live Demo](https://codecraft-six-psi.vercel.app)**

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 Design Philosophy](#-design-philosophy)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📦 Deployment](#-deployment)
- [🗄️ Database Schema](#️-database-schema)
- [🔐 Environment Variables](#-environment-variables)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🏠 Public Website
- **Immersive Hero Section** – Animated typing effect with gradient text
- **Service Showcase** – Three core service cards with hover effects
- **Dynamic Portfolio** – Filterable project grid with category tabs
- **Client Testimonials** – Auto-rotating carousel with manual controls
- **Contact Form** – Real-time validation with Supabase integration
- **Smooth Animations** – Scroll reveals, staggered entries, and micro-interactions
- **Responsive Design** – Mobile-first approach with glassmorphism UI

### 🔐 Admin CMS Dashboard
- **Secure Authentication** – Supabase Auth with admin role verification
- **Dashboard Overview** – Statistics cards and recent activity feed
- **Portfolio Management** – Full CRUD operations with image upload
- **Messages Management** – Read/unread status with email reply integration
- **Image Compression** – Automatic client-side compression for fast uploads
- **Real-time Updates** – Instant UI updates with optimistic rendering

### 🎨 Design System
- **Neon Cyberpunk meets Corporate Elegance** – Dark immersive environment
- **Glassmorphism** – Frosted glass panels with backdrop blur
- **Gradient Accents** – Indigo, violet, and cyan gradients throughout
- **Micro-interactions** – Spring physics and smooth transitions
- **Custom Animations** – Float, glow-pulse, fade-up, and shimmer effects

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework with hooks and concurrent features |
| **TypeScript** | Type-safe JavaScript for better maintainability |
| **Vite** | Lightning-fast build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework with custom theme |
| **React Router v6** | Client-side routing with protected routes |
| **Lucide React** | Beautiful, consistent icon set |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **Supabase** | Backend-as-a-Service (PostgreSQL + Auth + Storage) |
| **PostgreSQL** | Relational database with Row Level Security (RLS) |
| **Supabase Auth** | Email/password authentication with admin roles |
| **Supabase Storage** | Image hosting for portfolio thumbnails |

### Libraries & Tools
| Library | Purpose |
|---------|---------|
| **react-hook-form** | Form handling with validation |
| **zod** | Schema validation for forms |
| **browser-image-compression** | Client-side image optimization |
| **react-router-dom** | Navigation and routing |
| **tailwind-merge** | Utility for merging Tailwind classes |
| **clsx** | Conditional className construction |
| **date-fns** | Date formatting utilities |

---

## 🎨 Design Philosophy

### Color Palette
```
Primary Dark:     #0a0a0f   (Deep void black)
Secondary Dark:   #12121a   (Elevated surface)
Tertiary Dark:    #1a1a26   (Cards/panels)
Primary Accent:   #6366f1   (Indigo glow)
Secondary Accent: #8b5cf6   (Violet pulse)
Tertiary Accent:  #06b6d4   (Cyan spark)
Gradient:         135deg from #6366f1 → #8b5cf6 → #06b6d4
Text Primary:     #ffffff
Text Secondary:   #94a3b8
Text Muted:       #64748b
```

### Typography
- **Headings:** Inter, 700–800 weight
- **Body:** Inter, 400–500 weight
- **Monospace:** JetBrains Mono (for code snippets)

### Motion
- **Page transitions:** Fade + subtle scale (300ms ease-out)
- **Scroll reveals:** Staggered fade-up (400ms ease-out, 100ms stagger)
- **Hover states:** Scale 1.02 + shadow lift (200ms ease-out)
- **Loading states:** Pulsing gradient shimmer

---

## 📁 Project Structure

```
codecraft/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLayout.tsx         # Admin sidebar layout
│   │   │   └── [admin components]
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Main navigation
│   │   │   └── Footer.tsx              # Site footer
│   │   ├── public/
│   │   │   ├── Hero.tsx                # Animated hero section
│   │   │   ├── Services.tsx            # Service cards
│   │   │   ├── Portfolio.tsx           # Project grid with filtering
│   │   │   ├── About.tsx               # Company info & stats
│   │   │   ├── Testimonials.tsx        # Client testimonials carousel
│   │   │   ├── Contact.tsx             # Contact form
│   │   │   └── GlowOrbs.tsx            # Background glow effects
│   │   └── ErrorBoundary.tsx           # React error boundary
│   ├── hooks/
│   │   ├── useAuth.tsx                 # Authentication context
│   │   ├── useData.ts                  # Supabase data fetching
│   │   └── useIntersectionObserver.ts  # Scroll animation trigger
│   ├── lib/
│   │   ├── supabase.ts                 # Supabase client config
│   │   └── utils.ts                    # Utility functions (cn)
│   ├── pages/
│   │   ├── HomePage.tsx               # Public homepage
│   │   └── admin/
│   │       ├── LoginPage.tsx           # Admin login
│   │       ├── DashboardPage.tsx       # Admin dashboard
│   │       ├── PortfolioPage.tsx       # Portfolio management
│   │       ├── MessagesPage.tsx        # Message management
│   │       └── SettingsPage.tsx        # Settings (placeholder)
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces
│   ├── App.tsx                         # Main app with routing
│   ├── main.tsx                        # Entry point
│   └── index.css                       # Global styles
├── public/
│   └── assets/                         # Static assets
├── .env.example                         # Environment variables template
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.js                   # Tailwind configuration
├── vite.config.ts                       # Vite configuration
└── vercel.json                          # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ or 20+
- **pnpm** (recommended) or npm
- **Supabase** account (free tier works)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/FiraolD/codecraft.git
cd codecraft
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Build for production**
```bash
pnpm build
# or
npm run build
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import your repository on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select your GitHub repository

3. **Add environment variables**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Deploy to Netlify

1. **Connect your GitHub repository**
2. **Set build settings:**
   - Build command: `pnpm build` or `npm run build`
   - Publish directory: `dist`
3. **Add environment variables**
4. **Deploy**

---

## 🗄️ Database Schema

Run these migrations in your Supabase SQL Editor:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('web', 'ai', 'data')) NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT NOT NULL,
  project_url TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Helper function for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM admin_users
    WHERE user_id = auth.uid()
  );
END;
$$;

-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public can view published projects
CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

-- Admins have full access to projects
CREATE POLICY "Admins have full access to projects" ON projects
  USING (is_admin());

-- Anyone can submit a message
CREATE POLICY "Anyone can submit a message" ON messages
  FOR INSERT WITH CHECK (true);

-- Admins can manage messages
CREATE POLICY "Admins can manage messages" ON messages
  USING (is_admin());

-- Admin checks
CREATE POLICY "Enable admin checks" ON admin_users
  FOR SELECT USING (is_admin());
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | ✅ Yes |

---

## 📸 Screenshots

### Homepage
- Hero section with animated typing effect
- Services showcase with glassmorphism cards
- Filterable portfolio grid
- Testimonials carousel
- Contact form with validation

### Admin Dashboard
- Overview statistics
- Recent projects and messages
- Portfolio CRUD with image upload
- Message management with read/unread status

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Supabase** for the amazing backend platform
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Vercel** for the seamless deployment experience

---

## 📞 Support

For support, email hello@codecraft.dev or open an issue in the repository.

---

<div align="center">
  Made with ❤️ by the CodeCraft Team
</div>
