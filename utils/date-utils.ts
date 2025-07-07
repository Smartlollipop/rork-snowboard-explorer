export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

export function getTimeUntil(dateString: string): string {
  const targetDate = new Date(dateString);
  const now = new Date();
  
  // Calculate the difference in milliseconds
  const diffMs = targetDate.getTime() - now.getTime();
  
  // If the date is in the past, return an empty string
  if (diffMs < 0) return '';
  
  // Calculate days, hours, and minutes
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} d ${diffHours} h`;
  } else {
    return `${diffHours} h ${diffMinutes} m`;
  }
}

export function getDayOfWeekShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}