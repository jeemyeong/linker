import * as React from 'react';
import styled from 'styled-components';
import { grid } from 'app/components/linker/Board/constants';
import { LinkModel } from 'app/models';

// const Avatar = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: ${grid}px;
//   flex-shrink: 0;
//   flex-grow: 0;
// `;

const Content = styled.div`
/* flex child */
flex-grow: 1;
/* Needed to wrap text in ie11 */
/* https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox */
flex-basis: 100%
/* flex parent */
display: flex;
flex-direction: column;
`;

const BlockItem = styled.div`
  &::before {
    content: open-item;
  }
  &::after {
    content: close-item;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
`;

const ItemId = styled.small`
  flex-grow: 0;
  margin: 0;
`;

const Attribution = styled.small`
  margin: 0;
  margin-left: ${grid}px;
  text-align: right;
  flex-grow: 1;
`;

interface LinkProps {
  item: LinkModel
  deleteLink: { ({ link }): Promise<void> };
}


export const Link = ({ item, deleteLink }: LinkProps) => (
  <div>
    {/*<Avatar src={item.user.avatarUrl} alt={item.user.name} />*/}
    <Content>
      <BlockItem>{item.url}</BlockItem>
      <Footer>
        <ItemId>(id: {item.id})</ItemId>
        <ItemId>(order: {item.order})</ItemId>
        <Attribution>{item.content}</Attribution>
      </Footer>
      <button onClick={() => deleteLink({link: item})}>X</button>
    </Content>
  </div>
);
