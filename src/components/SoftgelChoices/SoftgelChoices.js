import React, { Component } from 'react';
import LogoSelector from '../LogoSelector/LogoSelector';


class SoftgelChoices extends Component {
  constructor() {
    super()

    this.state = {
      selectionName: 'quantity',
      selectionValue: 100
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.updateSelectionsObject(this.state);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ selectionName: name, selectionValue: value });
  }

  handleChangeNoButton = (event) => {
    const { name, value } = event.target
    this.setState({ selectionName: name, selectionValue: value }, () => this.handleClick(event))
  }

  displayChoice = (status) => {
    switch (status) {
      case 'quantity':
        return <article>
          <h4>Please select the number of bottles you're interested in:</h4>
          <form className="company-form">
            <input
              type="number"
              placeholder="100"
              name="quantity"
              value={ this.state.selectionValue }
              onChange={ this.handleChange }
            />
            <button onClick={ this.handleClick }>SUBMIT</button>
          </form>
        </article>
      case 'softgelSize':
        return <article>
            <h4>Please select your softgel size:</h4>
            <form>
              <input type="radio" id="15mg" name="softgelSize" value="15mg" onChange={this.handleChangeNoButton} />
              <label for="15mg">15mg</label>
              <input type="radio" id="25mg" name="softgelSize" value="25mg" onChange={this.handleChangeNoButton} />
              <label for="25mg">25mg</label>
            </form>
          </article>
      case 'carrier':
        return <article>
            <h4>Please select your carrier oil:</h4>
            <form>
              <input type="radio" id="wheat-germ-oil" name="carrier" value="Wheat Germ Oil" onChange={ this.handleChangeNoButton } />
              <label for="wheat-germ-oil">Wheat Germ Oil</label>
              <input type="radio" id="mct-oil" name="carrier" value="MCT Oil" onChange={ this.handleChangeNoButton } />
              <label for="mct-oil">MCT Oil</label>
            </form>
          </article>
      case 'spectrum':
        return <article>
            <h4>Please select your spectrum:</h4>
            <form>
              <input type="radio" id="full-spectrum" name="spectrum" value="Full Spectrum" onChange={ this.handleChangeNoButton } />
              <label for="full-spectrum">Full Spectrum</label>
              <input type="radio" id="broad-spectrum" name="spectrum" value="Broad Spectrum" onChange={ this.handleChangeNoButton } />
              <label for="broad-spectrum">Broad Spectrum</label>
            </form>
          </article>
      case 'potency':
        return <article>
            <h4>Please select your potency per serving:</h4>
            <form>
              <input type="radio" id="15mg" name="potency" value="15 mg" onChange={ this.handleChangeNoButton } />
              <label for="15mg">15 mg</label>
              <input type="radio" id="25mg" name="potency" value="25 mg" onChange={ this.handleChangeNoButton } />
              <label for="25mg">25 mg</label>
            </form>
          </article>
      case 'softgelPerBottle':
        return <article>
            <h4>Please select the number of softgels per bottle:</h4>
            <form>
              <input type="radio" id="30-softgels" name="softgelPerBottle" value="30" onChange={ this.handleChangeNoButton } />
              <label for="30-softgels">30 softgels per bottle</label>
              <input type="radio" id="60-softgels" name="softgelPerBottle" value="60" onChange={ this.handleChangeNoButton } />
              <label for="60-softgels">60 softgels per bottle</label>
            </form>  
          </article> 
      case 'logo':
        return <article>
            <LogoSelector setLogoChoice={ this.props.setLogoChoice } />
          </article>
      default:
        return <div>We're sorry, something seems to have gone wrong. Please reload the page.</div>
    }
  }

  render() {
    // let backButton

    // if (this.state.selectionName !== 'quantity') {
    //   backButton = <button onClick={ this.props.regressDisplay }>Previous Option</button>
    // } else {
    //   backButton = <button onClick={ this.props.backToCompanyInfo }>BACK</button>
    // }

    return <section className="softgel-choices">
        <h3>Private Label Softgels</h3>
        <button className="back-button" onClick={ this.props.startOver }>PRODUCTS</button>
        { this.displayChoice(this.props.currentDisplay) }
      </section>
  }
}

export default SoftgelChoices;