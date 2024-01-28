export function convertTime(time: string): string {
  if (time) {
    const myDate = new Date(time);
    console.log(myDate, 'myDate');
    let day = myDate.getDate();
    let month = myDate.getMonth();
    let year = myDate.getFullYear();
    console.log(month, 'myDate');
    return `${month}-${day}-${year}`;
    // return myDate.toISOString().split('T')[0];
  }
  return '';
}
