import * as React from 'react';

interface AddItemProps {
  addItem: { ({ item, columnId }): void }
  listId: number
}

interface AddItemState {
  opened: boolean
  url: string
}
export default class AddItem extends React.Component<AddItemProps, AddItemState> {
  state = {
    opened: false,
    url: ""
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.listId)
    console.log(this.state.url)
  };

  render() {
    if (!this.state.opened) return (
      <div>
        <button onClick={() => this.setState({opened: !this.state.opened})}>Add Item</button>
      </div>
    );
    // const { addItem } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={e => this.setState({url: e.target.value})}/>
          <button>Add</button>
        </form>
        <div>
          <button onClick={() => this.setState({opened: !this.state.opened})}>Close Item</button>
        </div>
      </div>
    )
  }
}
