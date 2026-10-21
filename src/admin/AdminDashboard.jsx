import { useEffect, useState } from "react";
import "./AdminDashboard.css";

const categories = [
  "Bedroom",
  "Coffee Tables",
  "Sofas & Couches",
  "Dining",
  "Living Room",
  "Interior Design",
  "Chairs",
  "Office Furniture",
  "Kids & Baby",
  "Outdoor Furniture",
];

const emptyProduct = {
  name: "",
  category: "Bedroom",
  price: "",
  description: "",
  image: "",
  status: "Available",
};

function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("kbrand_products");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem("kbrand_enquiries");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("kbrand_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem("kbrand_customers");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("kbrand_reviews");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("kbrand_messages");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [searchProduct, setSearchProduct] = useState("");

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("kbrand_settings");
      return saved
        ? JSON.parse(saved)
        : {
            businessName: "K BRAND & INTERIORS",
            businessType: "Furniture Workshop",
            whatsapp: "254723917485",
            phone: "0723917485",
            location: "500 meters from Astro Petrol Station, Utawala",
            email: "",
            description:
              "Custom furniture and interior solutions made with quality and care.",
          };
    } catch {
      return {
        businessName: "K BRAND & INTERIORS",
        businessType: "Furniture Workshop",
        whatsapp: "254723917485",
        phone: "0723917485",
        location: "500 meters from Astro Petrol Station, Utawala",
        email: "",
        description:
          "Custom furniture and interior solutions made with quality and care.",
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("kbrand_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("kbrand_enquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem("kbrand_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("kbrand_customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("kbrand_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("kbrand_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("kbrand_settings", JSON.stringify(settings));
  }, [settings]);

  const menuItems = [
    "Dashboard",
    "Sales",
    "Enquiries",
    "Products",
    "Categories",
    "Orders",
    "Customers",
    "Reviews",
    "Messages",
    "Website Settings",
  ];

  const handleProductChange = (event) => {
    const { name, value } = event.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProductForm((previous) => ({
        ...previous,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm(emptyProduct);
    setShowProductForm(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      category: product.category || "Bedroom",
      price: product.price || "",
      description: product.description || "",
      image: product.image || "",
      status: product.status || "Available",
    });
    setShowProductForm(true);
  };

  const saveProduct = (event) => {
    event.preventDefault();

    if (!productForm.name.trim()) {
      alert("Please enter the furniture name.");
      return;
    }

    if (editingProduct) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...productForm,
              }
            : product
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...productForm,
        createdAt: new Date().toISOString(),
      };

      setProducts((previous) => [newProduct, ...previous]);
    }

    setProductForm(emptyProduct);
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this furniture item?"
    );

    if (!confirmed) {
      return;
    }

    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );
  };

  const saveSettings = (event) => {
    event.preventDefault();
    alert("Website settings saved.");
  };

  const updateSetting = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const formatPrice = (price) => {
    if (!price) {
      return "Price on request";
    }

    const number = Number(String(price).replace(/,/g, ""));

    if (Number.isNaN(number)) {
      return price;
    }

    return `KSh ${number.toLocaleString()}`;
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const totalSales = orders.reduce((total, order) => {
    return total + Number(order.total || 0);
  }, 0);

  const logout = () => {
    const confirmed = window.confirm("Do you want to logout?");

    if (confirmed) {
      window.location.href = "/";
    }
  };

  const renderDashboard = () => (
    <section className="admin-content">
      <div className="welcome-box">
        <div>
          <p>WELCOME BACK</p>
          <h3>K Brand & Interiors Dashboard</h3>
          <span>
            Manage your furniture business, products, enquiries and customers
            from one place.
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">Total Products</span>
          <strong>{products.length}</strong>
          <small>Furniture items</small>
        </div>

        <div className="stat-card">
          <span className="stat-title">Sales</span>
          <strong>{formatPrice(totalSales)}</strong>
          <small>Total recorded sales</small>
        </div>

        <div className="stat-card">
          <span className="stat-title">Enquiries</span>
          <strong>{enquiries.length}</strong>
          <small>Customer enquiries</small>
        </div>

        <div className="stat-card">
          <span className="stat-title">Customers</span>
          <strong>{customers.length}</strong>
          <small>Total customers</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <h3>Quick Actions</h3>
          </div>

          <div className="quick-actions">
            <button onClick={openAddProduct}>Add Furniture</button>

            <button onClick={() => setActivePage("Enquiries")}>
              View Enquiries
            </button>

            <button onClick={() => setActivePage("Orders")}>
              View Orders
            </button>

            <button onClick={() => setActivePage("Customers")}>
              View Customers
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <h3>Business Information</h3>
          </div>

          <div className="business-info">
            <div>
              <span>Business</span>
              <strong>{settings.businessName}</strong>
            </div>

            <div>
              <span>Type</span>
              <strong>{settings.businessType}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{settings.location}</strong>
            </div>

            <div>
              <span>WhatsApp</span>
              <strong>+{settings.whatsapp}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderSales = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">BUSINESS PERFORMANCE</p>
          <h3>Sales</h3>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">Total Sales</span>
          <strong>{formatPrice(totalSales)}</strong>
          <small>Recorded orders</small>
        </div>

        <div className="stat-card">
          <span className="stat-title">Orders</span>
          <strong>{orders.length}</strong>
          <small>Total orders</small>
        </div>

        <div className="stat-card">
          <span className="stat-title">Enquiries</span>
          <strong>{enquiries.length}</strong>
          <small>Potential sales</small>
        </div>

        <div className="stat-card">
          <span className="stat-title">Products</span>
          <strong>{products.length}</strong>
          <small>Items in catalogue</small>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <h3>Recent Sales</h3>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <h4>No sales recorded yet</h4>
            <p>Customer orders will appear here.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer || "Customer"}</td>
                    <td>{order.product || "Furniture"}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className="status-badge">
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );

  const renderEnquiries = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">CUSTOMER COMMUNICATION</p>
          <h3>Enquiries</h3>
        </div>
      </div>

      <div className="dashboard-card">
        {enquiries.length === 0 ? (
          <div className="empty-state">
            <h4>No enquiries yet</h4>
            <p>
              Customer enquiries from your website can be connected here.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>{enquiry.customer || "Customer"}</td>
                    <td>{enquiry.message || "No message"}</td>
                    <td>{enquiry.date || "-"}</td>
                    <td>
                      <span className="status-badge">
                        {enquiry.status || "New"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );

  const renderProducts = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">CATALOGUE MANAGEMENT</p>
          <h3>Products</h3>
        </div>

        <button className="primary-button" onClick={openAddProduct}>
          + Add Furniture
        </button>
      </div>

      <div className="product-toolbar">
        <input
          type="text"
          placeholder="Search furniture..."
          value={searchProduct}
          onChange={(event) => setSearchProduct(event.target.value)}
        />

        <span>{products.length} products</span>
      </div>

      {showProductForm && (
        <div className="product-form-card">
          <div className="card-heading">
            <h3>{editingProduct ? "Edit Furniture" : "Add Furniture"}</h3>

            <button
              className="close-button"
              onClick={() => {
                setShowProductForm(false);
                setEditingProduct(null);
                setProductForm(emptyProduct);
              }}
            >
              ×
            </button>
          </div>

          <form onSubmit={saveProduct}>
            <div className="form-grid">
              <div className="form-group">
                <label>Furniture Name</label>
                <input
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  placeholder="e.g. Modern King Size Bed"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={productForm.category}
                  onChange={handleProductChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  name="price"
                  value={productForm.price}
                  onChange={handleProductChange}
                  placeholder="e.g. 45000"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={productForm.status}
                  onChange={handleProductChange}
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Featured">Featured</option>
                </select>
              </div>

              <div className="form-group form-full">
                <label>Description</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  placeholder="Describe the furniture..."
                  rows="4"
                />
              </div>

              <div className="form-group form-full">
                <label>Furniture Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {productForm.image && (
                  <div className="image-preview">
                    <img src={productForm.image} alt="Furniture preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                  setProductForm(emptyProduct);
                }}
              >
                Cancel
              </button>

              <button type="submit" className="primary-button">
                {editingProduct ? "Save Changes" : "Add Furniture"}
              </button>
            </div>
          </form>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="dashboard-card empty-state">
          <h4>No furniture found</h4>
          <p>
            Add your first furniture item using the “Add Furniture” button.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-admin-card" key={product.id}>
              <div className="product-admin-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <div className="product-admin-details">
                <span className="product-category">{product.category}</span>

                <h4>{product.name}</h4>

                <strong>{formatPrice(product.price)}</strong>

                <p>
                  {product.description || "No description added yet."}
                </p>

                <span className="status-badge">{product.status}</span>

                <div className="product-actions">
                  <button onClick={() => openEditProduct(product)}>
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderCategories = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">PRODUCT ORGANIZATION</p>
          <h3>Categories</h3>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const count = products.filter(
            (product) => product.category === category
          ).length;

          return (
            <div className="category-card" key={category}>
              <div>
                <span>Furniture Category</span>
                <h4>{category}</h4>
              </div>

              <strong>{count}</strong>
              <small>Products</small>
            </div>
          );
        })}
      </div>
    </section>
  );

  const renderOrders = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">CUSTOMER REQUESTS</p>
          <h3>Orders</h3>
        </div>
      </div>

      <div className="dashboard-card">
        {orders.length === 0 ? (
          <div className="empty-state">
            <h4>No orders yet</h4>
            <p>Customer orders and furniture requests will appear here.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer || "Customer"}</td>
                    <td>{order.product || "Furniture"}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className="status-badge">
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );

  const renderCustomers = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">CUSTOMER MANAGEMENT</p>
          <h3>Customers</h3>
        </div>
      </div>

      <div className="dashboard-card">
        {customers.length === 0 ? (
          <div className="empty-state">
            <h4>No customers yet</h4>
            <p>Customers will appear here once connected to the website.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Orders</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name || "-"}</td>
                    <td>{customer.phone || "-"}</td>
                    <td>{customer.email || "-"}</td>
                    <td>{customer.orders || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );

  const renderReviews = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">CUSTOMER FEEDBACK</p>
          <h3>Reviews</h3>
        </div>
      </div>

      <div className="dashboard-card">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <h4>No reviews yet</h4>
            <p>Customer reviews will appear here.</p>
          </div>
        ) : (
          <div className="review-list">
            {reviews.map((review) => (
              <div className="review-admin-card" key={review.id}>
                <div>
                  <strong>{review.customer || "Customer"}</strong>
                  <span>{review.rating || 5} / 5</span>
                </div>

                <p>{review.message || review.text || "No review text."}</p>

                <button
                  className="delete-button"
                  onClick={() =>
                    setReviews((previous) =>
                      previous.filter((item) => item.id !== review.id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const renderMessages = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">CUSTOMER COMMUNICATION</p>
          <h3>Messages</h3>
        </div>
      </div>

      <div className="dashboard-card">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h4>No messages yet</h4>
            <p>Website contact messages will appear here.</p>
          </div>
        ) : (
          <div className="message-list">
            {messages.map((message) => (
              <div className="message-admin-card" key={message.id}>
                <div>
                  <strong>{message.name || "Customer"}</strong>
                  <span>{message.email || message.phone || ""}</span>
                </div>

                <p>{message.message || "No message."}</p>

                <button
                  className="delete-button"
                  onClick={() =>
                    setMessages((previous) =>
                      previous.filter((item) => item.id !== message.id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="admin-content">
      <div className="page-title-row">
        <div>
          <p className="admin-header-small">WEBSITE MANAGEMENT</p>
          <h3>Website Settings</h3>
        </div>
      </div>

      <div className="settings-card">
        <form onSubmit={saveSettings}>
          <div className="form-grid">
            <div className="form-group">
              <label>Business Name</label>
              <input
                value={settings.businessName}
                onChange={(event) =>
                  updateSetting("businessName", event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Business Type</label>
              <input
                value={settings.businessType}
                onChange={(event) =>
                  updateSetting("businessType", event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>WhatsApp Number</label>
              <input
                value={settings.whatsapp}
                onChange={(event) =>
                  updateSetting("whatsapp", event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                value={settings.phone}
                onChange={(event) =>
                  updateSetting("phone", event.target.value)
                }
              />
            </div>

            <div className="form-group form-full">
              <label>Location</label>
              <input
                value={settings.location}
                onChange={(event) =>
                  updateSetting("location", event.target.value)
                }
              />
            </div>

            <div className="form-group form-full">
              <label>Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(event) =>
                  updateSetting("email", event.target.value)
                }
              />
            </div>

            <div className="form-group form-full">
              <label>Business Description</label>
              <textarea
                rows="5"
                value={settings.description}
                onChange={(event) =>
                  updateSetting("description", event.target.value)
                }
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              Save Website Settings
            </button>
          </div>
        </form>
      </div>
    </section>
  );

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return renderDashboard();

      case "Sales":
        return renderSales();

      case "Enquiries":
        return renderEnquiries();

      case "Products":
        return renderProducts();

      case "Categories":
        return renderCategories();

      case "Orders":
        return renderOrders();

      case "Customers":
        return renderCustomers();

      case "Reviews":
        return renderReviews();

      case "Messages":
        return renderMessages();

      case "Website Settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h1>K BRAND</h1>
          <span>& INTERIORS</span>
          <p>ADMIN PANEL</p>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`admin-nav-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <button className="admin-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-header-small">K BRAND & INTERIORS</p>
            <h2>{activePage}</h2>
          </div>

          <div className="admin-user">
            <div className="admin-user-icon">A</div>

            <div>
              <strong>Administrator</strong>
              <span>Admin</span>
            </div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default AdminDashboard;