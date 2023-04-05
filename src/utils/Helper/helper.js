const formateDate = date => {
  const dateStr = new Date(date).toLocaleDateString('en-in', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return dateStr;
};
 function DDMMYYYY(date) {
  let str = JSON.stringify(date);
  let str2 = str && str.replace(`"`, '').split('T')[0];
  return str2 && str2.split('-').reverse().join('-');
}
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

export function getTimeAgo(timestamp) {
  const now = new Date().getTime();
  const diff = (now - timestamp * 1000) / 1000; // convert to seconds
  if (diff < 60) {
    return `${Math.floor(diff)} seconds ago`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)} days ago`;
  } else if (diff < 31104000) {
    return `${Math.floor(diff / 2592000)} months ago`;
  } else {
    return `${Math.floor(diff / 31104000)} years ago`;
  }
}

function formatTimeAgo(date) {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto',
  });
  const DIVISIONS = [
    {amount: 60, name: 'seconds'},
    {amount: 60, name: 'minutes'},
    {amount: 24, name: 'hours'},
    {amount: 7, name: 'days'},
    {amount: 4.34524, name: 'weeks'},
    {amount: 12, name: 'months'},
    {amount: Number.POSITIVE_INFINITY, name: 'years'},
  ];
  let duration = (date - new Date()) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

 function convertSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}: ${secs
    .toString()
    .padStart(2, '0')}`;
}
export {
  formateDate,
  smallString,
  capitalizeFirstLetter,
  formatTimeAgo,
  timeAgo,
  DDMMYYYY,
  convertSeconds
};
