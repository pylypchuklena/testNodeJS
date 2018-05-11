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
    this.state={
      cols: 4,
      row: 2
    }
    this.handleResize=this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillMount() {
    window.addEventListener('load', this.handleResize);
  }
  handleResize() {
    if(window.innerWidth < 998 && window.innerWidth > 620 ){
      this.setState({
        cols: 2,
        row: 1
      })
    }else if(window.innerWidth < 620){
      this.setState({
         cols: 1,
         row: 1
      })
    }else{
      this.setState({
        cols: 4,
        row: 2
      })
    }

  }
  render() {
    return (
      <div className="container-raised">
       <GridList
       cellHeight={300}
       padding={1}
       cols={this.state.cols}
       style={{display: 'flex',  flexWrap: 'wrap',  justifyContent: 'center'
       }}
     >
       {tilesData.map((tile) => (
         <GridTile
           key={tile.img}
           cols={tile.featured ? this.state.cols : 1}
          rows={tile.featured ? this.state.row : 1}
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