import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'
import DropDown from '../components/dropdown'
import Card from '../components/card'
import fetch from 'node-fetch'

// https://restcountries.eu/rest/v2/region/{region}
// <img src="https://www.countryflags.io/:country_code/:style/:size.png">

function Home({ countries }) {
  const { regions } = {
    regions: [
      { id: 'africa', title: 'Africa', selected: false, key: 'region' },
      { id: 'america', title: 'America', selected: false, key: 'region' },
      { id: 'asia', title: 'Asia', selected: false, key: 'region' },
      { id: 'europe', title: 'Europe', selected: false, key: 'region' },
      { id: 'oceania', title: 'Oceania', selected: false, key: 'region' },
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
          <DropDown className="w60 shadow" title="Filter by Region" list={regions}/>
          <div className="container">                        
            {countries.map((item) => (              
              <Card className="shadow" key={item.alpha2Code} title={item.name} thumbnail={"/flags/" + item.alpha2Code.toLowerCase() + ".png"} list={
                [
                  {"label": "Population", "value": Number(item.population).toLocaleString('en')}, 
                  {"label": "Region", "value": item.region},
                  {"label": "Capital", "value": item.capital}
                ]
              } />
              
            ))}            
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json()

  return {
    props: { countries } 
  }
}


export default Home