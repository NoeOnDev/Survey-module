// Importar las librerías necesarias
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcrypt";
import express from "express";
import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth20";
import { Sequelize, DataTypes, Model } from "sequelize";

// Cargar las variables de entorno
process.loadEnvFile();

// Extraer las variables de entorno
const { PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// Crear la conexión a la base de datos
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

// Autenticar la conexión a la base de datos
sequelize.authenticate();
sequelize.sync({ force: true });

// Crear la aplicación de Express
const app = express();

// Configurar la aplicación de Express
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "helloworld",
    resave: false,
    saveUninitialized: false,
  })
);

// Definir el modelo de usuario
class User extends Model {}

User.init(
  {
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registrationMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 10);
        }

        if (user.googleId) {
          user.registrationMethod = "google";
        } else {
          user.registrationMethod = "local";
        }
      },
    },
  }
);

// Configurar la estrategia de autenticación de Google
async function googleAuthGlobal() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        findOrCreateUser(profile, done);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}

// Funciones que se usan en las rutas
async function googleAuth(req, res, next) {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
}

async function googleAuthCallback(req, res, next) {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("http://localhost:5173/");
      });
    }
  )(req, res, next);
}

async function findOrCreateUser(profile, done) {
  try {
    const [user, created] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        name: profile.displayName,
        email: profile.emails[0].value,
        registrationMethod: "google",
      },
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

async function registerUser(req, res) {
  try {
    const user = await User.create(req.body);
    if (!user) {
      return res.status(400).json({ message: "User could not be created" });
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Definir las rutas
app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleAuthCallback);
app.post("/register", registerUser);

// Iniciar la estrategia de autenticación de Google
googleAuthGlobal();

// Iniciar la aplicación de Express
app.listen(PORT);