/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                b = document.createElement("DIV");
                b.innerHTML = arr[i]
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x)
            x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x)
                    x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x)
            return false;
        removeActive(x);
        if (currentFocus >= x.length)
            currentFocus = 0;
        if (currentFocus < 0)
            currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

$.ajax({
    url: '/api/getExportStockInfo',
    method: 'POST',
    success: function (response) {
        autocomplete(document.getElementById("supplier_order"), response.data.suppliers);
        autocomplete(document.getElementById("contract_delivery_1"), response.data.contracts);
        autocomplete(document.getElementById("staff_id"), response.data.staff);
    }
});
$.ajax({
    url: '/api/getShippingNContract',
    method: 'POST',
    success: function (response) {
        autocomplete(document.getElementById("shipping"), response.data.shippings);
        autocomplete(document.getElementById("contract_delivery"), response.data.contracts);
    }
});
$.ajax({
    url: '/api/getAllProject',
    method: 'POST',
    success: function (response) {
        autocomplete(document.getElementById("project_level_2"), response.projects);
    }
});
$('[data-action="view_process"]').click(function () {
    var process = $(this).parents('tr').next();
    if (process.hasClass('d-none')) {
        process.removeClass('d-none');
        $(this).html('Ẩn');
    } else {
        process.addClass('d-none');
        $(this).html('Hiển thị');
    }

})
$('.progress-all').click(function () {
    var progress_all = $(this);
    var process = $('.process');
    if (progress_all.hasClass('hide-all')) {
        progress_all.removeClass('hide-all');
        process.removeClass('d-none');
        $(this).html('Ẩn tất cả tiến độ');
        $('[data-action="view_process"]').html('Ẩn');
    } else {
        progress_all.addClass('hide-all');
        process.addClass('d-none');
        $(this).html('Hiển thị tất cả tiến độ');
        $('[data-action="view_process"]').html('Hiển thị');
    }
})
function formatDate(date) {
    newdate = date.split('/');
    return newdate[1] + '/' + newdate[0] + '/' + newdate[2];
}
$('#expired').change(function () {
    var newdate = new Date(formatDate($('input[name="delivery_date"]').val()));
    console.log(newdate);
    var days = parseInt($(this).val());
    if (days > 0) {
        newdate.setDate(newdate.getDate() + days);
    }
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var yy = newdate.getFullYear();
    var someFormattedDate = dd + '/' + mm + '/' + yy;
    var dbDate = yy + '-' + mm + '-' + dd;
    $('#expired_date_supplier').val(someFormattedDate);
    $('[name="expired_date_supplier_submit"]').attr('value', dbDate);
})
$('.select').select2();

$('body').delegate('#supplier', 'change', function () {
    var id = $('.confirm_id').val();
    $.ajax({
        url: '/api/get_info_by_order_supplier',
        method: 'POST',
        data: {id: id, supplier_id: $(this).val()},
        success: function (response) {
            if (response.error === "false") {
                $('input[name="out_representer"]').val(response.out_representer);
                $('input[name="out_rep_position"]').val(response.out_rep_position);
                $('#supplier_representer').html(response.supplier_representer);
                $('#company_representer').html(response.company_representer);
                $('#contract').html(response.contract_html);
                $('#fax').val(response.fax);
                $('#supplier_delegacy').val(response.supplier_delegacy);
                $('#out_delegacy').val(response.out_delegacy);
                $('#company_buy').html(response.company_html);
                $('#delivery_method').html(response.delivery_method);
                $('input[name="supplier_delegacy"]').val(response.supplier_delegacy);
                $('input[name="out_delegacy"]').val(response.out_delegacy);
                $('#supplier').html(response.supplier_html);
                $('.region_id').html(response.region_html);
                $('#delivery_representer').html(response.staff_html);
                //
                $('input[name="delivery_date"]').val(response.order_sup_info.delivery_date);
                $('#expired_date_supplier').val(response.order_sup_info.expired_date_supplier);
                $('#project_level_2').val(response.order_sup_info.project);
                $('input[name="delivery_address"]').val(response.order_sup_info.delivery_address);
                if(response.order_sup_info.k_vat == 1){
                    $('#unchecked_order_dont_vat').parent('span').addClass("checked");
                    $('#unchecked_order_dont_vat').attr("checked","checked");
                }
                else {
                    $('#unchecked_order_dont_vat').parent('span').removeClass("checked");
                }
                if(response.order_sup_info.discount == 1){
                    $('#unchecked_discount').parent('span').addClass("checked");
                    $('#unchecked_discount').attr("checked","checked");
                }
                else {
                    $('#unchecked_discount').parent('span').removeClass("checked");
                }
                $('input[name="price_condition"]').val(response.order_sup_info.price_condition);
                $('#delivery_checkout').html(response.order_sup_info.delivery_checkout);
                //
                $('#factory_order').modal('show');

            }
        }
    });

})
// $('#supplier').change(function () {
//     $.ajax({
//         url: '/api/getRepresenterBySupplier',
//         data: {supplier_id: $(this).val()},
//         method: 'POST',
//         success: function (response) {
//             $('#supplier_representer').html(response.html);
//             $('#fax').val(response.fax);
//             $('#supplier_delegacy').val(response.supplier_delegacy);
//             $('#out_delegacy').val(response.out_delegacy);
//             $('.select').select2();
//         }
//     });
// })
// $('#supplier').change(function () {
//     var order_id = $('.confirm_id').val();
//     var supplier_id = $(this).val();
//     $.ajax({
//         url: '/api/getAgreementBySupplierCompany',
//         data: {supplier_id: supplier_id, order_id: order_id},
//         method: 'POST',
//         success: function (response) {
//             $('#contract').html(response.html);
//             $('.select').select2();
//         }
//     });
// })
$('body').delegate('.bill-weight', 'change', function () {
    bill_price = $(this).parents('.bill-item').find('.bill-price').next().val();
    $(this).parents('.bill-item').find('.bill-total').val(($(this).next().val() * bill_price).toLocaleString());
    $(this).parents('.bill-item').find('.total').val($(this).next().val() * bill_price);
    $(this).parents('.bill-item').find('.into_money').val($(this).next().val() * bill_weight);
    var total = 0;
    $('.total').each(function () {
        if($(this).val() != ''){
            total += parseInt($(this).val());
        }
    })
    $('.expenses_total').html(formatNumber(total));
})
$('body').delegate('.bill-price', 'change', function () {
    bill_weight = $(this).parents('.bill-item').find('.bill-weight').next().val();
    // console.log(bill_weight);
    $(this).parents('.bill-item').find('.bill-total').val(($(this).next().val() * bill_weight).toLocaleString());
    $(this).parents('.bill-item').find('.total').val($(this).next().val() * bill_weight);
    $(this).parents('.bill-item').find('.into_money').val($(this).next().val() * bill_weight);
    var total = 0;
    $('.total').each(function () {
        if($(this).val() != ''){
            total += parseInt($(this).val());
        }
    })
    $('.expenses_total').html(formatNumber(total));
})

$('body').delegate('.into_money_fomat', 'change', function () {
    $(this).parents('.item').find('.expenses_price_fomat ').val(0);
    $(this).parents('.item').find('.expenses_price_fomat ').next().val(0);
    $(this).parents('.item').find('.expenses_weight_fomat ').val(0);
    $(this).parents('.item').find('.expenses_weight_fomat ').next().val(0);
})
$('body').delegate('[data-action="separate"]', 'click', function () {
    var id = $(this).data('id');
    $(this).parents('.row').find('.weight-row').remove();
    $(this).parents('.row').find('.lot-no-row').remove();
    $(this).parents('.row').find('.eterket-row').remove();
    var product_name = $(this).data('productName');
    $(this).parents('.row').after(`
        <div class="col-md-12 row">
            <div class="form-group col-md-2">
                <input type="text" class="form-control" name="name[]" value="` + product_name + `" readonly>
                <input type="hidden" class="form-control" name="stock_children[]" value="` + id + `">

            </div>
            <div class="form-group col-md-1">
                <input type="text" class="form-control" value="0" readonly>
            </div>
            <div class="form-group col-md-1">
                <input type="text" class="form-control" name="quantity_children[]">
            </div>
            <div class="form-group col-md-2">
                <input type="text" id="weight_children[]" class="form-control weight_format" onkeyup="formatValue(this)" required>
                <input name="weight_children[]" type="hidden" class="form-control weight">
            </div>
            <div class="form-group col-md-2">
                <input type="text" class="form-control" autocomplete="off" name="lot_no_children[]" >
            </div>
            <div class="form-group col-md-2">
                <input name="eterket_children[]" type="text" class="form-control eterket"  >
            </div>
            <div class="form-group col-md-2">
                <a class="btn btn-danger" data-action="delete"><i class="icon-trash"></i></a>
            </div>
        </div>
        <div class="col-md-12 row">
            <div class="form-group col-md-2">
                <input type="text" class="form-control" name="name[]" value="` + product_name + `" readonly>
                <input type="hidden" class="form-control" name="stock_children[]" value="` + id + `">

            </div>
            <div class="form-group col-md-1">
                <input type="text" class="form-control" value="0" readonly>
            </div>
            <div class="form-group col-md-1">
                <input type="text" class="form-control" name="quantity_children[]">
            </div>
            <div class="form-group col-md-2">
                <input type="text" id="weight_children[]" class="form-control weight_format" onkeyup="formatValue(this)" required>
                <input name="weight_children[]" type="hidden" class="form-control weight">
            </div>
            <div class="form-group col-md-2">
                <input type="text" class="form-control" autocomplete="off" name="lot_no_children[]" >
            </div>
            <div class="form-group col-md-2">
                <input name="eterket_children[]" type="text" class="form-control eterket"  >
            </div>
            <div class="form-group col-md-2">
                <a class="btn btn-danger" data-action="delete"><i class="icon-trash"></i></a>
                <a class="btn btn-primary" data-action="plus" data-product-name="` + product_name + `" data-id="` + id + `"><i class="icon-plus2"></i></a>
            </div>
        </div>
    `);
})
$('body').delegate('[data-action="plus"]', 'click', function () {
    var id = $(this).data('id');
    var product_name = $(this).data('productName');
    $(this).parents('.row').after(`
        <div class="col-md-12 row">
            <div class="form-group col-md-2">
                <input type="text" class="form-control" name="name[]" value="` + product_name + `" readonly>
                <input type="hidden" class="form-control" name="stock_children[]" value="` + id + `">

            </div>
            <div class="form-group col-md-1">
                <input type="text" class="form-control" value="0" readonly>
            </div>
            <div class="form-group col-md-1">
                <input type="text" class="form-control" name="quantity_children[]">
            </div>
            <div class="form-group col-md-2">
                <input type="text" id="weight_children[]" class="form-control weight_format" onkeyup="formatValue(this)" required>
                <input name="weight_children[]" type="hidden" class="form-control weight">
            </div>
            <div class="form-group col-md-2">
                <input type="text" class="form-control" autocomplete="off" name="lot_no_children[]" >
            </div>
            <div class="form-group col-md-2">
                <input name="eterket_children[]" type="text" class="form-control eterket"  >
            </div>
            <div class="form-group col-md-2">
                <a class="btn btn-primary" data-action="plus" data-product-name="` + product_name + `" data-id="` + id + `"><i class="icon-plus2"></i></a>
                <a class="btn btn-danger" data-action="delete"><i class="icon-trash"></i></a>
            </div>
        </div>
    `);
})
$('body').delegate('[data-action="delete"]', 'click', function () {
    $(this).parents('.row').remove();
})
$('body').delegate('.export-stock-view', 'click', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/api/export-stock-view',
        method: 'POST',
        data: {id: id},
        success: function (response) {
            if (response.error == false) {
                $('.export_stock').html(response.html);
                $('#export-stock-view').modal('show')
            }
        }
    });
});
// $('body').delegate('.warehouse','click', function () {
//     if ($('input[name="order_id"]:checked').val() === undefined) {
//         swal('Cần chọn hóa đơn trước khi thao tác');
//     } else {
//         $('#warehoue_order').val($('input[name="order_id"]:checked').val());
//         var id = $('input[name="order_id"]:checked').val();
//         $.ajax({
//             url: '/api/export-stock-view',
//             method: 'POST',
//             data: {id: id},
//             success: function (response) {
//                 if (response.error == false) {
//                     $('.export_stock').html(response.html);
//                     $('#export-stock-view').modal('show')
//                 }
//             }
//         });
//     }
// });
$('.btn_bill').click(function () {
    $('.envelope_order_id').val($(this).data('id'));
    $('#frmExportBill').modal('show');
});


//Tạo lệnh xuất kho
$('body').delegate('.warehouse', 'click', function () {
    if ($('input[name="order_id"]:checked').val() === undefined) {
        swal('Cần chọn hóa đơn trước khi thao tác');
    } else {
        $('#export-stock').modal({
            backdrop: 'static'
        });
        $('.order_id').val($('input[name="order_id"]:checked').val());
        var order_id = $('input[name="order_id"]:checked').val();
        $.ajax({
            url: '/api/export-stock',
            method: 'POST',
            data: {order_id: order_id},
            success: function (response) {
                if (response.error == false) {
                    $('#order_supplier_id').html(response.order_html);
                    $('#vehicle_id').html(response.vehicle_html);
                    $('#export-stock').modal('show');
                }

                $('.select').select2();
            }
        });
    }
});

$('body').delegate('#order_supplier_id', 'change', function () {
    $this = $(this);
    var order_sup_id = $this.val();
    $.ajax({
        url: "/api/getProductByOrderSupplier",
        method: "POST",
        data: {order_sup_id: order_sup_id, order_id: $('#frmExportStock [name="order_id"]').val()},
        success: function (response) {
            if (response.success === true) {
                $('.product').html(response.html);
                $this.parents('#export-stock').find('#vehicle_id').html(response.vehicle_html)
            }
            $('.eterket').select2();
            $('#vehicle_id').select2();

        }
    })
});
$('#frmExportStock').submit(function (e) {
    e.preventDefault();
    modalLoading.init(true);
    $.ajax({
        url: '/api/exportWarehouse',
        method: 'POST',
        data: new FormData(this),
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            modalLoading.init(false);
            $('#openModalLoading').remove();
            if (response.error === 'false') {
                $('#export-stock').modal('hide');
                $('#frmExportStock')[0].reset();
                printJS(response.href);
            } else {
                swal({
                    title :response.message,
                    type : 'error'
                });
            }
        }
    })
})

function totalWeight(){
    var total = 0;
    $('.weight').each(function(){
        console.log($(this).val());
        if($(this).val() != ''){
            total += parseInt($(this).val());
        }
    })
    console.log($('.total').val());
    $('.total').html((total).toLocaleString());
}
$('#export-stock').delegate('.number_sb', 'change', function () {
    $this = $(this);
    var number_sb = $(this).val();
    var product_id = $(this).parents('.item').find('.product_id').val();
    var category_id = $(this).parents('.item').find('.category_id').val();
    var supplier_id = $(this).parents('.item').find('.supplier').val();
    var price = $(this).parents('.item').find('.price').val();
    $.ajax({
        url: "/api/getInfoProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.quantity_sc').val(0);
                $this.parent().parent().find('.quantity_sc_format').val(0);
                $this.parent().parent().find('.weight_format').val((Math.round(response.product.unit_cb * number_sb * response.product.unit_kc)).toLocaleString());
                $this.parent().parent().find('.weight').val(Math.round(response.product.unit_cb * number_sb * response.product.unit_kc));

                totalWeight();
            }
        }
    })

})

$('#export-stock').delegate('.quantity_sc_format', 'change', function () {
    $this = $(this);
    var quantity = $(this).parents('.item').find('.quantity_sc').val();
    var product_id = $(this).parents('.item').find('.product_id').val();
    var category_id = $(this).parents('.item').find('.category_id').val();
    var supplier_id = $(this).parents('.item').find('.supplier').val();
    var price = $(this).parents('.item').find('.price').val();
    $.ajax({
        url: "/api/getInfoProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.number_sb').val(~~(quantity / response.product.unit_cb));
                $this.parent().find('.quantity_sc').val(quantity - (~~(quantity / response.product.unit_cb)) * response.product.unit_cb);
                $this.val(quantity - (~~(quantity / response.product.unit_cb)) * response.product.unit_cb);
                $this.parent().parent().find('.weight_format').val(formatNumbers((Math.round(quantity * response.product.unit_kc))));
                $this.parent().parent().find('.weight').val(Math.round(quantity * response.product.unit_kc));
                totalWeight();
            }
        }
    })

})
$('#export-stock').delegate('.weight_format', 'change', function () {
    $this = $(this);
    var product_id = $(this).parent().parent().find('.product_id').val();
    var weight = $(this).parent().find('.weight').val();
    var category_id = $(this).parents('.item').find('.category_id').val();
    $.ajax({
        url: "/api/getProductQuantity",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, weight: weight},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.quantity_sc').val(response.quantity - (~~(response.quantity / response.product.unit_cb) * response.product.unit_cb));
                $this.parent().parent().find('.quantity_sc_format').val(formatNumbers((response.quantity - (~~(response.quantity / response.product.unit_cb) * response.product.unit_cb))));
                $this.parent().parent().find('.number_sb').val(~~(response.quantity / response.product.unit_cb));
            }
            $('.select').select2();
        }
    })
})


$('#vehicle_id').on('change', function () {
    if ($('#check_height_vehicle').is(":checked")){

    }
    else {
        var total = 0;
        $('.weight').each(function () {
            if ($(this).val() != '') {
                total += parseInt($(this).val());
            }
        });
        $.ajax({
            url: '/api/check-quantity-vehicle',
            method: 'post',
            data: {quantity: total, vehicle_id: [$(this).val()]},
            success: function (data) {
                if (data.error === true) {
                    swal('Đã quá trọng tải xe!');
                    //$('.weight_format').val(0);
                }
            }
        });
    }
});
$('.btnExportStock').on('click', function (e) {
    e.preventDefault();
    if ($('#check_height_vehicle').is(":checked")){
        $('#frmExportStock').submit();
    }
    else{
        var total = 0;
        $('.weight').each(function () {
            if ($(this).val() !== '') {
                total += parseInt($(this).val());
            }
        });
        $.ajax({
            url: '/api/check-quantity-vehicle',
            method: 'post',
            data: {quantity: total, vehicle_id: [$('#vehicle_id').val()]},
            success: function (data) {
                if (data.error === true) {
                    swal('Đã quá trọng tải xe!');
                    // $('.weight_format').val('');
                    // $('.weight').val('');
                } else {
                    $('#frmExportStock').submit();
                }
            }
        })
    }
});
$("#check_height_vehicle").on('change',function () {
    var total = 0;
    if ($('#check_height_vehicle').is(":checked")){

    }else {
        var total = 0;
        $('.weight').each(function () {
            if ($(this).val() != '') {
                total += parseInt($(this).val());
            }
        });
        $.ajax({
            url: '/api/check-quantity-vehicle',
            method: 'post',
            data: {quantity: total, vehicle_id: [$('#vehicle_id').val()]},
            success: function (data) {
                if (data.error == true) {
                    swal('Đã quá trọng tải xe!');
                    $('.weight_format').val(0);
                }
            }
        });
    }

});

$('body').delegate('#frmExportStock .weight_format', 'change', function () {
    if (!$('#check_height_vehicle').is(":checked")){
        var total = 0;
        $('.weight').each(function () {
            if ($(this).val() != '') {
                total += parseInt($(this).val());
            }
        });
        $.ajax({
            url: '/api/check-quantity-vehicle',
            method: 'post',
            data: {quantity: total, vehicle_id: [$('#vehicle_id').val()]},
            success: function (data) {
                if (data.error == true) {
                    swal('Đã quá trọng tải xe!');
                    // $('.weight_format').val(0);
                }
            }
        });
    }

    totalWeight();
});
