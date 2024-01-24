export const utils = {
    // Date formatting function
    formatDate(date, formatString = 'YYYY-MM-DD') {
      // Implement date formatting logic
      // You can use libraries like 'moment.js' or native JavaScript
      // Example with native JavaScript:
      const d = new Date(date);
      const year = d.getFullYear();
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      return formatString.replace('YYYY', year).replace('MM', month).replace('DD', day);
    },
  
    // General input validation function
    isValidInput(input) {
      // Implement validation logic
      // Example: Check if input is not null, undefined, or empty
      return input !== null && input !== undefined && input !== '';
    },
  
    // A utility function for number validation
    isPositiveNumber(value) {
      return !isNaN(value) && value > 0;
    },
  
    // Add more utility functions as needed
  };
  