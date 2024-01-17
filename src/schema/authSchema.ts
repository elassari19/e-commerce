import { InferType, object, ref, string } from "yup";

export const signupSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required().email(),
  password: string().min(8).max(20).required(),
  confirm: string()
    .min(8)
    .max(20)
    .required()
    .oneOf([ref("password")], "Your Passwords Not Match"),
});

export type signupType = InferType<typeof signupSchema>;

export const signinSchema = object().shape({
  email: string().required().email(),
  password: string().min(8).max(20).required(),
});

export type signinType = InferType<typeof signinSchema>;
