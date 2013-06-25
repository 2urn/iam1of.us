/**********************************************
********* Created by Cristina Solana *********
***********************************************/

$(document).ready(function() {

    var censusAPI = 'http://api.census.gov/data/2010/sf1?key=4afef4231e416aa5174ae7e6c00e6a787720c61f&get=',
        $resultUser = $('#resultUser'),
        $resultTotalPop = $('#resultTotalPop');

    function returnUserPostal() {
        var $userPostal = $('#zipCode').val();
        return $userPostal;
    }

    function returnUserState() {
        var $userState = $('#state').val();
        return $userState;
    }

    // NOTE: Abstract age and gender check into function?
    function getUserData() {

        var $userGender = $('#gender').val(),
            $userRace = $('input:checked', '#race').val(),
            $userAge,
            userAgeStr,
            $userAgeCode;

        if  ( $('#age').val() <= 9 ) {

            if ( $('#gender').val() === "1" ) { // female
                $userAge = +$('#age').val() + 6;
                userAgeStr = $userAge.toString();
                $userAgeCode = "0" + userAgeStr;
            } else { // male
                $userAge = +$('#age').val() + 3;
                userAgeStr = $userAge.toString();
                $userAgeCode = "0" + userAgeStr;
            }

        } else {

            if ( $('#gender').val() === "1" ) { // female
                $userAge = +$('#age').val() + 6;
            } else { // male
                $userAge = +$('#age').val() + 3;
            }

        }

        $.getJSON(censusAPI + 'PCT012' + $userRace + $userGender + $userAge + '&for=zip+code+tabulation+area:' + returnUserPostal() +'&in=state:' + returnUserState(), function(data) {

            $resultUser.html('<span>I am one of</span>' + '<div class="count">' + data[1][0] + '</div>' + $('#age').val() + ' ' + 'year old, ' + $('input:checked', '#race').attr('name') + ', ' + ' ' + $('#gender option:selected').text() + 's</span>');

        });

    }

    function getTotalPop() {

        var $userStateName = $('#state option:selected').attr('name');

        $.getJSON(censusAPI + 'P0010001&for=zip+code+tabulation+area:' + returnUserPostal() + '&in=state:' + returnUserState(), function(data) {

            $resultTotalPop.html('<span>from a total population of</span>' + '<div class="count">' + data[1][0] + '</div>' + '<span>in ' + $userStateName + ' zipcode ' + returnUserPostal() + '</span>');

        });

    }

    function getStateList() {

        $.getJSON(censusAPI + 'P0010001,NAME&for=state:*', function(data) {

            $.each(data, function(i, item) {

                $('#state').append('<option name="' + data[i][1] + '" value="' + data[i][2] + '">' + data[i][1] + '</option>');

            });

        });

    }

    getStateList();

    // Events

    $("button").click(function() {
        
        getUserData();
        getTotalPop();

    });

});


// census api key: 4afef4231e416aa5174ae7e6c00e6a787720c61f

// TODO: 
// need to account for yr of census in age calc, subtract number of yrs from census to current from age but still display current age

// Finish:

    // NOTE: Finish this.
    // function getUserPerc() {
    
    // }

    // $('#search').keyup(function(event){
    //     if(event.keyCode === 13){
    //         validateForm();
    //     }
    // });

    // NOTE: Finish this.
    // function validateForm() {

    //     var $getZip = $('#zipCode').val();

    //     if ($getZip === '') {
    //         $resultTotalPop.after('<div id="error" class="result">Please enter something.</div>');
    //     }

    //     Age : number only

    //     if ($userAge.type != number) {
    //         $resultTotalPop.after("<h2>Please enter a number.</h2>");
    //     }

    // }