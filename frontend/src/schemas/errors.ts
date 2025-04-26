export enum SchemaError {
  REQUIRED = 'Champ obligatoire',
  INVALID_EMAIL = 'Email invalide',
  INVALID_PASSWORD = 'Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
  RIDE_PRICE = "Le coût d'un trajet doit être supérieur à la commission",
  CAR_REQUIRED = 'Vous devez sélectionner une voiture',
  PASSWORD_NOT_MATCH = 'Les mots de passe ne correspondent pas'
}
