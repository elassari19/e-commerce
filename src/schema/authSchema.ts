import { InferType, object, ref, string } from "yup";

export const code = object().shape({
  code: string().required().length(2)
})

export const email = object().shape({
  email: string().required().email(),
});

const password = object().shape({
  password: string().min(8).max(20).required(),
});

const repeat = object().shape({
  repeat: string()
    .min(8)
    .max(20)
    .required()
    .oneOf([ref("password")], "Your Passwords Not Match"),
});

export const signupSchema = code.concat(email).concat(password);
export const signinSchema = email.concat(password);

export type signupType = InferType<typeof signupSchema>;
export type signinType = InferType<typeof signinSchema>;
export type passwordType = InferType<typeof password>;
