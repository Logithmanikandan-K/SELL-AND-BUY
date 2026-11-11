
let products = [
    {
        name: "Used Laptop",
        price: 15000,
        seller: "Arun",
        phone: "9876543210",
        image: ""
    },
    {
        name: "Old Bicycle",
        price: 2500,
        seller: "Kumar",
        phone: "9876543211",
        image: ""
    }
];

function displayProducts(list) {
    let output = "";

    for (let i = 0; i < list.length; i++) {
        let index = products.indexOf(list[i]);

        output += `
            <div class="product">
                <h3>${list[i].name}</h3>

                ${list[i].image ?
                `<img   src="${list[i].image}">` :
                `<p>No Image Available</p>`}

                <p>Price: $${list[i].price}</p>

                <button onclick="viewDetails(${index})">
                    View Details
                </button>
            </div>
        `;
    }

    document.getElementById("products").innerHTML = output;
}

function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let seller = document.getElementById("seller").value;
    let phone = document.getElementById("phone").value;
    let file = document.getElementById("image").files[0];

    if (name == "" || price == "" ||
        seller == "" || phone == "") {
        alert("Enter all product details");
        return;
    }

    if (Number(price) <= 0) {
        alert("Enter a valid price");
        return;
    }

    if (file) {
        let reader = new FileReader();

        reader.onload = function() {
            saveProduct(reader.result);
        };

        reader.readAsDataURL(file);
    } else {
        saveProduct("");
    }
}

function saveProduct(image) {
    let product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        seller: document.getElementById("seller").value,
        phone: document.getElementById("phone").value,
        image: image
    };

    products.push(product);

    displayProducts(products);

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("seller").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("image").value = "";

    alert("Product added successfully!");
}

function viewDetails(index) {
    let p = products[index];

    document.getElementById("details").innerHTML = `
        <h2>Product Details</h2>

        ${p.image ? `<img src="${p.image}">` : ""}

        <p>Product Name: ${p.name}</p>
        <p>Price: $${p.price}</p>
        <p>Seller Name: ${p.seller}</p>
        <p>Contact Number: ${p.phone}</p>

        <button onclick="contactSeller(${index})">
            Contact Seller
        </button>

        <button onclick="closeDetails()">
            Close Details
        </button>
    `;
}

function contactSeller(index) {
    alert("Contact Seller: " + products[index].phone);
}

function closeDetails() {
    document.getElementById("details").innerHTML = "";
}

function searchProduct() {
    let search = document.getElementById("search")
        .value.toLowerCase();

    let result = products.filter(function(p) {
        return p.name.toLowerCase().includes(search);
    });

    displayProducts(result);
}

displayProducts(products);
