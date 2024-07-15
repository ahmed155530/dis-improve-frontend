export const RegularExpressions = {
    passwordRegex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    // export const capitals: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // export const smalls: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    // export const alphanumerics: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '='];
    // export const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    EnglishLetters: /(?=.*[A-Za-z])/,
    EnglishAddress: /(?=.*[A-Za-z0-9])/,
    capitals: /(?=.*[A-Z])/,
    smalls: /(?=.*[a-z])/,
    alphanumerics: /(?=.*[!@#$%^&*])/,
    numbers: /(?=.*[0-9])/,
    arabics: /^[\u0621-\u064A0-9 ]+$/,
  }
  
  