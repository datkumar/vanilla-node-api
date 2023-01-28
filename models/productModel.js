import products from "../data/products.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid";
import { writeDataToFile } from "../utils.js";

export const findAll = () => {
	return new Promise((resolve, reject) => {
		resolve(products);
	});
};

export const findById = (prodId) => {
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === prodId);
		resolve(product);
	});
};

export const create = (product) => {
	return new Promise((resolve, reject) => {
		const newProduct = { id: uuidv4(), ...product };
		products.push(newProduct);
		writeDataToFile("./data/products.json", products);
		// Send the newly created entry as Response
		resolve(newProduct);
	});
};

export const update = (prodId, product) => {
	return new Promise((resolve, reject) => {
		const index = products.findIndex((p) => p.id === prodId);
		products[index] = { id: prodId, ...product };
		writeDataToFile("./data/products.json", products);
		// Send the Updated product (located at products[index]) as Response
		resolve(products[index]);
	});
};

export const remove = (prodId) => {
	return new Promise((resolve, reject) => {
		let tempProducts = products.filter((p) => p.id !== prodId);
		writeDataToFile("./data/products.json", tempProducts);
		resolve();
	});
};
