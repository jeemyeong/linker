// https://github.com/hg-pyun/awesome-snippets-js#ellipse-string
export const ellipseStr = (str: string, length: number) => {
  if(!str || !length || str.length <= length){
    return str;
  }

  return `${str.slice(0, length - 3)}...`;
};