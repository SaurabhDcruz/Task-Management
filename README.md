# Task Management Dashboard

A **production-ready React SaaS Dashboard** built for senior frontend engineers and modern teams. Inspired by Linear, Notion, Vercel, and Clerk.

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

A **fully functional**, **offline-first** task management dashboard with:
- ✨ Modern SaaS UI/UX (Tailwind CSS + Lucide Icons)
- 📊 Real analytics & charts (Recharts)
- 🔐 Secure authentication (localStorage-based)
- 🌙 Dark mode with smooth transitions
- 📱 Mobile-first responsive design
- ⚡ Performance optimized (React.memo, useMemo, useCallback)
- ♿ Accessible (ARIA, semantic HTML, keyboard navigation)
- 🚀 Production-ready code with best practices

---

## ✨ Features

### Authentication
- Email/password login with validation
- Remember me (30-day persistence)
- Show/hide password toggle
- Protected routes with automatic redirects
- Auto-logout on storage clear
- Session persistence across tabs

### Dashboard
- **Live Statistics**: Total, completed, pending tasks with trends
- **Analytics Charts**: 
  - Weekly productivity (area chart)
  - Completion trend (bar chart)
- **Recent Tasks Widget**: Last 5 tasks with status indicators
- **Activity Timeline**: Real-time user action log
- **Quick Stats**: Averages, streaks, weekly summary

### Task Management
- ✅ Create tasks with title & description
- ✏️ Edit existing tasks in-place
- 🗑️ Delete with confirmation modal
- 📋 Mark as complete/incomplete
- 🔍 Real-time search (title & description)
- 🎯 Filter (All, Completed, Pending)
- 📊 Sort (Newest, Oldest, Alphabetical)
- 🔔 Toast notifications for all actions
- 📁 Empty state with helpful message

### User Experience
- 🌙 Dark/Light mode toggle
- 🎨 Modern glassmorphism design
- ⚡ Smooth animations & transitions
- 📱 Mobile-optimized drawer sidebar
- 🔔 Notification center (UI ready)
- 👤 User profile with metadata
- 🔐 Secure session display

### Error Handling
- 🛡️ Error boundary for crash handling
- 📄 404 Not Found page
- 🚫 Unauthorized access page
- 💾 Safe JSON parsing utility
- 🧹 Input sanitization
- Graceful fallbacks for missing data

### Performance
- Code splitting with React.lazy
- Suspense boundaries
- Memoized components with React.memo
- Optimized re-renders with useMemo
- useCallback for stable function references
- Minimal bundle size (Vite)

---

## 🏗️ Architecture

### Folder Structure
```
src/
├── assets/               # Static assets
├── components/           # Reusable components
│   ├── common/          # Modal, Toast, ErrorBoundary
│   ├── forms/           # LoginForm, TaskForm
│   ├── layout/          # Sidebar, Navbar, Routes
│   └── ui/              # StatsCard, TaskList
├── contexts/            # AuthContext, ThemeContext
├── hooks/               # useLocalStorage
├── layouts/             # MainLayout
├── pages/               # Page components
│   ├── auth/           # LoginPage
│   ├── dashboard/      # DashboardPage
│   ├── tasks/          # TasksPage
│   ├── profile/        # ProfilePage
│   └── not-found/      # 404, 401 pages
├── routes/             # AppRoutes
├── services/           # storageService
├── utils/              # helpers, validation
├── constants/          # routes, design
├── data/               # mockUsers
├── App.jsx
├── main.jsx
└── index.css
```

### Data Flow
```
User Input
  ↓
Component State
  ↓
Context API
  ↓
localStorage
  ↓
Re-render (useMemo, useCallback optimized)
```

### LocalStorage Schema
```javascript
{
  auth_user: { id, name, email, role },
  auth_token: "base64_encoded_token",
  remember_me: "true|false",
  theme_mode: "light|dark",
  task_data: [{ id, title, description, completed, createdAt, updatedAt }]
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (install from [nodejs.org](https://nodejs.org))
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd TaskManagement

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser and navigate to http://localhost:5173
```

### Demo Credentials
```
Email:    admin@example.com
Password: Admin@123
```

---

## 🛠️ Development Commands

```bash
# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📚 Technology Stack

### Core
- **React 18** - UI library with hooks
- **React Router DOM 6** - Client-side routing
- **Vite** - Lightning-fast build tool

### Styling & Icons
- **Tailwind CSS 3** - Utility-first CSS
- **Lucide React** - Beautiful icon library
- **PostCSS + Autoprefixer** - CSS processing

### Data & Charts
- **Recharts 2** - React charting library
- **React Hot Toast** - Toast notifications
- **Context API** - State management

### Utilities
- **localStorage** - Browser persistence
- **Accessibility APIs** - ARIA, keyboard nav

---

## 🎨 Design System

### Colors
- **Primary**: `#4f46e5` (Indigo)
- **Success**: `#16a34a` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

### Spacing
- **xs**: 0.5rem
- **sm**: 0.75rem
- **md**: 1rem
- **lg**: 1.5rem
- **xl**: 2rem

### Typography
- **Page Title**: 3xl bold
- **Section Title**: lg semibold
- **Body**: base regular
- **Caption**: sm regular

### Shadows & Radius
- **Border Radius**: 0.75rem (md) to 1.5rem (xl)
- **Shadow**: xs to xl (elevation-based)

---

## 🔐 Security Features

### Input Protection
- **HTML Sanitization**: Strips dangerous tags
- **Safe JSON Parsing**: Graceful fallback on parse errors
- **Input Validation**: Type, length, format checks

### Storage Safety
- **localStorage Validation**: Safe error handling
- **No Sensitive Exposure**: Passwords never stored
- **Session Tokens**: Base64-encoded timestamps

### Route Protection
- **Protected Routes**: Auth guards on all pages
- **Unauthorized Redirect**: Automatic login redirect
- **Storage Event Listeners**: Multi-tab logout sync

---

## ♿ Accessibility

### WCAG Compliance
- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states on all buttons/inputs
- ✅ Color contrast ratios (WCAG AA)
- ✅ Screen reader friendly
- ✅ alt text on meaningful images

### Keyboard Support
- `Tab` - Navigate between elements
- `Shift+Tab` - Reverse navigation
- `Enter` - Activate buttons/forms
- `Escape` - Close modals
- `Space` - Toggle checkboxes

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile   | < 640px  | Single column, drawer sidebar |
| Tablet   | 640-1024px | Two columns, responsive |
| Desktop  | 1024px+ | Full layout with fixed sidebar |

---

## 🎯 Performance Optimizations

### Code Splitting
```javascript
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
```

### Component Memoization
```javascript
export default memo(TaskList);
```

### Callback Optimization
```javascript
const handleDelete = useCallback(() => { ... }, [dependency]);
```

### Memo Caching
```javascript
const stats = useMemo(() => { ... }, [tasks]);
```

---

## 📊 State Management Strategy

### Context API
- **AuthContext**: User, token, login/logout
- **ThemeContext**: Dark/light mode toggle

### Custom Hooks
- **useLocalStorage**: Persistent state hook

### Local Storage
- Automatic persistence for tasks
- Remember me functionality
- Theme preference

---

## 🚦 Future Improvements

### Phase 2
- [ ] Real backend API integration
- [ ] User authentication with JWT
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Task categories & tags

### Phase 3
- [ ] Collaborative editing
- [ ] Real-time sync (WebSocket)
- [ ] File attachments
- [ ] Comments & mentions
- [ ] Team management

### Phase 4
- [ ] Mobile apps (React Native)
- [ ] Desktop app (Electron)
- [ ] CLI tool
- [ ] Browser extension
- [ ] Voice commands

---

## 📝 Code Examples

### Creating a Task
```javascript
const handleCreateTask = (taskData) => {
  const newTask = {
    id: Date.now(),
    ...taskData,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  setTasks(prev => [newTask, ...prev]);
  toast.success('Task created');
};
```

### Dark Mode Toggle
```javascript
const { theme, toggleTheme } = useContext(ThemeContext);

<button onClick={toggleTheme}>
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>
```

### Protected Route
```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

---

## 🐛 Troubleshooting

### Tasks not persisting?
- Check browser's localStorage is enabled
- Clear browser cache and refresh
- Check browser DevTools > Application > localStorage

### Dark mode not working?
- Ensure Tailwind `darkMode: 'class'` is set
- Check if `dark` class is applied to HTML element
- Clear browser cache

### Build errors?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include steps to reproduce
4. Share browser/OS information

---

## 👨‍💻 Built By

Senior React Architect | Frontend Engineer | Product Designer

**Project Philosophy**: *Production-ready code that impresses senior engineers.*

---

**Last Updated**: June 2026 | **Version**: 1.0.0
