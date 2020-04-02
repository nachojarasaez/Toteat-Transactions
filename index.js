"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv.config();
const routers_1 = __importDefault(require("./src/routers"));
const { PORT = 4400 } = process.env;
const allowControlOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
const app = express_1.default();
app.use(morgan_1.default('combined'));
app.use(bodyParser.json());
app.use(cors_1.default({ origin: '*' }));
app.use(allowControlOrigin);
// Configurar las rutas de la aplicación
app.use('/app', routers_1.default);
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map