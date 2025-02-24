/**********************************************************
 * Goodreads Page Adjuster
 * 
 * By John M. Wargo
 * https://github.com/johnwargo/goodreads-page-adjuster
 * 
 **********************************************************/

import React from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';

import buildInfo from './buildInfo';

const theForbiddenWord = "for";
const notify = () => toast("Page number copied");

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

    this.setState({ adjustedPage: this.calculateAdjustedPage() });
  }

  calculateAdjustedPage() {
    // get all the values we need
    let currentPage = this.state.currentPage;
    let adjustedPage = currentPage;
    let pageCountGoodreads = this.state.pageCountGoodreads;
    let pageCountActual = this.state.pageCountActual;
    // Make sure we have good data to work with
    if (pageCountGoodreads > 0 && pageCountActual > 0 && currentPage > -1) {
      // Can't have more than the actual page count
      if (currentPage > pageCountActual) return pageCountActual;

      let theRatio;
      if (pageCountActual < pageCountGoodreads) {
        theRatio = 1 / (pageCountActual / pageCountGoodreads);
        adjustedPage = Math.floor(currentPage * theRatio);
      } else {
        theRatio = currentPage / pageCountActual;
        adjustedPage = Math.floor(theRatio * pageCountGoodreads);
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
      notify();
    }
  }

  render() {
    return (
      <div>
        <header>
          <nav>
            <h1>Goodreads Page Adjuster</h1>
            <ul>
              <li><a href="https://johnwargo.com/posts/2022/accurately-calculating-progress-in-goodreads/"
                target="_blank" rel="noopener noreferrer">Blog</a></li>
              <li><a href="https://github.com/johnwargo/goodreads-page-adjuster" target="_blank" rel="noopener noreferrer">Code</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section>
            <p>Goodreads is an excellent web application {theForbiddenWord} tracking book reading activity. However, its page count is often inaccurate (flat out wrong from including notes, appendices, and other stuff in the page count). To get Goodreads to display an accurate completion percentage, you must adjust your current page read to accommodate; this application does it {theForbiddenWord} you.</p>
            <form>
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
              <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} newestOnTop={true} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Slide} />
            </form>
          </section>
        </main>
        <footer>
          <hr />
          <p><small>By <a href="https://johnwargo.com" target="_blank" rel="noopener noreferrer">John M. Wargo</a> | Like this? <a
            href="https://www.buymeacoffee.com/johnwargo" target="_blank" rel="noopener noreferrer">Buy me a coffee</a> | Styling by <a href="https://andybrewer.github.io/mvp/" target="_blank" rel="noopener noreferrer">MVP.css</a> | Hosted by <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a></small></p>
        </footer>
      </div>
    );
  }
}

export default App;