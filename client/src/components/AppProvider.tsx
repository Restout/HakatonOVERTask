import { FC, PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "store";

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>{children}</Provider>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default AppProvider;
