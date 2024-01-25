export const utils = {

    formatDate(date, formatString = 'YYYY-MM-DD') {
   
      const d = new Date(date);
      const year = d.getFullYear();
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      return formatString.replace('YYYY', year).replace('MM', month).replace('DD', day);
    },
  
 
    isValidInput(input) {
      
      return input !== null && input !== undefined && input !== '';
    },
  
  
    isPositiveNumber(value) {
      return !isNaN(value) && value > 0;
    },
  
 
  };
  