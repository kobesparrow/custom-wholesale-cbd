import React, { Component } from 'react';

class CompanyInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      companyName: '',
      address: '',
      phone: '',
      companyEntered: false
    }
  }

  componentDidMount = () => {
    let existingCompany = this.props.company
    if (this.props.company.companyEntered) {
      this.setState({ 
        companyName: existingCompany.companyName,
        address: existingCompany.address,
        phone: existingCompany.phone
      })
    }
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ companyEntered: true }, () => this.props.createCompany(this.state))
  }
  
  render() {
    return <section className="company-form">
        <form>
          <input 
            type="text" 
            placeholder="Company Name"
            name="companyName"
            value={ this.state.companyName}
            onChange={ this.handleChange }
          />
          <input 
            type="text" 
            placeholder="Address"
            name="address"
            value={ this.state.address}
            onChange={ this.handleChange }
          />
          <input 
            type="text" 
            placeholder="Phone"
            name="phone"
            value={ this.state.phone}
            onChange={ this.handleChange }
          /> 
        <button onClick={ this.handleClick }>SUBMIT</button>
        </form>
      </section>
  }
}

export default CompanyInfo;