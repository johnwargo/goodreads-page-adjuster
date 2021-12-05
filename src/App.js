import React from 'react';
import { Navbar } from 'react-bootstrap';

import buildInfo from './buildInfo';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      goodreadsPageCount: 0,
      actualPagecount: 0,
      currentPage: 0,
      adjustedPage: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let dashes = '='.repeat(80);
    let buildDate = new Date(buildInfo.buildDate);

    console.log(dashes);
    console.log('Goodreads Page Converter');
    console.log('By John M. Wargo (john@johnwargo.com)');
    console.log(`Build: ${buildInfo.buildVersion} - ${buildDate.toString()}`);
    console.log('(build information generated using my react-build-info package: https://www.npmjs.com/package/react-build-info)');
    console.log(dashes);
  }

  handleChange(event) {
    console.dir(event);
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>
            <div className="head-text">
              Goodreads Page Converter
            </div>
          </Navbar.Brand>
        </Navbar>

        <div className="page-body">
          <p>Goodreads is a great application for tracking your reading activity, but its page count for some books is often inaccurate (flat out wrong or including appendices and notes in the page count). In order to get Goodreads to display an accurate completion percentage, you must adjust your current page read to accommodate. This application does it for you.</p>
          <form>
            <label>
              Current Page:
              <input type="text" id="currentPage" value={this.state.currentPage} onChange={this.handleChange} />
            </label>
            <br /><br />
            <label>
              Actual Page Count:
              <input type="text" id="actualPage" value={this.state.actualPagecount} onChange={this.handleChange} />
            </label>
            <br /><br />
            <label>
              Goodreads Page Count:
              <input type="text" value={this.state.goodreadsPageCount} onChange={this.handleChange} />
            </label>
            <br /><br />
            <label>
              Adjusted Page:

            </label>
            <br /><br />
          </form>
          <footer>By John M. Wargo</footer>
        </div>

      </div >
    );
  }
}

export default App;