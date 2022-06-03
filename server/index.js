import http from 'http'
import { server as WebSocketServer } from 'websocket'

const PORT = process.env.PORT || 8000;

const httpServer = http.createServer((request, response) => {
    console.log(`[${new Date}]: Received request for ${request.url}`)
    response.writeHead(404)
    response.end()
})

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

const server = new WebSocketServer({
    httpServer,
    autoAcceptConnections: false,
})


const isAllowedOrigin = (origin) => true;


const openConnections = [];

server.on('request', (request) => {
    if (!isAllowedOrigin(request.origin)) {
        request.reject();
        console.log(`[${new Date}]: Connection from origin ${request.origin} rejected`)
        return;
    }
    
    const connection = request.accept('echo-protocol', request.origin)
    console.log(`[${new Date}]: Connection accepted`)
    openConnections.push(connection);

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log(`Received Message: ${message.utf8Data}`)
            openConnections.forEach(item => {
                if (item !== connection) {
                    item.sendUTF(message.utf8Data)
                } else {
                    item.sendUTF(JSON.stringify({ ...JSON.parse(message.utf8Data), isMe: true }))
                }
            })
        } else if (message.type === 'binary') {
            console.log(`Received Binary Message of ${message.binaryData}`)
            openConnections.forEach(item => {
                if (item !== connection) {
                    item.sendBytes(message.binaryData)
                } else {
                    item.sendBytes(JSON.stringify({ ...JSON.parse(message.binaryData), isMe: true }))
                }
            })
        }
    })

    connection.on('close', (reason, description) => {
        openConnections[connection] = null;
        console.log(`[${new Date}]: Peer ${connection.remoteAddress} disconnected | [${reason}] - ${description}`)
    })
})

server.on('connect', (request) => {

})


server.on('close', (connection, reason, description) => {

})