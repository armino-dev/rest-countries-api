import React from 'react'

class DropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            title: this.props.title
        }
    }

    hide() {
        this.setState({
            isOpen: false
        })
    }

    toggleList() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render() {
        const { list } = this.props
        const { isOpen, title } = this.state
        return (
            <div className={`dropdown ${this.props.className}`} tabIndex="0" onBlur={() => this.hide()}>
                <div className="header" onClick={() => this.toggleList()}>
                    <div className={"title " + (isOpen ? "open" : "")}>{title}</div>                                
                </div>
                {isOpen && <ul className="list">
                    {list.map((item) => (
                        <li className="item" key={item.id}>{item.title}</li>
                    ))}
                </ul>
                }
            </div>
        )
    }
}

export default DropDown