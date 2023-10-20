import { FC, ReactNode } from "react";

import { useAuth } from "hooks/auth/useAuth";

import { Role } from "constants/role.enum";

interface Props {
    authChildren: ReactNode;
    unAuthChildren: ReactNode;
    allowedRoles?: Role[];
}

const WithAuth: FC<Props> = ({
    authChildren,
    unAuthChildren,
    allowedRoles,
}) => {
    const { isAuth, role } = useAuth();

    if (isAuth) {
        if (role && allowedRoles && allowedRoles.includes(role)) {
            return <>{authChildren}</>;
        } else if (allowedRoles) {
            return <>{unAuthChildren}</>;
        }
        return <>{authChildren}</>;
    }

    return <>{unAuthChildren}</>;
};

export default WithAuth;
