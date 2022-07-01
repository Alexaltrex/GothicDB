import React from "react";
import style from "./CurrentRacePage.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {religionsApi} from "../../api/religions.api";
import {IRace} from "../../types/races.types";
import {racesApi} from "../../api/races.api";
import {ICharacter} from "../../types/characters.types";
import {charactersApi} from "../../api/characters.api";
import {IReligion} from "../../types/religion.type";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {Member} from "../X_common/Member/Member";

export const CurrentRacePage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoadingRace,
        isError: isErrorRace,
        error: errorRace,
        data: race,
    } = useQuery<IRace, AxiosError>(
        ["race", id],
        () => racesApi.getById(id as string),
    );

    const {
        isLoading: isLoadingMembers,
        isError: isErrorMembers,
        error: errorMembers,
        data: members,
    } = useQuery<ICharacter[], AxiosError>(
        ["membersOfReligion", id],
        () => charactersApi.getList((race as IRace).memberIds),
        {
            enabled: Boolean(race?.memberIds) && Boolean(race?.memberIds.length)
        }
    )

    return (
        <div className={style.currentRacePage}>
            <ErrorWrapper isLoading={isLoadingRace || isLoadingMembers}
                          isError={isErrorRace || isErrorMembers}
                          error={isErrorRace ? errorRace : errorMembers}
            >
                {
                    race && (
                        <>
                            <Title title={race.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{race.name}</p>
                                    <p className={style.description}>{race.description}</p>
                                    <img src={race.image.large} alt=""/>
                                </div>
                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{race.description}</p>
                                    </div>
                                    {
                                        members && (
                                            <>
                                                <p className={style.label}>{`Представители (${members.length})`}</p>
                                                <Divider className={style.divider}/>
                                                <div className={style.members}>
                                                    {
                                                        members.map(member => (
                                                                <Member key={member.id}
                                                                        id={member.id}
                                                                        name={member.name}
                                                                        image={{
                                                                            small: member.image.small
                                                                        }}
                                                                />
                                                            )
                                                        )
                                                    }
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