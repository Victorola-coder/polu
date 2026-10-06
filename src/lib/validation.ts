// shared by the forms (instant feedback) and the auth server (the real check)

export function passwordError(password: string) {
  if (password.length < 8) return "Use at least 8 characters";
  if (!/\d/.test(password)) return "Add at least one number";
  if (!/[A-Z]/.test(password)) return "Add at least one uppercase letter";
  if (!/[^A-Za-z0-9]/.test(password)) return "Add at least one special symbol";
  return null;
}

export function emailError(email: string) {
  return /^\S+@\S+\.\S+$/.test(email) ? null : "Enter a valid email address";
}
