import React from "react";
import style from "./LocationsPage.module.scss";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {ILocation} from "../../types/locations.types";
import {locationsApi} from "../../api/locations.api";
import {ErrorBlock} from "../X_common/ErrorBlock/ErrorBlock";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {CardLink} from "../X_common/CardLink/CardLink";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";

export const LocationsPage = () => {
    const {
        isLoading,
        isError,
        error,
        data: locations,
    } = useQuery<ILocation[], AxiosError>(
        "locations",
        () => locationsApi.getAll(),
    );

    return (
        <div className={style.locationsPage}>
            <ErrorWrapper isLoading={isLoading} isError={isError} error={error}>
                <Title title="Локации"/>

                {
                    locations && (
                        <>
                            <div className={style.infoBlock}>
                                <p className={style.count}>Всего: {locations.length}</p>
                            </div>
                            <Divider className={style.divider}/>

                            <div className={style.cards}>
                                <div className={style.inner}>
                                    {
                                        locations.map(location => (
                                            <CardLink key={location.id}
                                                      label={location.name}
                                                      to={`/location/${location.id}`}
                                                      img={location.image.large}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </ErrorWrapper>
        </div>
    )
}