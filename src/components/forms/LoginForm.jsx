import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { sanitizeInput } from '../../utils/helpers';

function LoginForm({ onSubmit, isLoading, error, remember: initialRemember = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(initialRemember);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const nextErrors = {};
    const normalizedEmail = sanitizeInput(email).toLowerCase();

    if (!normalizedEmail) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ email: sanitizeInput(email).toLowerCase(), password, remember: rememberMe });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`input-field ${
              touched.email && errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-700 focus:ring-primary-500'
            }`}
            required
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {touched.email && !errors.email && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {touched.email && errors.email && (
          <div id="email-error" className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            className={`input-field pr-10 ${
              touched.password && errors.password
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-700 focus:ring-primary-500'
            }`}
            required
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            ) : (
              <Eye className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            )}
          </button>
        </div>
        {touched.password && errors.password && (
          <div id="password-error" className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            {errors.password}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-primary-600 focus:ring-primary-500 cursor-pointer"
        />
        <label htmlFor="remember" className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
          Remember me for 30 days
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 font-semibold text-lg"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Demo credentials: <span className="font-medium text-slate-900 dark:text-slate-100">admin@example.com</span> / <span className="font-medium text-slate-900 dark:text-slate-100">Admin@123</span>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
