import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-9xl font-bold text-slate-900 dark:text-slate-50 mb-2">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Page not found</h2>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-400">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <Link
          to={ROUTES.dashboard}
          className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3 font-medium"
        >
          <Home className="w-5 h-5" />
          Go home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
