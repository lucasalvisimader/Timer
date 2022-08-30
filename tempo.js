let is_paused = false;
let setI;

function start(qty_time, qty_date) {
    clearInterval(setI);
    let all = qty_time.value;
    let hours = all.split(":")[0];
    let minutes = all.split(":")[1];
    let seconds = all.split(":")[2];
    let all_date = qty_date.value;
    let years = all_date.split("-")[0];
    let months = all_date.split("-")[1];
    let days = all_date.split("-")[2];
    if (seconds != undefined && minutes != undefined && hours != undefined 
        && days != undefined && months != undefined && years != undefined) {
        if (seconds > 0 || minutes > 0 || hours > 0 || days > 0 || months > 0 || years > 0) {
            interval(seconds, minutes, hours, days, months, years);
        } else {
            alert('Por favor, preencha todos os campos com algum número!');
        }
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function interval(seconds, minutes, hours, days, months, years) {
    if (setI != undefined || setI != 0) {
        set_interval(seconds, minutes, hours, days, months, years);
        if (is_paused) {
            unpause(seconds);
        }
    }
}

function set_interval(seconds, minutes, hours, days, months, years) {
    setI = setInterval(function() {
        if (!is_paused) {
            document.getElementById('seconds').innerText = seconds,
            seconds--
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('hours').innerText = hours;
            document.getElementById('days').innerText = days;
            document.getElementById('months').innerText = months;
            document.getElementById('years').innerText = years;
            if (seconds < 0) {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else if (days > 0) {
                    days--;
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                } else if (months > 0) {
                    if (months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months == 10 || months == 12) {
                        days = 30;
                    } else if (months == 4 || months == 6 || months == 9 || months == 11) {
                        days = 29;
                    } else {
                        if(date = (new Date().getFullYear + years) % 4 == 0) {
                            if (date % 100 == 0) {
                                if (date % 400 == 0) {
                                    days = 28;
                                } else {
                                    days = 27;
                                }
                            } else {
                                days = 28;
                            }
                        } else {
                            days = 27;
                        }
                    }
                    months--;
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                } else if (years > 0) {
                    years--;
                    months = 11;
                    let date = new Date().getMonth();
                    if (date == 0 || date == 2 || date == 4 || date == 6 || date == 7 || date == 9 || date == 11) {
                        days = 30;
                    } else if (date == 3 || date == 5 || date == 8 || date == 10) {
                        days = 29;
                    } else {
                        if((new Date().getFullYear() + years) % 4 == 0) {
                            if (date % 100 == 0) {
                                if (date % 400 == 0) {
                                    days = 28;
                                } else {
                                    days = 27;
                                }
                            } else {
                                days = 28;
                            }
                        } else {
                            days = 27;
                        }
                    }
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(setI);
                }
            }
        }
    }, 1000);
}

function pause() {
    is_paused = true;
    document.getElementById('pauses').innerHTML = '<input type="button" value="Despausar" id="pause_time" onclick="unpause()">';
}

function unpause() {
    is_paused = false;
    document.getElementById('pauses').innerHTML  = '<input type="button" value="Pausar" id="pause_time" onclick="pause()">';
}