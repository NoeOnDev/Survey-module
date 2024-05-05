import { createContainer, asClass, asValue } from "awilix";

import Server from "../server.js";

const container = createContainer();

container.register({
    server: asClass(Server).singleton(),
});

export default container;