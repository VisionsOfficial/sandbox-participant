import Styles from './[FTName]Page.module.scss';

export const <FTName | capitalize>Page = () => {
  return <div className={Styles.<FTName | capitalize>Page}></div>;
};
