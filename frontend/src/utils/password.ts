// CNIL 2024 compliant password policy:
// - Minimum 12 characters
// - At least 1 lowercase, 1 uppercase, 1 digit, 1 special character (#?!@$%^&*-)
// - Only standard ASCII characters allowed (no emojis or exotic symbols)
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{12,}$/;
