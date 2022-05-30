import http from 'http'
import { server as WebSocketServer } from 'websocket'

const { PORT } = process.env;

const httpServer = http.createServer((request, response) => {
    console.log(`[${new Date}]: Received request for ${request.url}`)
    response.writeHead(404)
    response.end()
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

const server = new WebSocketServer({
    httpServer,
    autoAcceptConnections: false,
})

const isAllowedOrigin = (origin) => true;

server.on('request', (request) => {
    if (!isAllowedOrigin(request.origin)) {
        request.reject();
        console.log(`[${new Date}]: Connection from origin ${request.origin} rejected`)
        return;
    }
    
    const connection = request.accept('echo-protocol', request.origin)
    console.log(`[${new Date}]: Connection accepted`)

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log(`Received Message: ${message.utf8Data}`)
            connection.sendUTF(message.utf8Data)
        } else if (message.type === 'binary') {
            console.log(`Received Binary Message of ${message.binaryData}`)
            connection.sendBytes(message.binaryData)
        }
    })

    connection.on('close', (reason, description) => {
        console.log(`[${new Date}]: Peer ${connection.remoteAddress} disconnected | [${reason}] - ${description}`)
    })
})

server.on('connect', (request) => {

})


server.on('close', (connection, reason, description) => {

})