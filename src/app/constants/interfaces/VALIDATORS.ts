
/* 
phoneNumberPattern->
This regex ensures that the string starts with an optional plus sign 
followed by one or more digits, allowing for strings 
like +123 and 123, but disallowing any other symbols or characters.
*/

export const phoneNumberPattern = /^\+?[0-9]+$/;


/* 
namePattern->
This regex ensures that the string consists entirely of alphabetic
 characters, with no symbols, numbers, or other characters allowed.
  It will match names like John, Alice, Emily, and Alexander.

*/
export const namePattern = /^[a-zA-Z]+$/;

/* 
addressPattern->

Can start with an optional #.
Includes letters, digits, periods, commas, and spaces.
Cannot be composed entirely of numbers.
Examples of valid addresses:

123 Main St.
#456 Elm St.
Apartment 7, Building B
Main St. 123
Examples of invalid addresses:

12345 (only numbers)
# (only special character without any alphanumeric characters)
*/
export const addressPattern = /^(#?[a-zA-Z0-9.,\s]*[a-zA-Z][a-zA-Z0-9.,\s]*|[a-zA-Z][a-zA-Z0-9.,\s]*)$/;


/* 
passwordPattern->
for a password that must contain at least one letter and one digit,
 with only letters and digits allowed. Here's a breakdown of this regex:
 Valid Examples:
password123 - Contains both letters and digits.
abc1def2 - Contains both letters and digits.
123abc - Contains both letters and digits.
*/
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;



/* 
emailPattern->
Contains a valid local part and domain part.
Ends with .com (case-insensitive).

Examples of valid emails:

example@example.com
user.name@domain.com
user123@sub.domain.com

Examples of invalid emails:

example@example.co (does not end with .com)
example.com (missing @)
@example.com (missing local part)
*/
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;



/*
userNamePattern->
Contains only letters, digits, and underscores.
Cannot be composed entirely of digits.
 */
export const userNamePattern = /^(?!^\d+$)[a-zA-Z0-9_]+$/;
export const nonMinusDigitPattern = /^(?!-)\d+(\.\d{1,2})?$/
export const discountPattern = /^\d*\.?\d+%?$/
export const netAmountPattern = /^(?!0(\.0+)?$)(\d+(\.\d+)?|\.\d+)$/


/* 
ItemName->
valids:
123Item
1-Item_name
2024 Item
9_Test-Item
Pillow_6X

Invalid Examples:
Item123 (starts with a space)
' ' (only spaces)
 item-name (starts with a space)
Test-Item (starts with a space)
*/
export const itemName = /^(?! )[a-zA-Z0-9-_ ]*(?<! )$/






