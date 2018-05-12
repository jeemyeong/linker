import * as React from 'react';
import { LinkModel } from 'app/models';
import { rootStore } from '../../../../main';
import { STORE_CATEGORY, STORE_LINK } from 'app/constants';

interface AddLinkProps {
  addLink: { ({ link }): Promise<void> };
  listId: number;
}

interface AddLinkState {
  opened: boolean;
  url: string;
}
export default class AddLink extends React.Component<
  AddLinkProps,
  AddLinkState
> {
  state = {
    opened: false,
    url: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    const url = this.state.url;
    const category = rootStore[STORE_CATEGORY].categories.find(category => category.id === this.props.listId);
    const order = rootStore[STORE_LINK].links.filter(link => link.category.id == category.id).length + 1
    const link: LinkModel = new LinkModel({url, category, order});

    this.props.addLink({ link }).then(
      () => this.setState({url: '', opened: false}, () => console.log("Add Link Success"))
    );

  };

  render() {
    if (!this.state.opened)
      return (
        <div>
          <button onClick={() => this.setState({ opened: !this.state.opened })}>
            Add Item
          </button>
        </div>
      );
    // const { addItem } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={(e) => this.setState({ url: e.target.value })}
          />
          <button>Add</button>
        </form>
        <div>
          <button onClick={() => this.setState({ opened: !this.state.opened })}>
            Close Item
          </button>
        </div>
      </div>
    );
  }
}
