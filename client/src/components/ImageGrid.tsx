import * as React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '600px',
    width: "100%"
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  }
}
const tilesData = [
  {
    img: 'assets/img/img10.jpg',
  },
  {
    img: 'assets/img/img1.jpg'
  },
  {
    img: 'assets/img/img2.jpg'
  },
  {
    img: 'assets/img/img4.jpg',
  },
  {
    img: 'assets/img/img8.jpg',
    featured: true
  },
  {
    img: 'assets/img/img7.jpg',
  },
  {
    img: 'assets/img/img14.jpg'
  },
  {
    img: 'assets/img/img13.jpg'
  },
  {
    img: 'assets/img/img12.jpg',
  },
  {
    img: 'assets/img/bg.jpg',
    featured: true
  }

];

class ImageGrid extends React.Component<any, any>{
  /**
   *
   */
  constructor(props: any) {
    super(props);

  }
  render() {
    return (
      <div className="container-raised">
      {/* <GridList
        cols={2}
        cellHeight={200}
        padding={1}
        style={{display: 'flex',  flexWrap: 'wrap',  justifyContent: 'center',
        maxWidth: '600px', width: '100%'}}
      >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
        >
          <img src={tile.img} className="imgCover" />
        </GridTile>
      ))}
      </GridList> */}
       <GridList
       cellHeight={300}
       padding={1}
       cols={4}
       style={{display: 'flex',  flexWrap: 'wrap',  justifyContent: 'center'
       }}
     >
       {tilesData.map((tile) => (
         <GridTile
           key={tile.img}
           cols={tile.featured ? 4 : 1}
          rows={tile.featured ? 2 : 1}
         >
           <img src={tile.img} />
         </GridTile>
       ))}
     </GridList>
     </div>
    )
  }

}
export default ImageGrid;