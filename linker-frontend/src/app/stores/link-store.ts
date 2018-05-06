import { observable, action } from 'mobx';
import { LinkModel, UserModel } from 'app/models';
import axios from 'axios';
import config from '../../config';
import { rootStore } from '../../main';
import { STORE_COLUMN } from 'app/constants';

export class LinkStore {
  constructor(fixtures: LinkModel[] = []) {
    this.links = fixtures;
  }

  @observable public links: Array<LinkModel>;

  @action
  addLink = ({item, columnId}: {item: LinkModel, columnId: number}): void => {
    const link = item;
    const linkColumnId = columnId;
    axios.post(`${config.API_URL}/links`, {
        "url": link.url,
        "content": link.content,
        linkColumnId,
        "email": "jeemyeong@gmail.com"
      }).then(this.getLinks)
  };

  @action
  getLinks = (): void => {
    axios.get<{ user: UserModel, links: LinkModel[] }>(`${config.API_URL}/users/jeemyeong@gmail.com/links`)
      .then(res => {
        const { links } = res.data;
        action(() => {
          this.links = links;
        })()
      });
  };

  @action
  editLink = (id: number, data: Partial<LinkModel>): void => {
    this.links = this.links.map((link) => {
      if (link.id === id) {
        if (typeof data.content == 'string') {
          link.content = data.content;
        }
      }
      return link;
    });
  };

  @action
  deleteLink = (id: number): void => {
    this.links = this.links.filter((link) => link.id !== id);
  };

  @action
  reorderLink = ({ itemId, newColumnId, newIndex }) => {
    const originLink = this.links.find(link => link.id === itemId);
    const originOrder = originLink.order;
    const newOrder = newIndex;
    const originColumn = originLink.linkColumn;
    const newColumn = rootStore[STORE_COLUMN].linkColumns.find(linkColumn => linkColumn.id == newColumnId);

    if (originLink.linkColumn.id == newColumnId) {
      const linksInSameColumn = this.links.filter(link => link.linkColumn.id == originColumn.id);
      if (originOrder > newOrder) {
        linksInSameColumn.filter(link => link.order >= newOrder && link.order < originOrder).forEach(link => { link.order += 1})
      } else {
        linksInSameColumn.filter(link => link.order > originOrder && link.order <= newOrder).forEach(link => { link.order -= 1})
      }
      originLink.order = newOrder;
      this.updateLinks();
    } else {
      const linksInColumnOriginToGo = this.links.filter(link => link.linkColumn.id == newColumn.id);
      const linksInColumnOriginFrom = this.links.filter(link => link.linkColumn.id == originColumn.id);
      linksInColumnOriginToGo.filter(link => link.order >= newOrder).forEach(link => { link.order += 1 });
      linksInColumnOriginFrom.filter(link => link.order > originOrder).forEach(link => { link.order -= 1 });
      originLink.linkColumn = newColumn;
      originLink.order = newOrder;
      this.updateLinks();
    }

    axios.post<Array<LinkModel>>(`${config.API_URL}/links/reorder/${itemId}`, {
      newColumnId: newColumnId,
      newOrder: newIndex
    }).then(res => action(() => {
      this.links = res.data;
    })())
  };

  @action
  updateLinks = () => {
    this.links = [...this.links].sort((a, b) => a.order - b.order);
  }
}

export default LinkStore;
