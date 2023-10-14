import { FC } from "react";

import { HOME_PATH, MISSING_PATH } from "constants/routesPathnames";
import { Route, Routes } from "react-router-dom";

import { HomePage } from "pages/HomePage";
import { MissingPage } from "pages/MissingPage";

const Router: FC = () => {
    return (
        <Routes>
            <Route path={HOME_PATH} element={<HomePage />} />
            <Route path={MISSING_PATH} element={<MissingPage />} />
        </Routes>
    );
};

export default Router;
