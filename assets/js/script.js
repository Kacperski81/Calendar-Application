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

// display current day on top of the page
currentDay.text(moment().format('dddd MMMM Do'));

// create element to confirm that apoitment was added to shedule
var confirmation = $('<p>Apoitment added to <span>localStorage</span> <i class="fas fa-check"></i></p>').addClass('confirmation');
container.append(confirmation);

// set background color based on hour of the day
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

// add time block to the website
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

    // set event listener to the save icon
    saveContainer.on('click', 'i', function() {
        var toDo = textarea.val();
        shedule[hour] = toDo;
        confirmation.show('slow');
        $('html').animate({scrollTop: 0},500);
        
        // show confirmation
        setTimeout(function() {
            confirmation.hide('slow');
        }, 1500);

        // save shedule to local storage
        localStorage.setItem('shedule',JSON.stringify(shedule));
    });
}

// display timeblock for each hour
while(time.format('HH') < 18) {
    var hour = Number(time.format('HH'));
    addRow(hour);
    time.add(1, 'hours');
};