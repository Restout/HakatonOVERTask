import { FC } from "react";

import WithAuth from "hocs/WithAuth";
import { Link } from "react-router-dom";

import {
    LK_PATHNAME,
    PROFILE_PATHNAME,
    SIGN_IN_PATH,
} from "constants/routesPathnames";

interface Props {
    className?: string;
}

const ProfileButton: FC<Props> = ({ className }) => {
    return (
        <WithAuth
            authChildren={<AuthLink className={className} />}
            unAuthChildren={<UnAuthLink className={className} />}
        />
    );
};

export default ProfileButton;

function AuthLink({ className }: { className?: string }) {
    return (
        <Link to={`/${LK_PATHNAME}/${PROFILE_PATHNAME}`} className={className}>
            Профиль
        </Link>
    );
}

function UnAuthLink({ className }: { className?: string }) {
    return (
        <Link to={SIGN_IN_PATH} className={className}>
            Войти
        </Link>
    );
}
