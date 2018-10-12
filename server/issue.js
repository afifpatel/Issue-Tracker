'use strict';

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
    };

const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
    };

function validateIssue(issue) {
    for(const field in issue ){
        const type = issueFieldType[field];
    if(!type) {
        delete issue[field];
    } else if ( type == 'required' && !issue[field]){
        return `${field} is required.`;
    }
}

if(!validIssueStatus[issue.status])
    return `${issue.status} is not a valid status.`;

return null;

}

function convertIssue(issue) {
    if(issue.date) issue.date = new Date(issue.date);
    return cleanupIssue(issue);
}

function cleanupIssue(issue) {
  const cleanedUpIssue = {};
  Object.keys(issue).forEach(field => {
    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
  });
//   console.log("issue list returned issue =>",issue);
  return cleanedUpIssue;

}

// module.exports = {
//     validateIssue : validateIssue
// };

export default {                              //ES2015
    validateIssue,
    cleanupIssue,
    convertIssue,
};


