import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema, Query, Resolver } from "type-graphql";

const PORT = 4000;

@Resolver()
class HelloResolver {
  @Query(() => String!)
  async hello() {
    return "Hello World";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
};

main();
