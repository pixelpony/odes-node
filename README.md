sudo npm install -g pm2

git clone git@github.com:pixelpony/odes-node.git
cd odes-node/
npm install


pm2 start app.js --name='odes'

