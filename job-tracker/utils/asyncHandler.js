const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next); // next in fn(req, res, next) is not required
        // js ignores extra arguments        
    };
};

module.exports = asyncHandler;