export type JSendStatus = "success" | "fail" | "error";

export type JSendObject<T extends object | null> =
  | JSendSuccessObject<T>
  | JSendFailureObject<T>
  | JSendErrorObject
  | JSendErrorObjectwithData<Required<T>>;

/**
 * Success
 * When an API call is successful, the JSend object is used as a simple envelope for the results, using the data key, as in the following:
 *
 * GET /posts.json:
 * {
 *     status : "success",
 *     data : {
 *         "posts" : [
 *             { "id" : 1, "title" : "A blog post", "body" : "Some useful content" },
 *             { "id" : 2, "title" : "Another blog post", "body" : "More content" },
 *         ]
 *      }
 * }
 *
 * GET /posts/2.json:
 * {
 *     status : "success",
 *     data : { "post" : { "id" : 2, "title" : "Another blog post", "body" : "More content" }}
 * }
 *
 * DELETE /posts/2.json:
 * {
 *     status : "success",
 *     data : null
 * }
 *
 * Required keys:
 *
 * status: Should always be set to "success".
 * data: Acts as the wrapper for any data returned by the API call. If the call returns no data (as in the last example), data should be set to null.
 */
export interface JSendSuccessObject<T extends object | null>
  extends JSendBaseObject {
  status: "success";
  data: T;
}

/**
 * Fail
 * When an API call is rejected due to invalid data or call conditions, the JSend object's data key contains an object explaining what went wrong, typically a hash of validation errors. * For example:
 *
 * POST /posts.json (with data body: "Trying to creating a blog post"):
 * {
 *    "status" : "fail",
 *    "data" : { "title" : "A title is required" }
 * }
 *
 * Required keys:
 *
 * status: Should always be set to "fail".
 * data: Again, provides the wrapper for the details of why the request failed. If the reasons for failure correspond to POST values,
 * the response object's keys SHOULD correspond to those POST values.
 */

export interface JSendFailureObject<T extends object | null>
  extends JSendBaseObject {
  status: "fail";
  data: T;
}

/**
 * Error
 * When an API call fails due to an error on the server. For example:
 *
 * GET /posts.json:
 * {
 *     "status" : "error",
 *     "message" : "Unable to communicate with database"
 * }
 *
 * Required keys:
 *
 * status: Should always be set to "error".
 * message: A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong.
 *
 * Optional keys:
 *
 * code: A numeric code corresponding to the error, if applicable
 * data: A generic container for any other information about the error, i.e. the conditions that caused the error, stack traces, etc.
 */

export interface JSendErrorObject extends JSendBaseObject {
  status: "error";
  message: string;
  code?: number;
}

export interface JSendErrorObjectwithData<T extends object>
  extends JSendErrorObject {
  data?: T;
}

export interface JSendBaseObject {
  status: JSendStatus;
}
