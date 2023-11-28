import { Schema } from "mongoose";
import { 
    I<FTName>,
    I<FTName>Methods,
    I<FTName>Model,
} from "../../types/<FTName | lowercase>";

export const statics = (
    schema: Schema<
        I<FTName>,
        I<FTName>Model,
        I<FTName>Methods
    >
) => {
    // schema.statics.template = async function () {
    //     return true;
    // };
}
