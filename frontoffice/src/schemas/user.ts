import { UserType } from "@/interfaces/user";
import { passwordRegex } from "@/utils/password";
import { z } from "zod";

export const userTypeFormSchema = z.object({
  type: z.enum([UserType.PASSENGER, UserType.DRIVER, UserType.BOTH], {
    required_error: "Vous devez choisir un type de profil",
  }),
})

export type UserTypeFormSchemaType = z.infer<typeof userTypeFormSchema>

