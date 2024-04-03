import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category :'General'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a763e0065f0d417aa6e20d3ed6782b09&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({articles : parsedData.articles, 
            totalResults : parsedData.totalResults,
            loading : false})
        this.props.setProgress(100);
    }

    async componentDidMount(){
        console.log("cdm");
        this.updateNews();
    }
    capitalizeFirst =(string) => {
        return string.charAt(0).toUpperCase()+string.slice(1);
    } 
    constructor(props){
        super(props);
        console.log(" I am a constructor from news component")
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirst(this.props.category)} - NewsMonkey`;
    }

    // handlePrevClick = async () =>{
    //     this.setState({page : this.state.page-1});
    //     this.updateNews();
    // }
    // handleNextClick = async () =>{
    //     this.setState({page: this.state.page+1});
    //     this.updateNews();
    // }
    fetchMoreData = async() =>{
        this.setState({page : this.state.page+1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a763e0065f0d417aa6e20d3ed6782b09&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : this.state.articles.concat(parsedData.articles), 
            totalResults : parsedData.totalResults,
            loading : false})
    }

  render() {
    return (
      <>
        <h2 className="text-center">NewsMonkey - Top Headlines </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength= {this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title = {element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News