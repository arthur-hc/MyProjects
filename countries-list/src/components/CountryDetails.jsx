import React, { Component } from 'react';
import  { fetchCountries } from '../services/countries'
import { Link } from 'react-router-dom';

class CountryDetails extends Component {
  
  constructor() {
    super();
    this.state = {
      country: undefined,
    };
    this.requestApi = this.requestApi.bind(this)
  }

  async requestApi() {
    let data = await fetchCountries()
    const { match } = this.props;
    const { name } = match.params;
    data = data.find((country) => country.name === name)
    this.setState({
      country: data,
    });
  }

  componentDidMount() {
    this.requestApi();
  }

  render() {
    const { country } = this.state
    if(!country) {
      return <div>Loading</div>
    }
    return (
      <div>
        <Link to="/"><button className="back-btn">Back</button></Link>
        <div className="countryDetails">
          <h1>{country.name}</h1>
          <p>({country.nativeName})</p>
          <img className="flag-details" src={country.flag} alt={country.name}/>
          <div className="info-div">
            <h2>About</h2>
            <h3>Continent</h3>
            <li>{country.region} - {country.subregion}</li>
            <h3>Capital</h3>
            <li>{country.capital}</li>
            <h3>Language</h3>
            {country.languages.map((lang, index) => <li key={index}>{lang.name}</li>)}
            <h3>Population</h3>
            <li>{country.population}</li>
            <h3>Area</h3>
            <li>{country.area} km²</li>
            <h3>Currency</h3>
            {country.currencies.map((curr, index) => <li key={index}>{curr.name} ({curr.code}) - {curr.symbol}</li>)}
            <h3>Regional Blocs</h3>
            {country.regionalBlocs.map((bloc, index) => <li key={index}>{bloc.acronym} - {bloc.name}</li>)}
            <h3>Wikipedia</h3>
            <ul>
              <li><a target="_blank" href={`https://de.wikipedia.org/wiki/${country.translations.de.replaceAll(' ','_')}` } rel="noreferrer">DE</a></li>
              <li><a target="_blank" href={`https://en.wikipedia.org/wiki/${country.name.replaceAll(' ','_')}` } rel="noreferrer">EN</a></li>
              <li><a target="_blank" href={`https://es.wikipedia.org/wiki/${country.translations.es.replaceAll(' ','_')}` } rel="noreferrer">ES</a></li>
              <li><a target="_blank" href={`https://fa.wikipedia.org/wiki/${country.translations.fa.replaceAll(' ','_')}` } rel="noreferrer">FA</a></li>
              <li><a target="_blank" href={`https://fr.wikipedia.org/wiki/${country.translations.fr.replaceAll(' ','_')}` } rel="noreferrer">FR</a></li>
              <li><a target="_blank" href={`https://it.wikipedia.org/wiki/${country.translations.it.replaceAll(' ','_')}` } rel="noreferrer">IT</a></li>
              <li><a target="_blank" href={`https://ja.wikipedia.org/wiki/${country.translations.ja.replaceAll(' ','_')}` } rel="noreferrer">JA</a></li>
              <li><a target="_blank" href={`https://nl.wikipedia.org/wiki/${country.translations.nl.replaceAll(' ','_')}` } rel="noreferrer">NL</a></li>
              <li><a target="_blank" href={`https://pt.wikipedia.org/wiki/${country.translations.br.replaceAll(' ','_')}` } rel="noreferrer">PT</a></li>
            </ul>
          </div>
          <Link to="/"><button className="back-btn">Back</button></Link>
        </div>    
      </div>
    );
  }
}
 
export default CountryDetails;
