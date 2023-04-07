
import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticle } from "@/models/NewsArticles";
import {FormEvent,useState} from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

const SearchNewsPage = () => {
    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
    const [searchResultsLoading, setsearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setsearchResultsLoadingIsError] = useState(false);
    
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get("searchQuery")?.toString().trim();
        if(searchQuery){
            try {
                setSearchResults(null);
                setsearchResultsLoadingIsError(false);
                setsearchResultsLoading(true);
                const response = await fetch("/api/search-news?q="+searchQuery);
                const articles : NewsArticle[] = await response.json();
                setSearchResults(articles);
            } catch (error) {
                console.error(error);
                setsearchResultsLoadingIsError(true);
                
            } finally {
                setsearchResultsLoading(false);
            }
        }
    }
    

    return (  
        <main>
            <h1>Search News</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control 
                    name="searchQuery"
                    placeholder="E.g. politics, sports"
                    />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
                    Search
                </Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
                {searchResultsLoading && <Spinner animation="grow"/>}
                {searchResultsLoadingIsError && <Alert>Something went wrong please try again.</Alert>}
                {searchResults?.length === 0 && <Alert>Nothing found. Try a different topic.</Alert>}
                {searchResults &&  <NewsArticleGrid articles={searchResults}/>}
            </div>
        </main>
    );
}
 
export default SearchNewsPage;