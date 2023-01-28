import {
	findAll,
	findById,
	create,
	update,
	remove,
} from "../models/productModel.js";
import { getPostData } from "../utils.js";

/*
    @desc    Fetches ALL Products
    @route   GET /api/products
*/
export const getAllProducts = async (req, res) => {
	try {
		const fetchedProducts = await findAll();
		res.writeHead(200, { "Content-Type": "application/json" });
		// Manually need to Convert to JSON String while sending Respnose
		res.end(JSON.stringify(fetchedProducts));
	} catch (error) {
		console.log(error);
	}
};

/*
    @desc    Fetches a Product by ID
    @route   GET /api/products/:id
*/
export const getProduct = async (req, res, prodId) => {
	try {
		const fetchedProduct = await findById(prodId);
		if (!fetchedProduct) {
			res.writeHead(404, { "Content-Type": "application/json" });
			return res.end(JSON.stringify({ msg: "Product NOT Found" }));
		}
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(fetchedProduct));
	} catch (error) {
		console.log(error);
	}
};

/*
    @desc    Create a new Product
    @route   POST /api/products
*/
export const createProduct = async (req, res) => {
	try {
		let body = await getPostData(req);
		const { title, desc, price } = JSON.parse(body);
		const newProduct = await create({
			title,
			desc,
			price,
		});
		res.writeHead(201, { "Content-Type": "application/json" });
		return res.end(JSON.stringify(newProduct));
	} catch (error) {
		console.log(error);
	}
};

/*
    @desc    Update Product
    @route   PUT /api/products/:id
*/
export const updateProduct = async (req, res, prodId) => {
	try {
		const existingProduct = await findById(prodId);
		if (!existingProduct) {
			res.writeHead(404, { "Content-Type": "application/json" });
			return res.end(JSON.stringify({ msg: "Product NOT Found" }));
		}
		const body = await getPostData(req);
		const { title, desc, price } = JSON.parse(body);
		const updatedProduct = await update(prodId, {
			title: title || existingProduct.title,
			desc: desc || existingProduct.desc,
			price: price || existingProduct.price,
		});
		res.writeHead(200, { "Content-Type": "application/json" });
		return res.end(JSON.stringify(updatedProduct));
	} catch (error) {
		console.log(error);
	}
};

/*
    @desc    Delete Product
    @route   DELETE /api/products/:id
*/
export const deleteProduct = async (req, res, prodId) => {
	try {
		const fetchedProduct = await findById(prodId);
		if (!fetchedProduct) {
			res.writeHead(404, { "Content-Type": "application/json" });
			return res.end(JSON.stringify({ msg: "Product NOT Found" }));
		}
		await remove(prodId);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				msg: `Product with id ${prodId} removed successfully`,
			})
		);
	} catch (error) {
		console.log(error);
	}
};

/*
    res.statusCode(200)
    res.setHeader("Content-Type", "text/html")
    res.write("<h1>Hello World</h1>")
    res.end()
*/
