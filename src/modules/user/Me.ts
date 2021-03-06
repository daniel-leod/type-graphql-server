import { Ctx, Query, Resolver } from "type-graphql";

import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    // @ts-ignore
    if (!ctx.req.session!.userId) {
      return undefined;
    }
    // @ts-ignore
    return await User.findOne({ where: { id: ctx.req.session!.userId } });
  }
}
