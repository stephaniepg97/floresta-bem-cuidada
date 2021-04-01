export const value: (<C>(_: keyof C, __: C) => object) = (key, object) => !!object && Object.entries(object).find(([k, _]) => key === k)?.[1];
export const date: ((date: Date, diff?: { 
    years?: number
    months?: number
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
}) => string) = (date, diff) => {
    if (!!diff) {
        const {days = 0 as number, hours = 0 as number, minutes = 0 as number, months = 0 as number, seconds = 0 as number, years = 0 as number} = diff;
        date = new Date(date.setFullYear(date.getFullYear() + years, date.getMonth() + months));
        date = new Date(date.setHours((date.getDate() + days + 1) * 24 + date.getHours() + hours, date.getMinutes() + minutes, date.getSeconds() + seconds));
    }
    return date.toISOString();
}
