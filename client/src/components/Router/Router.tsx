import { FC } from "react";

import { Route, Routes } from "react-router-dom";

import { FullUserPage } from "pages/(admin)/FullUserPage";
import { SignInPage } from "pages/(auth)/SignInPage";
import { SignUpPage } from "pages/(auth)/SignUpPage";
import { BidsPage } from "pages/(bids)/BidsPage";
import { FullBidPage } from "pages/(bids)/FullBidPage";
import { GroupsPage } from "pages/(schedule)/GroupsPage";
import { SchedulePage } from "pages/(schedule)/SchedulePage";
import { HomePage } from "pages/HomePage";
import { MissingPage } from "pages/MissingPage";

import { Bids } from "components/bids/Bids";
import { AdminLayout } from "components/layouts/AdminLayout";
import { MainLayout } from "components/layouts/MainLayout";
import { NewsCreation } from "components/news/NewsCreation";
import { Users } from "components/users/Users";

import {
    ADMIN_PATH,
    BIDS_PATH,
    CREATE_COURSES_PATH,
    CREATE_NEWS_PATH,
    HOME_PATH,
    MISSING_PATH,
    SCHEDULE_PATH,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    USERS_PATH,
} from "constants/routesPathnames";

const Router: FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={HOME_PATH} element={<HomePage />} />
                <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
                <Route path={SIGN_IN_PATH} element={<SignInPage />} />
                <Route path={SCHEDULE_PATH} element={<GroupsPage />} />

                <Route path={ADMIN_PATH} element={<AdminLayout />}>
                    <Route path={BIDS_PATH} element={<Bids />} />
                    <Route path={USERS_PATH} element={<Users />} />
                    <Route
                        path={`${ADMIN_PATH}/${USERS_PATH}/:userId`}
                        element={<FullUserPage />}
                    />
                    <Route path={CREATE_NEWS_PATH} element={<NewsCreation />} />
                    <Route path={CREATE_COURSES_PATH} />
                </Route>

                <Route
                    path={`${SCHEDULE_PATH}/:groupId`}
                    element={<SchedulePage />}
                />
                <Route path={BIDS_PATH} element={<BidsPage />} />
                <Route
                    path={`/${BIDS_PATH}/:bidId`}
                    element={<FullBidPage />}
                />
                <Route path={MISSING_PATH} element={<MissingPage />} />
            </Route>
        </Routes>
    );
};

export default Router;
