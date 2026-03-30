import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./components/ui/Layout.jsx";
import { ScrollRestoration } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import QueueStatus from "./pages/QueueStatus.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AppointmentList from "./pages/admin/AppointmentList.jsx";
import DoctorSchedule from "./pages/admin/DoctorSchedule.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import { authService } from "./services/authService.js";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout with providers
const RouterLayout = () => {
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/booking",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute requiredRole="patient">
            <PatientDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/queue",
        element: (
          <ProtectedRoute>
            <QueueStatus />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/appointments",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AppointmentList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/schedule",
        element: (
          <ProtectedRoute requiredRole="admin">
            <DoctorSchedule />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppointmentProvider>
      <RouterProvider router={router} />
    </AppointmentProvider>
  </AuthProvider>
);
