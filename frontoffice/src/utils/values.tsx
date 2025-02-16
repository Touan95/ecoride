import { UserType } from "@/interfaces/user";

export const getUserTypeLabel = (userType : UserType) => {
    switch (userType) {
        case UserType.PASSENGER:
            return 'Passager'
        case UserType.DRIVER:
            return 'Conducteur'
        case UserType.BOTH:
            return 'Passager - Conducteur'
    }
}

export const booleanToYesNo = (bool?: boolean) => {
    if (bool){
        return 'Oui'
    }
    return 'Non'
}