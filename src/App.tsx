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
  return (
    <Router>
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
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/listings" element={<ProtectedRoute><AdminListings /></ProtectedRoute>} />
        <Route path="/admin/activity" element={<ProtectedRoute><AdminActivity /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />
        <Route path="/admin/cms" element={<ProtectedRoute><AdminCMS /></ProtectedRoute>} />
        <Route path="/admin/cms-enhanced" element={<ProtectedRoute><AdminCMSEnhanced /></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute><AdminLogs /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

        {/* User routes */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/listings" element={<ProtectedRoute><UserListings /></ProtectedRoute>} />
        <Route path="/dashboard/favorites" element={<ProtectedRoute><UserFavorites /></ProtectedRoute>} />
        <Route path="/dashboard/messages" element={<ProtectedRoute><UserMessages /></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute><UserNotifications /></ProtectedRoute>} />
        <Route path="/dashboard/payments" element={<ProtectedRoute><UserPayments /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
        <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
