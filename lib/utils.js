/**
 * Format a date string or object to a consistent format
 * @param {string|Date} dateInput - Date string (YYYY-MM-DD) or Date object
 * @returns {string} Formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(dateInput) {
  if (!dateInput) {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (typeof dateInput === 'string' && dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // Parse date parts directly to avoid timezone issues
    const [year, month, day] = dateInput.split('-').map(num => parseInt(num, 10));
    // Create a formatted date string manually
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[month - 1]} ${day}, ${year}`;
  } 
  
  if (dateInput instanceof Date) {
    return dateInput.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // If it's another format, convert to string
  return String(dateInput);
}
