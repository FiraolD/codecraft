# CodeCraft - Company Website & CMS Specification

## 1. Concept & Vision

CodeCraft is a premium technology services company website that embodies innovation, precision, and cutting-edge excellence. The experience feels like stepping into a high-tech command center—sophisticated dark interfaces with vibrant accent glows, seamless animations that communicate technical capability, and a sense of forward-thinking mastery. Every interaction reinforces CodeCraft's position as a elite partner for complex digital transformations.

## 2. Design Language

### Aesthetic Direction
**"Neon Cyberpunk meets Corporate Elegance"** — A dark, immersive environment punctuated by electric gradient accents. Glassmorphism panels float over subtle grid patterns, while smooth micro-interactions create a sense of responsive intelligence. Think Bloomberg Terminal meets Tron.

### Color Palette
- **Primary Dark**: `#0a0a0f` (Deep void black)
- **Secondary Dark**: `#12121a` (Elevated surface)
- **Tertiary Dark**: `#1a1a26` (Cards/panels)
- **Primary Accent**: `#6366f1` (Indigo glow)
- **Secondary Accent**: `#8b5cf6` (Violet pulse)
- **Tertiary Accent**: `#06b6d4` (Cyan spark)
- **Gradient**: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#94a3b8`
- **Text Muted**: `#64748b`
- **Success**: `#22c55e`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`

### Typography
- **Headings**: `Inter`, sans-serif (700, 800 weight)
- **Body**: `Inter`, sans-serif (400, 500 weight)
- **Monospace**: `JetBrains Mono` (for code snippets)
- **Scale**: 14px base, 1.5 line-height, modular scale 1.25

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Container max-width: 1280px
- Section padding: 96px vertical (desktop), 64px (tablet), 48px (mobile)
- Card padding: 24px
- Border radius: 8px (small), 12px (medium), 16px (large), 24px (cards)

### Motion Philosophy
- **Page transitions**: Fade + subtle scale (300ms ease-out)
- **Scroll reveals**: Staggered fade-up (400ms ease-out, 100ms stagger)
- **Hover states**: Scale 1.02 + shadow lift (200ms ease-out)
- **Button interactions**: Subtle gradient shift + glow pulse
- **Loading states**: Pulsing gradient shimmer
- **Micro-interactions**: Spring physics feel (cubic-bezier(0.34, 1.56, 0.64, 1))

### Visual Assets
- **Icons**: Lucide React (consistent 24px, 1.5px stroke)
- **Decorative**: CSS gradient orbs, subtle grid patterns, glow effects
- **Images**: Abstract tech imagery, gradient meshes
- **Background**: Radial gradient orbs with subtle blur, grid overlay pattern

## 3. Layout & Structure

### Public Website

#### Navigation (Fixed, Glassmorphism)
- Logo: "CodeCraft" wordmark with gradient text
- Links: Services, Portfolio, About, Contact
- CTA: "Get Started" button with gradient border
- Mobile: Hamburger menu with full-screen overlay

#### Hero Section
- Large gradient text headline with animated typing effect
- Subheadline describing core services
- Dual CTAs: "View Our Work" (primary), "Start a Project" (secondary outline)
- Floating gradient orbs in background
- Subtle grid pattern overlay

#### Services Section
- Section title with gradient accent underline
- 3 main service cards in responsive grid:
  1. Web & Systems Development
  2. AI Automation
  3. Data Engineering & Analytics
- Each card: Icon, title, description, "Learn More" link
- Glassmorphism card design with hover glow effect

#### Portfolio Section
- Filterable grid of project cards
- Categories: All, Web Development, AI Projects, Data Engineering
- Project cards: Thumbnail, title, tech stack tags, hover overlay with details
- "View All Projects" CTA
- Admin-managed content

#### About Section
- Split layout: Content left, visual accent right
- Company mission statement
- Key statistics (projects completed, clients served, etc.)
- Gradient accent line separators

#### Testimonials Section
- Carousel of client testimonials
- Client avatar, quote, name, company
- Auto-rotation with manual controls

#### Contact Section
- Split layout: Contact form left, contact info right
- Form fields: Name, Email, Service Interest (dropdown), Message
- Form validation with inline error states
- Contact info: Email, phone, location, social links
- Gradient submit button

#### Footer
- Logo and tagline
- Quick links columns
- Social media icons
- Newsletter signup
- Copyright and legal links

### Admin CMS Dashboard

#### Authentication
- Login page with email/password
- Remember me option
- Forgot password link (UI only for MVP)

#### Dashboard Home
- Overview statistics cards:
  - Total Projects
  - Total Messages
  - Quick Actions
- Recent messages list
- Recent projects quick edit

#### Portfolio Management
- Projects list table with:
  - Thumbnail, title, category, status, date
  - Actions: Edit, Delete, Toggle Visibility
- Add/Edit Project modal:
  - Title, description, full content
  - Category selection
  - Tech stack tags (multi-select)
  - Image upload
  - Project URL
  - Featured toggle
  - Status (Draft/Published)

#### Messages Management
- Messages list with:
  - Sender info, service interest, date
  - Read/Unread status
  - Actions: View, Mark Read, Delete
- Message detail view in modal

#### Settings (Basic)
- Company info form (for future expansion)
- Admin profile management

## 4. Features & Interactions

### Public Website Features

#### Smooth Scroll Navigation
- Click nav links → smooth scroll to sections
- Active section highlighted in nav

#### Portfolio Filtering
- Click filter → animated grid reflow
- Smooth fade transitions between states

#### Contact Form
- Real-time validation (email format, required fields)
- Submit → loading state → success/error toast
- Data stored in Supabase

#### Scroll Animations
- Elements animate in on scroll (Intersection Observer)
- Staggered reveals for lists and grids

### Admin CMS Features

#### Authentication Flow
- Login → validate credentials → set session
- Protected routes redirect to login
- Session persistence via localStorage

#### CRUD Operations
- Add/Edit/Delete portfolio projects
- Real-time UI updates
- Optimistic updates with rollback on error

#### Image Upload
- Drag & drop zone
- Preview before upload
- Upload to Supabase Storage

#### Toast Notifications
- Success: Green with check icon
- Error: Red with X icon
- Auto-dismiss after 4 seconds

### Edge Cases & Error Handling
- Empty portfolio: "No projects yet" placeholder
- Form errors: Inline validation messages
- API errors: Toast notification with retry option
- Network offline: Graceful degradation message
- Loading states: Skeleton loaders for content
- 404: Custom not found page for admin

## 5. Component Inventory

### Navigation
- **Default**: Semi-transparent dark, blur backdrop
- **Scrolled**: Slightly more opaque with shadow
- **Mobile Open**: Full-screen overlay, centered links

### Button (Primary)
- **Default**: Gradient background, white text, shadow
- **Hover**: Glow intensity increase, subtle scale
- **Active**: Pressed effect (scale 0.98)
- **Disabled**: Reduced opacity, no pointer
- **Loading**: Spinner icon, disabled interaction

### Button (Outline)
- **Default**: Transparent bg, gradient border, gradient text
- **Hover**: Gradient fill at 10% opacity
- **Active**: Pressed effect

### Card (Service)
- **Default**: Glass effect bg, subtle border, shadow
- **Hover**: Border glow, lift effect, icon pulse

### Card (Portfolio Project)
- **Default**: Image thumbnail, overlay gradient bottom
- **Hover**: Image scale, full overlay with details

### Form Input
- **Default**: Dark bg, subtle border, placeholder text
- **Focus**: Gradient border glow, label float
- **Error**: Red border, error message below
- **Disabled**: Reduced opacity

### Modal
- **Overlay**: Dark semi-transparent with blur
- **Content**: Slide up + fade in animation
- **Close**: X button top right, click outside to close

### Toast
- **Success**: Green left border, check icon
- **Error**: Red left border, X icon
- **Position**: Top-right, stacked with gap

### Table (Admin)
- **Header**: Sticky, darker bg
- **Rows**: Hover highlight
- **Actions**: Icon buttons with tooltips

### Skeleton Loader
- **Style**: Gradient shimmer animation
- **Shape**: Match actual content dimensions

## 6. Technical Approach

### Frontend Architecture
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom configuration
- **Routing**: React Router v6
- **State**: React Context for auth + local component state
- **HTTP**: Fetch API with custom hooks
- **Icons**: Lucide React

### Backend/Database
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth (email/password)
- **Storage**: Supabase Storage (for portfolio images)

### Data Models

#### Portfolio Project
```typescript
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: 'web' | 'ai' | 'data';
  tech_stack: string[];
  thumbnail_url: string;
  project_url?: string;
  featured: boolean;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}
```

#### Contact Message
```typescript
interface Message {
  id: string;
  name: string;
  email: string;
  service_interest: string;
  message: string;
  read: boolean;
  created_at: string;
}
```

### API Endpoints (via Supabase)
- `GET /projects` - List all published projects
- `GET /projects/:slug` - Get single project
- `POST /projects` - Create project (admin)
- `PUT /projects/:id` - Update project (admin)
- `DELETE /projects/:id` - Delete project (admin)
- `GET /messages` - List messages (admin)
- `POST /messages` - Submit contact form
- `PUT /messages/:id` - Mark as read (admin)

### Route Structure
```
/                    - Public homepage
/admin               - Admin dashboard (protected)
/admin/login         - Admin login
/admin/portfolio     - Portfolio management (protected)
/admin/messages      - Messages management (protected)
/admin/settings      - Settings (protected)
```

### Security
- Admin routes protected by auth check
- Row Level Security on Supabase tables
- Admin role stored in user metadata
- Session tokens in localStorage (MVP scope)

### Performance Considerations
- Lazy loading for routes
- Image optimization via Supabase
- Code splitting for admin routes
- Memoization for expensive renders