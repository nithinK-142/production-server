import { getTimestamp } from "../utils/logger.js";

export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    // Add validation start log
    req.log.logs.push(`${getTimestamp()} : Validation - Starting validation for ${property}`);
    
    let dataToValidate;
    
    switch(property) {
      case "body":
        dataToValidate = req.body;
        req.log.logs.push(`${getTimestamp()} : Validation - Validating request body`);
        break;
      case "query":
        dataToValidate = req.query;
        req.log.logs.push(`${getTimestamp()} : Validation - Validating query parameters`);
        break;
      case "params":
        dataToValidate = req.params;
        req.log.logs.push(`${getTimestamp()} : Validation - Validating route parameters`);
        break;
      default:
        dataToValidate = req.body;
        req.log.logs.push(`${getTimestamp()} : Validation - Validating request body (default)`);
    }
    
    // Log the data being validated (excluding large/nested objects for performance)
    const logData = { ...dataToValidate };
    if (logData.password) logData.password = "***HIDDEN***";
    if (logData.token) logData.token = "***HIDDEN***";
    req.log.logs.push(`${getTimestamp()} : Validation - Data: ${JSON.stringify(logData).substring(0, 200)}`);
    
    const result = schema.safeParse({ [property]: dataToValidate });
    
    if (!result.success) {
      const errors = result.error.issues.map(err => ({
        path: err.path.join("."),
        message: err.message,
        code: err.code
      }));
      
      req.log.logs.push(`${getTimestamp()} : Validation - FAILED with ${errors.length} error(s)`);
      errors.forEach(err => {
        req.log.logs.push(`${getTimestamp()} : Validation Error - ${err.path}: ${err.message}`);
      });
      
      return res.status(200).json({
        success: false,
        message: "Validation failed",
        errors,
        timestamp: new Date().toISOString()
      });
    }
    
    // Attach validated data to request
    if (property === "body") {
      req.body = result.data.body;
      req.log.logs.push(`${getTimestamp()} : Validation - Body validation successful`);
    }
    if (property === "query") {
      req.query = result.data.query;
      req.log.logs.push(`${getTimestamp()} : Validation - Query validation successful`);
    }
    if (property === "params") {
      req.params = result.data.params;
      req.log.logs.push(`${getTimestamp()} : Validation - Params validation successful`);
    }
    
    next();
  };
};