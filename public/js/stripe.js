var handler = StripeCheckout.configure({
  key: 'pk_test_rAnUPVRR97LqQVxtGzHdZxD200K9SEFByX',
  image: '/images/rsLogo.png',
  locale: 'auto',
  token: function(token) {
  $("#stripeToken").val(token.id);
  $("#stripeEmail").val(token.email);
  $("#myForm").submit();
  }
});

document.getElementById('customButton').addEventListener('click', function(e) {
  // Open Checkout with further options:
  
  var b = document.getElementById('hello').value;
  
  handler.open({
    name: 'Refugio Seguro',
    description: 'Offering',
    amount: Math.round(b * 100)
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});