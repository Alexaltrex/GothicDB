import React from "react";
import style from "./CurrentReligion.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {religionsApi} from "../../api/religions.api";
import {IReligion} from "../../types/religion.type";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {AxiosError} from "axios";
import {Title} from "../X_common/Title/Title";
import {ICharacter} from "../../types/characters.types";
import {charactersApi} from "../../api/characters.api";
import Divider from "@mui/material/Divider";
import {Member} from "../X_common/Member/Member";

export const CurrentReligionPage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoadingReligion,
        isError: isErrorReligion,
        error: errorReligion,
        data: religion,
    } = useQuery<IReligion, AxiosError>(
        ["religion", id],
        () => religionsApi.getById(id as string),
    );

    const {
        isLoading: isLoadingMembers,
        isError: isErrorMembers,
        error: errorMembers,
        data: members,
    } = useQuery<ICharacter[], AxiosError>(
        ["membersOfReligion", id],
        () => charactersApi.getList((religion as IReligion).memberIds),
        {
            enabled: Boolean(religion?.memberIds) && Boolean(religion?.memberIds.length)
        }
    )

    return (
        <div className={style.currentReligion}>
            <ErrorWrapper isLoading={isLoadingReligion || isLoadingMembers}
                          isError={isErrorReligion || isErrorMembers}
                          error={isErrorReligion ? errorReligion : errorMembers}
            >
                {
                    religion && (
                        <>
                            <Title title={religion.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{religion.name}</p>
                                    <p className={style.description}>{religion.description}</p>
                                    <img src={religion.img.large} alt=""/>
                                </div>
                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{religion.description}</p>
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