/*jshint esversion: 6 */
// function addTask() {
//     var taskName = document.querySelector("#task").value;
//     var taskListUI = ` <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
//                            <div class="checklist-item checklist-item-success checklist-item-checked">
//                                <div class="checklist-info">
//                                    <h5 data-type="header" class="checklist-title mb-0">${taskName}</h5>
//                                </div>
//                                <div>
//                                    <div class="custom-control custom-checkbox custom-checkbox-success"><input id="${taskName}" type="checkbox"  class="custom-control-input" /><label for="${taskName}"
//                                            class="custom-control-label"></label></div>
//                                </div>
//                            </div>
//                        </li>`
//     var todoList = document.querySelector('.todo-list');
//     todoList.insertAdjacentHTML('beforeend', taskListUI);
// }
$(document).ready(function () {


    console.log("welcome from delivery.js");

    /////////////////////[calculation]////////////////////////////////
    const isInt = (n) => {
        n % 1 === 0;
    }

    const calculate = (num1, num2) => {
        let result = num1 * num2;
        if (isInt(result)) {
            return result;
        } else {
            result = parseFloat((result).toFixed(2));
            return result;
        }

    }
    ////////////////////////////////////////////////////////////////////   


    function insert(delivery) {
        delivery.id = Date.now();
        let deliveryList = getDeliveryList();
        deliveryList[deliveryList.length] = delivery;
        setDeliveryList(deliveryList);
        console.log(delivery);
    }

    function update(delivery) {
        let deliveryList = getDeliveryList();

        deliveryList[deliveryList.findIndex(e => e.id == delivery.id)] = delivery;
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

    function select() {
        console.log(getDeliveryList());
        return getDeliveryList();
    }

    function detail(id){
        let deliveryList = getDeliveryList();
        let delivery = {};
        delivery = deliveryList[deliveryList.findIndex(e => e.id == id)];
        let index=deliveryList.findIndex(e => e.id ==id);
        return delivery;
        // console.log(id);
        // console.log(deliveryList);
        // console.log(index);
        // console.log(delivery);
    }

    function delete_delivery(deliveryid) {
        let deliveryList = getDeliveryList();
        deliveryList.splice(deliveryList.findIndex(e => e.id === deliveryid), 1);
        setDeliveryList(deliveryList);
        console.log(delivery);
    }


    function getDeliveryList() {
        let deliveryList = localStorage.getItem('deliveryList');
        if (deliveryList == null) deliveryList = [];
        else deliveryList = JSON.parse(deliveryList);
        return deliveryList;
    }

    function setDeliveryList(deliveryList) {
        localStorage.setItem('deliveryList', JSON.stringify(deliveryList));
    }

    function delete_all() {
        localStorage.removeItem('deliveryList');
    }

    var delivery = {
        "name": "U Aung Ko Man",
        "house": "House 1",
        "road": "Road 2",
        "quater": "Quater 4",
        "township": "Township 5",
        "division": "Divistion 6",
        "phone_no": "09 123 432 897",
        "product_name": "Product One",
        "quantity": 4,
        "price": 1500,
        "delivery_fee": 2000,
        "total_cost": 8000,
        "delivery_status": 'pending',
        "delivery_start_date": "2021-01-12",
        "delivery_end_date": "2021-01-15"
    };



    //////////////////////////////////////////////////////////////////////////////////////

    let data = getDeliveryList();
   
    function showdata(data) {
        let count = 1;
        for (let i = 0; i < data.length; i++) {

            console.log(data[i]);

            let row = '<tr>' +
                '<td>' + count + '</td>' +
                '<td>' + data[i]['name'] + '</td>' +
                '<td >' + data[i]['house'] + '</td>' +
                '<td >' + data[i]['road'] + '</td>' +
                '<td >' + data[i]['quater'] + '</td>' +
                '<td >' + data[i]['township'] + '</td>' +
                '<td >' + data[i]['division'] + '</td>' +
                '<td >' + data[i]['phone_no'] + '</td>' +
                '<td >' + data[i]['product_name'] + '</td>' +
                '<td >' + data[i]['quantity'] + '</td>' +
                '<td >' + data[i]['price'] + '</td>' +
                '<td >' + data[i]['delivery_fee'] + '</td>' +
                '<td >' + data[i]['total_cost'] + '</td>' +
                '<td >' + data[i]['delivery_start_date'] + '</td>' +
                '<td >' + '<button type="" id="editbtn" editid="' + data[i]['id'] + '"class="btn btn-success mb-2 m-auto">EDIT</button>' + '</td>' +
                '<td >' + '<button type="" id="delbtn" deleteid="' + data[i]['id'] + '"class="btn btn-danger mb-2 m-auto">DEL</button>' + '</td>' +
                '<td >' + '<button type="" id="printviewbtn" printid="' + data[i]['id'] + '"class="btn btn-info mb-2 m-auto">VIEW</button>' + '</td>' +
                '</tr>';

            $(row).appendTo($("#example tbody"));
            count++;

        }
    }


    showdata(data);


    $('#example').DataTable();

    var qrcode = new QRCode("qrcode", {
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    var qrcodetwo = new QRCode("qrcodetwo", {
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    function makeCode(id) {
        



        qrcode.makeCode(id);
        qrcodetwo.makeCode(id);

        JsBarcode("#itf-14", id, { format: "itf14" });
    }

    


    $(document).on('input', '#itemamount', function () {
        let total = calculate($('#pricekyat').val(), $('#itemamount').val());
        //let result = total.toFixed(2);

        $('#totalpricekyat').val(total);

    });

    $(document).on('input', '#pricekyat', function () {

        let total = calculate($('#pricekyat').val(), $('#itemamount').val());
        //let result = total.toFixed(2);

        $('#totalpricekyat').val(total);

    });

    $(document).on('click', '#addbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("add");
        let name = ($("#name")).val();
        let house = ($("#house")).val();
        let road = ($("#road")).val();
        let quater = ($("#quater")).val();
        let township = ($("#township")).val();
        let division = ($("#division")).val();
        let phone_no = ($("#phone_no")).val();
        let product_name = ($("#product_name")).val();
        let quantity = ($("#quantity")).val();
        let price = ($("#price")).val();
        let delivery_fee = ($("#delivery_fee")).val();
        let total_cost = ($("#total_cost")).val();
        let delivery_start_date = ($("#delivery_start_date")).val();


        let delivery = {
            "name": name,
            "house": house,
            "road": road,
            "quater": quater,
            "township": township,
            "division": division,
            "phone_no": phone_no,
            "product_name": product_name,
            "quantity": quantity,
            "price": price,
            "delivery_fee": delivery_fee,
            "total_cost": total_cost,
            "delivery_status": 'pending',
            "delivery_start_date": delivery_start_date,
            "delivery_end_date": null
        };
        // console.log(delivery);
        insert(delivery);
        location.reload();

    });


    $(document).on('click', '#editbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("edit");
        let editid = $(this).attr('editid');
        console.log(editid);

        let delivery=detail(editid);
        console.log(delivery.delivery_start_date);
       
    

        ($("#editid")).val(delivery.id);
        ($("#editname")).val(delivery.name);
        ($("#edithouse")).val(delivery.house);
        ($("#editroad")).val(delivery.road);
        ($("#editquater")).val(delivery.quater);
        ($("#edittownship")).val(delivery.township);
        ($("#editdivision")).val(delivery.division);
        ($("#editphone_no")).val(delivery.phone_no);
        ($("#editproduct_name")).val(delivery.product_name);
        ($("#editquantity")).val(delivery.quantity);
        ($("#editprice")).val(delivery.price);
        ($("#editdelivery_fee")).val(delivery.delivery_fee);
        ($("#edittotal_cost")).val(delivery.total_cost);
        ($("#editdelivery_start_date")).val(delivery.delivery_start_date);

        $("#editform").css('display', '');
        $("#addform").css('display', 'none');
        $("#vouncherview").css('display', 'none');
        $("#printscreen").css('display', 'none');
      
    });

    $(document).on('click', '#delbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("delete");
        let deliveryid = $(this).attr('deleteid');
        delete_delivery(deliveryid);
        location.reload();

    });

    $(document).on('click', '#printviewbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("view");
        let deliveryid = $(this).attr('printid');
        makeCode(deliveryid);
        $("#printbtn").css('display', '');
        let id = $(this).attr('printid');
        $("#editform").css('display', 'none');
        $("#addform").css('display', 'none');
        $("#vouncherview").css('display', 'none');
        $("#printscreen").css('display', '');
        $("#footerview").css('display', 'none');

    });

    $(document).on('click', '#updatebtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("update");
        let id = ($("#editid")).val();
        let name = ($("#editname")).val();
        let house = ($("#edithouse")).val();
        let road = ($("#editroad")).val();
        let quater = ($("#editquater")).val();
        let township = ($("#edittownship")).val();
        let division = ($("#editdivision")).val();
        let phone_no = ($("#editphone_no")).val();
        let product_name = ($("#editproduct_name")).val();
        let quantity = ($("#editquantity")).val();
        let price = ($("#editprice")).val();
        let delivery_fee = ($("#editdelivery_fee")).val();
        let total_cost = ($("#edittotal_cost")).val();
        //let delivery_status = ($("edit#delivery_status")).val();
        let delivery_start_date = ($("#editdelivery_start_date")).val();
        //let delivery_end_date = ($("edit#delivery_end_date")).val();

        let delivery = {
            "id": id,
            "name": name,
            "house": house,
            "road": road,
            "quater": quater,
            "township": township,
            "division": division,
            "phone_no": phone_no,
            "product_name": product_name,
            "quantity": quantity,
            "price": price,
            "delivery_fee": delivery_fee,
            "total_cost": total_cost,
            "delivery_start_date": delivery_start_date
        };
        //console.log(delivery);
        update(delivery)
        location.reload();

    });

    $(document).on('click', '#homebtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("home");
        $("#editform").css('display', 'none');
        $("#addform").css('display', 'none');
        $("#vouncherview").css('display', '');
        $("#printscreen").css('display', 'none');
        $("#printbtn").css('display', 'none');
      

    });

    $(document).on('click', '#vouncherbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("vouncher");
        $("#editform").css('display', 'none');
        $("#addform").css('display', '');
        $("#vouncherview").css('display', 'none');
        $("#printscreen").css('display', 'none');
        $("#printbtn").css('display', 'none');
      

    });

    $(document).on('click', '#printbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("print");
        window.print();

    });

});
