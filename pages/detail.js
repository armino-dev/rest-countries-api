import Head from 'next/head'

export default function Detail({data}) {
    console.log(data)
    return (      
      <div>
        <Head>
          <title>Frontend Mentor | REST Countries API with color theme switcher | Country detail</title>
          <link rel="icon" href="/favicon.ico" />          
        </Head>
        <header>
          <h1></h1>
        </header>
        <main> 
          <p>App loading...</p>       
        </main>
        <footer>
          <p>footer</p>
        </footer>
      </div>
    )
  }
  