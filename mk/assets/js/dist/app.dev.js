"use strict";

$(document).ready(function () {
  console.log("welcome from delivery.js"); ////////////////////////////////////////////////////////////////

  function exportToJsonFile(jsonData) {
    var dataStr = JSON.stringify(jsonData);
    var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    var exportFileDefaultName = 'data.json';
    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } /////////////////////[calculation]////////////////////////////////


  var isInt = function isInt(n) {
    n % 1 === 0;
  };

  var calculate = function calculate(num1, num2) {
    var result = parseInt(num1) + parseInt(num2);

    if (isInt(result)) {
      return result;
    } else {
      result = parseFloat(result.toFixed(2));
      return result;
    }
  }; ////////////////////////////////////////////////////////////////////   


  function addData(input) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      console.log(reader.result);
      var data = JSON.parse(reader.result);
      localStorage.setItem('deliveryList', JSON.stringify(data));
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  function insert(delivery) {
    delivery.id = Date.now();
    var deliveryList = getDeliveryList();
    deliveryList[deliveryList.length] = delivery;
    setDeliveryList(deliveryList);
    console.log(delivery);
  }

  function update(delivery) {
    var deliveryList = getDeliveryList();
    deliveryList[deliveryList.findIndex(function (e) {
      return e.id == delivery.id;
    })] = delivery;
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
    var deliveryList = getDeliveryList();
    var delivery = {};
    delivery = deliveryList[deliveryList.findIndex(function (e) {
      return e.id == id;
    })];
    var index = deliveryList.findIndex(function (e) {
      return e.id == id;
    });
    return delivery; // console.log(id);
    // console.log(deliveryList);
    // console.log(index);
    // console.log(delivery);
  }

  function delete_delivery(deliveryid) {
    var deliveryList = getDeliveryList();
    deliveryList.splice(deliveryList.findIndex(function (e) {
      return e.id === deliveryid;
    }), 1);
    setDeliveryList(deliveryList);
    console.log(delivery);
  }

  function getDeliveryList() {
    var deliveryList = localStorage.getItem('deliveryList');
    if (deliveryList == null) deliveryList = [];else deliveryList = JSON.parse(deliveryList);
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
  }; //////////////////////////////////////////////////////////////////////////////////////

  var data = getDeliveryList();

  function showdata(data) {
    var count = 1;

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var needcashshow = 'မလိုပါ';

      if (data[i]['needcash'] == 1) {
        needcashshow = 'လိုပါသည်';
      } else {
        needcashshow = 'မလိုပါ';
      }

      var row = '<tr>' + '<td>' + count + '</td>' + '<td>' + data[i]['name'] + '</td>' + '<td >' + data[i]['house'] + '</td>' + '<td >' + data[i]['road'] + '</td>' + '<td >' + data[i]['quater'] + '</td>' + '<td >' + data[i]['township'] + '</td>' + '<td >' + data[i]['division'] + '</td>' + '<td >' + data[i]['phone_no'] + '</td>' + '<td >' + data[i]['product_name'] + '</td>' + '<td >' + data[i]['quantity'] + '</td>' + '<td >' + data[i]['weight'] + '</td>' + '<td >' + data[i]['price'] + '</td>' + '<td >' + data[i]['delivery_fee'] + '</td>' + '<td >' + data[i]['total_cost'] + '</td>' + '<td >' + needcashshow + '</td>' + '<td >' + data[i]['delivery_start_date'] + '</td>' + '<td >' + '<button type="" id="editbtn" editid="' + data[i]['id'] + '"class="btn btn-success mb-2 m-auto">EDIT</button>' + '</td>' + '<td >' + '<button type="" id="delbtn" deleteid="' + data[i]['id'] + '"class="btn btn-danger mb-2 m-auto">DEL</button>' + '</td>' + '<td >' + '<button type="" id="printviewbtn" printid="' + data[i]['id'] + '"class="btn btn-info mb-2 m-auto">VIEW</button>' + '</td>' + '</tr>';
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
    qrcodetwo.makeCode(id); //JsBarcode("#itf-14", id, { format: "itf14" });
  }

  $(document).on('input', '#price', function () {
    var total = calculate($('#price').val(), $('#delivery_fee').val()); //let result = total.toFixed(2);

    $('#total_cost').val(total);
  });
  $(document).on('input', '#delivery_fee', function () {
    var total = calculate($('#price').val(), $('#delivery_fee').val()); //let result = total.toFixed(2);

    $('#total_cost').val(total);
  });
  $(document).on('click', '#addbtn', function (event) {
    event.preventDefault();
    /* Act on the event */

    alert("add");
    var name = $("#name").val();
    var house = $("#house").val();
    var road = $("#road").val();
    var quater = $("#quater").val();
    var township = $("#township").val();
    var division = $("#division").val();
    var phone_no = $("#phone_no").val();
    var product_name = $("#product_name").val();
    var quantity = $("#quantity").val();
    var weight = $("#weight").val();
    var price = $("#price").val();
    var delivery_fee = $("#delivery_fee").val();
    var total_cost = $("#total_cost").val();
    var delivery_start_date = $("#delivery_start_date").val();
    var needcash = 2;

    if ($("#needcash")[0].checked == true) {
      needcash = 1;
    } else {
      needcash = needcash;
    }

    var delivery = {
      "name": name,
      "house": house,
      "road": road,
      "quater": quater,
      "township": township,
      "division": division,
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
    var editid = $(this).attr('editid');
    console.log(editid);
    var delivery = detail(editid);
    console.log(delivery.delivery_start_date);
    $("#editid").val(delivery.id);
    $("#editname").val(delivery.name);
    $("#edithouse").val(delivery.house);
    $("#editroad").val(delivery.road);
    $("#editquater").val(delivery.quater);
    $("#edittownship").val(delivery.township);
    $("#editdivision").val(delivery.division);
    $("#editphone_no").val(delivery.phone_no);
    $("#editproduct_name").val(delivery.product_name);
    $("#editquantity").val(delivery.quantity);
    $("#editweight").val(delivery.weight);
    $("#editprice").val(delivery.price);
    $("#editdelivery_fee").val(delivery.delivery_fee);
    $("#edittotal_cost").val(delivery.total_cost);
    $("#editdelivery_start_date").val(delivery.delivery_start_date);

    if (delivery.needcash == 1) {
      $("#editneedcash")[0].checked = true;
    } else {
      $("#editneedcash")[0].checked = false;
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
    var deliveryid = $(this).attr('deleteid');
    delete_delivery(deliveryid);
    location.reload();
  });
  $(document).on('click', '#printviewbtn', function (event) {
    event.preventDefault();
    /* Act on the event */

    alert("view");
    var deliveryid = $(this).attr('printid');
    var delivery = detail(deliveryid);
    console.log(delivery);
    $("#customer_name").text(delivery.name + " ၊ ဖုန်း - " + delivery.phone_no);
    $("#customer_address").text("အိမ်အမှတ်" + delivery.house + "၊" + delivery.road + "လမ်း၊" + delivery.quater + "ရပ်ကွက်၊" + delivery.township + " မြို့နယ်၊" + delivery.division);
    $("#goods_type").text(delivery.product_name);
    $("#goods_weight").text(delivery.weight + ' KG');
    $("#package").text(delivery.product_name);
    $("#total").text(delivery.total_cost + ' ကျပ်');
    $("#total_fee").text(delivery.total_cost + ' ကျပ်');
    $("#goods_name").text('Packages: ' + delivery.product_name);
    $("#customer_nametwo").text(delivery.name + " ၊ ဖုန်း - " + delivery.phone_no);
    $("#customer_addresstwo").text("အိမ်အမှတ်" + delivery.house + "၊" + delivery.road + "လမ်း၊" + delivery.quater + "ရပ်ကွက်၊" + delivery.township + " မြို့နယ်၊" + delivery.division);
    $("#goods_typetwo").text(delivery.product_name);
    $("#goods_weighttwo").text(delivery.weight + ' KG');
    $("#packagetwo").text(delivery.product_name);
    $("#totaltwo").text(delivery.total_cost + ' ကျပ်');
    $("#total_feetwo").text(delivery.total_cost + ' ကျပ်');
    $("#goods_nametwo").text('Packages: ' + delivery.product_name);
    makeCode('mkonlineshop');
    $("#printbtn").css('display', '');
    var id = $(this).attr('printid');
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
    var id = $("#editid").val();
    var name = $("#editname").val();
    var house = $("#edithouse").val();
    var road = $("#editroad").val();
    var quater = $("#editquater").val();
    var township = $("#edittownship").val();
    var division = $("#editdivision").val();
    var phone_no = $("#editphone_no").val();
    var product_name = $("#editproduct_name").val();
    var quantity = $("#editquantity").val();
    var weight = $("#editweight").val();
    var price = $("#editprice").val();
    var delivery_fee = $("#editdelivery_fee").val();
    var total_cost = $("#edittotal_cost").val();
    var needcash = 2;

    if ($("#editneedcash")[0].checked == true) {
      needcash = 1;
    } else {
      needcash = needcash;
    } //let delivery_status = ($("edit#delivery_status")).val();


    var delivery_start_date = $("#editdelivery_start_date").val(); //let delivery_end_date = ($("edit#delivery_end_date")).val();

    var delivery = {
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
      "weight": weight,
      "price": price,
      "delivery_fee": delivery_fee,
      "total_cost": total_cost,
      "delivery_start_date": delivery_start_date,
      "needcash": needcash
    }; //console.log(delivery);

    update(delivery);
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
    var data = localStorage.getItem('deliveryList'); //Convert JSON Array to string.

    var json = data; //Convert JSON string to BLOB.

    json = [json];
    var blob1 = new Blob(json, {
      type: "text/plain;charset=utf-8"
    }); //Check the Browser.

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
    var file = document.getElementById('jsonfile');
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
  var n = new Date();
  var y = n.getFullYear();
  var m = n.getMonth() + 1;
  var d = n.getDate();
  document.getElementById("senddate").innerHTML = d + "/" + m + "/" + y;
  document.getElementById("senddate2").innerHTML = d + "/" + m + "/" + y; ///////////////////////////////////////////////////////////////////////////////////////

  var division = {
    မကွေးတိုင်းဒေသကြီး: ["မကွေးမြို့နယ်", "ရေနံချောင်းမြို့နယ်", "ချောက်မြို့နယ်", "တောင်တွင်းကြီးမြို့နယ်", "မြို့သစ်မြို့နယ်", "နတ်မောက်မြို့နယ်", "မင်းဘူးမြို့နယ်", "ပွင့်ဖြူမြို့နယ်", "ငဖဲမြို့နယ်", "စလင်းမြို့နယ်", "စေတုတ္တရာမြို့နယ်", "မြိုင်မြို့နယ်", "ပခုက္ကူမြို့နယ်", "ပေါက်မြို့နယ်", "ဆိပ်ဖြူမြို့နယ်", "ရေစကြိုမြို့နယ်", "သရက်ခရိုင်", "အောင်လံမြို့နယ်", "ကံမမြို့နယ်", "မင်းတုန်းမြို့နယ်", "မင်းလှမြို့နယ်", "ဆင်ပေါင်ဝဲမြို့နယ်", "သရက်မြို့နယ်", "ဂန့်ဂေါခရိုင်", "ဂန့်ဂေါမြို့နယ်", "ထီးလင်းမြို့နယ်", "ဆောမြို့နယ်"],
    မန္တလေးတိုင်းဒေသကြီး: ["ကျောက်ဆည်မြို့နယ်", "မြစ်သားမြို့နယ်", "စဉ့်ကိုင်မြို့နယ်", "တံတားဦးမြို့နယ်", "အမရပူရမြို့နယ်", "အောင်မြေသာဇံမြို့နယ်", "ချမ်းအေးသာဇံမြို့နယ်", "ချမ်းမြသာစည်မြို့နယ်", "မဟာအောင်မြေမြို့နယ်", "ပုသိမ်ကြီးမြို့နယ်", "ပြည်ကြီးတံခွန်မြို့နယ်", "မလှိုင်မြို့နယ်", "မိတ္ထီလာမြို့နယ်", "သာစည်မြို့နယ်", "ဝမ်းတွင်းမြို့နယ်", "မြင်းခြံမြို့နယ်", "နွားထိုးကြီးမြို့နယ်", "ငါန်းဇွန်မြို့နယ်", "တောင်သာမြို့နယ်", "ညောင်ဦးမြို့နယ်", "ကျောက်ပန်းတောင်းမြို့နယ်", "မတ္တရာမြို့နယ်", "မိုးကုတ်မြို့နယ်", "ပြင်ဦးလွင်မြို့နယ်", "စဉ့်ကူမြို့နယ်", "သပိတ်ကျင်းမြို့နယ်", "ပျော်ဘွယ်မြို့နယ်", "ရမည်းသင်းမြို့နယ်", "လယ်ဝေးမြို့နယ်", "ပျဉ်းမနားမြို့နယ်", "တပ်ကုန်းမြို့နယ်", "ဥတ္တရသီရိမြို့နယ်", "ဒက္ခိဏသီရိမြို့နယ်", "ပုဗ္ဗသီရိမြို့နယ်", "ဇမ္ဗူသီရိမြို့နယ်", "ဇေယျာသီရိမြို့နယ်"],
    ကယားပြည်နယ်: ["လွိုင်ကော်မြို့နယ်", "ဒီမောဆိုးမြို့နယ်", "ဖရူးဆိုးမြို့နယ်", "ရှားတောမြို့နယ်", "ဘော်လခဲမြို့နယ်", "ဖားဆောင်းမြို့နယ်", "မယ်စဲ့မြို့နယ်"],
    "ရှမ်းပြည်နယ်(အရှေ့ပိုင်း)": ["ကျိုင်းတုံမြို့နယ်", "မိုင်းခတ်မြို့နယ်", "မိုင်းပြင်းမြို့နယ်", "မိုင်းယန်းမြို့နယ်", "မိုင်းလားမြို့နယ်", "မိုင်းဆတ်မြို့နယ်", "မိုင်းတုံမြို့နယ်", "တာချီလိတ်မြို့နယ်", "မိုင်းဖြတ်မြို့နယ်", "မိုင်းယောင်းမြို့နယ်"],
    "ရှမ်းပြည်နယ်(တောင်ပိုင်း)": ["လင်းခေးမြို့နယ်", "မိုးနဲမြို့နယ်", "မိုင်းပန်မြို့နယ်", "မောက်မယ်မြို့နယ်", "လွိုင်လင်မြို့နယ်", "လဲချားမြို့နယ်", "နမ့်စန်မြို့နယ်", "ကွန်ဟိန်းမြို့နယ်", "ကျေးသီးမြို့နယ်", "မိုင်းကိုင်မြို့နယ်", "မိုင်းရှူးမြို့နယ်", "တောင်ကြီးမြို့နယ်", "ညောင်ရွှေမြို့နယ်", "ဟိုပုံးမြို့နယ်", "ဆီဆိုင်မြို့နယ်", "ကလောမြို့နယ်", "ပင်းတယမြို့နယ်", "ရွာငံမြို့နယ်", "ရပ်စောက်မြို့နယ်", "ပင်လောင်းမြို့နယ်", "ဖယ်ခုံမြို့နယ်"],
    "ရှမ်းပြည်နယ်(မြောက်ပိုင်း)": ["ကျောက်မဲမြို့နယ်", "နောင်ချိုမြို့နယ်", "သီပေါမြို့နယ်", "နမ္မတူမြို့နယ်", "နမ့်ဆန်မြို့နယ်", "မန်တုံမြို့နယ်", "ကွမ်းလုံမြို့နယ်", "လားရှိုးမြို့နယ်", "သိန္နီမြို့နယ်", "မိုင်းရယ်မြို့နယ်", "တန့်ယန်းမြို့နယ်", "ကုန်းကြမ်းမြို့နယ်", "လောက်ကိုင်မြို့နယ်", "ပန်ဝိုင်မြို့နယ်", "မိုင်းမောမြို့နယ်", "ဟိုပန်မြို့နယ်", "မူဆယ်မြို့နယ်", "နမ့်ခမ်းမြို့နယ်", "ကွတ်ခိုင်မြို့နယ်", "မိုးမိတ်မြို့နယ်", "မဘိမ်းမြို့နယ်", "ပန်ဆန်းမြို့နယ်", "မက်မန်းမြို့နယ်", "နားဖန်းမြို့နယ်"],
    ပဲခူးတိုင်းဒေသကြီး: ["ပဲခူးမြို့နယ်", "ကဝမြို့နယ်", "သနပ်ပင်မြို့နယ်", "ဝေါမြို့နယ်", "ဒိုက်ဦးမြို့နယ်", "ညောင်လေးပင်မြို့နယ်", "ရွှေကျင်မြို့နယ်", "တောင်ငူမြို့နယ်", "အုတ်တွင်းမြို့နယ်", "ထန်းတပင်မြို့နယ်", "ရေတာရှည်မြို့နယ်", "ဖြူးမြို့နယ်", "ကျောက်တံခါးမြို့နယ်", "ကျောက်ကြီးမြို့နယ်", "ပြည်မြို့နယ်", "ပေါက်ခေါင်းမြို့နယ်", "သဲကုန်းမြို့နယ်", "ရွှေတောင်မြို့နယ်", "ပန်းတောင်းမြို့နယ်", "ပေါင်းတည်မြို့နယ်", "သာယာဝတီမြို့နယ်", "လက်ပံတန်းမြို့နယ်", "မင်းလှမြို့နယ်", "မိုးညိုမြို့နယ်", "အုတ်ဖိုမြို့နယ်", "ကြို့ပင်ကောက်မြို့နယ်", "ဇီးကုန်းမြို့နယ်", "နတ်တလင်းမြို့နယ်"],
    ရန်ကုန်တိုင်းဒေသကြီး: ["အလုံမြို့နယ်", "ဗဟန်းမြို့နယ်", "ဒဂုံမြို့နယ်", "ကျောက်တံတားမြို့နယ်", "ကြည့်မြင်တိုင်မြို့နယ်", "လမ်းမတော်မြို့နယ်", "လသာမြို့နယ်", "ပန်းဘဲတန်းမြို့နယ်", "စမ်းချောင်းမြို့နယ်", "လှိုင်မြို့နယ်", "ကမာရွတ်မြို့နယ်", "မရမ်းကုန်းမြို့နယ်", "ဗိုလ်တထောင်မြို့နယ်", "ဒဂုံမြို့သစ်ဆိပ်ကမ်းမြို့နယ်", "ဒဂုံမြို့သစ်အရှေ့ပိုင်းမြို့နယ်", "ဒဂုံမြို့သစ်မြောက်ပိုင်းမြို့နယ်", "မြောက်ဥက္ကလာပမြို့နယ်", "ပုဇွန်တောင်မြို့နယ်", "ဒဂုံမြို့သစ်တောင်ပိုင်းမြို့နယ်", "တောင်ဥက္ကလာပမြို့နယ်", "သင်္ဃန်းကျွန်းမြို့နယ်", "ဒေါပုံမြို့နယ်", "မင်္ဂလာတောင်ညွန့်မြို့နယ်", "တာမွေမြို့နယ်", "သာကေတမြို့နယ်", "ရန်ကင်းမြို့နယ်", "လှိုင်သာယာအရှေ့ပိုင်းမြို့နယ်", "လှိုင်သာယာအနောက်ပိုင်းမြို့နယ်", "အင်းစိန်မြို့နယ်", "မင်္ဂလာဒုံမြို့နယ်", "ရွှေပြည်သာမြို့နယ်", "လှည်းကူးမြို့နယ်", "မှော်ဘီမြို့နယ်", "ထန်းတပင်မြို့နယ်", "တိုက်ကြီးမြို့နယ်", "ဒလမြို့နယ်", "ဆိပ်ကြီးခနောင်တိုမြို့နယ်", "ကိုကိုးကျွန်းမြို့နယ်", "ကော့မှူးမြို့နယ်", "ခရမ်းမြို့နယ်", "ကွမ်းခြံကုန်းမြို့နယ်", "ကျောက်တန်းမြို့နယ်", "သန်လျင်မြို့နယ်", "သုံးခွမြို့နယ်", "တွံတေးမြို့နယ်"],
    ကချင်ပြည်နယ်: ["မြစ်ကြီးနားမြို့နယ်", "ဝိုင်းမော်မြို့နယ်", "အင်ဂျန်းယန်မြို့နယ်", "တနိုင်းမြို့နယ်", "ချီဖွေမြို့နယ်", "ဆော့လော်မြို့နယ်", "ဗန်းမော်မြို့နယ်", "ရွှေကူမြို့နယ်", "မိုးမောက်မြို့နယ်", "မံစီမြို့နယ်", "ပူတာအိုမြို့နယ်", "ဆွမ်ပရာဘွမ်မြို့နယ်", "မချမ်းဘောမြို့နယ်", "ခေါင်လန်ဖူးမြို့နယ်", "နောင်မွန်းမြို့နယ်", "မိုးညှင်းမြို့နယ်", "မိုးကောင်းမြို့နယ်", "ဖားကန့်မြို့နယ်"],
    စစ်ကိုင်းတိုင်းဒေသကြီး: ["ခန္တီးမြို့နယ်", "ဟုမ္မလင်းမြို့နယ်", "လဟယ်မြို့နယ်", "လေရှီးမြို့နယ်", "နန်းယွန်းမြို့နယ်", "ကလေးမြို့နယ်", "ကလေးဝမြို့နယ်", "မင်းကင်းမြို့နယ်", "ဗန်းမောက်မြို့နယ်", "အင်းတော်မြို့နယ်", "ကသာမြို့နယ်", "ထီးချိုင့်မြို့နယ်", "ကောလင်းမြို့နယ်", "ပင်လယ်ဘူးမြို့နယ်", "ဝန်းသိုမြို့နယ်", "ကန့်ဘလူမြို့နယ်", "ကျွန်းလှမြို့နယ်", "တန့်ဆည်မြို့နယ်", "ရေဦးမြို့နယ်", "မော်လိုက်မြို့နယ်", "ဖောင်းပြင်မြို့နယ်", "အရာတော်မြို့နယ်", "ဘုတလင်မြို့နယ်", "ချောင်းဦးမြို့နယ်", "မုံရွာမြို့နယ်", "မြောင်မြို့နယ်", "မြင်းမူမြို့နယ်", "စစ်ကိုင်းမြို့နယ်", "ခင်ဦးမြို့နယ်", "ရွှေဘိုမြို့နယ်", "ဝက်လက်မြို့နယ်", "ဒီပဲယင်းမြို့နယ်", "တမူးမြို့နယ်", "ယင်းမာပင်မြို့နယ်", "ကနီမြို့နယ်", "ပုလဲမြို့နယ်", "ဆားလင်းကြီးမြို့နယ်"],
    တနင်္သာရီတိုင်းဒေသကြီး: ["ထားဝယ်မြို့နယ်", "လောင်းလုံမြို့နယ်", "သရက်ချောင်းမြို့နယ်", "ရေဖြူမြို့နယ်", "ကျွန်းစုမြို့နယ်", "မြိတ်မြို့နယ်", "ပုလောမြို့နယ်", "တနင်္သာရီမြို့နယ်", "ဘုတ်ပြင်းမြို့နယ်", "ကော့သောင်းမြို့နယ်"],
    ကရင်ပြည်နယ်: ["ဘားအံမြို့နယ်", "လှိုင်းဘွဲ့မြို့နယ်", "သံတောင်ကြီးမြို့နယ်", "မြဝတီမြို့နယ်", "ကော့ကရိတ်မြို့နယ်", "ကြာအင်းဆိပ်ကြီးမြို့နယ်", "ဖာပွန်မြို့နယ်"],
    မွန်ပြည်နယ်: ["မော်လမြိုင်မြို့နယ်", "ကျိုက်မရောမြို့နယ်", "ချောင်းဆုံမြို့နယ်", "သံဖြူဇရပ်မြို့နယ်", "မုဒုံမြို့နယ်", "ရေးမြို့နယ်", "သထုံမြို့နယ်", "ပေါင်မြို့နယ်", "ကျိုက်ထိုမြို့နယ်", "ဘီးလင်းမြို့နယ်"],
    ချင်းပြည်နယ်: ["ဟားခါးမြို့နယ်", "ထန်တလန်မြို့နယ်", "ဖလမ်းမြို့နယ်", "တီးတိန်မြို့နယ်", "တွန်းဇံမြို့နယ်", "မတူပီမြို့နယ်", "ပလက်ဝမြို့နယ်", "မင်းတပ်မြို့နယ်", "ကန်ပက်လက်မြို့နယ်"],
    ရခိုင်ပြည်နယ်: ["စစ်တွေမြို့နယ်", "ပုဏ္ဏားကျွန်းမြို့နယ်", "ပေါက်တောမြို့နယ်", "ရသေ့တောင်မြို့နယ်", "မောင်တောမြို့နယ်", "ဘူးသီးတောင်မြို့နယ်", "ကျောက်ဖြူမြို့နယ်", "မာန်အောင်မြို့နယ်", "ရမ်းဗြဲမြို့နယ်", "အမ်းမြို့နယ်", "သံတွဲမြို့နယ်", "တောင်ကုတ်မြို့နယ်", "ဂွမြို့နယ်", "မြောက်ဦးမြို့နယ်", "ကျောက်တော်မြို့နယ်", "မင်းပြားမြို့နယ်", "မြေပုံမြို့နယ်"]
  };

  function findbytownship(division, township) {
    for (var div in division) {
      var townList = division[div];

      for (var i = 0; i < townList.length; i++) {
        if (townList[i] == township) return div;
      }
    }
  }

  function findbydivision(division, divname) {
    var div = division[divname];
    var townList = [];

    for (var i = 0; i < div.length; i++) {
      townList.push(div[i]);
    }

    return townList;
  }
});