import React, {FC, useState} from "react";
import style from "./CharacterListItem.module.scss";
import {ICharacter} from "../../../types/characters.types";
import { Link } from "react-router-dom";
import {CircularProgress} from "@mui/material";

export const CharacterListItem: FC<ICharacter> = (props) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Link className={style.characterListItem}
              to={`/character/${props.id}`}
        >
            <div className={style.imgWrapper}>
                <img src={props.image.small} alt="" onLoad={() => setLoaded(true)}/>
                {!loaded && <div className={style.preloaderWrapper}>
                    <CircularProgress size={30}/>
                </div>}
            </div>

            <p className={style.name}>{props.name}</p>
        </Link>
    )
}