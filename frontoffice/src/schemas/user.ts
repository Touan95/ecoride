import { UserType } from "@/interfaces/user";
import { passwordRegex } from "@/utils/password";
import { z } from "zod";

export const userTypeFormSchema = z.object({
  type: z.enum([UserType.PASSENGER, UserType.DRIVER, UserType.BOTH])
})

export type UserTypeFormSchemaType = z.infer<typeof userTypeFormSchema>


export const driverPreferencesFormSchema = z.object({
  acceptsPets: z.boolean(),
  acceptsSmoking: z.boolean(),
  customRules: z.array(z.string()),
})

export type DriverPreferencesFormSchemaType = z.infer<typeof driverPreferencesFormSchema>

