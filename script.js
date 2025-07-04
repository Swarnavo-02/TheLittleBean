// Global variables
let currentImageIndex = 0;
let cart = [];
let selectedCategory = 'all';

// Coffee menu data
const coffeeItems = [
    {
        id: 1,
        name: "Irish coffee",
        description: "A bold fusion of rich coffee, smooth whiskey, and velvety cream — Irish Coffee is warmth in every sip.",
        price: 169,
        image: "https://drinksworld.com/wp-content/uploads/Irish-Coffee-02-scaled.jpg",
        rating: 4.9,
        category: "Irish Coffee"
    },
    {
        id: 2,
        name: "English Breakfast",
        description: "A hearty classic to start your day — English Breakfast is a wholesome spread of eggs, toast, sausages, beans, and comfort on a plate.",
        price: 350,
        image: "https://media.istockphoto.com/id/1408486208/photo/full-english-breakfast.jpg?s=612x612&w=0&k=20&c=XZVsyWU2uT8zJg0XEaWLBTR6FXKe8B1DpY4NDhmXPHA=",
        rating: 4.8,
        category: "Breakfast"
    },
    {
        id: 3,
        name: "Latte",
        description: "Smooth espresso with premium steamed milk and vanilla undertones",
        price: 189,
        image: "https://cdn.shopify.com/s/files/1/0879/5370/3213/files/image2_a905d414-6eeb-417b-a912-7f4d03326256_480x480.jpg?v=1721473873",
        rating: 4.7,
        category: "latte"
    },
    {
        id: 4,
        name: "Cappuccino ",
        description: "Perfectly balanced espresso with steamed milk and artisan foam art",
        price: 169,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=500",
        rating: 4.8,
        category: "cappuccino"
    },
    {
        id: 5,
        name: "Kitkat Shake",
        description: "A creamy, chocolatey indulgence blended with crunchy KitKat — the perfect shake for your inner child.",
        price: 210,
        image: "https://pbs.twimg.com/media/E706t1aVkAQ6DDj?format=jpg&name=small",
        rating: 4.9,
        category: "Shakes"
    },
    {
        id: 6,
        name: "Mac n Cheese",
        description: "Pure espresso with hot water for a clean, bold coffee experience",
        price: 280,
        image: "https://zenaskitchen.com/wp-content/uploads/2022/10/roasted-pumpkin-mac-n-cheese-2-1000x1000.jpg",
        rating: 4.6,
        category: "americano"
    },
    {
        id: 7,
        name: "Cold Brew Delight",
        description: "Smooth, refreshing cold brew steeped for 24 hours",
        price: 160,
        image: "https://www.sessioncoffeedenver.com/wp-content/uploads/2025/01/generated-image-72.webp",
        rating: 4.7,
        category: "cold-brew"
    },
    {
        id: 8,
        name: "Chicken-Wings",
        description: "Crispy, juicy, and sauced to perfection — our Chicken Wings are a fiery favorite for every craving.",
        price: 310,
        image: "https://www.thecookierookie.com/wp-content/uploads/2024/02/bbq-chicken-wings-recipe-2-960x1200.jpg",
        rating: 4.8,
        category: "Chicken-Wings"
    },
    {
        id: 9,
        name: "Noodles",
        description: " Juicy, and sauced to perfection — our noodles are  favorite for every craving.",
        price: 210,
        image: "https://plus.unsplash.com/premium_photo-1694670234085-4f38b261ce5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.8,
        category: "noodles"
    }
];


// Hero image rotation
const heroImages = [
    'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2'
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSlider();
    renderMenu();
    updateCartCount();
    initializeScrollAnimations();
    initializeSmoothScrolling();
});

// Hero slider functionality
function initializeHeroSlider() {
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        changeHeroImage(currentImageIndex);
    }, 5000);
}

function changeHeroImage(index) {
    const images = document.querySelectorAll('.hero-image');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all images and dots
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current image and dot
    images[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentImageIndex = index;
}

// Menu functionality
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = selectedCategory === 'all' 
        ? coffeeItems 
        : coffeeItems.filter(item => item.category === selectedCategory);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-price">Rs ${item.price.toFixed(2)}</div>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h4>${item.name}</h4>
                    <div class="menu-item-rating">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                </div>
                <p>${item.description}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function filterMenu(category) {
    selectedCategory = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Re-render menu
    renderMenu();
}

// Cart functionality
function addToCart(itemId) {
    const item = coffeeItems.find(coffee => coffee.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    updateCartCount();
    showAddToCartAnimation();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCartItems();
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity === 0) {
        removeFromCart(itemId);
    } else {
        const item = cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            updateCartCount();
            renderCartItems();
        }
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function getTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function showAddToCartAnimation() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Modal functionality
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('active');
    renderCartItems();
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('active');
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        totalPriceElement.textContent = '0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        </div>
    `).join('');
    
    totalPriceElement.textContent = getTotalPrice().toFixed(2);
}

function proceedToOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    closeCart();
    openOrderForm();
}

function openOrderForm() {
    const modal = document.getElementById('orderModal');
    const orderTotalPrice = document.getElementById('orderTotalPrice');
    modal.classList.add('active');
    orderTotalPrice.textContent = getTotalPrice().toFixed(2);
}

function closeOrderForm() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
}

function submitOrder(event) {
    event.preventDefault();
    
    // Simulate order processing
    alert('Thank you for your order! We will contact you shortly.');
    
    // Clear cart and close modals
    cart = [];
    updateCartCount();
    closeOrderForm();
    
    // Reset form
    event.target.reset();
}

// Contact form
function submitContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-fade-in-up, .animate-slide-up, .animate-slide-in-left, .animate-slide-in-right').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(146, 64, 14, 0.95), rgba(234, 88, 12, 0.95))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #92400e, #ea580c)';
        header.style.backdropFilter = 'none';
    }
});

// Preload images for better performance
function preloadImages() {
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    coffeeItems.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

// Initialize image preloading
preloadImages();