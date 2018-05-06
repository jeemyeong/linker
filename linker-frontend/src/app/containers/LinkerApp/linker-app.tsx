import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Board, ColumnItemMap } from 'app/components/linker/Board/board';
import Banner from 'app/components/linker/Banner/banner';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { STORE_COLUMN, STORE_LINK } from 'app/constants';
import { ColumnStore, LinkStore } from 'app/stores';
import { LinkModel } from 'app/models';
import { Link } from 'app/components/linker/Link/link';

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

@inject(STORE_LINK, STORE_COLUMN)
@observer
export class LinkerApp extends React.Component<LinkerAppProps, LinkerAppState> {
  render() {
    const linkStore = this.props[STORE_LINK] as LinkStore;
    const columnStore = this.props[STORE_COLUMN] as ColumnStore;
    const links = linkStore.links;
    const columns = columnStore.linkColumns;
    // TODO: memoize columns
    const getByColumn = (column, items) =>
      items.filter((link) => link.linkColumn.id === column.id);

    const columnItemMap: ColumnItemMap<LinkModel> = columns.reduce(
      (previous, column) => ({
        ...previous,
        [column.id]: getByColumn(column, links)
      }),
      {}
    );
    return (
      <Layout>
        <Header>
          <Banner />
        </Header>
        <Main>
          <Board
            containerHeight={'80vh'}
            columnItemMap={columnItemMap}
            columns={columns}
            reorderColumn={columnStore.reorderColumn}
            reorderItem={linkStore.reorderLink}
            render={(item) => <Link item={item}/>}
            addItem={linkStore.addLink}
          />
        </Main>
      </Layout>
    );
  }
}
