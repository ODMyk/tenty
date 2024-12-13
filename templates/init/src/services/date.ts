export const EN_FULL_DATE = (date?: Date | number) =>
  new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .split('/')
    .reverse()
    .join('-');

export const FORMAT_TIME = (time: number) => {
  const seconds = Math.trunc((time / 1000) % 60);

  const minutes = Math.trunc(time / 60000);

  const minutesStr = ('0' + minutes).slice(-2);
  const secondsStr = ('0' + seconds).slice(-2);

  return minutesStr + ':' + secondsStr;
};

export const FORMAT_MILLISECONDS_TIME = (date: number) =>
  new Intl.DateTimeFormat('en-GB', {
    minute: 'numeric',
    second: '2-digit',
  }).format(date) +
  ':' +
  ((date % 1000) / 10).toFixed();

export const SUMMARY_TIME = new Intl.DateTimeFormat('en-GB', {
  minute: '2-digit',
  hour: '2-digit',
  second: '2-digit',
  year: '2-digit',
  hour12: true,
  month: '2-digit',
  day: '2-digit',
}).format;
