import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyTaken } from "./isEmailAlreadyTaken";

@InputType()
export class RegisterInput {
  @Field()
  @Length(2, 30)
  firstName: string;

  @Field()
  @Length(2, 30)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyTaken({ message: "Email already taken" })
  email: string;

  @Field()
  password: string;
}
