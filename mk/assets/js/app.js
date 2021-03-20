
$(document).ready(function () {


    console.log("welcome from delivery.js");

    ////////////////////////////////////////////////////////////////
    function exportToJsonFile(jsonData) {
        let dataStr = JSON.stringify(jsonData);
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        let exportFileDefaultName = 'data.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    /////////////////////[calculation]////////////////////////////////


    const isInt = (n) => {
        n % 1 === 0;
    }

    const calculate = (num1, num2) => {
        let result = parseInt(num1) + parseInt(num2);
        if (isInt(result)) {
            return result;
        } else {
            result = parseFloat((result).toFixed(2));
            return result;
        }

    }

    //////////////////////////////////////////////////////////////////// 

    function addData(input) {
        let file = input.files[0];
        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function () {
            console.log(reader.result);
            let data = JSON.parse(reader.result);

            localStorage.setItem('deliveryList', JSON.stringify(data));
        };

        reader.onerror = function () {
            console.log(reader.error);
        };

    }

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

    function detail(id) {
        let deliveryList = getDeliveryList();
        let delivery = {};
        delivery = deliveryList[deliveryList.findIndex(e => e.id == id)];
        let index = deliveryList.findIndex(e => e.id == id);
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
            let needcashshow = 'မလိုပါ';

            if (data[i]['needcash'] == 1) { needcashshow = 'လိုပါသည်' } else { needcashshow = 'မလိုပါ'; }

            let row = '<tr>' +
                '<td>' + count + '</td>' +
                '<td>' + data[i]['name'] + '</td>' +
                '<td >' + data[i]['house'] + '</td>' +
                '<td >' + data[i]['road'] + '</td>' +
                '<td >' + data[i]['quater'] + '</td>' +
                '<td >' + data[i]['town'] + '</td>' +
                '<td >' + data[i]['phone_no'] + '</td>' +
                '<td >' + data[i]['product_name'] + '</td>' +
                '<td >' + data[i]['quantity'] + '</td>' +
                '<td >' + data[i]['weight'] + '</td>' +
                '<td >' + data[i]['price'] + '</td>' +
                '<td >' + data[i]['delivery_fee'] + '</td>' +
                '<td >' + data[i]['total_cost'] + '</td>' +
                '<td >' + needcashshow + '</td>' +
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

        //JsBarcode("#itf-14", id, { format: "itf14" });
    }

    $(document).on('input', '#price', function () {
        let total = calculate($('#price').val(), $('#delivery_fee').val());
        //let result = total.toFixed(2);

        $('#total_cost').val(total);

    });

    $(document).on('input', '#delivery_fee', function () {

        let total = calculate($('#price').val(), $('#delivery_fee').val());
        //let result = total.toFixed(2);

        $('#total_cost').val(total);

    });

    $(document).on('input', '#editprice', function () {
        let total = calculate($('#editprice').val(), $('#editdelivery_fee').val());
        //let result = total.toFixed(2);

        $('#edittotal_cost').val(total);

    });

    $(document).on('input', '#editdelivery_fee', function () {

        let total = calculate($('#editprice').val(), $('#editdelivery_fee').val());
        //let result = total.toFixed(2);

        $('#edittotal_cost').val(total);

    });

    $(document).on('click', '#addbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("add");
        let name = ($("#name")).val();
        let house = ($("#house")).val();
        let road = ($("#road")).val();
        let quater = ($("#quater")).val();
        let town = ($("#town")).val();
        let phone_no = ($("#phone_no")).val();
        let product_name = ($("#product_name")).val();
        let quantity = ($("#quantity")).val();
        let weight = ($("#weight")).val();
        let price = ($("#price")).val();
        let delivery_fee = ($("#delivery_fee")).val();
        let total_cost = ($("#total_cost")).val();
        let delivery_start_date = ($("#delivery_start_date")).val();
        let needcash = 2;
        if (($("#needcash"))[0].checked == true) {
            needcash = 1;
        } else {
            needcash = needcash;
        }



        let delivery = {
            "name": name,
            "house": house,
            "road": road,
            "quater": quater,
            "town": town,
            "phone_no": phone_no,
            "product_name": product_name,
            "quantity": quantity,
            "weight": weight,
            "price": price,
            "delivery_fee": delivery_fee,
            "total_cost": total_cost,
            "delivery_status": 'pending',
            "delivery_start_date": delivery_start_date,
            "needcash": needcash,
            "delivery_end_date": null
        };
        console.log(delivery);
        insert(delivery);
        location.reload();

    });

    $(document).on('click', '#editbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("edit");
        let editid = $(this).attr('editid');
        console.log(editid);

        let delivery = detail(editid);
        console.log(delivery.delivery_start_date);



        ($("#editid")).val(delivery.id);
        ($("#editname")).val(delivery.name);
        ($("#edithouse")).val(delivery.house);
        ($("#editroad")).val(delivery.road);
        ($("#editquater")).val(delivery.quater);
        ($("#edittown")).val(delivery.town); 
        ($("#editphone_no")).val(delivery.phone_no);
        ($("#editproduct_name")).val(delivery.product_name);
        ($("#editquantity")).val(delivery.quantity);
        ($("#editweight")).val(delivery.weight);
        ($("#editprice")).val(delivery.price);
        ($("#editdelivery_fee")).val(delivery.delivery_fee);
        ($("#edittotal_cost")).val(delivery.total_cost);
        ($("#editdelivery_start_date")).val(delivery.delivery_start_date);
        if (delivery.needcash == 1) {
            ($("#editneedcash"))[0].checked = true;
        } else {
            ($("#editneedcash"))[0].checked = false;
        }

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
        let delivery = detail(deliveryid);
        console.log(delivery);
        $("#customer_name").text(delivery.name + " ၊ ဖုန်း - " + delivery.phone_no);
        $("#customer_address").text("အိမ်အမှတ်" + delivery.house + " ၊ " + delivery.road + "လမ်း ၊ " + delivery.quater + "ရပ်ကွက် ၊ " + delivery.town + " ။");
        $("#goods_type").text(delivery.product_name);
        $("#goods_weight").text(delivery.weight + ' KG');
        $("#package").text(delivery.product_name);
        $("#total").text(delivery.total_cost + ' ကျပ်');
        $("#total_fee").text(delivery.total_cost + ' ကျပ်');
        $("#goods_name").text('Packages: ' + delivery.product_name);

        $("#customer_nametwo").text(delivery.name + " ၊ ဖုန်း - " + delivery.phone_no);
        $("#customer_addresstwo").text("အိမ်အမှတ်" + delivery.house + " ၊ " + delivery.road + "လမ်း ၊ " + delivery.quater + "ရပ်ကွက် ၊ " + delivery.town+ " ။");
        $("#goods_typetwo").text(delivery.product_name);
        $("#goods_weighttwo").text(delivery.weight + ' KG');
        $("#packagetwo").text(delivery.product_name);
        $("#totaltwo").text(delivery.total_cost + ' ကျပ်');
        $("#total_feetwo").text(delivery.total_cost + ' ကျပ်');
        $("#goods_nametwo").text('Packages: ' + delivery.product_name);


        makeCode('mkonlineshop');
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
        let town = ($("#edittown")).val();
        let phone_no = ($("#editphone_no")).val();
        let product_name = ($("#editproduct_name")).val();
        let quantity = ($("#editquantity")).val();
        let weight = ($("#editweight")).val();
        let price = ($("#editprice")).val();
        let delivery_fee = ($("#editdelivery_fee")).val();
        let total_cost = ($("#edittotal_cost")).val();
        let needcash = 2;
        if (($("#editneedcash"))[0].checked == true) {
            needcash = 1;
        } else {
            needcash = needcash;
        }
        //let delivery_status = ($("edit#delivery_status")).val();
        let delivery_start_date = ($("#editdelivery_start_date")).val();
        //let delivery_end_date = ($("edit#delivery_end_date")).val();

        let delivery = {
            "id": id,
            "name": name,
            "house": house,
            "road": road,
            "quater": quater,
            "town": town,
            "phone_no": phone_no,
            "product_name": product_name,
            "quantity": quantity,
            "weight": weight,
            "price": price,
            "delivery_fee": delivery_fee,
            "total_cost": total_cost,
            "delivery_start_date": delivery_start_date,
            "needcash": needcash
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
        $("#importbtn").css('display', '');
        $("#exportdatabtn").css('display', '');
        $("#vouncherbtn").css('display', '');
        $("#homebtn").css('display', '');
        $("#importdatabtn").css('display', 'none');
        $("#filebox").css('display', 'none');


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

    $(document).on('click', '#exportdatabtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("exportdatabtn");
        var data = localStorage.getItem('deliveryList');
        //Convert JSON Array to string.
        var json = data;

        //Convert JSON string to BLOB.
        json = [json];
        var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

        //Check the Browser.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob1, "Customers.txt");
        } else {
            var url = window.URL || window.webkitURL;
            link = url.createObjectURL(blob1);
            var a = document.createElement("a");
            a.download = "backup.json";
            a.href = link;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }


    });

    $(document).on('click', '#importdatabtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("importdatabtn");
        let file = document.getElementById('jsonfile');
        addData(file);
        window.location.reload();

    });

    $(document).on('click', '#importbtn', function (event) {
        event.preventDefault();
        /* Act on the event */
        alert("importbtn");
        $("#editform").css('display', 'none');
        $("#addform").css('display', 'none');
        $("#vouncherview").css('display', '');
        $("#printscreen").css('display', 'none');
        $("#importbtn").css('display', 'none');
        $("#exportdatabtn").css('display', 'none');
        $("#vouncherbtn").css('display', 'none');
        $("#homebtn").css('display', '');
        $("#importdatabtn").css('display', '');
        $("#filebox").css('display', '');




    });

    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();
    document.getElementById("senddate").innerHTML = d + "/" + m + "/" + y;
    document.getElementById("senddate2").innerHTML = d + "/" + m + "/" + y;




});
