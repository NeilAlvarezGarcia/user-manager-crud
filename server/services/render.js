const renderView = (file) => (_req, res) => {
    const { user } = res;
    
    res.render(file, { user });
}

module.exports = renderView;
