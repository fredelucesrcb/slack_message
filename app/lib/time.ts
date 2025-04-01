
export function convertToSeconds(number: number, unit:string){
    if(unit === 'second'){
        return number * 1000
    } else if (unit === 'minute') {
        return (number * 60) * 1000
    } else if (unit === 'hour') {
        return (number * 60 * 60) * 1000
    }

}