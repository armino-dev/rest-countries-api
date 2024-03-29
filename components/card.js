import React from 'react'
import Link from 'next/link'

export default class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thumbnail: this.props.thumbnail,
            title: this.props.title,
            code: this.props.id,
        }

    }

    render() {
        const { list } = this.props
        const { thumbnail, title, code } = this.state
        return (
            <Link as={`/countries/${code}`} rel="prefetch" href="/countries/[code]">
                <div className={`card ${this.props.className}`} >
                    <div className="thumbnail">
                        <img src={thumbnail} alt={title + " flag"} />
                    </div>
                    <div className="title">{title}</div>
                    <div className="body">
                        <ul>
                            {list.map((item, index) => (
                                <li className="item" key={index}><span className="label">
                                    {item.label}</span>: <span className="value">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Link>
        )
    }
}
