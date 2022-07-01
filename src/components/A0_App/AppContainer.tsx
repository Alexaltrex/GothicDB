import App from "./App";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../../store/store";
import {HashRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from "../../theme/theme";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        },
        mutations: {
            retry: 1
        }
    }
});

export const AppContainer = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <HashRouter>
                        <App/>
                    </HashRouter>
                </Provider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}