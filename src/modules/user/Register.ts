import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => User!)
  async user(@Arg("email") email: String) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  @Mutation(() => User!)
  async register(
    @Arg("data")
    { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
