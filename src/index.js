import "./styles.scss";
import DateManager from "./datemanager";
import Storage from "./storage";
import { scheduleContainer, column } from "./ui";

import Ui from "./ui";

Storage.initializeStorage();
Ui.initialize();

//scheduleContainer.initialMount();