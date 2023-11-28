import { PropsWithChildren } from 'react';
import Styles from './NavBar.module.scss';

type NavBarProps = {

}

export const NavBar = (props: PropsWithChildren<NavBarProps>) => {
  return <div className={Styles.NavBar}></div>;
};
