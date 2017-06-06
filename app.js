$(function () {
   createMarket();
   $("#popup").hide();

   $( ".f-buy" ).click(function() {
      // console.log($( this ).parent().attr('food-id'));
      addToCart(parseInt($(this).parent().attr('food-id')));
   });

   $( "#buy" ).click(function() {
      buy();
   });
});