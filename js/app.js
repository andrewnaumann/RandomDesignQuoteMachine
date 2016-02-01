$(document).ready(function(){
  generateQuote();
});

var button = document.querySelector('.js-button');
var quoteHTML = "";
var quoteText = "";

button.addEventListener('click', function(event) {
  generateQuote();
});

function updateUI(data) {
  quoteHTML = data;
  quoteText = $(quoteHTML).text();
  $('.quote').html(quoteHTML);
  updateUIColors();
}

$('.twitter-share-button').on('click', function(event) {
  event.preventDefault;
  window.open("http://www.twitter.com/intent/tweet?text=" + quoteText);
})

function generateQuote() {
  $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function ( data ) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        var html = post.content + "<p>- "+post.title+"</p>";
        updateUI(html);
      },
      cache: false
    });
}



// RGB color functions

function randomRGBColor( min, max) {
  var rgb = [];
  for (var i = 0; i < 3; i++) {
    rgb[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return rgb;
}

function rgbToCSS(rgb) {
  return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

function generateColorScheme() {
  var primaryRGB = [];
  var secondaryRGB = [];
  primaryRGB = randomRGBColor(50, 200);
  for (var i = 0; i < 3; i++) {
    secondaryRGB[i] = primaryRGB[i] + Math.floor(primaryRGB[i] * .5);
  }
  return [primaryRGB, secondaryRGB];
}


function updateUIColors() {
  var colors = generateColorScheme();
  // Primary colors
  $('body, .button').css('background', rgbToCSS(colors[0]));
  $('a').css('color', rgbToCSS(colors[0]));
  // Secondary colors
  $('.quote p, .twitter-share-button, .button').css('color', rgbToCSS(colors[1]));
  $('.button').css('border-color', rgbToCSS(colors[1]));
}