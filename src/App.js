/**********************************************************
 * Goodreads Page Adjuster
 * 
 * By John M. Wargo
 * https://github.com/johnwargo/goodreads-page-adjuster
 * 
 **********************************************************/

import React from 'react';
import buildInfo from './buildInfo';

// TODO: update screenshot in raadme
// TODO: convert SWAL2 to Toastify https://www.npmjs.com/package/react-toastify

let dashes = '='.repeat(80);
let buildDate = new Date(buildInfo.buildDate);
const theForbiddenWord = "for";

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

    this.setState({ adjustedPage: this.calculateAdjustedPage() });
  }

  calculateAdjustedPage() {
    let adjustedPage = this.state.currentPage;
    // Do we actually have valid page and pages values?
    if (this.state.pageCountGoodreads > 0 && this.state.pageCountActual > 0 && this.state.currentPage > -1) {
      // are the two page counts good?
      if (this.state.pageCountActual < this.state.pageCountGoodreads) {
        // calculate the ratio
        let theRatio = 1 / (this.state.pageCountActual / this.state.pageCountGoodreads);
        adjustedPage = Math.floor(this.state.currentPage * theRatio);
      }
    }
    return adjustedPage;
  }

  handleChange(event) {
    let newVal = parseInt(event.target.value);
    this.setState({ [event.target.id]: newVal },
      () => {
        localStorage.setItem([event.target.id], newVal);
        // recalculate based on the changed value
        this.setState({ adjustedPage: this.calculateAdjustedPage() });
      });
  }

  handleCopy(event) {
    console.log("Copy button clicked");
    event.preventDefault()
    if (this.state.adjustedPage > 0) {
      navigator.clipboard.writeText(this.state.adjustedPage.toString());
    }
  }

  render() {
    return (
      <div>
        <main>
          <section>
            <h1>Goodreads Page Adjuster</h1>
            <form>
              <p>Goodreads is an excellent web application {theForbiddenWord} tracking book reading activity. However, its page count is often inaccurate (flat out wrong from including notes, appendices, and other stuff in the page count). To get Goodreads to display an accurate completion percentage, you must adjust your current page read to accommodate; this application does it {theForbiddenWord} you.</p>
              <label htmlFor="currentPage">Current Page</label>
              <input type="number" id="currentPage" name="currentPage" value={this.state.currentPage}
                onChange={this.handleChange} size="20" />
              <label htmlFor="pageCountActual">Book (actual) Page Count</label>
              <input type="number" id="pageCountActual" name="pageCountActual" value={this.state.pageCountActual}
                onChange={this.handleChange} size="20" />
              <label htmlFor="pageCountGoodreads">Goodreads Page Count</label>
              <input type="number" id="pageCountGoodreads" name="pageCountGoodreads" value={this.state.pageCountGoodreads}
                onChange={this.handleChange} size="20" />
              <label htmlFor="adjustedPage">Goodreads Adjusted Page Number</label>
              <input type="text" readOnly id="adjustedPage" name="adjustedPage" value={this.state.adjustedPage} size="20" />
              <button disabled={!this.state.adjustedPage > 0} onClick={this.handleCopy}>Copy Result</button>

              <p><small><a href="https://johnwargo.com" target="_blank" rel="noopener noreferrer">John M. Wargo</a> | <a href="https://johnwargo.com/posts/2022/accurately-calculating-progress-in-goodreads/" target="_blank" rel="noopener noreferrer">About</a> | <a href="https://github.com/johnwargo/goodreads-page-adjuster" target="_blank" rel="noopener noreferrer">Source Code</a></small></p>
            </form>
          </section>
        </main>        
      </div>
    );
  }
}

export default App;