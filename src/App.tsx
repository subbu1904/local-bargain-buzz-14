
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminListings from "./pages/AdminListings";
import AdminLogs from "./pages/AdminLogs";
import UserListings from "./pages/UserListings";
import UserFavorites from "./pages/UserFavorites";
import UserMessages from "./pages/UserMessages";
import UserNotifications from "./pages/UserNotifications";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import UserPayments from "./pages/UserPayments";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import AdminActivity from "./pages/AdminActivity";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateListing from "./pages/CreateListing";
import AdminCMSEnhanced from "./pages/AdminCMSEnhanced";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected user routes */}
          <Route path="/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="/listings" element={<ProtectedRoute role="user"><UserListings /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute role="user"><UserFavorites /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute role="user"><UserMessages /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute role="user"><UserNotifications /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute role="user"><UserSettings /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute role="user"><UserPayments /></ProtectedRoute>} />
          <Route path="/listings/create" element={<ProtectedRoute role="user"><CreateListing /></ProtectedRoute>} />

          {/* Protected admin routes */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/listings" element={<ProtectedRoute role="admin"><AdminListings /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/activity" element={<ProtectedRoute role="admin"><AdminActivity /></ProtectedRoute>} />
          <Route path="/admin/logs" element={<ProtectedRoute role="admin"><AdminLogs /></ProtectedRoute>} />
          <Route path="/admin/listings/create" element={<ProtectedRoute role="admin"><CreateListing /></ProtectedRoute>} />
          <Route path="/admin/cms" element={<ProtectedRoute role="admin"><AdminCMSEnhanced /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
