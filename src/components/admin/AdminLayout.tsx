import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, MessageSquare, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FolderOpen, label: 'Portfolio', href: '/admin/portfolio' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-codecraft-dark flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-codecraft-dark-1 border-r border-white/5 flex flex-col transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-linear flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold">
                <span className="text-white">Code</span>
                <span className="gradient-text">Craft</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-linear text-white'
                    : 'text-slate-400 hover:text-white hover:bg-codecraft-dark-2'
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle & Logout */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-codecraft-dark-2 transition-all duration-200"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!isCollapsed && <span className="font-medium">Collapse</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}