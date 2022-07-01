import React, {useRef} from "react";
import style from "./BurgerMenu.module.scss";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectBurgerMenu, setBurgerMenu} from "../../store/appSlice";
import clsx from "clsx";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {Link, useLocation} from "react-router-dom";
import {links} from "./links";

export const BurgerMenu = () => {
    const burgerMenu = useAppSelector(selectBurgerMenu);
    const dispatch = useAppDispatch();
    const ref = useRef(null);
    useOutsideClick(ref, () => dispatch(setBurgerMenu(false)));

    const location = useLocation();
    console.log(location.pathname)

    return (
        <aside className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_hide]: !burgerMenu,
        })}
               ref={ref}
        >
            <div className={style.inner}
            >
                {
                    links.map(({to, label, icon}, index) => (
                        <Link key={index}
                              to={to}
                              onClick={() => dispatch(setBurgerMenu(false))}
                              className={clsx({
                                  [style.link]: true,
                                  [style.link_selected]: to === location.pathname,
                              })}
                        >
                            {icon}
                            <p className={style.label}>{label}</p>
                        </Link>
                    ))
                }
            </div>
        </aside>
    )
}