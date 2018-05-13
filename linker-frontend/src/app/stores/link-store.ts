import { observable, action } from 'mobx';
import { LinkModel } from 'app/models';
import axios from 'axios';
import config from '../../config';
import { rootStore } from '../../main';
import { STORE_CATEGORY } from 'app/constants';

export class LinkStore {
  constructor(fixtures: LinkModel[] = []) {
    this.links = fixtures;
  }

  @observable public links: Array<LinkModel>;

  // TODO: throttling add
  @action
  addLink = ({
    link,
  }: {
    link: LinkModel;
  }): Promise<void> =>
    axios
      .post(`${config.API_URL}/links/`, {
        link: link,
        email: 'jeemyeong@gmail.com'
      })
      .then(() => this.updateLinks([...this.links, link]))
      .then(this.getLinks);

  @action
  getLinks = (): Promise<void> =>
    axios
      .get<Array<LinkModel>>(
        `${config.API_URL}/users/jeemyeong@gmail.com/links`
      )
      .then(this.updateLinksFromResponse);

  @action
  updateLinks = (links: LinkModel[]): void => {
    this.links = [...links].sort((a, b) => a.order - b.order);
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

  // TODO: throttling delete
  @action
  deleteLink = ({link}: {link: LinkModel}): Promise<void> => {
    this.updateLinks(this.links.filter(value => value.id !== link.id))
    return axios.delete(`${config.API_URL}/links/${link.id}`).then(this.getLinks)
  };

  // TODO: throttling reorder
  @action
  reorderLink = ({ itemId, newColumnId, newIndex }): Promise<void> => {
    const originLink = this.links.find((link) => link.id === itemId);
    const originOrder = originLink.order;
    const newOrder = newIndex + 1;
    const originCategory = originLink.category;
    const newCategoryId = newColumnId;
    const newCategory = rootStore[STORE_CATEGORY].categories.find(
      (category) => category.id == newCategoryId
    );

    if (originLink.category.id == newCategoryId) {
      const linksInSameCategory = this.links.filter(
        (link) => link.category.id == originCategory.id
      );
      if (originOrder > newOrder) {
        linksInSameCategory
          .filter((link) => link.order >= newOrder && link.order < originOrder)
          .forEach((link) => {
            link.order += 1;
          });
      } else {
        linksInSameCategory
          .filter((link) => link.order > originOrder && link.order <= newOrder)
          .forEach((link) => {
            link.order -= 1;
          });
      }
      originLink.order = newOrder;
    } else {
      const linksInCategoryOriginToGo = this.links.filter(
        (link) => link.category.id == newCategory.id
      );
      const linksInCategoryOriginFrom = this.links.filter(
        (link) => link.category.id == originCategory.id
      );
      linksInCategoryOriginToGo
        .filter((link) => link.order >= newOrder)
        .forEach((link) => {
          link.order += 1;
        });
      linksInCategoryOriginFrom
        .filter((link) => link.order > originOrder)
        .forEach((link) => {
          link.order -= 1;
        });
      originLink.category = newCategory;
      originLink.order = newOrder;
    }
    this.updateLinks(this.links);

    return axios
      .post<Array<LinkModel>>(`${config.API_URL}/links/reorder`, this.links)
      .then(this.updateLinksFromResponse);
  };

  updateLinksFromResponse = ({ data: links }: { data: Array<LinkModel> }) =>
    this.updateLinks(links);
}

export default LinkStore;
