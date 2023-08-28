// netlify/functions/github-proxy.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { username, repo, branch, filePath } = event.queryStringParameters;
    const githubUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filePath}`;

    try {
        const response = await fetch(githubUrl);
        const responseData = await response.text();

        return {
            statusCode: 200,
            body: responseData,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred' }),
        };
    }
};

