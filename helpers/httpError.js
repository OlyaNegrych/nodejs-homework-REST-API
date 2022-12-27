class httpError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

// const errorHandler = (err, req, res, next) => {
//     if (err instanceof httpError) {
//         return res.status(err.status).json({message: err.message})
//     }
//     res.status(500).json({ message: err.message });
// }

module.exports = httpError;

// module.exports = { httpError, errorHandler };

// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.status = 400;
//   }
// }

// class NotFoundContact extends Error {
//   constructor(message) {
//     super(message);
//     this.status = 400;
//   }
// }

// class FailedToUpdate extends Error {
//   constructor(message) {
//     super(message);
//     this.status = 400;
//   }
// }

// module.exports = {
//   ValidationError,
//   NotFoundContact,
//   FailedToUpdate,
// };