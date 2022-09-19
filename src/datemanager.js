import { format, addDays, subDays } from "date-fns";

export default class DateManager{
    static dayFormat = "MM/dd/yyyy";
    
    static initialLoad(){
        const arr = [...DateManager.fetchPreviousDay(182), format(new Date, this.dayFormat), ...DateManager.fetchNextDay(182)];
        return arr;
    }

    static fetchPreviousDay(count){
        const arr = [];
        for(let i = 1; i <= count; i++){
            arr.unshift(format(subDays(new Date, i), this.dayFormat));
        }
        return arr;
    }

    static fetchNextDay(count){
        const arr = [];
        for(let i = 1; i <= count; i++){
            arr.push(format(addDays(new Date, i), this.dayFormat));
        }
        return arr;
    }
   
}
