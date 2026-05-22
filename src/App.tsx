import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { PortfolioPage } from './pages/admin/PortfolioPage';
import { MessagesPage } from './pages/admin/MessagesPage';
import { SettingsPage } from './pages/admin/SettingsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-codecraft-dark flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-codecraft-accent-indigo/30 border-t-codecraft-accent-indigo rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/portfolio"
        element={
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;