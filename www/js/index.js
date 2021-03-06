$(document).on("ready", function(){
    databaseHandler2.createDatabase();
});
function addProduct(){
    var name = $("#txtName").val();
    var type = $("#select-custom-1 option:selected").val();
    var dateTime = $("#date-select option:selected").val();
    var price = $("#txtPrice").val();
    var note = $("#txtNote").val();
    var nameReport = $("#txtnameReport").val();
    var serviceRating = $("#select-custom-2 option:selected").val();
    var cleanRating = $("#select-custom-3 option:selected").val();
    var foodRating = $("#select-custom-4 option:selected").val();
    var image = $("#file").val().replace(/.*(\/|\\)/, '');
    if(!name || !price || !nameReport || isNaN(price)){
        alert("Field cannot be blank !!!");
    }else{
        var r = confirm(`
                        Name : ${name}
                        Type : ${type}
                        Date time : ${dateTime}
                        Price : ${price}
                        Note : ${note}
                        Name Report : ${nameReport}
                        Service Rating : ${serviceRating}
                        Clean Rating : ${cleanRating}
                        Food Rating : ${foodRating}`);
                        
        if(r==true){
            price = price+"$";
            productHandler.addProduct(name, type, dateTime, price, note, nameReport , serviceRating , cleanRating , foodRating , image );
            
        }
    }
}

var currentProduct={
id: -1,
name: "",
type:"",
dateTime :"",
price: "",
note:"",
nameReport: "",
service_rating : "",
clean_rating : "",
food_rating : "",
image : "",
}


function displayProducts(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    lstProducts.empty();//Clean the old data before adding.
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var img = $("<img >");
        img.attr("src","image/" + item.image);
        var h3 = $("<h4 />").text("Product name: ");
        var h4 = $("<h4 />").text("Type: ");
        var h5 = $("<h4 />").text("Bussiness time: ");
        var h6 = $("<h4 />").text("Price: ");
        var h7 = $("<h4 />").text("Note: ");
        var h8 = $("<h4 />").text("Name report: ");
        var h9 = $("<h4 />").text("Service Rating: ");
        var h10 = $("<h4 />").text("Clean Rating: ");
        var h11 = $("<h4 />").text("Food Rating: ");
        var p = $("<p />").text("Id: ");
        var spanName = $("<span />").text(item.name);
        spanName.attr("name", "name");
        var spandType = $("<span />").text(item.type);
        spandType.attr("name", "type");
        var spandDT = $("<span />").text(item.bussinesstime);
        spandDT.attr("name", "bussinesstime");
        var spandPrice = $("<span />").text(item.price);
        spandPrice.attr("name", "price");
        var spandNote = $("<span />").text(item.note);
        spandNote.attr("name", "note");
        var spandNameReport = $("<span />").text(item.namereport);
        spandNameReport.attr("name", "namereport");
        var spandService = $("<span />").text(item.service_rating);
        spandService.attr("name", "service");
        var spandClean = $("<span />").text(item.cleanning_rating);
        spandClean.attr("name", "cleanning");
        var spandFood = $("<span />").text(item.food_rating);
        spandFood.attr("name", "food");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        a.append(img);
        h3.append(spanName);
        a.append(h3);
        h4.append(spandType);
        h4.hide();
        a.append(h4);
        h5.append(spandDT);
        h5.hide();
        a.append(h5);
        h6.append(spandPrice);
        h6.hide();
        a.append(h6);
        h7.append(spandNote);
        h7.hide();
        a.append(h7);
        h8.append(spandNameReport);
        a.append(h8);
        h9.append(spandService);
        h9.hide();
        a.append(h9);
        h10.append(spandClean);
        h10.hide();
        a.append(h10);
        h11.append(spandFood);
        h11.hide();
        a.append(h11);
        p.append(spanId);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.name);
        li.attr("data-filtertext", item.type);
        li.append(a);
        lstProducts.append(li);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function(){
        currentProduct.id = $(this).find("[name='_id']").text();
        currentProduct.name = $(this).find("[name='name']").text();
        currentProduct.type = $(this).find("[name='type']").val();
        currentProduct.dateTime = $(this).find("[name='bussinesstime']").val();
        currentProduct.price = $(this).find("[name='price']").text();
        currentProduct.note = $(this).find("[name='note']").text();
        currentProduct.nameReport = $(this).find("[name='namereport']").text();
        currentProduct.service_rating = $(this).find("[name='service']").val();
        currentProduct.service_rating = $(this).find("[name='cleanning']").val();
        currentProduct.food_rating = $(this).find("[name='food']").val();
        //Set event for the list item
        $('#detailinfor').popup("open");
        $("div").remove(".ui-popup-screen");
    });
}


$(document).on("pagebeforeshow", "#loadpage", function(){
    productHandler.loadProducts(displayProducts);
});


function deleteProduct(){
    var r = confirm(`You delete ${currentProduct.name} ?`);
    if(r==true){
        productHandler.deleteProduct(currentProduct.id);
        productHandler.loadProducts(displayProducts);
    }
    $("#detailinfor").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#txtNewName").val(currentProduct.name);
    $("#select-custom-1-New").val(currentProduct.type);
    $("#date-select-New").val(currentProduct.dateTime);
    $("#txtNewPrice").val(currentProduct.price);
    $("#txtNewNote").val(currentProduct.note);
    $("#txtNewnameReport").val(currentProduct.nameReport);
    $("#select-custom-2-New").val(currentProduct.service_rating);
    $("#select-custom-3-New").val(currentProduct.clean_rating);
    $("#select-custom-3-New").val(currentProduct.food_rating);
});

function updateProduct(){
    var new_name = $("#txtNewName").val();
    var new_type = $("#select-custom-1-New option:selected").text();
    var new_dateTime = $("#date-select-New option:selected").text();
    var new_price = $("#txtNewPrice").val();
    var new_note = $("#txtNewNote").val();
    var new_nameReport = $("#txtNewnameReport").val();
    var new_serviceRating = $("#select-custom-2-New").val();
    var new_cleanRating = $("#select-custom-3-New").val();
    var new_foodRating = $("#select-custom-3-New").val();
    productHandler.updateProduct(currentProduct.id, new_name, new_type, new_dateTime, new_price, new_note, new_nameReport, new_serviceRating, new_cleanRating, new_foodRating);
    $("#updatedialog").dialog("close");
}