import React from 'react'
import { useEffect, useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const[articles, setArticles] = useState([]);
    const[loading, setLoading] = useState(true);
    const[page, setPage] = useState(1);
    const[totalResults, setTotalResults] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews =async() => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a763e0065f0d417aa6e20d3ed6782b09&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
    }, [])

    // const handlePrevClick = async () =>{
    //     setPage(page-1);
    //     updateNews();
    // }
    // const handleNextClick = async () =>{
    //     setPage(page+1);
    //     updateNews();
    // }
    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a763e0065f0d417aa6e20d3ed6782b09&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles([...articles, ...parsedData.articles]); 
        setTotalResults(parsedData.totalResults);
        setPage(nextPage); // Updating the page state
        // Check if there are more articles to load
        const hasMoreArticles = articles.length + parsedData.articles.length < parsedData.totalResults;
        setHasMore(hasMoreArticles); // Update the hasMore state
    };
    

    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength= {articles.length}
          next={fetchMoreData}
          hasMore={hasMore}           
        //   loader={<Spinner/>}
        >
        <div className="container">

        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title = {element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
      </>
    )
}

News.defaultProps = {
    country : 'in',
    pageSize : 8,
    category :'General'
}
News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
}

export default News


