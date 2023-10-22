import { FC } from "react";

import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { useAuth } from "hooks/auth/useAuth";

import { Role } from "constants/role.enum";
import { SIGN_IN_PATH } from "constants/routesPathnames";

interface Props {
    allowedRoles?: Role[];
}

const ProtectedRoutes: FC<Props> = ({ allowedRoles }) => {
    const { isAuth, role } = useAuth();

    if (isAuth) {
        if (role && allowedRoles && allowedRoles.includes(role)) {
            return <Outlet />;
        } else if (allowedRoles) {
            return <Navigate to={SIGN_IN_PATH} />;
        }
        return <Outlet />;
    }

    return <Navigate to={SIGN_IN_PATH} />;
};

export default ProtectedRoutes;
