//variable list
var $currentDay = $("#currentDay");
var $timeBlock = $(".time-block");
var $scheduleArea = $(".schedule");
var items = [];

 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");


function createTimeSlot(){
    $timeBlock.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));


      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function beginScheduler(){

    $timeBlock.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
  
      var todo = {
        hour: thisBlockHr,
        text: "",
      }
      items.push(todo);
    });
  
    localStorage.setItem("todos", JSON.stringify(items));
  
  }



$(document).ready(function(){
  createTimeSlot();

  if(!localStorage.getItem("todos")){
    beginScheduler();
  } 

  $currentDay.text(currentDate);
  renderSchedule();
  $scheduleArea.on("click", "button", saveFunction);
  
});
