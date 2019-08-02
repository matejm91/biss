export let allResults = [];

export const callApi = terminated => {
  fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR,HRK&api_key={afb4533647a9bc782d1b7ab42e47925196e60fead9004aaf687527cdd50c18c3}'
  )
    .then(res => res.json())
    .then(results => {
      console.log('%c⧭', 'color: #00a3cc', 1);
      results.datetime = Date.now('HH:mm:ss DD:MM:YYYY');

      allResults.push(results);

      if (terminated) {
        console.log('terminated');
        return;
      }
      callApi();
    });
};
