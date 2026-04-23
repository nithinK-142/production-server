import { getTimestamp } from "../utils/logger.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req.body });

  if (!result.success) {
    req.log.logs.push(`${getTimestamp()} : Validation failed`);

    const errors = result.error.issues.map(e => ({
      field: e.path.join("."),
      message: e.message
    }));

    return res.fail("Validation error", { errors });
  }

  req.body = result.data.body;
  req.log.logs.push(`${getTimestamp()} : Validation passed`);

  next();
};