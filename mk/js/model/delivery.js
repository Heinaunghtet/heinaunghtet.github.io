console.log("welcome from delivery.js");


var delivery = {
    "name":"U Aung Ko Man",
    "house":"House 1",
    "road":"Road 2",
    "quater":"Quater 4",
    "township":"Township 5",
    "division":"Divistion 6",
    "phone_no":"09 123 432 897",
    "product_name":"Product One",
    "quantity":4,
    "price":1500,
    "delivery_fee":2000,
    "total_cost": 8000,
    "delivery_status":'pending',
    "delivery_start_date":"2021-01-12",
    "delivery_end_date":"2021-01-15"
};

function insert(delivery){
    delivery.id = Date.now();
    let deliveryList = getDeliveryList();
    deliveryList[deliveryList.length] = delivery;
    setDeliveryList(deliveryList);
    console.log(delivery);
}

function update(delivery){
    let deliveryList = getDeliveryList();
    
    deliveryList[deliveryList.findIndex(e => e.id === delivery.id)] = delivery;
    /*
    for(let i=0; i< deliveryList.length; i++){
        if(deliveryList[i].id == delivery.id){
            deliverYList[i] = delivery;
        }
    }
    */
    setDeliveryList(deliveryList);
    console.log(delivery);
}

function select(){
    console.log(getDeliveryList());
    return getDeliveryList();
}

function detail(id){
    let deliveryList = getDeliveryList();
    let delivery = {};
    delivery = deliveryList[deliveryList.findIndex(e => e.id === id)];
    return delivery;
}

function delete_delivery(delivery){
    let deliveryList = getDeliveryList();
    deliveryList.splice(deliveryList.findIndex(e => e.id === delivery.id),1);
    setDeliveryList(deliveryList);
    console.log(delivery);
}


function getDeliveryList(){
    let deliveryList = localStorage.getItem('deliveryList');
    if(deliveryList == null) deliveryList = [];
    else deliveryList = JSON.parse(deliveryList);
    return deliveryList;
}
function setDeliveryList(deliveryList){
    localStorage.setItem('deliveryList',JSON.stringify(deliveryList));
}

function delete_all(){
    localStorage.removeItem('deliveryList');
}


//insert(delivery);