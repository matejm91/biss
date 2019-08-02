import React from 'react';
import ReactTable from 'react-table';
import { CSVLink, CSVDownload } from 'react-csv';

import 'react-table/react-table.css';
import './App.css';
import worker_script from './webWorker';

let myWorker;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [];
    this.data = [];

    this.state = {
      results: [],
      timeExpired: false
    };
  }

  componentDidMount() {
    myWorker = new Worker(worker_script);

    myWorker.onmessage = m => {
      this.data.unshift(m.data);
      this.setState({
        results: this.data
      });
    };
    myWorker.postMessage('im from main');

    setTimeout(() => {
      myWorker.terminate();
      myWorker = undefined;
    }, 1000 * 60 * 60);
  }

  initColumns = () => {
    this.columns = [
      {
        Header: <span>Date & time</span>,
        accessor: 'datetime',
        Cell: props => {
          let time = new Date(props.value).getTime();
          let date = new Date(time);
          return date.toString();
        }
      },
      {
        Header: <span>USD</span>,
        accessor: 'USD'
      },
      {
        Header: <span>JPY</span>,
        accessor: 'JPY'
      },
      {
        Header: <span>EUR</span>,
        accessor: 'EUR'
      },
      {
        Header: <span>HRK</span>,
        accessor: 'HRK'
      }
    ];
  };

  render() {
    this.initColumns();

    const csvData = this.data.map(record => {
      return {
        datetime: record.datetime,
        USD: record.USD,
        JPY: record.JPY,
        EUR: record.EUR,
        HRK: record.HRK
      };
    });

    return (
      <div className="App">
        <ReactTable
          data={this.data}
          columns={this.columns}
          filterable={true}
          sortable={true}
          defaultPageSize={10}
        />
        <CSVLink data={csvData} target="_blank">
          Download file
        </CSVLink>
      </div>
    );
  }
}

export default App;
