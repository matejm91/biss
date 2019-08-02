import React from 'react';
import ReactTable from 'react-table';

import { allResults, callApi } from './webWorker';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [];
    this.data = [];

    this.state = {
      results: [],
      timeExpired: false,
      isOn: false
    };
  }

  initColumns = () => {
    this.columns = [
      {
        Header: 'Date & time',
        accessor: 'datetime'
      },
      {
        Header: 'USD',
        accessor: 'USD'
      },
      {
        Header: 'JPY',
        accessor: 'JPY'
      },
      {
        Header: 'EUR',
        accessor: 'EUR'
      },
      {
        Header: 'HRK',
        accessor: 'HRK'
      }
    ];
  };

  isWorkerOn = () => {
    if (this.state.isOn) {
      callApi();
    } else {
      return;
    }
  };

  render() {
    console.log('rendering again?');
    let w;

    if (typeof Worker !== 'undefined' && typeof w === 'undefined') {
      console.log('test 1');
      this.setState({ isOn: true });
      w = new Worker(this.isWorkerOn());
    }

    setTimeout(() => {
      console.log('test 2');
      // callApi(true);
      this.setState({ isOn: false });
      w.terminate();
      w = undefined;
    }, 1000 * 6 /*0 * 60*/);
    this.initColumns();
    return (
      <ReactTable data={allResults} columns={this.columns} filterable={true} />
    );
  }
}

export default App;
