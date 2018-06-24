import * as React from 'react';
import styled from 'styled-components';
import { ellipseStr } from 'app/util/ellipse-str';
import { LinkData } from 'app/type/link-data';
import { colors } from 'app/constants/colors';
import { sample } from 'app/util/sample';
import * as R from 'ramda';
import { sizes } from 'app/constants/size';
import { ContextMenu, MenuItem } from "react-contextmenu";
import * as debug from 'debug';
import { observer } from 'mobx-react';
import { copyToClipboard } from 'app/util/copy-to-clipboard';
const log = debug('application:link-card.tsx');

const Card = styled.div`
  margin-top: 5px;
  transition: 0.6s;
  transform-style: flat;
  width: 100%;
  width: ${sizes.rightSide.column.width};
  height: ${sizes.rightSide.column.linkCard.height};
  font-size: 1em;
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
  // position: absolute;
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

const Title = styled.h2`
  word-spacing: -0.15em;
  overflow-wrap: break-word;
  font-weight: 300;
  font-size: ${sizes.rightSide.column.linkCard.title.fontSize};
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

const Gradients = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, ${({ gradient }: { gradient }) => gradient.join(", ")});
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

const StyledContextMenu = styled(ContextMenu)`
  && {
    background: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 9997;
    min-width: 130px;
  }
`;

const StyledMenuItem = styled.button`
  min-height: 50px;
  width: 100%;
  text-align: left;
  padding: 10px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${colors.grey.light};
  cursor: pointer;
  outline: none;
  user-select: none;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
`;
interface LinkProps {
  link: LinkData
  onClickDelete: {(e)}
  onClickEdit: {(e)}
  isDragging: boolean
}

@observer
export class LinkCard extends React.Component<LinkProps, {}> {

  gradient = sample(colors.gradients);

  shouldComponentUpdate(nextProps, nextState) {
    return !R.equals(nextProps, this.props)
  }

  render() {
    const { link, onClickDelete, onClickEdit } = this.props;
    log("render: " + link.url);
    const title = link.ogTitle ? link.ogTitle + ": " + link.url.replace(/^.*\/\//, "") : link.url.replace(/^.*\/\//, "").replace(/^www./, "");
    const ellipsedTitle = ellipseStr(title, 34);
    return (
      <Card>
        <Figure>
          {link.ogImage ?
            <Img src={link.ogImage} alt="card image"/> : <Gradients gradient={this.gradient}/>
          }
          <Caption>
            <A href={link.url} target="_blank">
              <Title>{ellipsedTitle}</Title>
              <P>{ellipseStr(`${title} ${link.ogDescription ? link.ogDescription : ""}`, 120)}</P>
            </A>
          </Caption>
        </Figure>
        <StyledContextMenu id={`link_card_context|${link.id}`}>
          <MenuItem onClick={onClickEdit}>
            <StyledMenuItem>
              Edit
            </StyledMenuItem>
          </MenuItem>
          <MenuItem onClick={onClickDelete}>
            <StyledMenuItem>
              Remove
            </StyledMenuItem>
          </MenuItem>
          <MenuItem onClick={() => copyToClipboard(link.url)}>
            <StyledMenuItem>
              Copy Link
            </StyledMenuItem>
          </MenuItem>
        </StyledContextMenu>
      </Card>
    )
  }
};
