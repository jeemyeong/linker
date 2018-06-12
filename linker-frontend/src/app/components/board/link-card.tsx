import * as React from 'react';
import styled from 'styled-components';
import { ellipseStr } from 'app/util/ellipse-str';
import { LinkData } from 'app/type/link-data';
import { colors } from 'app/constants/colors';
import { sample } from 'app/util/sample';
import * as R from 'ramda';

const Card = styled.div`
  margin-top: 5px;
  width: 100%;
  transition: 0.6s;
  transform-style: preserve-3d;
  height: 100px;
  font-size: 0.9em;
  border-radius: 20px;
  &:before {
    width: 100%;
    height: 100%;
    color: #000;
  }
`;

const Figure = styled.figure`
  background-color: rgb(0,0,0,0.2);
  color: #fff;
  border-radius: 20px;
  backface-visibility: hidden;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.6s;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  
  &:hover h2 {
    color: #fff;
    background: transparent;
  }
  
  &:hover div.overlay{
    opacity: 1;
    transform: translate3d(0,0,0);
  }
  
  &:hover button.delete{
    opacity: 1;
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
  border-radius: 20px;
`;

const Caption = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  backface-visibility: hidden;
  font-size: 1em;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  opacity: 0.3;
  background: linear-gradient(rgba(72,76,97,0) 0%, rgba(72,76,97,0.8) 80%);
  transform: translate3d(0,50%,0);
  transition: opacity 0.35s, transform 0.35s;
`;

const H2 = styled.h2`
  word-spacing: -0.15em;
  overflow-wrap: break-word;
  font-weight: 300;
  font-size: 1em;
  position: absolute;
  top: 25%;
  left: 10px;
  width: 90%;
  color: ${colors.white};
  transition: transform 0.35s, color 0.35s;
  transform: translate3d(0,-50%,0);
  font-weight: bold;
  padding: 0.5em;
  word-spacing: 3px;
  line-height: 1em;

  &:after{
    position: absolute;
    bottom: 7px;
    left: 70px;
    right: 70px;
    height: 2px;
    background: #fff;
    content: '';
    transition: transform 0.35s;
    transform: translate3d(-600%,0,0);
  }
`;

const DeleteButton = styled.button`
  opacity: 0;
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
  font-size: 1em;
  line-height: 1.2;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5em;
  max-height: 60%;
  width: 80%;
  opacity: 0;
  font-weight: bold;
  transform: translate3d(0,10px,0);
  transition: opacity 0.35s, transform 0.35s;
`;

const A = styled.a` 
  cursor: pointer;
  color: inherit;
  text-decoration: inherit;
`;

const GradientsA = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #feac5e, #c779d0, #4bc0c8);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  
  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;


const GradientsB = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #59C173, #F37335, #5D26C1);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  
  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

interface LinkProps {
  link: LinkData
  deleteLink: { ({ targetLink }) };
  isDragging: boolean
}

export class LinkCard extends React.Component<LinkProps, {}> {
  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props)
  }

  render() {
    const { link, deleteLink, isDragging } = this.props;
    console.log("LinkCard is rendering", link.content);
    const title = link.ogTitle ? link.ogTitle + ": " + link.url.replace(/^.*\/\//, "") : link.url.replace(/^.*\/\//, "").replace(/^www./, "");
    const ellipsedTitle= ellipseStr(title, 25);
    return (
      <Card>
        <Figure>
          {link.ogImage ?
            <Img src={link.ogImage} alt="card image"/> : !isDragging && sample([<GradientsA/>, <GradientsB/>])
          }
          <Caption>
            <Overlay className="overlay">
              <DeleteButton className="delete" onClick={() => confirm("Do you want to remove this link really?") && deleteLink({targetLink: link})}/>
            </Overlay>

            <A href={link.url} target="_blank">
              <H2>{ellipsedTitle}</H2>
              <P>{ellipseStr(`${title} ${link.ogDescription ? link.ogDescription : ""}`, 120)}</P>
            </A>
          </Caption>
        </Figure>
      </Card>
    )
  }
};
