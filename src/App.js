import React from 'react';
import Swal from 'sweetalert2';
// local modules
import buildInfo from './buildInfo';

// TODO: Validate actual page count is not greater than total page count
// TODO: convert SWAL2 to Toastify https://www.npmjs.com/package/react-toastify

let dashes = '='.repeat(80);
let buildDate = new Date(buildInfo.buildDate);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageCountGoodreads: localStorage.getItem('pageCountGoodreads') || 0,
      pageCountActual: localStorage.getItem('pageCountActual') || 0,
      currentPage: localStorage.getItem('currentPage') || 0,
      adjustedPage: localStorage.getItem('adjustedPage') || 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  componentDidMount() {
    console.log(dashes);
    console.log('Goodreads Page Adjuster');
    console.log('By John M. Wargo (john@johnwargo.com)');
    console.log(`Build: ${buildInfo.buildVersion} - ${buildDate.toString()}`);    
    console.log(dashes);

    this.calculateAdjustedPage();
  }

  calculateAdjustedPage() {
    let adjustedPage;
    if (
      // Do we actually have valid page and pages values?
      this.state.pageCountGoodreads > 0 &&
      this.state.pageCountActual > 0 &&
      this.state.currentPage > -1) {
      // If the two page counts are the same, ...
      if (this.state.pageCountGoodreads === this.state.pageCountActual) {
        // then we have nothing to do, just use the current page as the page number
        adjustedPage = this.state.currentPage;
      } else {
        // otherwise, we need to adjust the current page        
        let theRatio = 1 / (this.state.pageCountActual / this.state.pageCountGoodreads);
        adjustedPage = Math.floor(this.state.currentPage * theRatio);
      }
      this.setState({ adjustedPage });
    }
  }

  handleChange(event) {
    let newVal = parseInt(event.target.value);
    this.setState({ [event.target.id]: newVal },
      () => {
        localStorage.setItem([event.target.id], newVal);
        this.calculateAdjustedPage();
      });
  }

  handleCopy(event) {
    console.log("Copy button clicked");
    if (this.state.adjustedPage > 0) {
      navigator.clipboard.writeText(this.state.adjustedPage.toString());
      Swal.fire({
        icon: 'information',
        title: 'Page Number Copy',
        text: `Copied Adjusted Page number (${this.state.adjustedPage}) to clipboard.`,
        timer: 1000
      })
    }
  }

  render() {
    return (
      <div>
        <main>
          <section>
            <h1>Goodreads Page Adjuster</h1>
            <p>Goodreads is a great application for tracking your reading activity, but its page count for some books is often inaccurate (flat out wrong from including notes, appendices, and other stuff in the page count). In order to get Goodreads to display an accurate completion percentage, you must adjust your current page read to accommodate; this application does it for you.</p>
            <form>
              <label for="currentPage">Current Page</label>
              <input type="number" id="currentPage" name="currentPage" value={this.state.currentPage}
                onChange={this.handleChange} size="20" />
              <label for="pageCountActual">Book (actual) Page Count</label>
              <input type="number" id="pageCountActual" name="pageCountActual" value={this.state.pageCountActual}
                onChange={this.handleChange} size="20" />
              <label for="pageCountGoodreads">Goodreads Page Count</label>
              <input type="number" id="pageCountGoodreads" name="pageCountGoodreads" value={this.state.pageCountGoodreads}
                onChange={this.handleChange} size="20" />
              <label for="adjustedPage">Goodreads Adjusted Page Number</label>
              <input type="number" readonly id="adjustedPage" name="adjustedPage" value={this.state.adjustedPage} size="20" />
              <br />
              <button disabled={!this.state.adjustedPage > 0} onClick={this.handleCopy}>Copy Result</button>
            </form>
          </section>
        </main>
        <footer>
          <hr />
          <p>
            <small><a href="" target="_blank">John M. Wargo</a> | <a href="https://johnwargo.com/posts/2022/accurately-calculating-progress-in-goodreads/" target="_blank">About</a> | <a href="https://github.com/johnwargo/goodreads-page-adjuster" target="_blank">Source Code</a></small>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;