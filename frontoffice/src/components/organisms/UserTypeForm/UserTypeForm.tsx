"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserType } from "@/interfaces/user"
import { userTypeFormSchema, UserTypeFormSchemaType } from "@/schemas/user"
import { Button } from "@/components/molecules/Button"
import { Typography } from "@/components/atoms/Typography"
import { useChangeUserTypeMutation } from "@/api/hooks/useUserAPI"
import { useGetMe } from "@/api/hooks/useAuthAPI"
import { getUserTypeLabel } from "@/utils/values"

interface UserTypeFormProps {
  initialValue: UserType
  userId: string
  onValidate: ()=> void
}

export const UserTypeForm = ({ initialValue, userId, onValidate } : UserTypeFormProps) => {

  const getMe = useGetMe({})

  const form = useForm<UserTypeFormSchemaType>({
    resolver: zodResolver(userTypeFormSchema),
    defaultValues: {
      type: initialValue
    }
  })

  const changeUserTypeMutation = useChangeUserTypeMutation({
    onSuccess:()=> {
      getMe.refetch()
      onValidate()
    }
  })

  const onSubmit = (data: UserTypeFormSchemaType) => {
    changeUserTypeMutation.mutate({
      userId,
      userType: data.type
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Typography variant="cardTitleSm">Veuillez choisir le profil qui vous correspond</Typography>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 text-primary-900"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={UserType.PASSENGER} />
                    </FormControl>
                    <Typography variant="cardTitleSm" weight="light">
                      {getUserTypeLabel(UserType.PASSENGER)}
                    </Typography>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={UserType.DRIVER} />
                    </FormControl>
                    <Typography variant="cardTitleSm" weight="light">
                      {getUserTypeLabel(UserType.DRIVER)}
                    </Typography>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={UserType.BOTH} />
                    </FormControl>
                    <Typography variant="cardTitleSm" weight="light">
                      {getUserTypeLabel(UserType.BOTH)}
                    </Typography>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Confirmer</Button>
      </form>
    </Form>
  )
}
