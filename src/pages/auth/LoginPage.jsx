import React, { useContext, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoginForm from '../../components/forms/LoginForm';
import { ROUTES } from '../../constants/routes';
import { storageService } from '../../services/storageService';

function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const remembered = useMemo(() => storageService.getRememberMe(), []);

  const from = location.state?.from?.pathname || ROUTES.dashboard;

  const handleSubmit = async (credentials) => {
    setError('');
    setLoading(true);
    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Marketing */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  Task Master
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  Manage your tasks efficiently and boost your productivity
                </p>
              </div>

              <div className="space-y-4 pt-8">
                {[
                  { title: 'Real-time sync', description: 'All changes saved instantly' },
                  { title: 'Smart filtering', description: 'Organize by status and priority' },
                  { title: 'Dark mode', description: 'Easy on the eyes, anytime' },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-50">{feature.title}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                Welcome back
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Sign in to continue to your dashboard
              </p>
            </div>

            <LoginForm onSubmit={handleSubmit} error={error} isLoading={loading} remember={remembered} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
