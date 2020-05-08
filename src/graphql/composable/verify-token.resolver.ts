import * as jwt from "jsonwebtoken";
import { ComposableResolver } from "./composable.resolver";
import { ResolverContext } from "../../interfaces/ResolverContextInterface";
import { GraphQLFieldResolver } from "graphql";
import { JWT_SECRET } from "../../utils/utils";

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> = (
  resolver: GraphQLFieldResolver<any, ResolverContext>
): GraphQLFieldResolver<any, ResolverContext> => {
  return (parent, args, context: ResolverContext, info) => {
    const token: string = context.authorization
      ? context.authorization.split(' ')[1]
      : undefined;

      console.log("verificando se ta tudo certo");
      
      console.log(token);
      console.log(JWT_SECRET);
      
      
    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
        
        
      if (!err) {
        console.log(resolver(parent, args, context, info));
        return resolver(parent, args, context, info);
      }

      throw new Error(`${err.name}: ${err.message}`);
    });
  };
};
