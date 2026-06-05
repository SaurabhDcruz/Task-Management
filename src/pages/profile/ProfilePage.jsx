import React, { useContext } from 'react';
import { Mail, Shield, Calendar, Clock } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">Profile</p>
        <h1 className="page-title">Account Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account information and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="card p-8 space-y-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-4xl flex-shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{user?.name}</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{user?.email}</p>
            <div className="mt-4 inline-flex px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <Mail className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <Shield className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-slate-600 dark:text-slate-400">Role</p>
              <p className="font-medium text-slate-900 dark:text-slate-100 capitalize">{user?.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-slate-600 dark:text-slate-400">Member Since</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-slate-600 dark:text-slate-400">Status</p>
              <p className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="card p-6 border-l-4 border-blue-500">
        <h3 className="section-title mb-2">🔒 Security Notice</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Your authentication state is stored securely in local storage. This is a demo app without a backend server.
        </p>
      </div>

      {/* Privacy Info */}
      <div className="card p-6 border-l-4 border-purple-500">
        <h3 className="section-title mb-2">📋 Your Data</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          All your tasks and preferences are stored locally in your browser. No data is sent to external servers.
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
