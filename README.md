# Install
npm install restify request

# Run Demo

cd app1
nodemon app1.js
# another window
cd app2
nodemon app2.js
# another window
curl "http://localhost:9944/api/serve/999" # 999 will hang app1

There is already:
	https://www.npmjs.com/package/watchdog
	https://github.com/mafintosh/respawn
