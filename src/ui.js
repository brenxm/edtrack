import Storage from "./storage";
import { parse, format } from "date-fns";
import DateManager from "./datemanager";

export default class Ui {
    hovering = false;
    modalActive = false;
    static initialize() {
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
                    </div>
                </div>
            </div>
        `

        const container = document.querySelector(".main-content");
        container.addEventListener("scroll", (e) => {
            console.log("scrolling");
            console.log(e.target.scrollLeft);

        })
        this.appendModal();

        const columns = document.querySelectorAll(".single-column");
        columns.forEach(ea => ea.addEventListener("mouseenter", (e) => {
            this.toggleButton(e.target.lastElementChild);
        }), true);


        columns.forEach(ea => {
            ea.addEventListener("mouseleave", (e) => {
                this.toggleButton(e.target.lastElementChild);

                if (this.modalActive) {
                    setTimeout(() => {
                        if (this.hovering) {
                            console.log("this dude is hovering");
                        } else {
                            this.toggleModal(e);
                        }
                    }, 150);
                }
            }), true
        });
    }

    static generateEmployee(name, time, column) {
        const str = `
            <div class="person-container">
                <div class="person-container_name">${name}</div><div class="person-container_time">${time}</div>
            </div>
        `;
        const elem = new DOMParser().parseFromString(str, "text/html");

        const employeeContainer = column.children[1];
        employeeContainer.appendChild(elem.documentElement);
    }

    static appendModal() {
        const dom = document.querySelector(".container");
        const modal = document.createElement("div");
        modal.classList.add("modal-container");
        modal.setAttribute("id", "inactive");
        modal.innerHTML = `
                <div class="modal-hd-container">
                    <div class="hd-container-title"></div>
                    <div class="modal-hd-date"></div>
                    <div class="modal-hd-weekday"></div>
                </div>
                <div class="modal-option-container">
                </div>
        `;
        dom.appendChild(modal);
    }
};

const column = (() => {
    function singleColumn(processedDate) {
        const singlePrnt = document.createElement("div");
        singlePrnt.classList.add("single-column");
        singlePrnt.innerHTML = `
            <div class="single_header-container">
                <div class="hd-container-month">${processedDate.month}</div>
                <div class="hd-container-day">${processedDate.day}</div>
                <div class="hd-container-weekday">${processedDate.weekDay}</div>
            </div>
            <div class="sc_employee-container">
            </div>
            <button class="add-person-btn" id ="add-btn--inactive">+</button>
        `
        singlePrnt.addEventListener("click", (e) => {
            Modal.on(e, processedDate);
        }, false);

        singlePrnt.addEventListener("mouseenter", (e) => {
            AddBtn.on(e)
        })

        singlePrnt.addEventListener("mouseleave", (e) => {
            AddBtn.off(e);
        })

        return singlePrnt;
    }

    function getDayInfo() {
        return date;
    }

    const AddBtn = (function () {
        const active = "add-btn--active";
        const inactive = "add-btn--inactive";

        function on(e) {
            const btn = e.target.lastElementChild;
            btn.id = active;
        }

        function off(e) {
            const btn = e.target.lastElementChild;
            btn.id = inactive;
        }

        return {
            on,
            off,
            getDayInfo
        }
    })();

    const Modal = (function () {
        let hovering = false;
        const modalTimer = {
            timer: undefined,

            initiate() {
                if (typeof this.timer === "number") {
                    this.cancel;
                }

                this.timer = setTimeout(() => {
                    off();
                }, 1000);
            },

            cancel() {
                clearTimeout(this.timer);
                console.log("calleder");
            }
        }

        function on(e, dayInfo) {
            switch (e.target.classList.value) {
                case "add-person-btn":
                    Employee.addEmployee(dayInfo);
                    break;
                case "single-column":
                    off();
                    return;
            }
            const modal = document.querySelector(".modal-container");
          

           

            modal.id = "active";
            modalTimer.cancel();

            modal.addEventListener("mouseenter", () => {
                hovering = true;
                modalTimer.cancel();
            })

            modal.addEventListener("mouseleave", () => {
                hovering = false;
                modalTimer.initiate();
            })
            setPosition(e);
        }

        function off() {
            const modal = document.querySelector(".modal-container");
            modal.id = "inactive";
        }

        function setPosition(e) {
            const modal = document.querySelector(".modal-container");
            const targetTransform = e.target.getBoundingClientRect();

            modal.style.top = `${targetTransform.y}px`;
            console.log(window.innerWidth);

            if (window.innerWidth < targetTransform.width + targetTransform.x + modal.getBoundingClientRect().width) {
                modal.style.left = `${targetTransform.x - modal.getBoundingClientRect().width}px`;
                return;
            }
            modal.style.left = `${targetTransform.x + (targetTransform.width)}px`;
        }

        function hoverStatus() {
            return hovering;
        }

        const Employee = (() => {
            function addEmployee(dayInfo) {
                setHeader("New Employee", dayInfo);
                const optionContainer = document.querySelector(".modal-option-container");
                optionContainer.innerHTML = `
                <form>
                    <div class="employee-selection">
                        <label>Employee</label>
                        <select>
                            <option>Zulma</option>
                            <option>Jose</option>
                            <option>Brenda</option>
                            <option>Bryan</option>
                            <option>Veronica</option>
                            <option>Kim</option>
                            <option>Tracy</option>
                            <option>Nicholaus</option>
                            <option>Fernando</option>
                            <option>New employee</option>
                        </select>
                        <input class="ae_new-employee-input" placeholder = "new employee name">
                    </div>
                    <div class="work-type">
                        <label>Location</label>
                        <select>
                            <option>ED</option>
                            <option>TXP</option>
                            <option>OPC</option>
                            <option>Central</option>
                        </select>
                        <select>
                            <option>0645-1508</option>
                            <option>0700-1530</option>
                            <option>1200-0830</option>
                            <option>1330-1000</option>
                            <option>Available to cover</option>
                        </select>
                    </div>
                    <div class="special-request">
                        <label>Special request</label>
                        <select>
                            <option>None</option>
                            <option>Pending PTO</option>
                            <option>Approved PTO</option>
                            <option>Overtime</option>
                            <option>Switched schedule</option>
                            <option>Pulled to</option>
                        </select>
                    </div>
                    <div class="ae_btn-container">
                        <button class="ae_btn-accept">Accept</button>
                        <button class="ae_btn-cancel">X</button>
                    </div>
                </form>
            `
            }

            function deployEmployee(){
                //deploy information to clicked column
            }

            function editEmployee() {

            }

            function setHeader(title, dayInfo) {
                const modal = document.querySelector(".modal-container");
                const hdTitle = modal.firstElementChild.firstElementChild;
                const dateTxtElem = modal.firstElementChild.children[1];
                const weekDayTxtElem = modal.firstElementChild.lastElementChild;

                hdTitle.textContent = title;
                dateTxtElem.textContent = `${dayInfo.month} ${dayInfo.day}`;
                weekDayTxtElem.textContent = dayInfo.weekDay;
            }

            return {
                addEmployee
            }
        })();



        return {
            on,
            off,
            hoverStatus,
        }
    })();

    function processDates(date) {
        const parseDate = [];
        date.forEach(day => {
            parseDate.push({
                month: format(parse(day, "MM/dd/yyyy", new Date()), "MMMM"),
                day: format(parse(day, "MM/dd/yyyy", new Date()), "dd"),
                weekDay: format(parse(day, "MM/dd/yyyy", new Date()), "EEEE")
            })
        })

        return parseDate;
    }

    function processDay(formattedDay) {
        const rawDate = DateManager.parseDate(formattedDay);
        const obj = {
            month: format(rawDate, "MMMM"),
            day: format(rawDate, "dd"),
            weekDay: format(rawDate, "EEEE")
        };
        return obj;
    }

    function arrayOfColumns(processDates) {

        const arr = [];
        processDates.forEach(date => {
            arr.push(singleColumn(date));
        })

        return arr;
    }

    return {
        singleColumn,
        processDates,
        processDay,
        arrayOfColumns
    }
})();

const scheduleContainer = (() => {
    function initialMount() {
        const container = document.querySelector(".schedule-container");
        const indexOfCurrentDate = Storage.indexOfCurrentDate();

        container.appendChild(column.singleColumn(column.processDay(Storage.getCurrentDay())));

        mountAfterCurrent(column.arrayOfColumns(column.processDates(Storage.getFutureDay(15, Storage.getCurrentDay()))));
    }

    function mountBeforeCurrent(arrayOfColumns) {
        const container = document.querySelector(".schedule-container");
        const arr = arrayOfColumns.reverse();

        arr.forEach(item => {
            container.prepend(item);
        })
    }

    function mountAfterCurrent(arrayOfColumns) {
        const container = document.querySelector(".schedule-container");
        arrayOfColumns.forEach(item => {
            container.appendChild(item);
        })
    }
    return {
        mountAfterCurrent,
        mountBeforeCurrent,
        initialMount
    }
})();



export { scheduleContainer, column };