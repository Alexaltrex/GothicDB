import React from "react";
import style from "./Header.module.scss"
import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectBurgerMenu, setBurgerMenu} from "../../store/appSlice";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export const Header = () => {
    const burgerMenu = useAppSelector(selectBurgerMenu);
    const dispatch = useAppDispatch();

    const onBurgerMenuHandler = () => dispatch(setBurgerMenu(!burgerMenu));

    return (
        <header className={style.header}>
            <div className={style.left}>
                <IconButton className={style.burgerMenuBtn}
                            onClick={onBurgerMenuHandler}
                >
                    {burgerMenu ? <CloseIcon/> : <MenuIcon/>}
                </IconButton>
                <Link to="/"
                      className={style.logo}
                >
                    <span>Gothic I</span> <span>DB</span>
                </Link>
            </div>


            {/*<div>*/}
            {/*  Account*/}
            {/*</div>*/}

        </header>
    )
}