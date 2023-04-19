const notFound = (_req, res) => {
    res.status(404).write(`
        <h1>Route not found, please <a href="/">Go back to the main page</a></h1>
    `)
    res.end();
}

module.exports = notFound