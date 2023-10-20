import ReactDOM from "react-dom/client";

import { App } from "components/App";
import AppProvider from "components/AppProvider";

import "assets/styles/index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <AppProvider>
        <App />
    </AppProvider>,
);
