import { FC } from "react";

import { Route, Routes } from "react-router-dom";

import { SignInPage } from "pages/(auth)/SignInPage";
import { SignUpPage } from "pages/(auth)/SignUpPage";
import { GroupsPage } from "pages/(schedule)/GroupsPage";
import { SchedulePage } from "pages/(schedule)/SchedulePage";
import { HomePage } from "pages/HomePage";
import { MissingPage } from "pages/MissingPage";
import { RoomPage } from "pages/RoomPage";
import { GroupsListPage } from "pages/GroupsListPage";
import { GroupDetailsPage } from "pages/GroupDetailsPage";
import { RoomsPage } from "pages/RoomsPage";

import { MainLayout } from "components/layouts/MainLayout";
import { SubNavLayout } from "components/layouts/SubNavLayout";
import { Profile } from "components/users/Profile";

import { Role } from "constants/role.enum";
import {
    GROUP_DETAILS_PATH,
    GROUPS_PATH,
    HOME_PATH,
    LK_PATHNAME,
    PROFILE_PATHNAME,
    ROOM_PATH,
    ROOMS_PATH,
    SCHEDULE_PATHNAME,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
} from "constants/routesPathnames";

import ProtectedRoutes from "./ProtectedRoutes";
import { profileSubNavLinks } from "./router.data";

const Router: FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={HOME_PATH} element={<HomePage />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path={ROOM_PATH} element={<RoomPage />} />
                    <Route path={ROOMS_PATH} element={<RoomsPage />} />
                    <Route path={GROUPS_PATH} element={<GroupsListPage />} />
                    <Route path={GROUP_DETAILS_PATH} element={<GroupDetailsPage />} />
                </Route>

                <Route
                    path={"/" + SCHEDULE_PATHNAME}
                    element={<GroupsPage />}
                />
                <Route
                    path={`/${SCHEDULE_PATHNAME}/:groupId`}
                    element={<SchedulePage />}
                />

                {/* ========== PROFILE ============= */}
                <Route element={<ProtectedRoutes />}>
                    <Route
                        path={"/" + LK_PATHNAME}
                        element={<SubNavLayout navLinks={profileSubNavLinks} />}
                    >
                        <Route path={PROFILE_PATHNAME} element={<Profile />} />
                    </Route>
                </Route>

                {/* ========== Auth ============= */}
                <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
                <Route path={SIGN_IN_PATH} element={<SignInPage />} />
            </Route>
            <Route path="*" element={<MissingPage />} />
        </Routes>
    );
};

export default Router;
