//Imports used for the server

const {
    express,
    helmet,
    apiRouter,
    logger,
    cors
} = require('./middleware/imports')

//Middleware used globally

const server = express();

server.use(logger())
server.use(cors())
server.use(helmet());
server.use(express.json());

// API Routes

server.use('/api', apiRouter);

//API Welcome Note

server.get('/', (req, res) => { res.send(`<h2>Server is connected</h2>`) })

//Error handling

server.use((req,res)=>{res.status(404).json({message: "Not Found"})})
server.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({message: err.message})
})

module.exports = server;