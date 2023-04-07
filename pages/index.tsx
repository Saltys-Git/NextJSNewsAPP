import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { APIResponse, NewsArticle } from '@/models/NewsArticles'
import { title } from 'process'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticleGrid from '@/components/NewsArticleGrid'
import { Alert } from 'react-bootstrap'

interface BreakingNewsPageProps{
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> =async () => {
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY);
  const newsResposnse: APIResponse = await response.json();
  return{
    props: { newsArticles: newsResposnse.articles}
  }
}

const inter = Inter({ subsets: ['latin'] })

export default function BreakingNewsPage({newsArticles}: BreakingNewsPageProps) {
  return (
    <>
    <Head>
      <title key="title">
        Breaking News - NextJS News App
      </title>
    </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>hello one two three</Alert>
        <NewsArticleGrid articles={newsArticles}/>
      </main>
    </>
  )
}
