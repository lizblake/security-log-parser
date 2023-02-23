import df from 'xml-js';
const convert = df;
export default async function handler(req, res) {
    let body = stdPostBody(req);
    let xml = body.xml;
    
    var result = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));
    console.log(result);

    res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    
    res.json(result);
}

function stdPostBody(req) {
    try {
      return JSON.parse(req.body);
    }
    catch(e) {
      // empty body response
      return {}
    }
  }