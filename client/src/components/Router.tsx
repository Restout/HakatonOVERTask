import { FC } from "react";

import { Route, Routes } from "react-router-dom";

import { BidsPage } from "pages/BidsPage";
import { FullBidPage } from "pages/FullBidPage";
import { GroupsPage } from "pages/GroupsPage";
import { HomePage } from "pages/HomePage";
import { MissingPage } from "pages/MissingPage";
import { SchedulePage } from "pages/SchedulePage";
import { SignInPage } from "pages/SignInPage";
import { SignUpPage } from "pages/SignUpPage";

import {
    BIDS_PATH,
    HOME_PATH,
    MISSING_PATH,
    SCHEDULE_PATH,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
} from "constants/routesPathnames";

const Router: FC = () => {
    return (
        <Routes>
            <Route path={HOME_PATH} element={<HomePage />} />
            <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
            <Route path={SIGN_IN_PATH} element={<SignInPage />} />
            <Route path={SCHEDULE_PATH} element={<GroupsPage />} />
            <Route
                path={`${SCHEDULE_PATH}/:groupId`}
                element={<SchedulePage />}
            />
            <Route path={BIDS_PATH} element={<BidsPage />} />
            <Route path={`${BIDS_PATH}/:bidId`} element={<FullBidPage />} />
            <Route path={MISSING_PATH} element={<MissingPage />} />
        </Routes>
    );
};

export default Router;
