const BASE_URL = import.meta.env.VITE_APP_BASE_URL;



export { BASE_URL };



export function formatDate(input) {
    const date = new Date(input);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
  
    return `${day}-${month}-${year}`;
  }