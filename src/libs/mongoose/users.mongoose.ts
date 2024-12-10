import { MongooseUtils } from "./classes/MongooseUtils";

const userMongooseUtils = new MongooseUtils();
userMongooseUtils.publicSelect = "-password";

export default userMongooseUtils;
