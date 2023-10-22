import { FC } from "react";

import { Route, Routes } from "react-router-dom";

import { FullUserPage } from "pages/(admin)/FullUserPage";
import { SignInPage } from "pages/(auth)/SignInPage";
import { SignUpPage } from "pages/(auth)/SignUpPage";
import { BidsPage } from "pages/(bids)/BidsPage";
import { FullBidPage } from "pages/(bids)/FullBidPage";
import { AnswerPage } from "pages/(courses)/AnswerPage";
import { CoursesPage } from "pages/(courses)/CoursesPage";
import { FullCoursePage } from "pages/(courses)/FullCoursePage";
import { ProgramPage } from "pages/(courses)/ProgramPage";
import { GroupsPage } from "pages/(schedule)/GroupsPage";
import { SchedulePage } from "pages/(schedule)/SchedulePage";
import { HomePage } from "pages/HomePage";
import { MissingPage } from "pages/MissingPage";

import { AdminBids } from "components/bids/AdminBids";
import { AdminCourses } from "components/courses/AdminCourses";
import { MainLayout } from "components/layouts/MainLayout";
import { SubNavLayout } from "components/layouts/SubNavLayout";
import { AdminNews } from "components/news/AdminNews";
import { AdminUsers } from "components/users/AdminUsers";
import { Profile } from "components/users/Profile";
import { ProfileBids } from "components/users/ProfileBids";
import { ProfileCourses } from "components/users/ProfileCourses";
import { ProfileSubjects } from "components/users/ProfileSubjects";

import { Role } from "constants/role.enum";
import {
    ADMIN_PATHNAME,
    ANSWER_PATHNAME,
    BIDS_PATHNAME,
    COURSES_PATHNAME,
    HOME_PATH,
    LK_PATHNAME,
    MISSING_PATH,
    NEWS_PATHNAME,
    PROFILE_BIDS_PATHNAME,
    PROFILE_COURSES_PATHNAME,
    PROFILE_PATHNAME,
    PROFILE_SUBJECTS_PATHNAME,
    PROGRAM_PATHNAME,
    SCHEDULE_PATHNAME,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    USERS_PATHNAME,
} from "constants/routesPathnames";

import ProtectedRoutes from "./ProtectedRoutes";
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

                {/* ========== COURSES ============= */}
                <Route
                    path={"/" + COURSES_PATHNAME}
                    element={<CoursesPage />}
                />
                <Route
                    path={`/${COURSES_PATHNAME}/:courseId`}
                    element={<FullCoursePage />}
                />

                {/* ========== Program ============= */}
                <Route
                    element={
                        <ProtectedRoutes
                            allowedRoles={[
                                Role.STUDENT,
                                Role.SUPERVISOR,
                                Role.ADMIN,
                                Role.TEACHER,
                            ]}
                        />
                    }
                >
                    <Route
                        path={`/${PROGRAM_PATHNAME}/:lessonId`}
                        element={<ProgramPage />}
                    />
                    <Route
                        path={`/${PROGRAM_PATHNAME}/:lessonId/${ANSWER_PATHNAME}/:taskId`}
                        element={<AnswerPage />}
                    />
                </Route>

                {/* ========== PROFILE ============= */}
                <Route element={<ProtectedRoutes />}>
                    <Route
                        path={"/" + LK_PATHNAME}
                        element={<SubNavLayout navLinks={profileSubNavLinks} />}
                    >
                        <Route path={PROFILE_PATHNAME} element={<Profile />} />
                        <Route
                            element={
                                <ProtectedRoutes
                                    allowedRoles={[Role.SUPERVISOR]}
                                />
                            }
                        >
                            <Route
                                path={PROFILE_COURSES_PATHNAME}
                                element={<ProfileCourses />}
                            />
                        </Route>
                        <Route
                            element={
                                <ProtectedRoutes
                                    allowedRoles={[Role.TEACHER, Role.STUDENT]}
                                />
                            }
                        >
                            <Route
                                path={PROFILE_SUBJECTS_PATHNAME}
                                element={<ProfileSubjects />}
                            />
                        </Route>
                        <Route
                            element={
                                <ProtectedRoutes
                                    allowedRoles={[Role.ENROLLEE]}
                                />
                            }
                        >
                            <Route
                                path={PROFILE_BIDS_PATHNAME}
                                element={<ProfileBids />}
                            />
                        </Route>
                    </Route>
                </Route>

                {/* ========== ADMIN ============= */}
                <Route
                    path={"/" + ADMIN_PATHNAME}
                    element={<ProtectedRoutes allowedRoles={[Role.ADMIN]} />}
                >
                    <Route
                        element={<SubNavLayout navLinks={adminSubNavLinks} />}
                    >
                        <Route path={BIDS_PATHNAME} element={<AdminBids />} />
                        <Route path={USERS_PATHNAME} element={<AdminUsers />} />
                        <Route
                            path={`/${ADMIN_PATHNAME}/${USERS_PATHNAME}/:userId`}
                            element={<FullUserPage />}
                        />
                        <Route path={NEWS_PATHNAME} element={<AdminNews />} />
                        <Route
                            path={COURSES_PATHNAME}
                            element={<AdminCourses />}
                        />
                    </Route>
                </Route>

                {/* ========== Bids ============= */}
                <Route
                    element={
                        <ProtectedRoutes
                            allowedRoles={[
                                Role.MANAGER,
                                Role.SELLECTION_COMMITE,
                            ]}
                        />
                    }
                >
                    <Route path={"/" + BIDS_PATHNAME} element={<BidsPage />} />
                    <Route
                        path={`/${BIDS_PATHNAME}/:bidId`}
                        element={<FullBidPage />}
                    />
                </Route>

                {/* ========== Auth ============= */}
                <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
                <Route path={SIGN_IN_PATH} element={<SignInPage />} />

                <Route path={MISSING_PATH} element={<MissingPage />} />
            </Route>
        </Routes>
    );
};

export default Router;
