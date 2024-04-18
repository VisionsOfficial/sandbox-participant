import Styles from "./CardCollapseDataResource.module.scss";
import { CardCollapse } from "../../../Atoms/Cards/CardCollapse/CardCollapse";

type CardCollapseDataResourceProps = {
    dataResource: any;
    className?: string;
};

export const CardCollapseDataResource = ({
    dataResource,
    className = "",
}: CardCollapseDataResourceProps) => {
    return (
        <CardCollapse
            title={dataResource?.name}
            classNames={{
                main: `${Styles.CardCollapseDataResource} ${className}`,
                active: {
                    headerWrapper: Styles.activeHeader,
                },
            }}
        >
            <p>{dataResource?.description}</p>
            {dataResource?.b2cDescription && (
                <>
                    <br />
                    <div>
                        <p>
                            <b>B2C Description</b>
                        </p>
                        <p>{dataResource?.b2cDescription}</p>
                    </div>
                </>
            )}
        </CardCollapse>
    );
};
