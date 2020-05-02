import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import DropDown from '../components/dropdown'
import Card from '../components/card'
import fetch from 'node-fetch'

// https://restcountries.eu/rest/v2/region/{region}
// <img src="https://www.countryflags.io/:country_code/:style/:size.png">

export default function Index({ countries }) {
  const { regions } = {
    regions: [
      { id: 'Africa', title: 'Africa', selected: false, key: 'region' },
      { id: 'America', title: 'America', selected: false, key: 'region' },
      { id: 'Asia', title: 'Asia', selected: false, key: 'region' },
      { id: 'Europe', title: 'Europe', selected: false, key: 'region' },
      { id: 'Oceania', title: 'Oceania', selected: false, key: 'region' },
    ]
  }

  return (
    <div id="wrapper" className="theme-dark">
      <div id="countryApp">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Frontend Mentor | REST Countries API with color theme switcher</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
          <div className="input-container search shadow">
            <input type="text" name="search" placeholder="Search for a country..."></input>
          </div>
          <DropDown className="w60 shadow" title="Filter by Region" list={regions} />
          <div className="container">
            {countries.map((item) => {
              const key = item.alpha2Code.toLowerCase()
              const population = Number(item.population).toLocaleString('en')
              const region = item.region
              const capital = item.capital
              return (
                <Card className="shadow" key={key} id={key} title={item.name} thumbnail={"/flags/" + key + ".png"} list={
                  [
                    { "label": "Population", "value": population },
                    { "label": "Region", "value": region },
                    { "label": "Capital", "value": capital }
                  ]
                } />
              )
            })}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export async function getStaticProps({filter}) {    
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json()  
  const allowedValues = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
  let result;
  
  if (allowedValues.includes(filter)) {    
    result = await countries.filter((country) => {
      console.log(country)
      return country.region == filter
    })
  } else {
    result = countries
  }

  return {
    props: { countries: result }
  }
}