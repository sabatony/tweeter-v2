$(document).ready(function() {
  $('#tweet-text').on('input',function(){
    let characterCount = $(this).val().length;
    let maxChars = 140;
    let remaining  = maxChars - characterCount;
    const counter = $(this).siblings('.submit-tweet').children('.counter');
    counter.html(remaining).toggleClass('red-counter', remaining < 0);
  })
});