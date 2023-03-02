import "reflect-metadata"
import server from "./server"
const PORT = process.env.PORT_SERVER || 3001
server.listen(PORT, () => console.log("NetworkSocial started on port 3001"))