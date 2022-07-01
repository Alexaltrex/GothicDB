import React from "react";
import style from "./ReligionsPage.module.scss";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {religionsApi} from "../../api/religions.api";
import {IReligion} from "../../types/religion.type";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {CardLink} from "../X_common/CardLink/CardLink";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";

export const ReligionsPage = () => {
    const {
        isLoading,
        isError,
        error,
        data: religions,
    } = useQuery<IReligion[], AxiosError>(
        "religions",
        () => religionsApi.getAll(),
    );

    return (
        <div className={style.religionsPage}>
            <ErrorWrapper isLoading={isLoading} isError={isError} error={error}>
                <Title title="Религии"/>

                {
                    religions && (
                        <>
                            <div className={style.infoBlock}>
                                <p className={style.count}>Всего: {religions.length}</p>
                            </div>
                            <Divider className={style.divider}/>

                            <div className={style.cards}>
                                <div className={style.inner}>
                                    {
                                        religions.map(religion => (
                                            <CardLink key={religion.id}
                                                      label={religion.name}
                                                      to={`/religion/${religion.id}`}
                                                      img={religion.img.large}
                                                      className={style.card}
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