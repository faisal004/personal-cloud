export function formatCustomDate(inputDate:any) {
    const date = new Date(inputDate);
  
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });
  
    return formattedDate;
  }
  