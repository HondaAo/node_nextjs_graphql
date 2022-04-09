import { buildSchema } from "type-graphql";
import { PostResolver } from "../resolvers/post";
import { UserResolver } from "../resolvers/user";

export const createSchema = () => buildSchema({
    resolvers: [PostResolver,UserResolver],
    validate:false 
})