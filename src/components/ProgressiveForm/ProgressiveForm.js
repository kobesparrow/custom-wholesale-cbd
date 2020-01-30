import React, { Component } from 'react';
import TinctureChoices from '../TinctureChoices/TinctureChoices';
import SelectionDisplay from '../SelectionDisplay/SelectionDisplay';
import ProgressBar from '../ProgressBar/ProgressBar';
import SoftgelChoices from '../SoftgelChoices/SoftgelChoices';  
import TopicalsChoices from '../TopicalsChoices/TopicalsChoices';
import LabelCreator from '../LabelCreator/LabelCreator';

class ProgressiveForm extends Component {
  constructor() {
    super()

    this.state = {
      selections: {},
      pricing: {},
      currentDisplay: 0,
      stashedDisplay: undefined,
      productSelected: 'products',
      logoChoice: undefined
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
    this.setState({ productSelected: product })
  }

  setLogoChoice = (logo) => {
    // console.log(logo)
    this.setState({ logoChoice: logo })
  }

  startOver = () => {
    console.log('test')
    this.setState({ selections: {}, currentDisplay: 0, productSelected: 'products', logoChoice: undefined })
  }

  selectProduct = (selection) => {
    switch (selection) {
      case 'products':
        return <form>
            <button onClick={ () => this.updateProductSelection('tinctures') }>Tinctures</button>
            <button onClick={ () => this.updateProductSelection('softgels') }>Softgels</button>
            <button onClick={ () => this.updateProductSelection('topicals') }>Lotions</button>
          </form>
      case 'tinctures':
        return <TinctureChoices 
            currentDisplay={ this.state.currentDisplay } 
            updateSelectionsObject={ this.updateSelectionsObject }
            // stashedDisplay={ this.state.stashedDisplay }
            setLogoChoice={ this.setLogoChoice }
          />
      case 'softgels':
        return <SoftgelChoices
          currentDisplay={this.state.currentDisplay}
          updateSelectionsObject={this.updateSelectionsObject}
          setLogoChoice={ this.setLogoChoice }
          // stashedDisplay={this.state.stashedDisplay}
        />
      case 'topicals':
        return <TopicalsChoices
          currentDisplay={ this.state.currentDisplay }
          updateSelectionsObject={ this.updateSelectionsObject }
          setLogoChoice={ this.setLogoChoice }
          // stashedDisplay={this.state.stashedDisplay}
        />
      default:
        return <p>Something went wrong with the selectProduct switch statement.</p>
    }
  }

  render() {

    let startOverButton

    if (this.state.productSelected !== 'products') {
      startOverButton = <button onClick={ this.startOver }>Start Over</button>
    } else {
      startOverButton = <p></p>
    }

    return (
      <section>
        { startOverButton }
        {/* <button onClick={ this.startOver }>Start Over</button> */}
        <button onClick={ this.regressDisplay }>Previous Option</button>
        <section className="selection-area">
          { this.selectProduct(this.state.productSelected) }
          <SelectionDisplay
            currentSelections={ this.state.selections }
            updateDisplay={ this.updateDisplay}
          />
        </section>
        <LabelCreator 
          currentSelections={ this.state.selections } 
          logoChoice={ this.state.logoChoice }
          productSelected={ this.state.productSelected }
        />
        <ProgressBar currentDisplay={ this.state.currentDisplay } />
      </section>
    );
  }
}

export default ProgressiveForm;