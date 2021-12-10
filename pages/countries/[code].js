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
    

    let currencies = []
    let languages = []
    

    if (country) {
        for (const currency in country.currencies || []) {        
            currencies.push(country.currencies[currency].name)
        }    
        for (const language in country.languages || []) {        
            languages.push(country.languages[language])
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
                                <img className="shadow" src={country.flags.png} alt={country.name.official + " flag"} />
                            </div>
                            <div className="col">
                                <h1>{ country.name.official }</h1>
                                <div className="container">
                                    <ul>
                                        <li><strong>Official name:</strong> {country.name.official}</li>
                                        <li><strong>Population:</strong> {Number(country.population).toLocaleString('en')}</li>
                                        <li><strong>Region:</strong> {country.region}</li>
                                        <li><strong>Sub Region:</strong> {country.subregion}</li>
                                        <li><strong>Capital:</strong> {country.capital}</li>
                                    </ul>
                                    <ul>
                                        <li><strong>Top Level Domain:</strong> {country.tld ? country.tld[0] : 'n/a'}</li>
                                        <li><strong>Currencies:</strong> { currencies.join(", ") }</li>
                                        <li><strong>Languages:</strong> { languages.join(", ") }</li>
                                    </ul>                                
                                </div>
                                
                                    <h2>Border Countries: </h2>
                                    <div className="buttons-container">
                                    {neighbors.map((neighbor, index) => {
                                        const code = neighbor.cca2.toLowerCase()
                                        return (
                                            <Link key={index} rel="prefetch" as={`/countries/${code}`} href="/countries/[code]">
                                                <a className="btn shadow">{neighbor.name.official}</a>
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
    const res = await fetch("https://restcountries.com/v3.1/all")
    const countries = await res.json()

    return {
        paths: countries.map(country => `/countries/${country.cca2.toLowerCase()}`) || [],
        fallback: false,
    }
}


export async function getStaticProps({ params }) {
    
    const res = await fetch("https://restcountries.com/v3.1/alpha/" + params.code)
    const country = (await res.json())[0]
    
    let query = [];    
    for (const neighbor of country.borders || []) {
        query.push(neighbor)
    }
    const resN = await fetch("https://restcountries.com/v3.1/alpha/?codes=" + query.join(";"))
    const data = await resN.json()
    let neighbors = [];
    if (data.length > 0) {
        for (let neighbor of data) {
            neighbors.push({ parent: params.code, cca2: neighbor.cca2, name: {official: neighbor.name.official} })
        }
    }            
    return {
        props: {            
            country, 
            neighbors,            
        },
    }
}
