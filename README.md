# UniLoop

> Your campus, one platform. Built at 3 AM with coffee.

UniLoop is a centralized student hub for **Adamas University** that brings together events, clubs, and campus activity into one beautifully designed platform. Think of it as the social backbone of campus life — where students discover what's happening, clubs grow their communities, and no one misses a moment.

---

## What We've Built

### Core Platform
- **Landing Page** — retro paper/sketch-themed homepage with GSAP animations, floating doodle decorations, paper plane SVGs, and a live marquee ticker
- **Event Discovery** — filterable event cards with stock images, date chips, location/time metadata, and one-click registration
- **Club Directory** — browse all student clubs with member counts, tags, and join buttons
- **Activity Feed** — real-time-style updates from clubs and organizers across campus
- **Signifiya 2026** — featured flagship event with custom cover art

### Authentication System
- **Student Sign Up** — 2-step form collecting name, email, password, roll number, registration number, course, and school/department (SOET, SOBAS, SOMC, SOLACS)
- **Student Sign In** — email/password login
- **Club Sign Up** — separate registration flow for clubs with description field
- **Club Sign In** — dedicated club portal with distinct branding
- **Firebase Auth + Firestore** — all user data stored securely on Firebase with 1GB free storage

### Admin Panel
- **Admin Login** (`/admin`) — credentials stored in Firestore, changeable anytime from Firebase Console
- **Admin Dashboard** (`/admin/dashboard`) — view all students and clubs, search by name/email/roll number, filter by role, delete any account
- **Serverless Delete** — Vercel API route with Firebase Admin SDK for complete account removal

### Design & UX
- **Retro Paper Theme** — warm parchment backgrounds, sketch-style borders, hand-drawn doodle decorations, Caveat handwritten font for headings
- **Dark Mode** — full dark theme with circle-expand transition animation, every component adapts
- **Figma-style Cursor** — custom SVG arrow pointer that changes color on interactive elements
- **Side Doodles** — floating paper planes, stars, circles on left/right margins
- **GSAP Animations** — scroll-triggered reveals, parallax orbs, staggered card entrances
- **Framer Motion** — filter transitions, card hover effects, page transitions
- **Responsive** — fully mobile-friendly with hamburger menu and stacked layouts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Styling | CSS Variables + Custom Properties |
| Animations | GSAP + Framer Motion |
| Auth & Database | Firebase Auth + Cloud Firestore |
| Serverless API | Vercel Serverless Functions |
| Deployment | Vercel |
| Font | Inter (body) + Caveat (handwritten) |

---

## Project Structure

```
├── api/
│   └── delete-user.js          # Serverless function for admin user deletion
├── public/
│   ├── au_logo.png              # University logo
│   ├── coverfinal.png           # Signifiya 2026 cover art
│   └── index.html               # Entry HTML with theme preload script
├── src/
│   ├── components/
│   │   ├── admin/               # Admin login + dashboard
│   │   ├── auth/                # Student & club login/signup pages
│   │   ├── Cursor.tsx           # Figma-style SVG cursor
│   │   ├── Doodles.tsx          # Paper planes, stars, marquee
│   │   ├── ThemeToggle.tsx      # Floating dark/light toggle
│   │   ├── Hero.tsx             # Landing hero section
│   │   ├── Events.tsx           # Event cards with filters
│   │   ├── Clubs.tsx            # Club directory grid
│   │   ├── Activity.tsx         # Campus activity feed
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer + CTA
│   │   └── Icons.tsx            # 20+ custom SVG icons
│   ├── context/
│   │   ├── AuthContext.tsx       # Firebase auth state management
│   │   └── ThemeContext.tsx      # Dark/light theme management
│   ├── data/
│   │   ├── index.ts             # Events, clubs, activities data
│   │   └── iconMap.tsx          # Icon string-to-component resolver
│   ├── firebase/
│   │   └── config.ts            # Firebase initialization
│   └── styles/
│       └── global.css           # Design tokens + theme variables
├── vercel.json                  # Vercel deployment config
└── .env.example                 # Required environment variables
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Firebase project with Auth + Firestore enabled
- Vercel account (for deployment)

### Local Development

```bash
# Clone the repo
git clone https://github.com/xau-aman/uniloop.git
cd uniloop

# Install dependencies
npm install

# Create .env file with your Firebase config
cp .env.example .env
# Edit .env with your Firebase credentials

# Start dev server
npm start
```

### Environment Variables

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Admin Setup

1. Go to Firebase Console → Firestore
2. Create collection: `admin` → document: `credentials`
3. Add fields: `email` (string), `password` (string), `name` (string)
4. Login at `/admin` with those credentials

---

## Deployment

Deployed on **Vercel** with automatic CI/CD:

1. Push to `main` branch
2. Vercel auto-builds and deploys
3. Preview URLs generated for feature branches

Add the Firebase environment variables in Vercel → Settings → Environment Variables.

---

## Future Roadmap

### Phase 2 — Social Features
- [ ] Student profiles with avatar, bio, and activity history
- [ ] Club pages with posts, photos, and member lists
- [ ] Event RSVP with attendee count and waitlist
- [ ] Comments and reactions on events and posts
- [ ] Direct messaging between students

### Phase 3 — Content & Community
- [ ] Student-created posts (text, images, polls)
- [ ] Club announcements with push notifications
- [ ] Campus marketplace (buy/sell textbooks, notes)
- [ ] Lost & found board
- [ ] Anonymous confessions wall

### Phase 4 — Smart Features
- [ ] AI-powered event recommendations based on interests
- [ ] Smart club matching — suggest clubs based on course/department
- [ ] Academic calendar integration
- [ ] Attendance tracking for events
- [ ] Analytics dashboard for club admins

### Phase 5 — Scale
- [ ] Multi-college support — expand beyond Adamas
- [ ] Mobile app (React Native)
- [ ] Real-time chat with WebSockets
- [ ] Content moderation with AI
- [ ] Custom domain + PWA support

---

## UX Laws Applied

| Law | Implementation |
|---|---|
| **Hick's Law** | Minimal filter options, 2-step signup, one action per screen |
| **Fitts's Law** | Large touch targets, full-width buttons, prominent CTAs |
| **Jakob's Law** | Familiar card layouts, standard auth patterns, expected nav placement |
| **Miller's Law** | Info chunked into 3 stats, grouped cards, short descriptions |
| **Gestalt Proximity** | Related info grouped in cards, meta items clustered |
| **Von Restorff Effect** | Featured events highlighted, hand-underlined headings |
| **Aesthetic-Usability** | Polished retro design builds trust and perceived usability |
| **Progressive Disclosure** | Multi-step signup, lazy-loaded sections |

---

## Contributing

This is currently a university project. If you're from Adamas University and want to contribute, reach out!

---

## License

MIT

---

Built with love at Adamas University.
