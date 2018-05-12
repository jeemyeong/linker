import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { App } from 'app';
import { createStores } from 'app/stores';
import { TodoModel, CategoryModel } from 'app/models';
import config from './config';
import axios from 'axios';
import { STORE_CATEGORY } from 'app/constants';

// enable MobX strict mode
useStrict(true);

const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true)
];


// const jake = new UserModel('Jake', 'http://adventuretime.wikia.com/wiki/Jake', 'https://68.media.tumblr.com/avatar_1f7bdbbeb59c_128.png');
// const BMO = new UserModel('BMO', 'http://adventuretime.wikia.com/wiki/BMO', 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png');
// const finn = new UserModel('Finn', 'http://adventuretime.wikia.com/wiki/Finn', 'https://68.media.tumblr.com/avatar_09404f3287c6_128.png');
// const princess = new UserModel('Princess bubblegum', 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum', 'https://68.media.tumblr.com/avatar_ec98529441c4_128.png');

const defaultUsers = [
  // jake, BMO, finn, princess,
];

// const kafka = new CategoryModel("kafka");
// const docker = new CategoryModel("docker");
// const kotlin = new CategoryModel("kotlin");
// const react = new CategoryModel("react");

const defaultCategories = [
  // kafka, docker, kotlin, react
];

const defaultLinks = [
  // new LinkModel('Sometimes life is scary and dark', BMO, kafka),
  // new LinkModel('Sucking at something is the first step towards being sorta good at something.', jake, kafka),
  // new LinkModel("You got to focus on what's real, man", jake, kafka),
  // new LinkModel('Is that where creativity comes from? From sad biz?', finn, kotlin),
  // new LinkModel('Homies help homies. Always', finn, kotlin),
  // new LinkModel('Responsibility demands sacrifice', princess, kotlin),
  // new LinkModel("That's it! The answer was so simple, I was too smart to see it!, That's it! The answer was so simple, I was too smart to see it!, That's it! The answer was so simple, I was too smart to see it!, That's it! The answer was so simple, I was too smart to see it!", princess, docker),
  // new LinkModel('People make mistakes. It’s a part of growing up', finn, docker),
  // new LinkModel("Don't you always call sweatpants 'give up on life pants,' Jake?", finn, docker),
  // new LinkModel('I should not have drunk that much tea!', princess, react),
  // new LinkModel('Please! I need the real you!', princess, react),
  // new LinkModel("Haven't slept for a solid 83 hours, but, yeah, I'm good.", princess, react),
];

// prepare MobX stores
const history = createBrowserHistory();
export const rootStore = createStores({history, defaultTodos, defaultLinks, defaultUsers, defaultCategories});

axios.get<Array<CategoryModel>>(`${config.API_URL}/categories/all`)
  .then(res => {
    const categories = res.data;
    rootStore[STORE_CATEGORY].addCategories(categories)});

rootStore.link.getLinks();

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
