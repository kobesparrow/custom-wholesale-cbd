import React, { Component } from 'react';
import TinctureChoices from '../TinctureChoices/TinctureChoices';
import SelectionDisplay from '../SelectionDisplay/SelectionDisplay';
import ProgressBar from '../ProgressBar/ProgressBar';
import SoftgelChoices from '../SoftgelChoices/SoftgelChoices';  
import TopicalsChoices from '../TopicalsChoices/TopicalsChoices';
import LabelCreator from '../LabelCreator/LabelCreator';
import CompanyInfo from '../CompanyInfo/CompanyInfo';
import TinctureChoice from '../../images/form-options/tincture-icon.jpg';
import SoftgelChoice from '../../images/form-options/softgel-icon.jpg'
import TopicalChoice from '../../images/form-options/topical-icon.jpg';


class ProgressiveForm extends Component {
  constructor() {
    super()

    this.state = {
      selections: {},
      pricing: {},
      currentDisplay: 0,
      stashedDisplay: undefined,
      productSelected: 'products',
      logoChoice: undefined,
      company: { companyEntered: false },
      stashedProduct: '',
      progress: 'open'
    }
  }

  updateSelectionsObject = (selection) => {
    let updatedSelections = { ...this.state.selections, [selection.selectionName]: selection.selectionValue }
    
    if (this.state.stashedDisplay) {
      let newDisplay = this.state.stashedDisplay
      this.setState({ selections: updatedSelections, currentDisplay: newDisplay, stashedDisplay: undefined })
    } else {
      let newDisplay = this.state.currentDisplay + 1
      this.setState({ selections: updatedSelections, currentDisplay: newDisplay  })
    }
  }

  createCompany = (company) => {
    this.setState({ company, productSelected: this.state.stashedProduct });
  }

  // progressDisplay = () => {
  //   this.setState({ currentDisplay: this.state.currentDisplay++ })
  // }

  updateDisplay = (display) => {
    let stashedDisplay = this.state.currentDisplay;
    this.setState({ currentDisplay: display, stashedDisplay })
  }

  regressDisplay = () => {
    let newDisplay = this.state.currentDisplay - 1;
    this.setState({ currentDisplay: newDisplay })
  }

  updateProductSelection = (product) => {
    this.setState({ productSelected: 'company', stashedProduct: product })
  }

  setLogoChoice = (logo) => {
    this.setState({ logoChoice: logo, progress: 'button' })
  }

  startOver = () => {
    this.setState({ selections: {}, currentDisplay: 0, productSelected: 'products', logoChoice: undefined })
  }

  backToCompanyInfo = () => {
    this.setState({ productSelected: 'company' })
  }

  buildTheBrand = () => {
    this.setState({ progress: 'close' })
    console.log('test')
  }

  selectProduct = (selection) => {
    switch (selection) {
      case 'company':
        return <section>
            <button onClick={ this.startOver } className="back-button">BACK</button>
            <p>Your company name will appear on the label, and the contact info below that.</p>
            <p>Enter your information below</p>
            <CompanyInfo 
              createCompany={ this.createCompany } 
              company={ this.state.company }
            />
          </section> 
      case 'products':
        return <section className="intro-page">
            <h2>Create your own private label CBD products in less than three minutes</h2>
            <p>To get started select a product below:</p>
            <form>
              <button onClick={ () => this.updateProductSelection('tinctures') } className="product-button" ><img src={ TinctureChoice } className="product-choice-image" />Tinctures</button>
              <button onClick={ () => this.updateProductSelection('softgels') } className="product-button" ><img src={ SoftgelChoice } className="product-choice-image" />Softgels</button>
              <button onClick={ () => this.updateProductSelection('topicals') } className="product-button" ><img src={ TopicalChoice } className="product-choice-image" />Lotions</button>
            </form>
          </section>
      case 'tinctures':
        return <TinctureChoices 
            currentDisplay={ this.state.currentDisplay } 
            updateSelectionsObject={ this.updateSelectionsObject }
            setLogoChoice={ this.setLogoChoice }
            regressDisplay={ this.regressDisplay }
            backToCompanyInfo={ this.backToCompanyInfo }
          />
      case 'softgels':
        return <SoftgelChoices
          currentDisplay={this.state.currentDisplay}
          updateSelectionsObject={this.updateSelectionsObject}
          setLogoChoice={ this.setLogoChoice }
          regressDisplay={ this.regressDisplay }
          backToCompanyInfo={ this.backToCompanyInfo }
        />
      case 'topicals':
        return <TopicalsChoices
          currentDisplay={ this.state.currentDisplay }
          updateSelectionsObject={ this.updateSelectionsObject }
          setLogoChoice={ this.setLogoChoice }
          regressDisplay={ this.regressDisplay }
          backToCompanyInfo={ this.backToCompanyInfo }
        />
      default:
        return <p>Something went wrong with the selectProduct switch statement.</p>
    }
  }

  render() {
    let startOverButton
    let progressiveForm

    if (this.state.productSelected !== 'products') {
      startOverButton = <button onClick={ this.startOver }>RESET</button>
    }

    if (this.state.progress === 'open') {
      progressiveForm = <div>
        <section className="selection-area">
          <SelectionDisplay
            currentSelections={ this.state.selections }
            updateDisplay={ this.updateDisplay}
          />
          { this.selectProduct(this.state.productSelected) }
          {/* <SelectionDisplay
            currentSelections={ this.state.selections }
            updateDisplay={ this.updateDisplay}
          /> */}
        </section>
        <section className="created-label">
          <LabelCreator 
            currentSelections={ this.state.selections } 
            logoChoice={ this.state.logoChoice }
            productSelected={ this.state.productSelected }
            company={ this.state.company }
          />
        </section>
        {/* <ProgressBar currentDisplay={ this.state.currentDisplay } /> */}
        { startOverButton }
        </div>
    } else if (this.state.progress === 'button') {
      progressiveForm = <button onClick={ this.buildTheBrand }>BUILD MY BRAND</button>
    } else {
      progressiveForm = <div>
        <section className="selection-area">
          {/* { this.selectProduct(this.state.productSelected) } */}
          <h3>HERE IS YOUR FINISHED PRODUCT</h3>
          {/* <SelectionDisplay
            currentSelections={ this.state.selections }
            updateDisplay={ this.updateDisplay}
          /> */}
        </section>
        <section className="created-label">
          <LabelCreator 
            currentSelections={ this.state.selections } 
            logoChoice={ this.state.logoChoice }
            productSelected={ this.state.productSelected }
            company={ this.state.company }
          />
        </section>
        {/* <ProgressBar currentDisplay={ this.state.currentDisplay } /> */}
        { startOverButton }
        </div>
    }

    return (
      <section className="progressive-form">
        { progressiveForm }
        {/* <section className="selection-area">
          { this.selectProduct(this.state.productSelected) }
          <SelectionDisplay
            currentSelections={ this.state.selections }
            updateDisplay={ this.updateDisplay}
          />
        </section>
        <section className="created-label">
          <LabelCreator 
            currentSelections={ this.state.selections } 
            logoChoice={ this.state.logoChoice }
            productSelected={ this.state.productSelected }
            company={ this.state.company }
          />
        </section>
        <ProgressBar currentDisplay={ this.state.currentDisplay } />
        { startOverButton } */}
      </section>
    );
  }
}

export default ProgressiveForm;