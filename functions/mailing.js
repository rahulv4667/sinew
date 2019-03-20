const functions=require('firebase-functions');
const firebase=require('firebase-admin');

firebase.initializeApp(functions.config().firebase);

const eeClient=require('elasticemail-webapiclient').client;

require('dotenv').config();







//console.log('From database:'+FROM_ADDRESS);


const options={
    apiKey:functions.config().mail.apikey,
    apiUri:'https://api.elasticemail.com/',
    apiVersion:'v2'
}

const EE=new eeClient(options);

EE.Account
.Load()
.then((resp)=>{
    console.log(resp);
    return null;
})
.catch((err)=>{
    console.log(err);
    throw err;
});






module.exports={
 
    registrationMailing(data){
        
            
            let status_code=200;


        let body=`
        <table style='border: 2px solid black; padding:5px;'>
        <tr>
            <td>Name: </td>
            <td> `+data.registrationName+` </td>
        </tr>

        <tr>
            <td>Mail Id: </td>
            <td>`+data.registrationMail+`</td>
        </tr>

        <tr>
            <td>Phone number: </td>
            <td>`+data.registrationPhone+`</td>
        </tr>
        
        <tr>
            <td>Category </td>
            <td>`+data.registrationCategory+`</td>
        </tr>

        </table>  
        `;

        
        const emailParams={
            "subject":functions.config().mail.registrationmailsubject,
            "to": functions.config().mail.mailtoaddress,
            "from": functions.config().mail.mailfromaddress,
            "replyTo": functions.config().mail.mailreplyto,
            "bodyHtml": body,
            "fromName":functions.config().mail.from
            
        };
        
        EE.Email.Send(emailParams)
        .catch((err)=>{
            
            status_code=404;
            throw new Error(err);
            
        });
        return status_code;
        
        
        

    },
    

    queryMailing(data){
        //console.log('From database:'+FROM_ADDRESS);
        let status_code=200;
        
        let body=`
        <table style='border: 2px solid black; padding:5px;'>
        <tr>
            <td>Name: </td>
            <td> `+data.queryName+` </td>
        </tr>

        <tr>
            <td>Mail Id: </td>
            <td>`+data.queryMail+`</td>
        </tr>

        <tr>
            <td>Query: </td>
            <td>`+data.actualQuery+`</td>
        </tr>

        </table>  
        `;
        
        const emailParams={
            "subject":functions.config().mail.querymailsubject,
            "to":functions.config().mail.mailtoaddress,
            "from": functions.config().mail.mailfromaddress,
            "replyTo": functions.config().mail.mailreplyto,
            "bodyHtml": body,
            "fromName":functions.config().mail.from
            
        };
        
        EE.Email.Send(emailParams)
        .catch((err)=>{
            
            status_code=404;
            throw new Error(err);
            
        });
        return status_code;
    }
}