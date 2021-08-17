import React from 'react'
import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import DropDown from '../components/dropdown'
import Card from '../components/card'
import fetch from 'node-fetch'
//import { useState } from 'react'


export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: this.props.countries,
      region: [
        { id: 0, title: 'Africa', selected: false, key: 'region' },
        { id: 1, title: 'Americas', selected: false, key: 'region' },
        { id: 2, title: 'Asia', selected: false, key: 'region' },
        { id: 3, title: 'Europe', selected: false, key: 'region' },
        { id: 4, title: 'Oceania', selected: false, key: 'region' },
      ],
      regionFilter: "",
      countryFilter: "",
    }
    this.toggleItem = this.toggleItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  toggleItem(id, key) {
    //let temp = JSON.parse(JSON.stringify(this.state[key]))
    let temp = this.state[key]
    temp.forEach(item => {
      if (item.id == id) {
        item.selected = !item.selected
      } else {
        item.selected = false
      }
    })
    const selectedItem = temp.filter((item) => item.selected);
    let filter;
    
    if (selectedItem.length) {
      filter = selectedItem[0].title
    } else {
      filter = ""
    }
    
    this.setState({
      [key]: temp,
      regionFilter: filter      
    })
  }

  handleChange(e) {
    this.setState({ countryFilter: e.target.value })
  }

  render() {
    const { countries, region, regionFilter } = this.state
    let filteredCountries;
    const allowedValues = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
    if (allowedValues.includes(regionFilter)) {
      filteredCountries = countries.filter((country) => {
        return country.region == regionFilter
      })
    } else {
      filteredCountries = countries
    }

    const countryFilter = this.state.countryFilter.trim().toLowerCase()
    if (countryFilter.length > 0) {
      filteredCountries = filteredCountries.filter((country) => {
        return country.name.toLowerCase().match(countryFilter)
      })
    }

    return (
      <div id="wrapper">
        <div id="countryApp">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Frontend Mentor | REST Countries API with color theme switcher</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <main>
            <div className="container justify-between" id="control-container">
              <div className="input-container search shadow">
                <input 
                  type="text" 
                  aria-label="country-search" 
                  name="country-search" 
                  placeholder="Search for a country..." 
                  value={countryFilter}
                  onChange={this.handleChange}/>
              </div>
              <DropDown
                className="w60 shadow"
                title="Filter by Region"
                list={region}
                toggleItem={this.toggleItem} />
            </div>
            {filteredCountries && (<div className="container justify-between items-center">
              {filteredCountries.map((item) => {
                const key = item.alpha2Code.toLowerCase()
                const population = Number(item.population).toLocaleString('en')
                const region = item.region
                const capital = item.capital
                const thumbnail = item.flag
                return (
                  <Card
                    className="shadow"
                    key={key}
                    id={key}
                    title={item.name}
                    thumbnail={thumbnail}
                    list={
                      [
                        { "label": "Population", "value": population },
                        { "label": "Region", "value": region },
                        { "label": "Capital", "value": capital }
                      ]
                    } />
                )
              })}
            </div>) }
          </main>
          <Footer />
        </div>
      </div>
    )
  }

}

export async function getStaticProps() {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json()
  
  return {
    props: { countries }
  }
}