import React from 'react'

class DropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            title: this.props.title,
            selected: ''
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

    selectItem(item) {        
        this.setState(
            { selected: item },
            () => {
                console.log(this.state.selected) 
            }
        )               
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
                        <li className="item" key={item.id} onClick={()=>this.selectItem(item.id)}>{item.title}</li>
                    ))}
                </ul>
                }
            </div>
        )
    }
}

export default DropDown