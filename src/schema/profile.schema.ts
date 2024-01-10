import { InferType, array, date, object, string } from "yup";

enum genderEnum {
  male = "male",
  female = "female",
}

export const profileSchema = object().shape({
  firstName: string().min(3).required(),
  lastName: string().min(3).required(),
  gender: string().oneOf(Object.values(genderEnum)),
  age: string(),
  email: string().email().required(),
  password: string().min(8).max(20).required(),
  phone: string(),
  birthDate: date(),
  address: string(),
  city: string(),
  lat: string(),
  lng: string(),
  postalCode: string(),
  cardExpire: date(),
  cardNumber: string(),
  cardType: string(),
  currency: string(),
  iban: string(),
  image: array(),
})

export type profileSchemaType = InferType<typeof profileSchema>