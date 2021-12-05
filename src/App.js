import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

import buildInfo from './buildInfo';
import './App.css';

// Required 
// TODO: Calculate page number
// TODO: Copy calculated value to clipboard
// TODO: Store state to local storage
// TODO: Read state from local storage on startup
// TODO: Add favicon

// Bonus
// TODO: Add image to header
// TODO: Add footer to the bottom of the page
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      goodreadsPageCount: 0,
      actualPageCount: 0,
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

  calculateAdjustedPage() {
    console.log("Calculating adjusted page");
    // Do we actually have valid pages and page counts?
    if (
      this.state.goodreadsPageCount > 0 &&
      this.state.actualPageCount > 0 &&
      this.state.currentPage > 0) {
      // Get our adjustment ratio
      let tempRatio = this.state.actualPageCount / this.state.goodreadsPageCount;
      console.log(`Ratio: ${tempRatio}`);
      // Make it positive or negative depending on which value is larger
      let multiplier = this.state.currentPage < this.state.goodreadsPageCount ? tempRatio : -tempRatio;
      console.log(`Multiplier: ${multiplier}`);
      // Add the adjustment to the page count
      let adjustedPage = Math.floor(this.state.currentPage + (this.state.currentPage * multiplier));
      this.setState({ adjustedPage });
    } else {
      console.log("Nothing to see here, move along");
    }
  }

  handleChange(event) {
    console.log(`Input field value changed (${event.target.id} => ${event.target.value})`);
    this.setState({ [event.target.id]: parseInt(event.target.value) },
      () => {
        console.table(this.state);
        this.calculateAdjustedPage();
      });
  }

  handleCopy(event) {
    // Copies the calculated page number to the clipboard
    console.log("Copy button clicked");
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

          <Form>
            <Form.Group className="mb-3" controlId="currentPage">
              <Form.Label>Current Page</Form.Label>
              <Form.Control
                type="number"
                defaultValue={this.state.currentPage}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actualPageCount">
              <Form.Label>Book (actual) Page Count</Form.Label>
              <Form.Control
                type="number"
                defaultValue={this.state.actualPageCount}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="goodreadsPageCount">
              <Form.Label>Goodreads Page Count</Form.Label>
              <Form.Control
                type="number"
                defaultValue={this.state.goodreadsPageCount}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="adjustedPage">
              <Form.Label>Goodreads Page Number (adjusted)</Form.Label>
              <Form.Control
                readOnly
                type="number"
                value={this.state.adjustedPage}
              />
            </Form.Group>

            <Button variant="primary" onClick={this.handleCopy}>
              Copy Result
            </Button>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

          </Form>


          {/* <form>
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
          </form> */}
          {/* <footer>By John M. Wargo</footer> */}
        </div>

      </div >
    );
  }
}

export default App;