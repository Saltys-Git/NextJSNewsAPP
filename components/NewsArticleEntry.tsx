import { NewsArticle } from "@/models/NewsArticles";
import Image from "next/image";
import {Card} from 'react-bootstrap';
import placeholderImage from '@/assests/images/image-placeholder.jpg'
import styles from "@/styles/NewsArticleEntry.module.css"

interface NewsArticleEntryProps{
    articles: NewsArticle,
}

const NewsArticleEntry = ({articles :{title, description, url, urlToImage}}: NewsArticleEntryProps) => {
    
    const validImrageUrl = urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://") ? urlToImage : undefined;
    
    return ( 
        <a href={url}>
            <Card className="h-100">
                <Image src={validImrageUrl || placeholderImage} 
                width={500}
                height={200}
                alt="News Article Image"
                className={`card-img-top ${styles.image}`}
                />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </a>
     );
}
 
export default NewsArticleEntry;