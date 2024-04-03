import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title, description, imageUrl, newsUrl, author, date,source} = this.props;
    return (
      <div className ="my-3">
        <div className="card" style={{width: "18rem"}}>
        <h5><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}
        </span></h5>
        <img src={!imageUrl?"https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww": imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className = "card-text"><small className="text-muted"> By {!author?"Unknown" : author} on {new Date (date).toUTCString()} </small></p>
        <a rel = "noreferrer" href= {newsUrl} target= "_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
