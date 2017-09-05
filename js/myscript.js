$(
  function()
  {
    var temps = 200;
    var timmy;
    var fired = false;

    $(window).scroll(function(){
      console.log(fired);
      if ((document.body.scrollTop > 1200) && (fired == false)) {
        fired = true;
        console.log(fired);
        $('[class="progress-bar"]').each(function(){
          var jauge = $(this);
          timmy = setTimeout(function(){
            var valeur = jauge.attr('aria-valuenow');
            jauge.css('width',valeur + '%');
          },temps);
          temps += 600;
          //console.log(timmy);

      });

      console.log('cest bon');
    } else {
      if (document.body.scrollTop < 1100) {
        fired = false;
      }
      $('[class="progress-bar"]').each(function(){
        $(this).css('width','0%');
        timmy = -1;
        temps = 200;
      });
    };

  });
});
