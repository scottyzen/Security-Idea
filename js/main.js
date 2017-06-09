var difference = [];
var times = [0];
var rythmPercent = [];
var liWidth;
var getKeyTime = function(){
  times.splice(0, 1);
  // when a key is pressed
  $("#input").keyup(function() {
    times.push(new Date().getTime());
  });
};
times.forEach(getKeyTime);
function doThis(e){
    if (e.which =='13' || e.type =='click'){
        $('#input, #go, #description').animate({
          opacity: 0
        }, 250).hide();
        $('.info').css({
          marginBottom : '-175px'
        });
        for (var i = 0; i < times.length; i++) {
          if(typeof times[i+1] === 'undefined'){
            difference.push(Math.abs(times[i] - times[i-1]));
          }else{
            difference.push(Math.abs(times[i] - times[i+1]));
          }
        }
        var total = difference.reduce(function (a, b) {return a + b;}, 0);
        difference.forEach(function(num){
          num = (num / total) * 100;
          num = Math.round(num);
          rythmPercent.push(num);
          return num;
        });
        liWidth = (1 / times.length) * 100;
        rythmPercent.forEach(function(per) {
            $("ul").append("<li style='height: " + per*2.5 + "%'></li>");
        });
        $('li').css('max-width', liWidth - 0.5+'%');
        $("ul").delay( 300 ).animate({
          height: "320px",
          paddingTop: 0,
          opacity: 1,
        }, 500 );
        $('.result').html('<h3>Rythm</h3><p>' + rythmPercent.join(",  ")+'</p>');
        $('#refresh').show();
    }
}
$(document)
    .on('click', '#go', doThis)
    .on('keypress', this, doThis);
