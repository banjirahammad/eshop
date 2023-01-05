
let addCarts = document.getElementsByClassName('addCart');
let cartList = document.querySelector('#cart-list');

//Product class
class Product {
    constructor(name,price,code){
        this.name = name;
        this.price = price;
        this.code = code;
    }
}

//UI class
class UI{
    static addCartList(product){
        let list = document.querySelector('#cart-list');
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.code}</td>
            <td>${product.price} tk</td>
            <td> <a class="text-danger" href="#">Remove</a></td>
        `;
        list.appendChild(row);
    }

    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        let notification = document.querySelector('#notification');
        notification.append(div);
        setTimeout( () => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    static deleteFromCartList(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeProduct(target.parentElement.previousElementSibling.previousElementSibling.textContent.trim());
            UI.showAlert('Product Successfully Removed from cart!', 'success');
        }
    }


}

// local storage class
class Store
{
    static getProducts()
    {
        let products;
        if(localStorage.getItem('products')===null) {
            products = [];
        }else{
            products = JSON.parse(localStorage.getItem('products'));
        }
        return products;
    }

    static addCart(product){
        let products = Store.getProducts();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    static displayProducts(){
        let products = Store.getProducts();
        products.forEach(product => {
            UI.addCartList(product);
        });
    }

    static removeProduct(code){
        let products = Store.getProducts();
        products.forEach((product, index) =>{
            if(product.code === code){
                products.splice(index, 1);
            }
        });

        localStorage.setItem('products', JSON.stringify(products));
    }

}


// add event listener
for(let i=0; i<addCarts.length; i++)
    addCarts[i].addEventListener('click', Addtocart);

document.addEventListener('DOMContentLoaded', Store.displayProducts());

cartList.addEventListener('click', removeProduct);



//functions
function Addtocart(e){
    let cartbtn = e.target;
    let name = cartbtn.previousElementSibling.previousElementSibling.textContent.trim();
    let price = cartbtn.previousElementSibling.children[0].textContent.trim();
    let code = cartbtn.previousElementSibling.children[2].textContent.trim();

    if( name === '' || price === '' || code === ''){
        UI.showAlert("Someting worng",'danger');
    }else{
        let product = new Product(name,price,code);
        UI.addCartList(product);
        UI.showAlert('Product Successfully added to cart!', 'success');
        Store.addCart(product);
    }  
    e.preventDefault();
}


function removeProduct(e)
{
    UI.deleteFromCartList(e.target);
    e.preventDefault();
}