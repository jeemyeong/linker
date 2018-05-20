import * as React from 'react';
import styled from 'styled-components';
import { LinkModel } from 'app/models';
import { ellipseStr } from 'app/helper/ellipse-str';

const Card = styled.div`
  width: 250px;
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  
  // sets up hover state
  position: relative;
  top: 0;
  transition: all .1s ease-in;
    
  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
  }
`;

const Thumb = styled.div`
  padding-bottom: 60%;
  background-size: cover;
  background-position: center center;
  background-image: ${({backgroundImage}: {backgroundImage}) => `url(${backgroundImage})`}
`;

const Article = styled.article`
  padding: 20px;
  flex: 1;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const H1 = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #333;
`;

const Span = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  letter-spacing: .05em;
  margin: 2em 0 0 0;
`;

const PlaceHolder = styled.svg`
  max-width: 100%;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggZD0iTTAgNCBMMCAyOCBMMzIgMjggTDMyIDQgeiBNNCAyNCBMMTAgMTAgTDE1IDE4IEwxOCAxNCBMMjQgMjR6IE0yNSA3IEE0IDQgMCAwIDEgMjUgMTUgQTQgNCAwIDAgMSAyNSA3Ij48L3BhdGg+Cjwvc3ZnPg==") no-repeat center hsl(0, 0%, 80%);
  background-size: calc(100%/3);
`;

interface LinkProps {
  link: LinkModel
  deleteLink: { ({ link }): Promise<void> };
}

export const LinkCard = ({ link, deleteLink }: LinkProps) => (
  <Card>
    <a href={link.url} target="_blank">
      {link.ogImage ? <Thumb backgroundImage={link.ogImage}/> : <PlaceHolder/>}
    </a>
    <Article>
      <H1>{link.ogTitle || ellipseStr(link.url, 20)}</H1>

      {link.content && <h3>{link.content}</h3> }
      {link.ogDescription && <h4>{ellipseStr(link.ogDescription, 60)}</h4> }
      <p>(id: {link.id})</p>
      <p>(order: {link.order})</p>
      <Span>
        <button onClick={() => deleteLink({link})}>DELETE</button>
      </Span>
    </Article>
  </Card>
);
