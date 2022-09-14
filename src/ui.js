export default class Ui{
    static initialize(){
        const body = document.querySelector(".content");
        body.innerHTML = `
            <div class="container">
                <div class="header-container"></div>
                <div class="messages-container">
                    <div class="message_header-container">
                        <button>Notification</button>
                        <button>Messages</button>
                    </div>
                    <div class="message_content-container">
                    </div>
                </div>
                <div class="main-content">
                    <div class="schedule-container">
                    ${this.generateColumnCell("September", "4", "Monday")}
                    ${this.generateColumnCell("September", "5", "Tuesday")}
                    ${this.generateColumnCell("September", "6", "Wednesday")}
                    ${this.generateColumnCell("September", "7", "Thursday")}
                    ${this.generateColumnCell("September", "8", "Friday")}
                    ${this.generateColumnCell("September", "9", "Satruday")}
                    ${this.generateColumnCell("September", "10", "Sunday")}
                    ${this.generateColumnCell()}
                    </div>
                </div>
            </div>
        `
    }

    static generateColumnCell(month, day, weekDay){
        const str = `
            <div class="single-column">
                <div class="single_header-container">
                    <div class="hd-container-month">${month}</div>
                    <div class="hd-container-day">${day}</div>
                    <div class="hd-container-weekday">${weekDay}</div>
                </div>
            </div>
        `

        return str;
    }
}