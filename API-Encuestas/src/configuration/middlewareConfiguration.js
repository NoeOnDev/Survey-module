import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';

class middlewareConfiguration {
    constructor(app) {
        this.app = app;
        this.configure();
    }

    configure() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(passport.initialize());
    }
}

export default middlewareConfiguration;