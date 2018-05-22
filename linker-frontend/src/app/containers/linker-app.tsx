import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Board } from 'app/components/linker/Board/board';
import Banner from 'app/components/linker/Banner/banner';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { STORE_CATEGORY, STORE_LINK } from 'app/constants/index';
import { CategoryStore, LinkStore } from 'app/stores/index';
import { LinkCard } from 'app/components/linker/Link/link-card';
import AddLink from 'app/components/linker/Link/add-link';
import ColumnTitle from 'app/components/linker/ColumnTitle/column-title';

const Layout = styled.div`
  position: relative;
  background: #f5f5f5;
`;

const Header = styled.header`
  width: 100%;
  position: fixed;
  height: 5vh;
`;

const Main = styled.main`
  position: absolute;
  width: 100%;
  top: 4vh;
  height: 94vh;
  background: #fff;
`;

export interface LinkerAppProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STOURE_TODO]: UserStore;
}

export interface LinkerAppState {}

@inject(STORE_LINK, STORE_CATEGORY)
@observer
export class LinkerApp extends React.Component<LinkerAppProps, LinkerAppState> {
  render() {
    const linkStore = this.props[STORE_LINK] as LinkStore;
    const categoryStore = this.props[STORE_CATEGORY] as CategoryStore;
    const links = linkStore.links;
    const categories = categoryStore.categories;
    return (
      <Layout>
        <Header>
          <Banner/>
        </Header>
        <Main>
          <Board
            items={links}
            columns={categories}
            reorderColumn={categoryStore.reorderCategories}
            reorderItem={linkStore.reorderLink}
            renderItem={(item) => <LinkCard link={item} deleteLink={linkStore.deleteLink} />}
            renderColumnTitle={(column, isDragging, dragHandleProps) => <ColumnTitle category={column} isDragging={isDragging} dragHandleProps={dragHandleProps} />}
            renderAddItem={(listId: number) => (
              <AddLink addLink={linkStore.addLink} listId={listId} />
            )}
          />
        </Main>
      </Layout>
    );
  }
}
