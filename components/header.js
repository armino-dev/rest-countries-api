import React from 'react'
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: ""            
        }
    }

    componentDidMount() {
        const theme = localStorage.getItem("theme") || "theme-light"
        this.setState({ 
            theme: theme            
        }, () => {
            document.querySelector('div#wrapper').className = theme
        })
    }

    toggleTheme() {
        let theme = this.state.theme
        if (theme == "theme-light") {
            theme = "theme-dark"
        } else {
            theme = "theme-light"
        }
        this.setState({ 
            theme: theme            
        }, () => {
            localStorage.setItem("theme", theme);
            document.querySelector('div#wrapper').className = theme
        })
    }

    render() {
        const theme = this.state.theme;
        const buttonIcon = (theme == "theme-light") ? "fa-moon-o" : "fa-sun-o";
        const buttonText = (theme == "theme-light") ? "Dark Mode" : "Light Mode";

        return (
            <header>
                <h1>Where in the world?</h1>
                <a 
                    href="#" 
                    rel="prefetch"
                    className="btn btnToggleTheme" 
                    onClick={() => this.toggleTheme()}>
                        <i className={`fa ${buttonIcon}`}></i> {buttonText}
                </a>
            </header>
        )
    }    
}
