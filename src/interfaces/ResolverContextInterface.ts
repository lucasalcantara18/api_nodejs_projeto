import { DbConnection } from "./DBConnectionInterface";
import { AuthUser } from "./AuthUserInterface";
import { DataLoaders } from "./DataLoadersInterface";
import { RequestedFields } from "../graphql/ast/RequestedFields";

export interface ResolverContext{

    dataloaders?:DataLoaders;
    db?: DbConnection;
    authorization?: string;
    authUser?: AuthUser;
    requestedFields?: RequestedFields;

}