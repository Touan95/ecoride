"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavbarLink } from "@/components/atoms/NavbarLink"
import { Typography } from "@/components/atoms/Typography"
import clsxm from "@/utils/clsxm"
import { useAuthContext } from "@/contexts/auth"

interface ConnectedMenuProps {
  username: string
}

const AccountButton = () => {
  return (
    <div className={clsxm('flex w-fit')}>
      <Typography
        color='white'
        variant="h3"
        customClassName="hover:text-secondary-500 cursor-pointer"
      >
        Mon compte
      </Typography>
    </div>
  )
}  

const LogoutButton = () => {
  const {clearUser} = useAuthContext()

  return (
    <div className={clsxm('flex w-fit')} onClick={clearUser}>
      <Typography
        color='black'
        variant="h3"
        customClassName="hover:text-secondary-500 cursor-pointer"
      >
        Déconnexion
      </Typography>
    </div>
  )
}  

export const ConnectedMenu = ({username}:ConnectedMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <AccountButton/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-5 py-2 w-48 bg-primary-300 border-primary-800">
        <div className="flex flex-col items-end gap-2">
          <div className="border-b w-full">
            <Typography
            variant="cardTitle"
            color="black"
            align="right"
            >
              {username}
            </Typography>
          </div>
          <NavbarLink href='/user' label={"Préférences"} variant="dropdown"/>
          <NavbarLink href='/user/rides' label={"Mes trajets"} variant="dropdown"/>
          <LogoutButton/>
         
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
