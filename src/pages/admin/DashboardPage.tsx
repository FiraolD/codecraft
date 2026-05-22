import { Link } from 'react-router-dom';
import { FolderOpen, MessageSquare, ArrowRight, TrendingUp } from 'lucide-react';
import { useProjects, useMessages } from '../../hooks/useData';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function DashboardPage() {
  const { projects } = useProjects();
  const { messages } = useMessages();

  const unreadMessages = messages.filter((m) => !m.read).length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's an overview of your content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={FolderOpen}
            label="Total Projects"
            value={projects.length.toString()}
            subtext={`${publishedProjects} published`}
            href="/admin/portfolio"
            color="indigo"
          />
          <StatCard
            icon={MessageSquare}
            label="Total Messages"
            value={messages.length.toString()}
            subtext={`${unreadMessages} unread`}
            href="/admin/messages"
            color="violet"
          />
          <StatCard
            icon={TrendingUp}
            label="Quick Actions"
            value="3"
            subtext="Manage your content"
            href="/admin/portfolio"
            color="cyan"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
              <Link
                to="/admin/portfolio"
                className="text-sm text-codecraft-accent-indigo hover:text-codecraft-accent-indigo/80 transition-colors flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {projects.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No projects yet. Create your first one!</p>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center gap-4 p-3 bg-codecraft-dark rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-gradient-linear flex items-center justify-center flex-shrink-0">
                      <FolderOpen size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{project.title}</p>
                      <p className="text-sm text-slate-500 capitalize">{project.category}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        project.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Messages */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Recent Messages</h2>
              <Link
                to="/admin/messages"
                className="text-sm text-codecraft-accent-violet hover:text-codecraft-accent-violet/80 transition-colors flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {messages.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.slice(0, 3).map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 bg-codecraft-dark rounded-xl ${!message.read ? 'border-l-2 border-codecraft-accent-indigo' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-white">{message.name}</p>
                        <p className="text-sm text-slate-500">{message.email}</p>
                      </div>
                      {!message.read && (
                        <span className="px-2 py-1 text-xs bg-codecraft-accent-indigo/20 text-codecraft-accent-indigo rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{message.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  href,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  href: string;
  color: 'indigo' | 'violet' | 'cyan';
}) {
  const colorClasses = {
    indigo: 'bg-codecraft-accent-indigo',
    violet: 'bg-codecraft-accent-violet',
    cyan: 'bg-codecraft-accent-cyan',
  };

  return (
    <div className="glass-card p-6">
      <Link to={href} className="block">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
            <Icon size={24} className="text-white" />
          </div>
          <ArrowRight size={18} className="text-slate-500" />
        </div>
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <p className="text-3xl font-bold gradient-text mb-1">{value}</p>
        <p className="text-xs text-slate-500">{subtext}</p>
      </Link>
    </div>
  );
}