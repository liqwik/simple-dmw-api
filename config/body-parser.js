/**
 * body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
 * This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request
 *
 patchNode {Boolean} Patch request body to Node's ctx.req, default false
 patchKoa {Boolean} Patch request body to Koa's ctx.request, default true
 jsonLimit {String|Integer} The byte (if integer) limit of the JSON body, default 1mb
 formLimit {String|Integer} The byte (if integer) limit of the form body, default 56kb
 textLimit {String|Integer} The byte (if integer) limit of the text body, default 56kb
 encoding {String} Sets encoding for incoming form fields, default utf-8
 multipart {Boolean} Parse multipart bodies, default false
 urlencoded {Boolean} Parse urlencoded bodies, default true
 text {Boolean} Parse text bodies, such as XML, default true
 json {Boolean} Parse JSON bodies, default true
 jsonStrict {Boolean} Toggles co-body strict mode; if set to true - only parses arrays or objects, default true
 includeUnparsed {Boolean} Toggles co-body returnRawBody option; if set to true, for form encodedand and JSON requests the raw, unparsed requesty body will be attached to ctx.request.body using a Symbol, default false
 formidable {Object} Options to pass to the formidable multipart parser
 onError {Function} Custom error handle, if throw an error, you can customize the response - onError(error, context), default will throw
 strict {Boolean} DEPRECATED If enabled, don't parse GET, HEAD, DELETE requests, default true
 parsedMethods {String[]} Declares the HTTP methods where bodies will be parsed, default ['POST', 'PUT', 'PATCH']. Replaces strict option.
 */
module.exports = {
  multipart: true,
  enableTypes: ['json', 'form'],
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // parse GET, HEAD, DELETE requests
  formidable: {
    maxFileSize: 2 * 1024 * 1024, // default 2mb (2 * 1024 * 1024)
    // uploadDir: path.join(__dirname, '../assets/uploads/tmp'),
  },
  jsonLimit: '1mb',
  formLimit: '56kb',
  textLimit: '56kb',
};
