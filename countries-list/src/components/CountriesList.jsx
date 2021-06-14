import React, { Component } from 'react'
import  { fetchCountries } from '../services/countries'
import { Link } from 'react-router-dom';

class CountriesList extends Component {

  constructor() {
    super();
    this.state = {
      countries: [],
      searchText: '',
      selectedContinent: '',
    };
    this.requestApi = this.requestApi.bind(this)
    this.filterCountries = this.filterCountries.bind(this)
    this.handleInfo = this.handleInfo.bind(this)
  }

  async requestApi() {
    const data = await fetchCountries()
    this.setState({
      countries: data,
    });
  }

  componentDidMount() {
    this.requestApi();
  }

  filterCountries() {
    const { countries, searchText, selectedContinent } = this.state;
    let filtered = countries;
    if (searchText) {
      filtered = filtered.filter((country) => {
        return country.name.toLowerCase().includes(searchText.toLowerCase()) || country.capital.toLowerCase().includes(searchText.toLowerCase())
      })
    }
    if (selectedContinent) {
      filtered = filtered.filter((country) => country.region === selectedContinent)
    }
    return filtered;
  }

  handleInfo({ target }) {
    const { name } = target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(({
      [name]: value,
    }))
  }

  render() {
    
    return (
      <div>
        <h1>List of Countries</h1>
        <div className="searchBar">
          <input onChange={ this.handleInfo } name="searchText" placeholder="Entry Country or Capital" />
          <select onChange={ this.handleInfo } name="selectedContinent" placeholder="Select Continents" >
            <option value="">Continent</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="countriesList">
            { this.filterCountries().map((country, index) => {
              // console.log(country)
              return (
                <div className="country" key={ index }>
                  <h3 className="country-list">{country.name}</h3>
                  <div className="flag-div">
                    <img className="flag" src={country.flag} alt ={`flag of ${country.name}`}/>
                  </div>
                  <Link className="link" to={ `/country/${country.name}` }>Details</Link>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default CountriesList;