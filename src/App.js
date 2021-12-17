import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

import Swal from 'sweetalert2';

import buildInfo from './buildInfo';
import './App.css';

// Required features
// TODO: Add image to header
// TODO: Check that the current page isn't greater than the actual page count
// TODO: Make repo public

// Bonus
// TODO: Add footer to the bottom of the page

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      goodreadsPageCount: localStorage.getItem('goodreadsPageCount') || 0,
      actualPageCount: localStorage.getItem('actualPageCount') || 0,
      currentPage: localStorage.getItem('currentPage') || 0,
      adjustedPage: localStorage.getItem('adjustedPage') || 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
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

    this.calculateAdjustedPage();
  }

  calculateAdjustedPage() {
    // console.log("Calculating adjusted page");
    let adjustedPage;
    if (
      // Do we actually have valid page and pages values?
      this.state.goodreadsPageCount > 0 &&
      this.state.actualPageCount > 0 &&
      this.state.currentPage > -1) {
      // If the two page counts are the same, ...
      if (this.state.goodreadsPageCount === this.state.actualPageCount) {
        // then we have nothing to do, just use the current page as the page number
        adjustedPage = this.state.currentPage;
      } else {
        // otherwise, we need to adjust the current page        
        let theRatio = 1 / (this.state.actualPageCount / this.state.goodreadsPageCount);
        adjustedPage = Math.floor(this.state.currentPage * theRatio);
      }
      this.setState({ adjustedPage });
    }
    // else {
    //   console.log("Missing required page values");
    // }
  }

  handleChange(event) {
    // console.log(`Input field value changed (${event.target.id} => ${event.target.value})`);
    // write the current field value to state
    let newVal = parseInt(event.target.value);
    this.setState({ [event.target.id]: newVal },
      () => {
        // When saving state completes,
        // write the updated value to local storage
        localStorage.setItem([event.target.id], newVal);
        // then update the page number
        this.calculateAdjustedPage();
      });
  }

  handleCopy(event) {
    // Copies the calculated page number to the clipboard
    console.log("Copy button clicked");
    if (this.state.adjustedPage > 0) {
      navigator.clipboard.writeText(this.state.adjustedPage.toString());
      Swal.fire({
        icon: 'information',
        title: 'Page Number Copy',
        text: `Copied Adjusted Page number (${this.state.adjustedPage}) to clipboard.`
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>
            <div className="head-text">
              Goodreads Page Adjuster
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
                // defaultValue={this.state.currentPage}
                min="0"
                value={this.state.currentPage}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="actualPageCount">
              <Form.Label>Book (actual) Page Count</Form.Label>
              <Form.Control
                type="number"
                // defaultValue={this.state.actualPageCount}
                min="0"
                value={this.state.actualPageCount}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="goodreadsPageCount">
              <Form.Label>Goodreads Page Count</Form.Label>
              <Form.Control
                type="number"
                // defaultValue={this.state.goodreadsPageCount}
                min="0"
                value={this.state.goodreadsPageCount}
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

            <Button
              variant="primary"
              disabled={!this.state.adjustedPage > 0}
              onClick={this.handleCopy}>
              Copy Result
            </Button>
          </Form>
        </div>
      </div >
    );
  }
}

export default App;