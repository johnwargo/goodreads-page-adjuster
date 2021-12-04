import React from 'react';
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
    console.log(`Build Number: ${buildInfo.buildVersion}`);
    const buildDate = new Date(buildInfo.buildDate);
    console.log(`Build Date: ${buildDate.toString()}`);
  }

  handleChange(event) {
    console.dir(event);
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Build Info</h1>
        </header>
        <p>Goodreads is a great application for tracking your reading activity, but its page count for some books is often inaccurate (flat out wrong or including apendices and notes in the page count). In order to get Goodreads to display an acurate completion percentage, you must adjust your current page read to accomodate. This application does it for you.</p>
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
      </div >
    );
  }
}

export default App;