/**
 * A simple in-memory product management system using JavaScript.
 * This example demonstrates basic data structures and operations
 * for managing products, simulating a core component of a larger system.
 */

class Product {
    constructor(id, name, description, price, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date();
    }
}

class ProductManager {
    constructor() {
        this.products = []; // Stores all products
        this.nextId = 1;    // Simple ID generator
    }

    // Adds a new product to the system
    addProduct(name, description, price, category) {
        const newProduct = new Product(this.nextId++, name, description, price, category);
        this.products.push(newProduct);
        console.log(`Product added: ${newProduct.name} (ID: ${newProduct.id})`);
        return newProduct;
    }

    // Retrieves a product by its ID
    getProductById(id) {
        const productId = parseInt(id, 10);
        return this.products.find(p => p.id === productId);
    }

    // Retrieves all products, optionally filtered by category
    getAllProducts(categoryFilter) {
        if (categoryFilter) {
            return this.products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
        }
        return this.products;
    }

    // Updates an existing product
    updateProduct(id, data) {
        const product = this.getProductById(id);
        if (product) {
            product.update(data);
            console.log(`Product updated: ${product.name} (ID: ${id})`);
            return product;
        } else {
            console.error(`Product with ID ${id} not found.`);
            return null;
        }
    }

    // Removes a product by its ID
    deleteProduct(id) {
        const productId = parseInt(id, 10);
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== productId);
        if (this.products.length < initialLength) {
            console.log(`Product with ID ${id} deleted.`);
            return true;
        } else {
            console.error(`Product with ID ${id} not found.`);
            return false;
        }
    }
}

// --- Example Usage ---
const manager = new ProductManager();

// Add some products
manager.addProduct("Laptop", "High performance laptop", 1200, "Electronics");
manager.addProduct("Desk Chair", "Ergonomic office chair", 250, "Furniture");
manager.addProduct("Keyboard", "Mechanical gaming keyboard", 100, "Electronics");

console.log("\n--- All Products ---");
console.log(manager.getAllProducts());

console.log("\n--- Electronics Products ---");
console.log(manager.getAllProducts("Electronics"));

console.log("\n--- Get Product by ID (1) ---");
const laptop = manager.getProductById(1);
console.log(laptop);

console.log("\n--- Update Product (2) ---");
manager.updateProduct(2, { price: 230, description: "Comfortable office chair" });
console.log(manager.getProductById(2));

console.log("\n--- Delete Product (3) ---");
manager.deleteProduct(3);

console.log("\n--- All Products After Deletion ---");
console.log(manager.getAllProducts());
