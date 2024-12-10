export class MongooseUtils {
    publicSelect: string;
    publicPopulate: any[];
    privateSelect: string;
    privatePopulate: any[];

    constructor() {
        this.publicSelect = "";
        this.privateSelect = "";
        this.publicPopulate = [];
        this.privatePopulate = [];
    }
}
