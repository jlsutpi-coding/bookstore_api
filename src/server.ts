import express, { type Request, type Response } from 'express';

import prisma from './lib/prisma';

const app = express();

app.get('/books', async (req:Request, res:Response) => {

    try {
        const books = await prisma.book.findMany();
        console.log(books);
        res.json({
            success: true,
            data: books,
        })
    }catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch books",
        })
    }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});