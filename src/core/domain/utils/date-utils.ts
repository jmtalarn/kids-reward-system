export const dateToShortISOString = (date: Date) => (date ?? new Date()).toISOString().substring(0, 10);

export const dateToLongLocaleString = (date: Date) => (date ?? new Date()).toLocaleString('default', { weekday: 'long', day: "numeric", month: 'long' });
