
//query the necessary elements

const quickOverview=document.querySelector('.cards');
const product=document.querySelector('.product');
const productName=document.querySelector('.product__header--title');
const productDescription=document.querySelector('.product__description');
const icon=document.querySelector('.icon');
const addButton=document.querySelector('.cards');
const card=document.querySelector('.cards__card');
const shoppingCartButton=document.querySelector('.shopping__cart');
const shoppingCart=document.querySelector('.shopping__cart--products');
const shoppingAmount=document.querySelector('.shopping__amount');
const shoppingProducts=document.querySelector('.shopping__products');
const deleteButton=document.querySelector('.shopping');


//create a uniq id

const create_uniqid=()=>{
    let dt=new Date().getTime();
    let uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c)=>{
        let r=(dt + Math.random()*16)%16 | 0;
        dt=Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

//class to store the items and work with them
class Cart{
    constructor(){
        this.prods=[];
        this.budget=0;
    }
    addToCart(obj){
        obj.price=parseInt(obj.price,10);
        this.prods.push(obj);
    }
    deleteFromCart(id){

        let elements=this.prods.map((current)=>{
            return current.id;
        })

        let index=elements.indexOf(id);
        if(index > -1){
            this.prods.splice(index,1);
        }
    }
    addToUI(obj){
       const markup=`
       <div class="prod" id=${obj.id}>
            <h3 class="prod__name">${obj.name}</h3>
            <p class="prod__par">${obj.description}</p>
            <p class="prod__price">${obj.price}$</p>
            <button  class="prod__delete">DELETE ITEM</button>
        </div>
       `
       shoppingCart.insertAdjacentHTML('afterbegin',markup);
    }
    deleteFromUI(selectorID){
        console.log(selectorID);
        let el=document.getElementById(selectorID);
        el.remove();
    }
    calculateBudget(){
        if(!this.prods.length){
           this.budget=0;
        }else{
            this.budget=0;
            for(let i=0;i<this.prods.length;i++){
                this.budget=this.budget+this.prods[i].price;
            }
        }
        console.log(this.budget);
        shoppingAmount.textContent=`Total amount : ${this.budget}`;
    }
    shoppingProductsNumber(){
        shoppingProducts.textContent=this.prods.length;
    }
}

//the item model
class Item {
    constructor(name, description, price) {
        this.id = create_uniqid();
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

//the application controller
const controller=()=>{
    

    const cart=new Cart();
    //create the object for the cart
    const createItemForCart=(e)=>{
        let name,description,price;
        name=e.target.parentNode.querySelector('.cards__card--header').textContent;
        description=e.target.parentNode.querySelector('.cards__card--par').textContent;
        price=e.target.parentNode.querySelector('.cards__card--price').textContent;
        return [name,description,price];
    }
    //extract the data for the sidebar
    const showItem=(name,description,price)=>{
        productName.textContent=name;
        productDescription.textContent=description;
    }

    //add an element to the cart and ui
    addButton.addEventListener('click',e=>{
        //create the product
        if(e.target.classList.contains('cards__card--add')){
            const item=new Item(...createItemForCart(e));
             //add product to cart
            cart.addToCart(item);
            cart.addToUI(item);
            cart.calculateBudget();
            cart.shoppingProductsNumber();
        }
    })


    //delete an item from cart and ui
    deleteButton.addEventListener('click',e=>{
        if(e.target.classList.contains('prod__delete')){

            cart.deleteFromCart(e.target.parentElement.id);
            cart.calculateBudget();
            cart.shoppingProductsNumber();
            //update the ui
            cart.deleteFromUI(e.target.parentElement.id);
        }
    })

    
    
    //add and remove the sidebar 
    quickOverview.addEventListener('click',e=>{
        if(e.target.classList.contains('cards__card--overview')){
            showItem(...createItemForCart(e));
            if(product.classList.contains('no-animation')){
                product.classList.remove('no-animation');
                product.classList.add('show-animation');
            }
        }
    })


    //show the cart
    icon.addEventListener('click',(e)=>{
        if(product.classList.contains('show-animation')){
            product.classList.remove('show-animation');
            product.classList.add('no-animation');
        }
    })

    //set the the state of the cart
    shoppingCartButton.addEventListener('click',()=>{
        if(cart.prods.length==0){
            shoppingAmount.textContent='Empty';
        }
        else{
            shoppingAmount.textContent=`Total amount : ${cart.budget}`;
        }
        if(shoppingCart.classList.contains('block')){
            shoppingCart.classList.remove('block');
        }
        else{
            shoppingCart.classList.add('block');
        }
    })


    
}

controller();

