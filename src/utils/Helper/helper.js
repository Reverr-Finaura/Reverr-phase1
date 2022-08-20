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

export {formateDate, smallString};
