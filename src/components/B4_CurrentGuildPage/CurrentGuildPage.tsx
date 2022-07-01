import React from "react";
import style from "./CurrentGuildPage.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {guildsApi} from "../../api/guilds.api";
import {IGuild} from "../../types/guilds.types";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {Member} from "../X_common/Member/Member";
import {AxiosError} from "axios";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {ICharacter} from "../../types/characters.types";
import {charactersApi} from "../../api/characters.api";
import {ILocation} from "../../types/locations.types";

export const CurrentGuildPage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoadingGuild,
        isError: isErrorGuild,
        error: errorGuild,
        data: guild,
    } = useQuery<IGuild, AxiosError>(
        ["guild", id],
        () => guildsApi.getById(id as string),
    );

    const {
        isLoading: isLoadingMembers,
        isError: isErrorMembers,
        error: errorMembers,
        data: members,
    } = useQuery<ICharacter[], AxiosError>(
        ["membersOfLocation", id],
        () => charactersApi.getList((guild as IGuild).memberIds),
        {
            enabled: Boolean(guild?.memberIds) && Boolean(guild?.memberIds.length)
        }
    )

    return (
        <div className={style.currentGuildPage}>
            <ErrorWrapper isLoading={isLoadingGuild || isLoadingMembers}
                          isError={isErrorGuild || isErrorMembers}
                          error={isErrorGuild ? errorGuild : errorMembers}
            >
                {
                    guild && (
                        <>
                            <Title title={guild.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{guild.name}</p>
                                    <p className={style.description}>{guild.description}</p>
                                    <img src={guild.image.large} alt=""/>
                                </div>

                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{guild.description}</p>
                                    </div>
                                    {
                                        members && (
                                            <>
                                                <p className={style.label}>{`Представители (${guild.memberIds.length})`}</p>
                                                <Divider className={style.divider}/>
                                                <div className={style.members}>
                                                    {
                                                        members.map(member => <Member
                                                            key={member.id} {...member}/>)
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