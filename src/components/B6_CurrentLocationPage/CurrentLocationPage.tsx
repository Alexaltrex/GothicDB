import React from "react";
import style from "./CurrentLocationPage.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {locationsApi} from "../../api/locations.api";
import {ILocation} from "../../types/locations.types";
import {ErrorBlock} from "../X_common/ErrorBlock/ErrorBlock";
import {Title} from "../X_common/Title/Title";
import {ICharacter} from "../../types/characters.types";
import {charactersApi} from "../../api/characters.api";
import Divider from "@mui/material/Divider";
import {Member} from "../X_common/Member/Member";
import {MembersByGuild} from "./MembersByGuild/MemersByGuild";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {AxiosError} from "axios";

export const CurrentLocationPage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoadingLocation,
        isError: isErrorLocation,
        error: errorLocation,
        data: location,
    } = useQuery<ILocation, any>(
        ["location", id],
        () => locationsApi.getById(id as string),
    );

    const {
        isLoading: isLoadingMembers,
        isError: isErrorMembers,
        error: errorMembers,
        data: members,
    } = useQuery<ICharacter[], AxiosError>(
        ["membersOfLocation", id],
        () => charactersApi.getList((location as ILocation).memberIds),
        {
            enabled: Boolean(location?.memberIds) && Boolean(location?.memberIds.length)
        }
    )

    return (
        <div className={style.currentLocationPage}>
            <ErrorWrapper isLoading={isLoadingLocation || isLoadingMembers}
                          isError={isErrorLocation || isErrorMembers}
                          error={isErrorLocation ? errorLocation : errorMembers}
            >
                {
                    location && (
                        <>
                            <Title title={location.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{location.name}</p>
                                    <p className={style.description}>{location.description}</p>
                                    <img src={location.image.large} alt=""/>
                                </div>
                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{location.description}</p>
                                    </div>
                                    {
                                        members && (
                                            <>
                                                <p className={style.label}>{`Представители (${members.length})`}</p>
                                                <Divider className={style.divider}/>
                                                <div className={style.members}>
                                                    <MembersByGuild members={members}/>
                                                </div>
                                            </>
                                        )
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