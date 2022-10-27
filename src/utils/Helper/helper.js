const formateDate = date => {
  const dateStr = new Date(date).toLocaleDateString('en-in', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return dateStr;
};

const smallString = (str, num) => {
  if (str && str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
};
function capitalizeFirstLetter(string) {
  let str = string.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {formateDate, smallString, capitalizeFirstLetter};
