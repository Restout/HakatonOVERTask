import { FC } from "react";

import { Link } from "react-router-dom";

import { LK_PATHNAME, PROFILE_PATHNAME } from "constants/routesPathnames";

import styles from "./profileButton.module.scss";

interface Props {
    className?: string;
}

const ProfileButton: FC<Props> = ({ className }) => {
    return (
        <Link to={`/${LK_PATHNAME}/${PROFILE_PATHNAME}`} className={className}>
            Профиль
        </Link>
    );
};

export default ProfileButton;
