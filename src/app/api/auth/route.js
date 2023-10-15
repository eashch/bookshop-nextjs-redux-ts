 export function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    let statusMsg = '';
    if (!validEmail && !validPassword)
        statusMsg = 'Invalid email and password';
    else if (!validEmail)
        statusMsg = 'Invalid email';
    else if (!validPassword)
        statusMsg = 'Invalid password';

    return new Response((validEmail && validPassword) ? 'Logged in' : 'Invalid parameters', {
        status: (validEmail && validPassword) ? 200 : 400,
        statusText: statusMsg, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}

function validateEmail(email) {
    return (email !== undefined 
        && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
}

function validatePassword(password) {
    return password !== undefined 
        && password !== ''
        && password.length > 6;
} 