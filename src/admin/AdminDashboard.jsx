import { useState } from 'react'
import './AdminDashboard.css'

function AdminDashboard() {
const [activePage, setActivePage] = useState('Dashboard')
const [products, setProducts] = useState([])
const [showProductForm, setShowProductForm] = useState(false)

const [productName, setProductName] = useState('')
const [productCategory, setProductCategory] = useState('Bedroom')
const [productPrice, setProductPrice] = useState('')
const [productDescription, setProductDescription] = useState('')
const [productImage, setProductImage] = useState('')

const menuItems = [
'Dashboard',
'Products',
'Categories',
'Orders',
'Customers',
'Reviews',
'Messages',
'Settings',
]

const categories = [
'Bedroom',
'Coffee Tables',
'Sofas & Couches',
'Dining',
'Dining Room',
'Living Room',
'Interior Design',
'Chairs',
'Office Furniture',
'Kids & Baby',
'Outdoor Furniture',
]

const addProduct = (event) => {
event.preventDefault()

if (!productName.trim()) {
  alert('Please enter the product name')
  return
}

const newProduct = {
  id: Date.now(),
  name: productName,
  category: productCategory,
  price: productPrice,
  description: productDescription,
}

setProducts([...products, newProduct])

setProductName('')
setProductCategory('Bedroom')
setProductPrice('')
setProductDescription('')
setShowProductForm(false)

}

const deleteProduct = (id) => {
setProducts(products.filter((product) => product.id !== id))
}

const renderDashboard = () => (
<>
<section className="admin-welcome">
<div>
<span>WELCOME BACK</span>
<h2>K Brand & Interiors</h2>
<p>Manage your furniture workshop website from here.</p>
</div>

    <div className="admin-welcome-logo">K</div>
  </section>

  <section className="admin-stats">
    <div className="admin-stat">
      <span>Total Products</span>
      <strong>{products.length}</strong>
    </div>

    <div className="admin-stat">
      <span>Categories</span>
      <strong>{categories.length}</strong>
    </div>

    <div className="admin-stat">
      <span>Orders</span>
      <strong>0</strong>
    </div>

    <div className="admin-stat">
      <span>Messages</span>
      <strong>0</strong>
    </div>
  </section>

  <section className="admin-grid">
    <div className="admin-box">
      <span>STORE OVERVIEW</span>
      <h3>Furniture Categories</h3>

      {categories.slice(0, 5).map((category) => (
        <div className="admin-row" key={category}>
          <p>{category}</p>
          <strong>
            {products.filter(
              (product) => product.category === category
            ).length}
          </strong>
        </div>
      ))}
    </div>

    <div className="admin-box">
      <span>QUICK ACTIONS</span>
      <h3>Manage Website</h3>

      <div className="admin-actions">
        <button
          type="button"
          onClick={() => {
            setActivePage('Products')
            setShowProductForm(true)
          }}
        >
          + Add Product
        </button>

        <button
          type="button"
          onClick={() => setActivePage('Categories')}
        >
          Manage Categories
        </button>

        <button
          type="button"
          onClick={() => setActivePage('Orders')}
        >
          View Orders
        </button>

        <button
          type="button"
          onClick={() => setActivePage('Messages')}
        >
          View Messages
        </button>
      </div>
    </div>
  </section>
</>

)

const renderProducts = () => (
<section className="admin-content">

  <div className="admin-section-header">
    <div>
      <span>STORE MANAGEMENT</span>
      <h2>Products</h2>
    </div>

    <button
      type="button"
      className="admin-primary-button"
      onClick={() => setShowProductForm(!showProductForm)}
    >
      {showProductForm ? 'Close Form' : '+ Add Product'}
    </button>
  </div>

  {showProductForm && (
    <form className="admin-product-form" onSubmit={addProduct}>

      <h3>Add New Product</h3>

      <label>
        Product Name
        <input
          type="text"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          placeholder="Example: Modern Wooden Bed"
        />
      </label>

      <label>
        Category
        <select
          value={productCategory}
          onChange={(event) => setProductCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Price
        <input
          type="text"
          value={productPrice}
          onChange={(event) => setProductPrice(event.target.value)}
          placeholder="Example: KSh 45,000"
        />
      </label>

      
        Description
        <textarea
          value={productDescription}
          onChange={(event) => setProductDescription(event.target.value)}
          placeholder="Describe the furniture..."
          rows="4"
    
            <label>
    Product Image
    <input
      type="file"
      accept="image/*"
      onChange={(event) => {
        const file = event.target.files[0]

        if (file) {
          setProductImage(URL.createObjectURL(file))
        }
      }}
    />
  </label>

  <button type="submit" className="admin-save-button">
    Save Product
  </button>

</form>

)

  <div className="admin-products">

    {products.length === 0 ? (
      <div className="admin-empty">
        <h3>No Products Yet</h3>
        <p>Add your first K Brand & Interiors product.</p>
      </div>
    ) : (
      products.map((product) => (
        <div className="admin-product" key={product.id}>

          <div className="admin-product-info">
            <span>{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.description || 'No description added.'}</p>
            <strong>{product.price || 'Price on enquiry'}</strong>
          </div>

          <button
            type="button"
            className="admin-delete-button"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </button>

        </div>
      ))
    )}

  </div>

</section>

)

const renderCategories = () => (
<section className="admin-content">

  <div className="admin-section-header">
    <div>
      <span>STORE MANAGEMENT</span>
      <h2>Categories</h2>
    </div>
  </div>

  <div className="admin-category-grid">
    {categories.map((category) => (
      <div className="admin-category" key={category}>
        <h3>{category}</h3>

        <p>
          {products.filter(
            (product) => product.category === category
          ).length}{' '}
          products
        </p>
      </div>
    ))}
  </div>

</section>

)

const renderOrders = () => (
<section className="admin-empty">
<h2>Orders</h2>
<p>Customer orders and enquiries will appear here.</p>
</section>
)

const renderCustomers = () => (
<section className="admin-empty">
<h2>Customers</h2>
<p>Your customers will appear here.</p>
</section>
)

const renderReviews = () => (
<section className="admin-empty">
<h2>Reviews</h2>
<p>Customer reviews will appear here.</p>
</section>
)

const renderMessages = () => (
<section className="admin-empty">
<h2>Messages</h2>
<p>Customer messages and enquiries will appear here.</p>
</section>
)

const renderSettings = () => (
<section className="admin-box admin-settings">

  <span>BUSINESS SETTINGS</span>

  <h2>K Brand & Interiors</h2>

  <div className="admin-setting-row">
    <strong>Business Type</strong>
    <p>Furniture Workshop</p>
  </div>

  <div className="admin-setting-row">
    <strong>Location</strong>
    <p>500 meters from Astro Petrol Station, Utawala</p>
  </div>

  <div className="admin-setting-row">
    <strong>WhatsApp</strong>
    <p>+254 723 917 485</p>
  </div>

</section>

)

const renderPage = () => {
if (activePage === 'Dashboard') {
return renderDashboard()
}

if (activePage === 'Products') {
  return renderProducts()
}

if (activePage === 'Categories') {
  return renderCategories()
}

if (activePage === 'Orders') {
  return renderOrders()
}

if (activePage === 'Customers') {
  return renderCustomers()
}

if (activePage === 'Reviews') {
  return renderReviews()
}

if (activePage === 'Messages') {
  return renderMessages()
}

if (activePage === 'Settings') {
  return renderSettings()
}

return renderDashboard()

}

return (
<div className="admin-dashboard">

  <aside className="admin-sidebar">

    <div className="admin-logo">
      <div className="admin-logo-symbol">K</div>

      <div>
        <h2>K BRAND</h2>
        <p>INTERIORS</p>
      </div>
    </div>

    <nav className="admin-navigation">
      {menuItems.map((item) => (
        <button
          type="button"
          key={item}
          className={`admin-nav ${
            activePage === item ? 'active' : ''
          }`}
          onClick={() => {
            setActivePage(item)
            setShowProductForm(false)
          }}
        >
          {item}
        </button>
      ))}
    </nav>

    <button
      type="button"
      className="admin-logout"
      onClick={() => alert('Logout feature coming soon')}
    >
      Logout
    </button>

  </aside>

  <main className="admin-main">

    <header className="admin-header">

      <div>
        <span>ADMIN PANEL</span>
        <h1>{activePage}</h1>
      </div>

      <div className="admin-user">

        <div className="admin-user-icon">K</div>

        <div>
          <strong>Admin</strong>
          <small>K Brand & Interiors</small>
        </div>

      </div>

    </header>

    {renderPage()}

  </main>

</div>

)
}