$(document).ready(function() {
  const textarea = $('#tweet-text')
  textarea.keyup(function(){
    console.log(textarea.val())
    let characterCount = textarea.val().length;
    let maxChars = 140;
    let remaining  = maxChars - characterCount;
    const counter = $(this).siblings('.submit-tweet').children('.counter');
    counter.html(remaining).toggleClass('red-counter', remaining < 0);
  })
});