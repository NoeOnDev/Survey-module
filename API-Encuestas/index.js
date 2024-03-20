import { createServer } from './src/app/server.js';
import { sequelize } from './src/database/db.config.js';

async function startServer() {
    const server = createServer();
    const PORT = process.env.PORT || 3000;

    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();