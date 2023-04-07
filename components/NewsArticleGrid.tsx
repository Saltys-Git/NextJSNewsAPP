import { NewsArticle } from "@/models/NewsArticles";
import {Col,Row} from 'react-bootstrap';
import NewsArticleEntry from "./NewsArticleEntry";

interface NewsArticleGridProps {
    articles: NewsArticle[],
}


const NewsArticleGrid = ({ articles }: NewsArticleGridProps) => {
    return ( 
        <Row xs={1} sm={2} xl={3} className="g-5">
            {articles.map(article => (
                <Col key={article.url}>
                    <NewsArticleEntry articles={article}/>
                </Col>
            ))}
        </Row>
     );
}
 
export default NewsArticleGrid;