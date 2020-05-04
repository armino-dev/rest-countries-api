import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import ErrorPage from 'next/error'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '../../components/footer'
import Header from '../../components/header'

export default function Country({ country, neighbors }) {
    const router = useRouter()

    if (!router.isFallback && !country) {
        return <ErrorPage statusCode={404} />
    }
    

    let currencies = [];
    let languages = [];
    

    if (country) {
        for (const currency of country.currencies) {        
            currencies.push(currency.name)
        }    
        for (const language of country.languages) {        
            languages.push(language.name)
        }                 
    }
        
    


    return (
        <div id="wrapper">
            <div id="countryApp">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Frontend Mentor | REST Countries API with color theme switcher | Country detail</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                {router.isFallback ? (
                    <h1>Please wait, we are loading the data...</h1>
                    ) : (
                        <main>                    
                        <div className="country-detail container">
                            <div className="col">
                                <Link href="/">
                                    <a className="btn shadow"><i className="fa fa-long-arrow-left"></i> Back</a>
                                </Link>                            
                                <img className="shadow" src={country.flag} alt={country.name + " flag"} />
                            </div>
                            <div className="col">
                                <h1>{ country.name }</h1>
                                <div className="container">
                                    <ul>
                                        <li><strong>Native name:</strong> {country.nativeName}</li>
                                        <li><strong>Population:</strong> {Number(country.population).toLocaleString('en')}</li>
                                        <li><strong>Region:</strong> {country.region}</li>
                                        <li><strong>Sub Region:</strong> {country.subregion}</li>
                                        <li><strong>Capital:</strong> {country.capital}</li>
                                    </ul>
                                    <ul>
                                        <li><strong>Top Level Domain:</strong> {country.topLevelDomain}</li>
                                        <li><strong>Currencies:</strong> { currencies.join(", ") }</li>
                                        <li><strong>Languages:</strong> { languages.join(", ") }</li>
                                    </ul>                                
                                </div>
                                
                                    <h2>Border Countries: </h2>
                                    <div className="buttons-container">
                                    {neighbors.map((neighbor, index) => {
                                        const code = neighbor.alpha2Code.toLowerCase()
                                        return (
                                            <Link key={index} as={`/countries/${code}`} href="/countries/[code]">
                                                <a className="btn shadow">{neighbor.name}</a>
                                            </Link>
                                        )
                                    })}
                                    </div>
                                
                            </div>                        
                        </div>                    
                    </main>
                )}
                
                <Footer />
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch("https://restcountries.eu/rest/v2/all")
    const countries = await res.json()

    return {
        paths: countries.map(country => `/countries/${country.alpha2Code.toLowerCase()}`) || [],
        fallback: false,
    }
}


export async function getStaticProps({ params }) {
    
    const res = await fetch("https://restcountries.eu/rest/v2/alpha/" + params.code)
    const country = await res.json()
    
    let query = [];    
    for (const neighbor of country.borders) {
        query.push(neighbor)
    }
    const resN = await fetch("https://restcountries.eu/rest/v2/alpha?codes=" + query.join(";"))
    const data = await resN.json()
    let neighbors = [];
    if (data.length > 0) {
        for (let neighbor of data) {
            neighbors.push({parent: params.code, alpha2Code: neighbor.alpha2Code, name: neighbor.name })
        }
    }            
    return {
        props: {            
            country, 
            neighbors,            
        },
    }
}
