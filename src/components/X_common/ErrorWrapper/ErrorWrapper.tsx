import React, {FC} from "react";
import {AxiosError} from "axios";
import {ErrorBlock} from "../ErrorBlock/ErrorBlock";
import {LinearPreloader} from "../LinearPreloader/LinearPreloader";

interface IErrorWrapper {
    isLoading: boolean
    isError: boolean
    error: AxiosError | null
    children: any
}

export const ErrorWrapper: FC<IErrorWrapper> = ({
                                                    isLoading,
                                                    isError,
                                                    error,
                                                    children
                                                }) => {
    return (
        <>
            {
                isError ? (
                    <ErrorBlock error={error as AxiosError}/>
                ) : (
                    <>
                        {isLoading && <LinearPreloader/>}
                        {children}
                    </>
                )
            }
        </>
    )
}