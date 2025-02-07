import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { isAuth } = useSelector((state) => state);
  
  // Redirect to auth if not authenticated
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  
  // Render children routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;