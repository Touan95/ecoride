import { Energy } from "@/interfaces/car";
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

export const getEnergyLabel = (energy : Energy) => {
    switch (energy) {
        case Energy.DIESEL:
            return 'Diesel'
        case Energy.GASOLINE:
            return 'Essence'
        case Energy.HYBRID:
            return 'Hybride'
        case Energy.ELECTRIC:
            return 'Électrique'
    }
}

export const booleanToYesNo = (bool?: boolean) => {
    if (bool){
        return 'Oui'
    }
    return 'Non'
}