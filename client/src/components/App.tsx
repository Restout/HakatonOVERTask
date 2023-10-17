import { FC } from "react";

import AppProvider from "./AppProvider";
import { Router } from "./Router";

const App: FC = () => {
    return (
        <AppProvider>
            <Router />
        </AppProvider>
    );
};

export default App;
