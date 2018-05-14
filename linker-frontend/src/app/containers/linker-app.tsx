import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Board } from 'app/components/linker/Board/board';
import Banner from 'app/components/linker/Banner/banner';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { STORE_CATEGORY, STORE_LINK } from 'app/constants/index';
import { CategoryStore, LinkStore } from 'app/stores/index';
import { Link } from 'app/components/linker/Link/link';
import AddLink from 'app/components/linker/Link/add-link';
import ColumnTitle from 'app/components/linker/ColumnTitle/column-title';

const Layout = styled.div`
  margin: 0 0 40px 0;
  position: relative;
  background: #f5f5f5;
`;

const Header = styled.header`
  height: 15vh;
`;

const Main = styled.main`
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
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
          <Banner />
        </Header>
        <Main>
          <Board
            items={links}
            containerHeight={'80vh'}
            columns={categories}
            reorderColumn={categoryStore.reorderCategories}
            reorderItem={linkStore.reorderLink}
            renderItem={(item) => <Link link={item} deleteLink={linkStore.deleteLink} />}
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
