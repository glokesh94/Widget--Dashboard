    var app = angular.module("myApp", []);
    var query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(2211027)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

    function updateClock ( )
        {
        var currentTime = new Date ( );
        var currentHours = currentTime.getHours ( );
        var currentMinutes = currentTime.getMinutes ( );
        var currentSeconds = currentTime.getSeconds ( );

        // Pad the minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

        // Choose either "AM" or "PM" as appropriate
        var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

        // Convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

        // Convert an hours component of "0" to "12"
        currentHours = ( currentHours == 0 ) ? 12 : currentHours;

        // Compose the string for display
        var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;


        $("#digiClock").html(currentTimeString);

     }

    app.factory('weatherPlugin', ['$http', '$q', function ($http, $q){
          function getWeather() {
            var deferred = $q.defer();
            $http.get(query)
            .success(function(data){deferred.resolve(data.query.results.channel);}).
            error(function(err){deferred.reject(err);});
            return deferred.promise;
          }
          return {getWeather: getWeather};
    }]);

    app.controller("weatherController",['$scope','weatherPlugin',function($scope,weatherPlugin){
        console.log("Hello");
        weatherPlugin.getWeather().then(function(data){
            $scope.place = data;
            console.log(data);
        });
    }]);


    app.controller('TableController',TableController);

      function TableController(){
        var current=this,
            date=new Date(),
            dates=[31,28,31,30,31,30,31,31,30,31,30,31],
            months=["January", "February", "March", "April", "May", "June","July", "August",
                     "September", "October", "November", "December"];

        current.month		=	date.getMonth();
        current.monthName	=	months[current.month];
        current.year		=   date.getFullYear();
        current.todaysDate  =	date.getDate();

        var monthStartDate  	=	new Date(date.getFullYear(), current.month,1);
        current.monthStartDay	=	monthStartDate.getDay();
        var weeksInMonth 		=	Math.floor((dates[current.month]+date.getDay())/7);

        dates[1]+=CheckLeapYear(current.year)?1:0;   
        current.week=[];
        date_number=1;
        for(i=0; i < weeksInMonth; i++){
          current.week[i]=[];

          for(j=0; j<7; j++){
            if(i==0 && j < current.monthStartDay){ // Setting first week       
              current.week[i][j]="";
            }
            else{
              if(date_number <= dates[current.month]){
                current.week[i][j]=date_number;
                date_number++;
              }          
            }
          }// end for dates
        }// end for week

        function CheckLeapYear(year){
          return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        }

      }


    $(document).ready(function()
    {
         setInterval('updateClock()', 1000);
         $(".digital").hide();       
         $(".wd").hide();
         $(".calendarContainer").hide();
          
                $(".container1").click(container1Zoom);
                $(".container2").click(container2Zoom);
                $(".container3").click(container3Zoom);

    });

function container1Zoom() {
       $(".digital").show();
       $(".myButton").remove();


       $(".container2").hide();
       $(".container3").hide();

        $( '.container1' ).width( screen.width-100);
        $( '.container1' ).height( screen.height-200 );

        $( '.container0' ).append("<button class = \"myButton\">Back To Dashboard</Button>")
            .click(function (){

             $(".container2").show();
             $(".container3").show();
             $(".container1" ).width( 360 );
             $(".container1" ).height( 455 );
             $(".myButton").remove();
             $(".digital").hide();
        });

}

function container2Zoom() {
   
       $(".myButton").remove();
       $(".wc").hide();
       $(".wd").show();

       $(".container1").hide();
       $(".container3").hide();

        $( '.container2' ).width( screen.width-100);
        $( '.container2' ).height( screen.height );
        

        $( '.container0' ).append("<button class = \"myButton\">Back To Dashboard</Button>")
            .click(function (){

             $(".container1").show();
             $(".container3").show();
             
            
             $(".container2" ).width( 360 );
             $(".container2" ).height( 455 );
             $(".myButton").remove();
             $(".wd").hide();
             $(".wc").show();
                   
        });

}

function container3Zoom() {
   
       $(".myButton").remove();
       $(".smallCal").hide();
       $(".calendarContainer").show();

       $(".container1").hide();
       $(".container2").hide();

        $( '.container3' ).width( screen.width-100);
        $( '.container3' ).height( screen.height );
        //$('.container1').append("<div id=\"digiClock\"></div>");

        $( '.container0' ).append("<button class = \"myButton\">Back To Dashboard</Button>")
            .click(function (){

             $(".container1").show();
             $(".container2").show();
             
            
             $(".container3" ).width( 360 );
             $(".container3" ).height( 455 );
             $(".myButton").remove();
             $(".calendarContainer").hide();
             $(".smallCal").show();
                   
        });

}
                    
                   

    $(window).ready(function() {  
      $(".connect-icons a").hover(function(){
        $(".connect-box").toggleClass("color-"+ this.className );
        $(".text-"+ this.className).toggleClass("show");
      });
    });

// Globally head date object for the month shown
var date = new Date();

date.setDate(1);
date.setMonth(date.getMonth());


window.onload = function() {
    // Add the current month on load
    createMonth();
};

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            previousMonth();
            break;
        case 39:
            nextMonth();
            break;
    }
};

// Converts day ids to the relevant string
function dayOfWeekAsString(dayIndex) {
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex];
    }
    // Converts month ids to the relevant string
function monthsAsString(monthIndex) {
    return ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][monthIndex];
}

// Creates a day element
function createCalendarDay(num, day, mon, year) {
    var currentCalendar = document.getElementById("calendar");

    var newDay = document.createElement("div");
    var date = document.createElement("p");
    var dayElement = document.createElement("p");

    date.innerHTML = num;
    dayElement.innerHTML = day;

    newDay.className = "calendar-day ";

    // Set ID of element as date formatted "8-January" etc 
    newDay.id = num + "-" + mon + "-" +year;

    newDay.appendChild(date);
    newDay.appendChild(dayElement);
    currentCalendar.appendChild(newDay);
}

// Clears all days from the calendar
function clearCalendar() {
    var currentCalendar = document.getElementById("calendar");

    currentCalendar.innerHTML = "";

}

// Clears the calendar and shows the next month
function nextMonth() {
    clearCalendar();

    date.setMonth(date.getMonth() + 1);

    createMonth(date.getMonth());
}

// Clears the calendar and shows the previous month
function previousMonth() {
    clearCalendar();
    date.setMonth(date.getMonth() - 1);
    var val = date.getMonth();
    createMonth(date.getMonth());
}

// Creates and populates all of the days to make up the month
function createMonth() {
    var currentCalendar = document.getElementById("calendar");

    var dateObject = new Date();
    dateObject.setDate(date.getDate());
    dateObject.setMonth(date.getMonth());
    dateObject.setYear(date.getFullYear());

    createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()), monthsAsString(dateObject.getMonth()), dateObject.getFullYear());

    dateObject.setDate(dateObject.getDate() + 1);

    while (dateObject.getDate() != 1) {
        createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()), monthsAsString(dateObject.getMonth()), dateObject.getFullYear());
        dateObject.setDate(dateObject.getDate() + 1);
    }

    // Set the text to the correct month
    var currentMonthText = document.getElementById("current-month");
    currentMonthText.innerHTML = monthsAsString(date.getMonth()) + " " + date.getFullYear();

    getCurrentDay();
}


function getCurrentDay() {

    // Create a new date that will set as default time
    var todaysDate = new Date();
    var today = todaysDate.getDate();
    var currentMonth = todaysDate.getMonth();
    var currentYear = todaysDate.getFullYear();
    var thisMonth = monthsAsString(currentMonth);
    // Find element with the ID for today
    currentDay = document.getElementById(today + "-" + thisMonth + "-" + currentYear);
    currentDay.className = "calendar-day today";
}
