//const stripe = Stripe('pk_test_rAnUPVRR97LqQVxtGzHdZxD200K9SEFByX'); // Your Publishable Key
const stripe = Stripe('pk_live_eiJWiUQtsvN5yCq4cogimEvi00MALVCQ3l'); // Your Publishable Key
const elements = stripe.elements();

console.log('ran');

// Create our card inputs
var style = {
  base: {
    color: "#000"
  }
};

const card = elements.create('card', { style });
card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
  e.preventDefault();

  stripe.createToken(card).then(res => {
    if (res.error) errorEl.textContent = res.error.message;
    else stripeTokenHandler(res.token);
  })
})