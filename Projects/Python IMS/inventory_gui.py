# How to run 
# Open Your terminal emulator 
# Go to the directory containing the inventory_gui.py file
# make sure you have tkinter downloaded
# Run the command "python inventory_gui.py" for windows and linux and for mac "python3 inventory_gui.py"


import datetime
import os
import tkinter as tk
from tkinter import ttk, messagebox

def generate_id(file_path, id_prefix):
    """Generates a new ID by reading the last ID from the file and incrementing it."""
    try:
        with open(file_path, "r") as f:
            lines = f.readlines()
            if len(lines) > 1:  # Check if there's more than just the header line
                # Skip the header line when getting the last ID
                last_line = lines[-1].strip()
                # For products.txt and suppliers.txt, get the ID from the first column (index 0)
                if file_path in ("products.txt", "suppliers.txt"):
                    last_id = last_line.split(",")[0]
                else:  # For orders.txt, handle potential empty lines
                    parts = last_line.split(",")
                    if len(parts) > 1 and parts[1]:  # Check if there's a valid Order ID
                        last_id = parts[1]
                    else:
                        last_id = id_prefix + "0000"  # Default if no valid ID found
                if last_id.startswith(id_prefix):
                    new_id = int(last_id[len(id_prefix):]) + 1
                else:
                    new_id = 1  # If the last ID doesn't have the prefix, start from 1
            else:
                new_id = 1
    except FileNotFoundError:
        new_id = 1
    return f"{id_prefix}{new_id:04d}"

def load_inventory():
    """Loads the current inventory from the orders.txt file."""
    inventory = {}
    try:
        with open("orders.txt", "r") as f:
            next(f)  # Skip the header line
            for line in f:
                parts = line.strip().split(",")
                if len(parts) == 5:  # Updated to include date
                    date, order_id, item, quantity, order_type = parts
                    quantity = int(quantity)
                    if order_type == "customer":  # Subtract quantity for customer orders
                        quantity = -quantity
                    if item not in inventory:
                        inventory[item] = 0
                    inventory[item] += quantity
    except FileNotFoundError:
        pass  # If the file doesn't exist, start with an empty inventory
    return inventory


def save_order(item, quantity, order_type):
    """Saves an order to the orders.txt file."""
    with open("orders.txt", "a") as f:
        today = datetime.date.today().strftime("%Y-%m-%d")
        order_id = generate_id("orders.txt", "OR")
        if order_type == "customer":
            quantity = abs(quantity)  # Make quantity positive for customer orders
        f.write(f"{today},{order_id},{item},{quantity},{order_type}\n")


def update_inventory(inventory, item, quantity):
    """Updates the inventory with the given quantity."""
    if item not in inventory:
        inventory[item] = 0
    inventory[item] += quantity
    return inventory

def view_inventory(inventory):
    """Displays the current inventory in a new window."""
    try:
        with open("products.txt", "r") as f:
            next(f)  # Skip the header line
            products = {}
            for line in f:
                parts = line.strip().split(",")
                if len(parts) >= 2:  # Check if there are at least 2 columns
                    product_id = parts[0]
                    product_name = parts[1]
                    products[product_id] = product_name

        if not inventory:
            messagebox.showinfo("Inventory", "Inventory is empty.")
        else:
            inventory_text = ""  # Initialize an empty string
            inventory_text += f"{'Product ID':<15} {'Product Name':<20} {'Quantity':<10}\n"
            inventory_text += "-" * 45 + "\n"
            for item, quantity in inventory.items():
                product_name = products.get(item, "Unknown Product")
                inventory_text += f"{item:<15} {product_name:<20} {quantity:<10}\n"

            # Create a new window to display the inventory
            inventory_window = tk.Toplevel(root)
            inventory_window.title("Current Inventory")

            # Create a text widget to display the inventory_text
            text_widget = tk.Text(inventory_window)
            text_widget.pack()
            text_widget.insert(tk.END, inventory_text)

    except FileNotFoundError:
        messagebox.showerror("Error", "products.txt file not found.")


def add_new_product():
    """Adds a new product to the products.txt file."""
    try:
        with open("suppliers.txt", "r") as f:
            next(f)  # Skip the header
            suppliers = f.readlines()
            if not suppliers:
                messagebox.showwarning("Warning", "No suppliers found. Please add a supplier first.")
                return

            # Create a new window for adding a new product
            add_product_window = tk.Toplevel(root)
            add_product_window.title("Add New Product")

            # Function to handle adding the product
            def add_product():
                product_name = product_name_entry.get()
                product_description = product_description_entry.get("1.0", tk.END).strip()
                product_price = product_price_entry.get()
                supplier_id = supplier_id_entry.get()

                # Basic input validation
                if not all([product_name, product_description, product_price, supplier_id]):
                    messagebox.showwarning("Warning", "Please fill in all fields.")
                    return

                try:
                    product_price = float(product_price)
                except ValueError:
                    messagebox.showwarning("Warning", "Invalid price. Please enter a number.")
                    return

                if len(supplier_id) != 4 or not supplier_id.isdigit():
                    messagebox.showwarning("Warning", "Invalid Supplier ID. Please enter a 4-digit ID (numbers only).")
                    return

                # Check if the supplier ID exists (compare only the numeric part)
                supplier_found = any(s.strip().split(",")[0][-4:] == supplier_id for s in suppliers)
                if not supplier_found:
                    messagebox.showwarning("Warning", "Supplier ID not found. Please enter a valid ID.")
                    return

                # Add the "SU" prefix back to the supplier_id
                supplier_id = "SU" + supplier_id

                product_id = generate_id("products.txt", "PD")

                with open("products.txt", "a") as f:
                    f.write(f"{product_id},{product_name},{product_description},{product_price},{supplier_id}\n")

                # Display product details
                messagebox.showinfo("Product Added", f"""
                    Product added successfully with the following details:
                    Product ID: {product_id}
                    Product Name: {product_name}
                    Description: {product_description}
                    Price: {product_price}
                    Supplier ID: {supplier_id}
                    """)

                # Clear the entry fields
                product_name_entry.delete(0, tk.END)
                product_description_entry.delete("1.0", tk.END)
                product_price_entry.delete(0, tk.END)
                supplier_id_entry.delete(0, tk.END)


            # Create and place labels and entry widgets
            tk.Label(add_product_window, text="Available Suppliers:").pack(pady=5)
            for supplier in suppliers:
                parts = supplier.strip().split(",")
                if len(parts) >= 2:
                    tk.Label(add_product_window, text=f"{parts[0]}: {parts[1]}").pack()

            tk.Label(add_product_window, text="Product Name:").pack(pady=5)
            product_name_entry = tk.Entry(add_product_window)
            product_name_entry.pack()

            tk.Label(add_product_window, text="Product Description:").pack(pady=5)
            product_description_entry = tk.Text(add_product_window, height=3)
            product_description_entry.pack()

            tk.Label(add_product_window, text="Product Price:").pack(pady=5)
            product_price_entry = tk.Entry(add_product_window)
            product_price_entry.pack()

            tk.Label(add_product_window, text="Supplier ID (numbers only):").pack(pady=5)
            supplier_id_entry = tk.Entry(add_product_window)
            supplier_id_entry.pack()

            # Create and place the Add Product button
            ttk.Button(add_product_window, text="Add Product", command=add_product).pack(pady=10)

    except FileNotFoundError:
        messagebox.showerror("Error", "suppliers.txt file not found.")

def update_product_details():
    """Updates the details of an existing product in the products.txt file."""
    try:
        with open("products.txt", "r") as f:
            next(f)  # Skip the header line
            products = f.readlines()
            if not products:
                messagebox.showinfo("No Products", "No products available.")
                return

            # Create a new window for updating product details
            update_window = tk.Toplevel(root)
            update_window.title("Update Product Details")

            # Function to handle updating the product
            def update_product():
                product_id = product_id_entry.get()
                new_name = product_name_entry.get()
                new_description = product_description_entry.get("1.0", tk.END).strip()
                new_price = product_price_entry.get()
                new_supplier_id = supplier_id_entry.get()

                if not product_id:
                    messagebox.showwarning("Warning", "Please enter a Product ID.")
                    return

                if len(product_id) != 4 or not product_id.isdigit():
                    messagebox.showwarning("Warning", "Invalid Product ID. Please enter a 4-digit ID (numbers only).")
                    return

                # Add the "PD" prefix back to the product_id
                product_id = "PD" + product_id

                updated_lines = []
                product_found = False

                with open("products.txt", "r") as f:
                    lines = f.readlines()

                for line in lines:
                    if line.startswith(product_id + ","):
                        product_found = True
                        parts = line.strip().split(",")
                        if new_name:
                            parts[1] = new_name
                        if new_description:
                            parts[2] = new_description
                        if new_price:
                            try:
                                parts[3] = float(new_price)
                            except ValueError:
                                messagebox.showwarning("Warning", "Invalid price. Please enter a number.")
                                return
                        if new_supplier_id:
                            if len(new_supplier_id) != 4 or not new_supplier_id.isdigit():
                                messagebox.showwarning("Warning", "Invalid Supplier ID. Please enter a 4-digit ID (numbers only).")
                                return
                            # You should add a check here to ensure the new_supplier_id exists
                            parts[4] = "SU" + new_supplier_id

                        updated_lines.append(",".join(parts) + "\n")
                    else:
                        updated_lines.append(line)

                if not product_found:
                    messagebox.showinfo("Not Found", "Product ID not found.")
                    return

                try:
                    with open("products.txt", "w") as f:
                        f.writelines(updated_lines)
                    messagebox.showinfo("Success", "Product updated successfully.")
                    update_window.destroy()  # Close the update window
                except Exception as e:
                    messagebox.showerror("Error", f"Error updating product: {e}")

            # Create and place labels and entry widgets
            tk.Label(update_window, text="Available Products:").pack(pady=5)
            for product in products:
                parts = product.strip().split(",")
                if len(parts) >= 4:
                    tk.Label(update_window, text=f"{parts[0]}: {parts[1]}").pack()

            tk.Label(update_window, text="Enter Product ID to update (numbers only):").pack(pady=5)
            product_id_entry = tk.Entry(update_window)
            product_id_entry.pack()

            tk.Label(update_window, text="New Product Name (leave blank to keep current):").pack(pady=5)
            product_name_entry = tk.Entry(update_window)
            product_name_entry.pack()

            tk.Label(update_window, text="New Product Description (leave blank to keep current):").pack(pady=5)
            product_description_entry = tk.Text(update_window, height=3)
            product_description_entry.pack()

            tk.Label(update_window, text="New Product Price (leave blank to keep current):").pack(pady=5)
            product_price_entry = tk.Entry(update_window)
            product_price_entry.pack()

            tk.Label(update_window, text="New Supplier ID (numbers only, leave blank to keep current):").pack(pady=5)
            supplier_id_entry = tk.Entry(update_window)
            supplier_id_entry.pack()

            # Create and place the Update Product button
            ttk.Button(update_window, text="Update Product", command=update_product).pack(pady=10)

    except FileNotFoundError:
        messagebox.showerror("Error", "products.txt file not found.")


def add_new_supplier():
    """Adds a new supplier to the suppliers.txt file."""
    # Create a new window for adding a new supplier
    add_supplier_window = tk.Toplevel(root)
    add_supplier_window.title("Add New Supplier")

    # Function to handle adding the supplier
    def add_supplier():
        supplier_name = supplier_name_entry.get()
        supplier_contact = supplier_contact_entry.get()

        if not all([supplier_name, supplier_contact]):
            messagebox.showwarning("Warning", "Please fill in all fields.")
            return

        supplier_id = generate_id("suppliers.txt", "SU")

        with open("suppliers.txt", "a") as f:
            f.write(f"{supplier_id},{supplier_name},{supplier_contact}\n")

        messagebox.showinfo("Supplier Added", f"""
            Supplier added successfully with the following details:
            Supplier ID: {supplier_id}
            Supplier Name: {supplier_name}
            Contact Details: {supplier_contact}
            """)

        # Clear the entry fields
        supplier_name_entry.delete(0, tk.END)
        supplier_contact_entry.delete(0, tk.END)

    # Create and place labels and entry widgets
    tk.Label(add_supplier_window, text="Supplier Name:").pack(pady=5)
    supplier_name_entry = tk.Entry(add_supplier_window)
    supplier_name_entry.pack()

    tk.Label(add_supplier_window, text="Supplier Contact Details:").pack(pady=5)
    supplier_contact_entry = tk.Entry(add_supplier_window)
    supplier_contact_entry.pack()

    # Create and place the Add Supplier button
    ttk.Button(add_supplier_window, text="Add Supplier", command=add_supplier).pack(pady=10)

def generate_reports(inventory):
    """Generates reports based on user choice."""
    # Create a new window for generating reports
    reports_window = tk.Toplevel(root)
    reports_window.title("Generate Reports")

    # Function to handle generating low stock report
    def generate_low_stock_report():
        try:
            with open("products.txt", "r") as f:
                next(f)  # Skip the header line
                products = {}
                for line in f:
                    parts = line.strip().split(",")
                    if len(parts) >= 2:  # Check if there are at least 2 columns
                        product_id = parts[0]
                        product_name = parts[1]
                        products[product_id] = product_name

            low_stock_threshold = int(threshold_entry.get())

            # Display current inventory
            print("\nCurrent Inventory:")
            view_inventory(inventory)  # Call view_inventory to display inventory

            low_stock_items = [item for item, quantity in inventory.items() if quantity <= low_stock_threshold]
            if low_stock_items:
                report_text = "Low Stock Items:\n"
                for item in low_stock_items:
                    product_name = products.get(item, "Unknown Product")
                    report_text += f"- {item} ({product_name}): {inventory[item]}\n"
                messagebox.showinfo("Low Stock Report", report_text)
            else:
                messagebox.showinfo("Low Stock Report", "No items are currently low in stock.")

        except FileNotFoundError:
            messagebox.showerror("Error", "products.txt file not found.")
        except ValueError:
            messagebox.showwarning("Warning", "Invalid threshold. Please enter an integer.")

    # Function to handle generating product sales report
    def generate_product_sales_report():
        try:
            with open("products.txt", "r") as f:
                next(f)  # Skip the header line
                products = {}
                for line in f:
                    parts = line.strip().split(",")
                    if len(parts) >= 2:  # Check if there are at least 2 columns
                        product_id = parts[0]
                        product_name = parts[1]
                        products[product_id] = product_name

            with open("orders.txt", "r") as f:
                next(f)  # Skip header
                sales = {}
                for line in f:
                    parts = line.strip().split(",")
                    if len(parts) == 5 and parts[4] == "customer":  # Only consider customer orders
                        product_id = parts[2]
                        quantity = int(parts[3])
                        sales[product_id] = sales.get(product_id, 0) + quantity

            if sales:
                report_text = "Product Sales:\n"
                for product_id, quantity in sales.items():
                    product_name = products.get(product_id, "Unknown Product")
                    report_text += f"{product_id} ({product_name}): {quantity}\n"  # Include product name
                messagebox.showinfo("Product Sales Report", report_text)
            else:
                messagebox.showinfo("Product Sales Report", "No customer orders found.")

        except FileNotFoundError:
            messagebox.showerror("Error", "orders.txt or products.txt file not found.")

    # Function to handle generating supplier orders report
    def generate_supplier_orders_report():
        try:
            with open("products.txt", "r") as f:
                next(f)  # Skip the header line
                products = {}
                for line in f:
                    parts = line.strip().split(",")
                    if len(parts) >= 2:  # Check if there are at least 2 columns
                        product_id = parts[0]
                        product_name = parts[1]
                        products[product_id] = product_name

            with open("orders.txt", "r") as f:
                next(f)  # Skip header
                supplier_orders = {}
                for line in f:
                    parts = line.strip().split(",")
                    if len(parts) == 5 and parts[4] == "supplier":  # Only consider supplier orders
                        product_id = parts[2]
                        quantity = int(parts[3])
                        supplier_orders[product_id] = supplier_orders.get(product_id, 0) + quantity

            if supplier_orders:
                report_text = "Supplier Orders:\n"
                for product_id, quantity in supplier_orders.items():
                    product_name = products.get(product_id, "Unknown Product")
                    report_text += f"{product_id} ({product_name}): {quantity}\n"  # Include product name
                messagebox.showinfo("Supplier Orders Report", report_text)
            else:
                messagebox.showinfo("Supplier Orders Report", "No supplier orders found.")

        except FileNotFoundError:
            messagebox.showerror("Error", "orders.txt or products.txt file not found.")

    # Create and place labels, entry widgets, and buttons
    tk.Label(reports_window, text="Enter low stock threshold:").pack(pady=5)
    threshold_entry = tk.Entry(reports_window)
    threshold_entry.pack()

    ttk.Button(reports_window, text="Generate Low Stock Report",
               command=generate_low_stock_report).pack(pady=5)
    ttk.Button(reports_window, text="Generate Product Sales Report",
               command=generate_product_sales_report).pack(pady=5)
    ttk.Button(reports_window, text="Generate Supplier Orders Report",
               command=generate_supplier_orders_report).pack(pady=5)

def initialize_files():
    """Initializes the files with headers if they don't exist."""
    if not os.path.exists("products.txt"):
        with open("products.txt", "w") as f:
            f.write("Product ID,Product Name,Description,Price,Supplier ID\n")
    if not os.path.exists("suppliers.txt"):
        with open("suppliers.txt", "w") as f:
            f.write("Supplier ID,Supplier Name,Contact Details\n")
    if not os.path.exists("orders.txt"):
        with open("orders.txt", "w") as f:
            f.write("Date,Order ID,Product ID,Quantity,Order Type\n")

def place_order(inventory):
    """Allows the user to place an order (supplier or customer)."""
    try:
        with open("products.txt", "r") as f:
            next(f)  # Skip the header line
            products = f.readlines()
            if not products:
                messagebox.showinfo("No Products", "No products available.")
                return

            # Create a new window for placing an order
            place_order_window = tk.Toplevel(root)
            place_order_window.title("Place an Order")

            # Function to handle placing the order
            def place_order():
                product_id = product_id_entry.get()
                quantity = quantity_entry.get()
                order_type = order_type_var.get()

                if not all([product_id, quantity]):
                    messagebox.showwarning("Warning", "Please fill in all fields.")
                    return

                if len(product_id) != 4 or not product_id.isdigit():
                    messagebox.showwarning("Warning", "Invalid Product ID. Please enter a 4-digit ID (numbers only).")
                    return

                # Check if the product ID exists (compare only the numeric part)
                product_found = any(p.strip().split(",")[0][-4:] == product_id for p in products)
                if not product_found:
                    messagebox.showwarning("Warning", "Product ID not found.")
                    return

                # Add the "PD" prefix back to the product_id
                product_id = "PD" + product_id

                try:
                    quantity = int(quantity)
                except ValueError:
                    messagebox.showwarning("Warning", "Invalid quantity. Please enter an integer.")
                    return

                if order_type == "supplier":
                    inventory = update_inventory(inventory, product_id, quantity)
                    save_order(product_id, quantity, "supplier")
                    messagebox.showinfo("Order Placed", "Supplier order recorded successfully.")
                elif order_type == "customer":
                    if inventory.get(product_id, 0) < quantity:
                        messagebox.showwarning("Warning", "Not enough stock available.")
                        return
                    inventory = update_inventory(inventory, product_id, -quantity)
                    save_order(product_id, quantity, "customer")
                    messagebox.showinfo("Order Placed", "Customer order recorded successfully.")

                # Clear entry fields after placing order
                product_id_entry.delete(0, tk.END)
                quantity_entry.delete(0, tk.END)

            # Create and place labels and entry widgets
            tk.Label(place_order_window, text="Available Products:").pack(pady=5)
            for product in products:
                parts = product.strip().split(",")
                if len(parts) >= 4:
                    tk.Label(place_order_window, text=f"{parts[0]}: {parts[1]}").pack()

            tk.Label(place_order_window, text="Product ID to order (numbers only):").pack(pady=5)
            product_id_entry = tk.Entry(place_order_window)
            product_id_entry.pack()

            tk.Label(place_order_window, text="Quantity:").pack(pady=5)
            quantity_entry = tk.Entry(place_order_window)
            quantity_entry.pack()

            tk.Label(place_order_window, text="Order Type:").pack(pady=5)
            order_type_var = tk.StringVar(value="supplier")
            ttk.Radiobutton(place_order_window, text="Supplier", variable=order_type_var, value="supplier").pack()
            ttk.Radiobutton(place_order_window, text="Customer", variable=order_type_var, value="customer").pack()

            # Create and place the Place Order button
            ttk.Button(place_order_window, text="Place Order", command=place_order).pack(pady=10)

    except FileNotFoundError:
        messagebox.showerror("Error", "products.txt file not found.")

def main():
    """Main function to run the inventory management system."""
    initialize_files()
    inventory = load_inventory()

    # Set up the main application window
    global root  # Define 'root' as global
    root = tk.Tk()
    root.title("Inventory Management System")

    # Create and place buttons for each menu option
    ttk.Button(root, text="1. View Current Inventory", command=lambda: view_inventory(inventory)).pack(pady=5)
    ttk.Button(root, text="2. Add a New Supplier", command=add_new_supplier).pack(pady=5)
    ttk.Button(root, text="3. Add a New Product", command=add_new_product).pack(pady=5)
    ttk.Button(root, text="4. Place an Order", command=lambda: place_order(inventory)).pack(pady=5)
    ttk.Button(root, text="5. Update Product Details", command=update_product_details).pack(pady=5)
    ttk.Button(root, text="6. Generate Reports", command=lambda: generate_reports(inventory)).pack(pady=5)
    ttk.Button(root, text="7. Exit", command=root.destroy).pack(pady=5)

    root.mainloop()

if __name__ == "__main__":
    main()

