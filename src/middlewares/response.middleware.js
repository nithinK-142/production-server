import { getTimestamp } from "../utils/logger.js";

export const responseHandler = (req, res, next) => {
  res.success = (data = {}, message = "") => {
    req.log.logs.push(`${getTimestamp()} : Success response`);

    return res.status(200).json({
      success: true,
      message,
      data
    });
  };

  res.fail = (message = "Something went wrong", data = {}) => {
    req.log.logs.push(`${getTimestamp()} : Failure response`);

    return res.status(200).json({
      success: false,
      message,
      data
    });
  };

  next();
};