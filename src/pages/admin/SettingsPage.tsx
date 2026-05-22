import { AdminLayout } from '../../components/admin/AdminLayout';

export function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your application settings and preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Account Settings</h2>
          <p className="text-slate-400">Account settings management coming soon...</p>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Company Information</h2>
          <p className="text-slate-400">Company information management coming soon...</p>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">API Configuration</h2>
          <p className="text-slate-400">API configuration coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
}