import React from 'react'
import Link from 'next/link'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thumbnail: this.props.thumbnail,
            title: this.props.title,
            code: this.props.id,       
        }
        
    }

    goTo(key) {
        console.log(key)
    }
    
    render() {
        const { list } = this.props
        const { thumbnail, title, code } = this.state
        
        return (
            <Link href="/countries/[id].js">
            <div className={`card ${this.props.className}`} onClick={ () => this.goTo(code) }>
                <div className="thumbnail"><img src={thumbnail} alt={title + " flag"} /></div>
                <div className="title">{title}</div>
                <div className="body">
                    <ul>
                    {list.map((item, index) => (
                        <li className="item" key={index}><span className="label">{item.label}</span>: <span className="value">{item.value}</span></li>
                    ))}
                    </ul>
                </div>
            </div>
            </Link>
        )
    }
}

export default Card