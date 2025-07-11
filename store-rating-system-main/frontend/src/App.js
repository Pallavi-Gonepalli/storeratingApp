import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute'; 
import NotFound from './pages/NotFound';

// Admin Layout & Pages
import DashboardPage from './pages/DashboardPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import AddStore from './pages/admin/AddStore';
import AddUser from './pages/admin/AddUser';
import ListStores from './pages/admin/ListStores';
import ListUsers from './pages/admin/ListUsers';
import ViewUserDetails from './pages/admin/ViewUserDetails';

// Owner/User dashboards can go here too when ready:
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        
        {/* ✅ Role-based entry point */}
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin Dashboard Layout with nested routes */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="add-store" element={<AddStore />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="list-stores" element={<ListStores />} />
          <Route path="list-users" element={<ListUsers />} />
          <Route path="user/:id" element={<ViewUserDetails />} />
        </Route>

        {/* ✅ Normal User Dashboard */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Store Owner Dashboard */}
        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
