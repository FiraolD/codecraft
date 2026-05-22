import { useState } from 'react';
import { Mail, Eye, Trash2, Check, X, MessageSquare } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMessages } from '../../hooks/useData';
import type { Message } from '../../types';

export function MessagesPage() {
  const { messages, loading, markAsRead, deleteMessage } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      showToast('Message marked as read', 'success');
    } catch {
      showToast('Failed to update message', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        showToast('Message deleted successfully', 'success');
        setSelectedMessage(null);
      } catch {
        showToast('Failed to delete message', 'error');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <X size={12} className="text-white" />
              </div>
            )}
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-slate-400">Manage incoming inquiries from your website</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-codecraft-accent-indigo flex items-center justify-center">
                <MessageSquare size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">{messages.length}</p>
                <p className="text-sm text-slate-500">Total</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-codecraft-accent-violet flex items-center justify-center">
                <Mail size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">
                  {messages.filter((m) => !m.read).length}
                </p>
                <p className="text-sm text-slate-500">Unread</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <Check size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">
                  {messages.filter((m) => m.read).length}
                </p>
                <p className="text-sm text-slate-500">Read</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="glass-card">
            <div className="p-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">All Messages</h2>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-codecraft-accent-indigo/30 border-t-codecraft-accent-indigo rounded-full animate-spin mx-auto" />
              </div>
            ) : messages.length === 0 ? (
              <div className="p-16 text-center">
                <Mail size={48} className="mx-auto text-slate-600 mb-4" />
                <p className="text-slate-500">No messages yet</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-white/5 ${
                      selectedMessage?.id === message.id ? 'bg-white/5' : ''
                    } ${!message.read ? 'border-l-2 border-codecraft-accent-indigo' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white truncate">{message.name}</p>
                          {!message.read && (
                            <span className="w-2 h-2 bg-codecraft-accent-indigo rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">{message.email}</p>
                        <p className="text-sm text-slate-400 mt-1 line-clamp-1">{message.message}</p>
                      </div>
                      <span className="text-xs text-slate-600 whitespace-nowrap">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="glass-card">
            {selectedMessage ? (
              <>
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Message Details</h2>
                  <div className="flex items-center gap-2">
                    {!selectedMessage.read && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                        className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-linear flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">{selectedMessage.name}</p>
                      <p className="text-sm text-slate-400">{selectedMessage.email}</p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 bg-codecraft-dark rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Service Interest</p>
                      <p className="text-sm text-white capitalize">{selectedMessage.service_interest}</p>
                    </div>
                    <div className="px-4 py-2 bg-codecraft-dark rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Received</p>
                      <p className="text-sm text-white">{formatDate(selectedMessage.created_at)}</p>
                    </div>
                    <div className="px-4 py-2 bg-codecraft-dark rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Status</p>
                      <p className={`text-sm ${selectedMessage.read ? 'text-green-400' : 'text-yellow-400'}`}>
                        {selectedMessage.read ? 'Read' : 'Unread'}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Message</p>
                    <div className="p-4 bg-codecraft-dark rounded-xl">
                      <p className="text-slate-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {/* Quick Reply */}
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: CodeCraft Inquiry`}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    Reply via Email
                  </a>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-16">
                <Eye size={48} className="text-slate-600 mb-4" />
                <p className="text-slate-500">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}