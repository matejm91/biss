const workercode = () => {
  this.onmessage = function(e) {
    var workerResult;
    const callApi = () => {
      fetch(
        'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR,HRK&api_key={afb4533647a9bc782d1b7ab42e47925196e60fead9004aaf687527cdd50c18c3}'
      )
        .then(res => res.json())
        .then(results => {
          results.datetime = Date.now('HH:mm:ss DD:MM:YYYY');

          workerResult = results;
          this.postMessage(workerResult);

          callApi();
        });
    };
    callApi();
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
