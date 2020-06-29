var app = require('express')();
var server = require('http').Server(app);

var bodyParser = require("body-parser");
urlEncodedParser = bodyParser.urlencoded({ extended: false });

var http = require('http');
http.globalAgent.keepAlive = true;

const cors = require('cors');
app.use(cors());


const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function gen() {
 const { stdout, stderr } = await exec('echo "true" > /home/flag.txt && while `cat /home/flag.txt`; do wget -q -O- http://loadnode-app-service:5001/load; done');
  console.log('[genload]stdout:', stdout);
  console.log('[genload]stderr:', stderr);
}
//gen();

async function stopload() {
  const { stdout, stderr } = await exec('echo "false" > \'/home/flag.txt\'');
  console.log('[stopload]stdout :', stdout);
  console.log('[stopload]stderr stopload:', stderr);
}
//stopload();

app.get('/genLoad', (req,res)=>{
    //terminal command to gen load. (while true; do wget -q -O- http://service-name; done)
    //gen();
    exec('echo "true" > /home/flag.txt && while `cat /home/flag.txt`; do wget -q -O- http://loadnode-app-service:5001/load; done; echo "ok";', (err, stdout, stderr) => {
        if (err) {

          console.error(err)
        } else {
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        }
      });    
    res.sendStatus(200);
})

app.get('/stopLoad', (req,res)=>{
     stopload();
     res.sendStatus(200);
 })

app.get('/readyReplicas', urlEncodedParser, (req,res)=>{
    //run terminal command to get readyReplicas.
    exec('KUBE_TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token) && curl -sSk -H "Authorization: Bearer $KUBE_TOKEN" https://$KUBERNETES_SERVICE_HOST:$KUBERNETES_PORT_443_TCP_PORT/apis/apps/v1/namespaces/default/deployments/loadnode-app-deployment | jq \'.status.readyReplicas\'', (err, stdout, stderr) => {
        if (err) {

          console.error(err)
        } else {

         console.log(`stdout: ${stdout}`);
         res.json(stdout);
         console.log(`stderr: ${stderr}`);
        }
      });
    // res.json(readyReplicas)
})

const port = 5002;
server.listen(port, ()=> console.log(`listening on port ${port}...`));
