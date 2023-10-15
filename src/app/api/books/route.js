export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category');
    const startIndex = searchParams.get('startIndex');

    if (category === undefined || category === '' 
        || startIndex === undefined || startIndex === '')
        return new Response('Invalid parameters', {
            status: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })

    const maxResults = 6;
    const apiKey = `AIzaSyBwfUz3_vFi2j5GjEQGxDDPmiroNz3CG4o`;
    const resGoogleBooks = await fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en&gl=us`)
    
    const booksData = await resGoogleBooks.json();

    const jsonResponse = Response.json(booksData);
    return jsonResponse;
}