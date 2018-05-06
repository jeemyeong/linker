import { observable, action } from 'mobx';
import { LinkColumnModel } from 'app/models';
import config from '../../config';
import axios from 'axios';
export class ColumnStore {
  constructor(fixtures: LinkColumnModel[] = []) {
    this.linkColumns.push(...fixtures)
    this.updateColumns()
  }

  @observable public linkColumns = new Array<LinkColumnModel>()

  @action
  addColumns = (linkColumns: LinkColumnModel[]): void => {
    this.linkColumns = [
      ...this.linkColumns,
      ...linkColumns
    ];
  };

  @action
  editColumn = (id: number, data: Partial<LinkColumnModel>): void => {
    this.linkColumns = this.linkColumns.map((linkColumn) => {
      if (linkColumn.id === id) {
        if (typeof data.title == 'string') {
          linkColumn.title = data.title;
        }
      }
      return linkColumn;
    });
  };

  @action
  deleteColumn = (linkColumn: LinkColumnModel): void => {
    this.linkColumns = this.linkColumns.filter(i => i !== linkColumn);
  };

  reorderColumn = ({originIndex, newIndex}): void => {
    const originOrder = originIndex;
    const newOrder = newIndex;
    const originLinkColumn = this.linkColumns.find(linkColumn => linkColumn.order == originOrder);

    if (originOrder < newOrder) {
      this.linkColumns.filter(linkColumn => linkColumn.order > originOrder && linkColumn.order <= newOrder).forEach(linkColumn => { linkColumn.order-=1 })
    } else {
      this.linkColumns.filter(linkColumn => linkColumn.order >= newOrder && linkColumn.order < originOrder).forEach(linkColumn => { linkColumn.order+=1 })
    }
    originLinkColumn.order = newOrder;

    this.updateColumns();

    axios.post<Array<LinkColumnModel>>(`${config.API_URL}/columns/reorder/${originLinkColumn.id}`, {
      newOrder: newIndex
    }).then(res => action(() => {
      this.linkColumns = res.data.sort((a, b) => a.order - b.order);
    })())
  };

  @action
  updateColumns = () => {
    this.linkColumns = [...this.linkColumns].sort((a, b) => a.order - b.order)
  }
}

export default ColumnStore;
