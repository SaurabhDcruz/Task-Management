import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import GuestRoute from '../components/layout/GuestRoute';
import MainLayout from '../layouts/MainLayout';

const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const TasksPage = lazy(() => import('../pages/tasks/TasksPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/not-found/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('../pages/not-found/UnauthorizedPage'));

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.login}
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.tasks} element={<TasksPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
      </Route>
      <Route path={ROUTES.unauthorized} element={<UnauthorizedPage />} />
      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={ROUTES.notFound} replace />} />
    </Routes>
  );
}

export default AppRoutes;
