//
// Inspired from https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components
//

export default class DropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            title: this.props.title,                    
        }
        this.hide = this.hide.bind(this)
        this.selectItem = this.selectItem.bind(this)
    }

    componentDidUpdate() {
        const {list} = this.props        
        const isOpen = this.state.isOpen
        setTimeout( () => {
            const selectedItem = list.filter((item) => item.selected);
            if (!selectedItem.length) {
                this.setState({ title: this.props.title})
            }            
        }, 0);
    }
    
    hide() {
        this.setState({
            isOpen: false
        })
    }

    toggleList() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }), () => {
            console.log(`isOpen=${this.state.isOpen}`)
        })
    }

    selectItem(title, id, key) {        
        const { toggleItem } = this.props
        this.setState({
          title: title,
          isOpen: false,
        }, toggleItem(id, key));
      }

    render() {
        const { list } = this.props        
        const { isOpen, title } = this.state
        return (
            <div className={`dropdown ${this.props.className}`} tabIndex="0" onBlur={() => this.hide()}>
                <div className="header" onClick={() => this.toggleList()}>
                    <div className={"title " + (isOpen ? "open" : "")}>{title}</div>                                
                </div>
                {isOpen && <ul className="list" onClick={(e) => e.stopPropagation()}>
                    {list.map((item) => (                        
                        <li 
                            className={"item " + (item.selected ? "selected" : "")}                             
                            key={item.id} 
                            onClick={()=>this.selectItem(item.title, item.id, item.key)}>{item.title}
                        </li>
                    ))}                    
                </ul>
                }
            </div>
        )
    }
}