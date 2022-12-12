var currentDay = $('#currentDay');
var container = $('.container');
var time = moment(09, 'HH');
var shedule = JSON.parse(localStorage.getItem('shedule')) || {
     9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: '',
};

currentDay.text(moment().format('dddd MMMM Do'));

// Apoitment added to localStorage 
var confirmation = $('<p>Apoitment added to <span>localStorage</span> <i class="fas fa-check"></i></p>').addClass('confirmation');
container.append(confirmation);

function textAreaBackground(num,el) {
    var currentHour = Number(moment().format('HH'));
    if(num < currentHour) {
        el.addClass('past');
    } else if (num === currentHour) {
        el.addClass('present');
    } else {
        el.addClass('future');
    }
}

function addRow(hour) {
    var row = $('<div>').addClass('row time-block');
    var hourOfDay = $('<div>').addClass('col-2 hour').text(time.format("HA"));
    var textarea = $('<textarea>').addClass('col-8').text(shedule[hour]);
    textAreaBackground(hour,textarea);
    var saveContainer = $('<div>').addClass('col-2 saveBtn');
    var saveIcon = $('<i>').addClass('fas fa-save');
    saveContainer.append(saveIcon);
    row.append(hourOfDay);
    row.append(textarea);
    row.append(saveContainer);
    container.append(row);
    saveContainer.on('click', 'i', function() {
        var toDo = textarea.val();
        shedule[hour] = toDo;
        confirmation.show('slow');
        $('html').animate({scrollTop: 0},500);
        setTimeout(function() {
            confirmation.hide('slow');
        }, 1500);
        localStorage.setItem('shedule',JSON.stringify(shedule));
    });
}

while(time.format('HH') < 18) {
    var hour = Number(time.format('HH'));
    addRow(hour);
    time.add(1, 'hours');
};