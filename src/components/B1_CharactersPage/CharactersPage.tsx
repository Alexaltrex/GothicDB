import React, {useEffect, useState} from "react";
import style from "./CharactersPage.module.scss";
import {Title} from "../X_common/Title/Title";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {ICharacter, SortedByType} from "../../types/characters.types";
import {charactersApi} from "../../api/characters.api";
import {
    serializeSearchParams,
    sortCharactersByAlphabet,
    sortCharactersByGuild,
    sortCharactersByLocation
} from "../../helpers/helpers";
import {CharacterListItem} from "./CharacterListItem/CharacterListItem";
import {SortBlock} from "./SortBlock/SortBlock";
import {Divider} from "@mui/material";
import clsx from "clsx";
import {useLocation, useSearchParams} from "react-router-dom";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";

export const CharactersPage = () => {
    const [sortedBy, setSortedBy] = useState<SortedByType>("alphabet");
    const [letter, setLetter] = useState("Все");
    let [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    // URL => STATE
    useEffect(() => {
        const sorted = searchParams.get('sorted');
        if (sorted) {
            setSortedBy(sorted as SortedByType);
        }
        const letter = searchParams.get('letter');
        if (letter) {
            setLetter(letter);
        }
    }, []);

    // STATE => URL
    useEffect(() => {
        const nextSearchParams = {...serializeSearchParams(searchParams)};
        nextSearchParams.sorted = sortedBy;
        nextSearchParams.letter = letter;
        setSearchParams(nextSearchParams);
    }, [sortedBy, letter, location.pathname]);

    const {
        isLoading,
        isError,
        error,
        data: characters,
    } = useQuery<ICharacter[], AxiosError>(
        "characters",
        () => charactersApi.getAll(),
    );

    return (
        <div className={style.charactersPage}>
            <ErrorWrapper isLoading={isLoading} isError={isError} error={error}>
                <Title title="Персонажи"/>

                {
                    characters && (
                        <>
                            <div className={style.infoBlock}>
                                <p className={style.count}>Всего: {characters.length}</p>
                                <SortBlock sortedBy={sortedBy}
                                           onChange={(s: SortedByType) => {
                                               setLetter("Все");
                                               setSortedBy(s);
                                           }}
                                />
                            </div>
                            <Divider className={style.divider}/>
                            {
                                sortedBy === "alphabet" && (
                                    <>
                                        <div className={style.alphabet}>

                                            {
                                                ["Все", ...sortCharactersByAlphabet(characters).map(el => Object.keys(el)[0])]
                                                    .map(l => (
                                                        <button key={l}
                                                                className={clsx({
                                                                    [style.item]: true,
                                                                    [style.item_selected]: l === letter,
                                                                })}
                                                                onClick={() => setLetter(l)}
                                                        >
                                                            {l}
                                                        </button>
                                                    ))
                                            }
                                        </div>
                                        <Divider className={style.divider}/>
                                    </>
                                )
                            }


                            <div className={style.list}>
                                {
                                    (
                                        sortedBy === "alphabet"
                                            ? sortCharactersByAlphabet(characters)
                                            : sortedBy === "location"
                                            ? sortCharactersByLocation(characters)
                                            : sortCharactersByGuild(characters)
                                    )
                                        .map((el, index) => {
                                                if (
                                                    Object.values(el)[0].length === 0 ||
                                                    (letter !== "Все" && Object.keys(el)[0] !== letter)
                                                ) return null
                                                return (
                                                    <div key={index}
                                                         className={clsx({
                                                             [style.group]: true,
                                                             [style.group_location]: sortedBy === "location" || sortedBy === "guild",
                                                         })}
                                                    >
                                                        <p className={style.groupLabel}>{Object.keys(el)[0]}</p>
                                                        <div className={style.listOfGroup}>
                                                            {
                                                                Object.values(el)[0].map(character => (
                                                                        <CharacterListItem key={character.id}
                                                                                           {...character}
                                                                        />
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                }
                            </div>
                        </>
                    )
                }
            </ErrorWrapper>
        </div>
    )
}