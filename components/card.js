import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thumbnail: this.props.thumbnail,
            title: this.props.title,            
        }
    }

    render() {
        const { list } = this.props
        const { thumbnail, title } = this.state
        return (
            <div className={`card ${this.props.className}`}>                
                <div className="thumbnail"><img src={thumbnail} /></div>
                <div className="title">{title}</div>
                <div className="body">
                    <ul>
                    {list.map((item) => (
                        <li className="item" key={item.id}><span className="label">{item.label}</span>: <span className="value">{item.value}</span></li>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Card