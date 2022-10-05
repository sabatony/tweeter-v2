/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





const renderTweets = function(tweets) {
  $('.tweet-container').empty();
  for(const tweet of tweets){
    let tweetElement = createTweetElement(tweet);
    $('.tweet-container').prepend(tweetElement);
  }
}

const createTweetElement = function(tweet) {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const safeHTML = `
  <article>
  <header>
    <div id="avatar">
      <img src="${escape(tweet.user.avatars)}" alt="">
      <h3>${escape(tweet.user.name)}</h3>
    </div>
    <h4 id="username">${escape(tweet.user.handle)}</h4>
  </header>
  <main>
    <p>${escape(tweet.content.text)}</p>
  </main>
  <footer id="tweet-foot">
    <div class="foot-content">
    <p>
    ${timeago.format(tweet.created_at)}
    </p>
    <div id="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-repeat"></i>
      <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </footer>
</article>
  `;
  return safeHTML;
}

$(document).ready(function(){

  $('form').on('submit', function(e) {
    e.preventDefault();
    $('#short-error').slideUp();
    $('#long-error').slideUp();
    const tweetData = e.target[0].value

    if (tweetData === '') {
      return $('#short-error').slideDown('slow');
    }

   if(tweetData.length > 140) {
     return $('#long-error').slideDown('slow');
   }
    console.log('data being sent');
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    })
    .then(function() {
      loadTweets();
    })
  })

 
});

const loadTweets = function() {
  $.ajax({
    type: 'GET',
    url: '/tweets',
  })
  .then(function(data) {
    renderTweets(data);
    $('#tweet-text').val('');
    $('.counter').val(140);

  })
}

loadTweets();
