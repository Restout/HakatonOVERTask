import { FC } from "react";

import { Route, Routes } from "react-router-dom";

import { FullUserPage } from "pages/(admin)/FullUserPage";
import { SignInPage } from "pages/(auth)/SignInPage";
import { SignUpPage } from "pages/(auth)/SignUpPage";
import { BidsPage } from "pages/(bids)/BidsPage";
import { FullBidPage } from "pages/(bids)/FullBidPage";
import { CoursesPage } from "pages/(courses)/CoursesPage";
import { FullCoursePage } from "pages/(courses)/FullCoursePage";
import { ProgramPage } from "pages/(courses)/ProgramPage";
import { TestPage } from "pages/(courses)/TestPage";
import { GroupsPage } from "pages/(schedule)/GroupsPage";
import { SchedulePage } from "pages/(schedule)/SchedulePage";
import { HomePage } from "pages/HomePage";
import { MissingPage } from "pages/MissingPage";

import { Bids } from "components/bids/Bids";
import { Answer } from "components/courses/Answer";
import { Courses } from "components/courses/Courses";
import { MainLayout } from "components/layouts/MainLayout";
import { SubNavLayout } from "components/layouts/SubNavLayout";
import { AdminNews } from "components/news/AdminNews";
import { Profile } from "components/users/Profile";
import { ProfileCourses } from "components/users/ProfileCourses";
import { Users } from "components/users/Users";

import {
    ADMIN_PATHNAME,
    ANSWER_PATHNAME,
    BIDS_PATHNAME,
    COURSES_PATHNAME,
    HOME_PATH,
    LK_PATHNAME,
    MISSING_PATH,
    NEWS_PATHNAME,
    PROFILE_COURSES_PATHNAME,
    PROFILE_PATHNAME,
    PROGRAM_PATHNAME,
    SCHEDULE_PATHNAME,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    TEST_PATHNAME,
    USERS_PATHNAME,
} from "constants/routesPathnames";

import { adminSubNavLinks, profileSubNavLinks } from "./router.data";

const Router: FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={HOME_PATH} element={<HomePage />} />
                <Route
                    path={"/" + SCHEDULE_PATHNAME}
                    element={<GroupsPage />}
                />
                <Route
                    path={`/${SCHEDULE_PATHNAME}/:groupId`}
                    element={<SchedulePage />}
                />
                <Route
                    path={"/" + COURSES_PATHNAME}
                    element={<CoursesPage />}
                />
                <Route
                    path={`/${COURSES_PATHNAME}/:courseId`}
                    element={<FullCoursePage />}
                />
                <Route
                    path={`/${COURSES_PATHNAME}/:courseId/${PROGRAM_PATHNAME}`}
                    element={<ProgramPage />}
                />
                <Route
                    path={`/${COURSES_PATHNAME}/:courseId/${PROGRAM_PATHNAME}/${TEST_PATHNAME}/:testId`}
                    element={<TestPage />}
                />
                <Route
                    path={`/${COURSES_PATHNAME}/:courseId/${PROGRAM_PATHNAME}/${ANSWER_PATHNAME}/:answerId`}
                    element={<Answer />}
                />

                <Route
                    path={"/" + LK_PATHNAME}
                    element={<SubNavLayout navLinks={profileSubNavLinks} />}
                >
                    <Route path={PROFILE_PATHNAME} element={<Profile />} />
                    <Route
                        path={PROFILE_COURSES_PATHNAME}
                        element={<ProfileCourses />}
                    />
                </Route>

                <Route
                    path={"/" + ADMIN_PATHNAME}
                    element={<SubNavLayout navLinks={adminSubNavLinks} />}
                >
                    <Route path={BIDS_PATHNAME} element={<Bids />} />
                    <Route path={USERS_PATHNAME} element={<Users />} />
                    <Route
                        path={`/${ADMIN_PATHNAME}/${USERS_PATHNAME}/:userId`}
                        element={<FullUserPage />}
                    />
                    <Route path={NEWS_PATHNAME} element={<AdminNews />} />
                    <Route path={COURSES_PATHNAME} element={<Courses />} />
                </Route>

                <Route path={"/" + BIDS_PATHNAME} element={<BidsPage />} />
                <Route
                    path={`/${BIDS_PATHNAME}/:bidId`}
                    element={<FullBidPage />}
                />

                <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
                <Route path={SIGN_IN_PATH} element={<SignInPage />} />

                <Route path={MISSING_PATH} element={<MissingPage />} />
            </Route>
        </Routes>
    );
};

export default Router;
