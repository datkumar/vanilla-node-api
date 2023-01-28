import { createServer } from "http";
import {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "./controllers/productController.js";

const server = createServer((req, res) => {
	// Regex for /api/products/:id
	// id can include alphabets, numbers and "-" characters
	const routeRegex = /\/api\/products\/([a-zA-Z0-9\-]+)/;
	// Route Format: GET /api/products
	if (req.url === "/api/products" && req.method === "GET") {
		getAllProducts(req, res);
	}
	// Route Format: GET /api/products/:id
	else if (req.url.match(routeRegex) && req.method === "GET") {
		const prodId = req.url.split("/")[3];
		getProduct(req, res, prodId);
	}
	// Route Format: POST /api/products
	else if (req.url === "/api/products" && req.method === "POST") {
		createProduct(req, res);
	}
	// Route Format: PUT /api/products/:id
	else if (req.url.match(routeRegex) && req.method === "PUT") {
		const prodId = req.url.split("/")[3];
		updateProduct(req, res, prodId);
	}
	// Route Format: DELETE /api/products/:id
	else if (req.url.match(routeRegex) && req.method === "DELETE") {
		const prodId = req.url.split("/")[3];
		deleteProduct(req, res, prodId);
	}
	// Any Other Route Format
	else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ msg: "Route NOT Found" }));
	}
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
