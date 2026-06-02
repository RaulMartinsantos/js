const selectedDate = document.getElementById("date");

import { schedulesDay } from "../schedules/load.js";

selectedDate.onchange = () => schedulesDay();
