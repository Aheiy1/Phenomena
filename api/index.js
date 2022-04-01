// Build an apiRouter using express Router
const express = require("express");
const apiRouter = express.Router();

// Import the database adapter functions from the db
const {
  createReport,
  closeReport,
  getOpenReports,
  createReportComment,
} = require("../db");

apiRouter.get("/reports", async (req, res) => {
  try {
    const reports = await getOpenReports();
    res.send({
      reports: reports,
    });
  } catch (error) {
    console.error(error);
  }
});
/**
 * Set up a GET request for /reports
 *
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */

apiRouter.post("/reports", async (req, res, next) => {
  const { title, location, description, password } = req.body;
  const postData = {};
  try {
    postData.title = title;
    postData.location = location;
    postData.description = description;
    postData.password = password;
    const report = await createReport(postData);
    res.send(report);
  } catch (error) {
    console.log(error, "for 500 error");
    next({ error });
  }
});
/**
 * Set up a POST request for /reports
 *
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */

/**
 * Set up a DELETE request for /reports/:reportId
 *
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */

apiRouter.post("/reports/:reportId/comments", async (req, res, next) => {
  const { reportId, commentFields } = req.body;
  const reportData = {};
  try {
    reportData.reportId = reportId;
    reportData.commentFields = commentFields;

    const report = await createReportComment(
      reportData.reportId,
      reportData.commentFields
    );
    console.log(report, "create report comment");
    res.send(report);
  } catch (error) {
    next({ error });
  }
});
/**
 * Set up a POST request for /reports/:reportId/comments
 *
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */

// Export the apiRouter
module.exports = apiRouter;
