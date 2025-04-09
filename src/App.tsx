
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ItemDetail from './pages/ItemDetail';
import CategoryDetail from './pages/CategoryDetail';
import PageDetail from './pages/PageDetail';
import PostForFree from './pages/PostForFree';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import InstallPrompt from './components/InstallPrompt';
import OfflineNotification from './components/OfflineNotification';
import UpdateNotification from './components/UpdateNotification';
import { registerServiceWorker, checkForUpdate } from './utils/pwaUtils';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminListings from './pages/AdminListings';
import AdminActivity from './pages/AdminActivity';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import AdminCMS from './pages/AdminCMS';
import AdminCMSEnhanced from './pages/AdminCMSEnhanced';
import AdminLogs from './pages/AdminLogs';

// User pages
import UserDashboard from './pages/UserDashboard';
import UserListings from './pages/UserListings';
import UserFavorites from './pages/UserFavorites';
import UserMessages from './pages/UserMessages';
import UserNotifications from './pages/UserNotifications';
import UserPayments from './pages/UserPayments';
import UserProfile from './pages/UserProfile';
import UserSettings from './pages/UserSettings';
import CreateListing from './pages/CreateListing';

// Other
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Register service worker
    const registerSW = async () => {
      const registration = await registerServiceWorker();
      setServiceWorkerRegistration(registration);
      
      if (registration) {
        checkForUpdate(registration, (hasUpdate) => {
          setUpdateAvailable(hasUpdate);
        });
      }
    };
    
    if ('serviceWorker' in navigator) {
      registerSW();
    }
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <LanguageProvider>
      <Router>
        <AuthProvider>
          <InstallPrompt />
          <OfflineNotification />
          <UpdateNotification 
            updateAvailable={updateAvailable} 
            reloadPage={handleReload}
          />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
            <Route path="/category/:categorySlug" element={<CategoryDetail />} />
            <Route path="/category/:categorySlug/:subcategorySlug" element={<CategoryDetail />} />
            <Route path="/pages/:pageSlug" element={<PageDetail />} />
            <Route path="/post-for-free" element={<PostForFree />} />

            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/listings" element={<ProtectedRoute role="admin"><AdminListings /></ProtectedRoute>} />
            <Route path="/admin/activity" element={<ProtectedRoute role="admin"><AdminActivity /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/cms" element={<ProtectedRoute role="admin"><AdminCMS /></ProtectedRoute>} />
            <Route path="/admin/cms-enhanced" element={<ProtectedRoute role="admin"><AdminCMSEnhanced /></ProtectedRoute>} />
            <Route path="/admin/logs" element={<ProtectedRoute role="admin"><AdminLogs /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />

            {/* User routes */}
            <Route path="/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/listings" element={<ProtectedRoute role="user"><UserListings /></ProtectedRoute>} />
            <Route path="/dashboard/favorites" element={<ProtectedRoute role="user"><UserFavorites /></ProtectedRoute>} />
            <Route path="/dashboard/messages" element={<ProtectedRoute role="user"><UserMessages /></ProtectedRoute>} />
            <Route path="/dashboard/notifications" element={<ProtectedRoute role="user"><UserNotifications /></ProtectedRoute>} />
            <Route path="/dashboard/payments" element={<ProtectedRoute role="user"><UserPayments /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute role="user"><UserSettings /></ProtectedRoute>} />
            <Route path="/create-listing" element={<ProtectedRoute role="user"><CreateListing /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </LanguageProvider>
  );
}

export default App;
