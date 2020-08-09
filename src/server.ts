import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import factureRoutes from './routes/facture.routes';



class Server {

    public app: express.Application;
    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    configuration(): void {
        //mongo
        const MONGO_URI = 'mongodb://localhost/psp';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, () => {
            console.log('db is connected');
        })
        this.app.set('port', process.env.PORT || 3000);
        //middle
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());

    }

    routes(): void {
        this.app.use('/api', factureRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port: ', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();