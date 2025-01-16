import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { callApi, EXPRIRES_ACCESS_TOKEN } from '../services';
import Cookies from 'js-cookie';

//check token còn hạn hay không, nếu không thì về trang login, nếu có thì refresh lại token
export const MiddlewareRoute = () => {
    const logout = () => {
        localStorage.setItem('Authorise', null);
        localStorage.setItem('Avartar', null);
        localStorage.setItem('Name', null);
        localStorage.setItem('Check', null);
        localStorage.setItem('Email', null);
        localStorage.setItem('PostOfficeName', null);
        localStorage.removeItem('ExtensionNumber');
        localStorage.removeItem('ExtensionPass');
        localStorage.removeItem('loginUser');
        localStorage.removeItem('userLogin');
        Cookies.remove('client_id');
        Cookies.remove('refreshToken');
        Cookies.remove('accessToken');
        Cookies.remove('userLogin');
        sessionStorage.removeItem('_e_d_r_f');
        localStorage.removeItem('tokenExpiryTime');
    };
    const authorize = async () => {
        if (!sessionStorage.getItem('_e_d_r_f')) sessionStorage.setItem('_e_d_r_f', Cookies.get('refreshToken'));
        if (Cookies.get('accessToken') == undefined) {
            try {
                const res = await callApi.API_Token(`grant_type=refresh_token&client_id=${Cookies.get('client_id')}&refresh_token=${sessionStorage.getItem('_e_d_r_f')}`);
                if (res.data.status == 400) {
                    setIsAuthorized(false);
                    logout();
                } else {
                    const inFifteenMinutes = new Date(new Date().getTime() + EXPRIRES_ACCESS_TOKEN * 60 * 1000); // set accessToken trong cookies = 1 phút
                    Cookies.set('accessToken', res.data.access_token, { expires: inFifteenMinutes });
                    const expiryTime = new Date().getTime() + EXPRIRES_ACCESS_TOKEN * 60 * 1000; // Thời gian hết hạn tính bằng milliseconds
                    localStorage.setItem('tokenExpiryTime', expiryTime);
                    setIsAuthorized(true);
                }
            } catch (error) {
                console.log(error);
                setIsAuthorized(false);
                logout();
            }
        } else {
            setIsAuthorized(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (Cookies.get('refreshToken') || sessionStorage.getItem('_e_d_r_f')) {
            // chỉ xét trường hợp mà "refreshToken" vẫn còn trong cookies (chưa hết hạn), nếu còn thì refresh
            authorize();
        } else {
            sessionStorage.setItem('expired', 'expired');
            // quay về trang login
            setIsAuthorized(false);
            setIsLoading(false);
            logout();
        }
    }, []);

    return <Outlet />; // component của route hiện tại
};
