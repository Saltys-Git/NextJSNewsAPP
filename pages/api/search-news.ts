// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { APIResponse } from '@/models/NewsArticles';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();
  if(!searchQuery){
    return res.status(400).json({error:"Please provide a search query"});
  }
  const respose = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`);
  const newsRespose: APIResponse = await respose.json();


  res.status(200).json(newsRespose.articles)
}
