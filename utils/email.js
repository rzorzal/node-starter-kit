var config = require(process.cwd() + '/config/config');
var sendgrid = require('sendgrid');
var sg = require('sendgrid')(config.sendgrid.api_key);

module.exports.sendEmail = function({to, from, assunto, content}){
    var helper = require('sendgrid').mail;
    var fromEmail = new helper.Email(from);
    var toEmail = new helper.Email(to);
    var subject = assunto;
    var contentHTML = new helper.Content('text/html', content);
    var mail = new helper.Mail(fromEmail, subject, toEmail, contentHTML);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    return new Promise(function(resolve, reject){
        sg.API(request, function (error, response) {
            if (error) {
                console.log('Error response received');
                reject(error);
            }
            if(response.statusCode == 202 || response.statusCode == 200){
                resolve(response);
                return;
            }
            reject(response);
        });
    });
}
