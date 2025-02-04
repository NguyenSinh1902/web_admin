import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const MiddlewareRoute = () => {
    const { isAuth } = useSelector((state) => state);

    if (!isAuth) {
        return null;
    }

    return <Outlet />;
};
