export default function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error In Error Handler";

  console.error(`[ERROR] ${status}: ${message}`, err);

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && { details: err.stack }),
  });
}
