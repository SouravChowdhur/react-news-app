import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    articles = [
        {
            "source": {
                "id": "bbc-news",
                "name": "BBC News"
            },
            "author": "BBC News",
            "title": "Sachin Tendulkar: Indian cricket legend warns of 'disturbing' deepfake video",
            "description": "The fake video shows the influential cricketer appearing to promote an online gaming app.",
            "url": "https://www.bbc.co.uk/news/world-asia-india-67989930",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/184F5/production/_132337599_gettyimages-1161147027.jpg",
            "publishedAt": "2024-01-16T09:52:15.4735792Z",
            "content": "Indian cricket legend Sachin Tendulkar has criticised a deepfake video in which he seems to be promoting an online gaming app.\r\nThe video shows him praising the app as a quick way to make money.\r\n\"Th… [+2052 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]
    constructor(props) {
        super(props);
        console.log("Hello I am a constructor from news component");
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - NewsMonkey`;
    }
    async updateNews(pageNo) {
        console.log("cdm");
        this.props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fec9be7a4d134f2d989c12cadd85c5ff&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        this.props.setProgress(70)
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100)
    }
    async componentDidMount() {
        await this.updateNews();
    }
    handleNextClick = async () => {
        await this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    handlePrevClick = async () => {
        await this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fec9be7a4d134f2d989c12cadd85c5ff&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            
        })
    };
    render() {
        console.log("render")
        return (
            <>
           
                <h2 className="text-center">NewsMonkey - Top Headlines from {this.props.category}</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.totalResults}
                    loader={<Spinner />}
                >   <div className="container">


                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url} >
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://s.rfi.fr/media/display/ad51bd82-b4fd-11ee-9e94-005056bf30b7/w:1280/p:16x9/2b383c8df214b303e179c70851d4e5db7dcbf668.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                        </div>

                    </div>
                </InfiniteScroll>

                </>
           
        )
    }
}

export default News