import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import FormGenerator from '@/pages/FormGenerator';
import Settings from '@/pages/Settings';
import Logs from '@/pages/Logs';
import Help from '@/pages/Help';
import About from '@/pages/About';
import { ROUTES } from '@/constants/routes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <PageLayout>
              <Routes>
                <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.FORM} replace />} />
                <Route path={ROUTES.FORM} element={<FormGenerator />} />
                <Route path={ROUTES.SETTINGS} element={<Settings />} />
                <Route path={ROUTES.LOGS} element={<Logs />} />
                <Route path={ROUTES.HELP} element={<Help />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">404</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Page not found</p>
      <a href={ROUTES.FORM} className="mt-4 inline-block btn-primary">
        Back to Form
      </a>
    </div>
  );
}
