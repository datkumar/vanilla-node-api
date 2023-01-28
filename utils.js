import { rejects } from "assert";
import { writeFileSync } from "fs";
import { resolve } from "path";

export const writeDataToFile = (filename, content) => {
	// writeFileSync(file, data, options?)
	// Manually need to Convert to JSON String while writing to File
	writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
		if (err) {
			console.log(err);
		}
	});
};

export const getPostData = (req) => {
	return new Promise((resolve, reject) => {
		try {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});
			req.on("end", () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
};
