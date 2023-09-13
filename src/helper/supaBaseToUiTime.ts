export function supabaseToUiTime(inputDate: string): string {
    const date = new Date(inputDate);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const formattedDate = `${month} ${date.getDate()}, ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
  return formattedDate;
  }
  