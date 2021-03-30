/**
 * 
 * @param {*} date 

 */

export function getFormattedDate(date) {
  console.log(date);
    date = new Date(date);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
  }
  