import * as React from 'react';
import styled from 'styled-components';
import { LinkModel } from 'app/models';
import { ellipseStr } from 'app/helper/ellipse-str';

const Card = styled.div`
  position: relative;
  transition: 0.6s;
  transform-style: preserve-3d;
  width: 450px;
  height: 270px;
  &:before {
    width: 100%;
    height: 100%;
    content: "Hello World";
    color: #000;
  }
`;

const Figure = styled.figure`
  background: #fff;
  color: #fff;
  backface-visibility: hidden;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 1px 5px rgba(0,0,0,0.9);
  transform: rotateY(0deg);
  z-index: 2;
  
  &:hover h2 {
    color: #fff;
    background: transparent;
    -webkit-transform: translate3d(0,-50%,0) translate3d(0,-40px,0);
    transform: translate3d(0,-50%,0) translate3d(0,-40px,0);
  }
  
  &:hover div.overlay{
    opacity: 1;
    transform: translate3d(0,0,0);
  }  
  
  &:hover h2:after {
    transform: translate3d(0,0,0);
  }
  
  &:hover p {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

const Img = styled.img`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 1;
  object-fit: none;
  overflow: hidden;
`;

const Caption = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  backface-visibility: hidden;
  font-size: 1.25em;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  opacity: 0;
  background: linear-gradient(rgba(72,76,97,0) 0%, rgba(72,76,97,0.8) 80%);
  transform: translate3d(0,50%,0);
  transition: opacity 0.35s, transform 0.35s;
`;

const H2 = styled.h2`
  word-spacing: -0.15em;
  font-weight: 300;
  font-size: 1.6em;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  color: #272833;
  transition: transform 0.35s, color 0.35s;
  transform: translate3d(0,-50%,0);
  font-weight: bold;
  background: rgba(256,256,256,1);
  padding: 0.5em;
  word-spacing: 3px;
  line-height: 1em;

  &:after{
    position: absolute;
    bottom: -10px;
    left: 70px;
    right: 70px;
    height: 2px;
    background: #fff;
    content: '';
    transition: transform 0.35s;
    transform: translate3d(-130%,0,0);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-weight: bold;
  text-align: right;
  
  &:after {
    content: '✖';
  }
`;

const P = styled.p`
  letter-spacing: 1px;
  font-size: 68.5%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2em;
  width: 100%;
  opacity: 0;
  transform: translate3d(0,10px,0);
  transition: opacity 0.35s, transform 0.35s;
`;

const A = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

interface LinkProps {
  link: LinkModel
  deleteLink: { ({ targetLink: LinkModel }): Promise<void> };
}

export const LinkCard = ({link, deleteLink}: LinkProps) => {
  const title = link.ogTitle ? link.ogTitle + ": " + link.url.replace(/^.*\/\//, "") : link.url.replace(/^.*\/\//, "").replace(/^www./, "");
  const ellipsedTitle= ellipseStr(title, 25);
  return (
    <Card>
      <Figure>
        <Img src={link.ogImage? link.ogImage : "https://placeimg.com/640/480/any"} alt="card image"/>
        <Caption>
          <Overlay className="overlay">
            <DeleteButton onClick={() => confirm("Do you want to remove this link really?") && deleteLink({targetLink: link})}/>
          </Overlay>

          <H2><A href={link.url} target="_blank">{ellipsedTitle}</A></H2>
          <P>{ellipseStr(`${title} ${link.ogDescription ? link.ogDescription : ""}`, 140)}</P>
        </Caption>
      </Figure>


      {/*<a href={link.url} target="_blank">*/}
      {/*{link.ogImage ? <Thumb backgroundImage={link.ogImage}/> : <PlaceHolder/>}*/}
      {/*</a>*/}
      {/*<Article>*/}
      {/*<H1>{link.ogTitle || ellipseStr(link.url, 20)}</H1>*/}

      {/*{link.content && <h3>{link.content}</h3> }*/}
      {/*{link.ogDescription && <h4>{ellipseStr(link.ogDescription, 60)}</h4> }*/}
      {/*<p>(id: {link.id})</p>*/}
      {/*<p>(order: {link.order})</p>*/}
      {/*<Span>*/}
      {/*<button onClick={() => deleteLink({link})}>DELETE</button>*/}
      {/*</Span>*/}
      {/*</Article>*/}
    </Card>
  );
};
