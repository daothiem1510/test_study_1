/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('[name="debt"]').change(function () {
    if ($('[name="debt"]:checked').length > 0) {
        $('[name="debt_order_id"]').removeAttr('disabled');
    } else {
        $('[name="debt_order_id"]').attr('disabled', 'true');
    }
})
$('body').delegate('.btn_copy', 'click', function () {
    product_id = $(this).parents('.item').find('.product_id').val();
    supplier_id = $(this).parents('.item').find('.supplier_id').val();
    category_id = $(this).parents('.item').find('.category_id').val();
    export_place = $(this).parents('.item').find('.export_place').val();
    warehouse = $(this).parents('.item').find('.warehouse').val();
    $.ajax({
        url: "/api/copyProduct",
        method: "POST",
        data: {product_id: product_id, supplier_id: supplier_id, category_id: category_id},
        success: function (response) {
            if (response.error == false) {
                $('.product').append(`
                        <div class="row mb-1  item" >
                            <div class="form-group col-md-1">
                                <select name="product_id[]" data-placeholder="Chọn danh mục sản phẩm" required class="product_id form-control select" data-fouc>
                                    ` + response.product_options + `
                                </select>
                            </div>
                            <div class="form-group col-md-1 transport-category">
                                <select name="category_id[]" data-placeholder="Chọn loại hàng" required class="category_id form-control select" data-fouc>
                                    ` + response.category_options + `
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <select name="supplier_id[]" data-placeholder="Chọn nhà máy" required class="supplier_id form-control select" data-fouc>
                                    ` + response.supplier_options + `
                                </select>
                            </div>
                            <div class="form-group col-md-1 unit">
                                <input name="unit[]" type="text" value="kg" class="form-control">
                            </div>
                            <div class="form-group col-md-1 sb">
                                <input name="number_sb[]" type="number" class="form-control number_sb">
                            </div>
                            <div class="form-group col-md-1">
                                <input name="quantity[]" type="number" class="form-control quantity" >
                            </div>
                            <div class="form-group col-md-1">
                                 <input id="out_weight[]" onkeyup="formatValue(this)" type="text" class="form-control out_weight" value="">
                                <input type="hidden" name="out_weight[]" value="" class="form-control weight">
                            </div>
                            <div class="form-group col-md-1">
                                <input name="in_price[]" type="number" class="form-control in_price">
                            </div>
                            <div class="form-group col-md-1">
                                <input id="out_price[]" type="text" class="form-control out_price_format" onkeyup="formatValue(this)">
                                <input name="out_price[]" type="hidden" class="form-control out_price">
                                <input type="hidden" name="" class="order_total">
                            </div >
                            <div class="form-group col-md-1">
                                <input name="product_name[]"  type="text" class="form-control product_name">
                            </div>
                            <div class="form-group col-md-1 hidden">
                                <input name="warehouse[]" value="` + warehouse + `" type="text" class="form-control warehouse" readonly>
                                <input name="export_place[]" value="` + export_place + `" type="hidden" class="form-control export_place">
                            </div>
                            <div class="col-md-1 btn-product">
                                <button type="button" class="btn btn-primary btn-primary btn_copy" style="margin-right: 2px;" title="Copy"><i  class="icon-copy2"></i> </button>
                                <button type="button" class="btn btn-primary btn-danger btn_delete" style=""><i class="icon-cancel-square"></i> </button>
                            </div>

                        </div>
                    `);
            }
            $('.select').select2();
        }
    })
});
$('#customer, #company').change(function () {
    company_id = $('[name="company_id"]').val();
    customer_id = $('[name="customer_id"]').val();
    $.ajax({
        url: "/api/getContractByCompanyAndCustomer",
        method: "POST",
        data: {company_id: company_id, customer_id: customer_id},
        success: function (response) {
            if (response.success == true) {
                $('[name="contract_id"]').html(response.html);
            }else {
                $('[name="contract_id"]').html(response.html);
                swal({
                    title:response.message,
                    type:'error'
                })
            }
            $('.select').select2();
        }
    })
})
$('body').delegate('#user', 'change', function () {
    var id = $('#customer').val();
    $.ajax({
        url: "/api/getOrderByCustomer",
        method: "POST",
        data: {id: id},
        success: function (response) {
            if (response.error == false) {
                $('[name="debt_order_id"]').html(response.order_html);
            }
            else {
                swal(response.mess);
            }
            $('.select').select2();
        }
    })
    $('#customer').val(id);
})
$('body').delegate('.user_id', 'change', function () {
    var id = $(this).val();
    $.ajax({
        url: "/api/checkOldDebt",
        method: "POST",
        data: {id: id},
        success: function (response) {
            if (response.error === 1) {
                $('.detail-allow-user').html(response.html);
                $('#notAllowUser').modal('show');
            }
            else {
                $('.debt-view').html(response.html);
                $('#view_debt').modal('show');
            }
        }
    })
})

$('.card-body').delegate('.product_id', 'change', function () {
    $this = $(this);
    var product_id = $this.val();
    $.ajax({
        url: "/api/getCategoryByProduct",
        method: "POST",
        data: {product_id: product_id},
        success: function (response) {
            if (response.success == true) {
                $this.parents('.item').find('.category_id').removeAttr('disabled');
                $this.parents('.item').find('.category_id').html(response.category_html);
            }
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.category_id', 'change', function () {
    $this = $(this);
    var product_id = $(this).parent().parent().find('.product_id').val();
    var category_id = $(this).val();
    var supplier_id = $(this).parent().parent().find('.supplier_id').val();
    $.ajax({
        url: "/api/getProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id:supplier_id},
        success: function (response) {
           /* if (response.error == false && response.product) {
                $this.parent().parent().find('.product_name').val(response.product.name);
                $this.parent().parent().find('.in_price').val(response.product.price);
                $this.parent().parent().find('.in_price_format').val(response.product.price.toLocaleString());
            }*/
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.supplier_id', 'change', function () {
    $this = $(this);
    var product_id = $(this).parent().parent().find('.product_id').val();
    var supplier_id = $(this).val();
    var category_id = $(this).parent().parent().find('.category_id').val();
    $.ajax({
        url: "/api/getProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id:supplier_id},
        success: function (response) {
            if (response.error == false && response.product) {
                $this.parent().parent().find('.in_price').val(response.product.price);
                $this.parent().parent().find('.in_price_format').val(response.product.price.toLocaleString());
            }
            $('.select').select2();
        }
    })
})
/*$('.card-body').delegate('.out_price_format', 'change', function () {
    var product_id = $(this).parent().parent().find('.product_id').val();
    var category_id = $(this).parent().parent().find('.category_id').val();
    var out_price = $(this).next().val();
    $.ajax({
        url: "/api/checkPrice",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, out_price: out_price},
        success: function (response) {
            if (response.error == false && response.price) {
                if (out_price < response.check) {
                    swal('Giá vừa nhập thấp hơn mức giá quy định. Mời nhập giá cao hơn!');
                    $this.parent().parent().find('.out_price').val('');
                    $this.parent().parent().find('.out_price_format').val('');
                } else {
                    $this.parent().parent().find('.out_price').val(response.price);
                    $this.parent().parent().find('.out_price_format').val(response.price.toLocaleString());
                }
            }
            $('.select').select2();
        }
    })
    $this.parent().parent().find('.out_price').focus();
})*/
$('.card-body').delegate('.btn_delete', 'click', function () {
    $(this).parent().parent().remove();
})
$('.card-body').delegate('.number_sb', 'change', function () {
    $this = $(this);
    var number_sb = $(this).val();
    var product_id = $(this).parent().parent().find('.product_id').val();
    var category_id = $(this).parent().parent().find('.category_id').val();
    var supplier_id = $(this).parent().parent().find('.supplier_id').val();
    $.ajax({
        url: "/api/getInfoProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.quantity').val(0);
                $this.parent().parent().find('.out_weight').val(formatNumbers((Math.round(response.product.unit_cb * number_sb * response.product.unit_kc))));
                $this.parent().parent().find('.weight').val(Math.round(response.product.unit_cb * number_sb * response.product.unit_kc));
            }
            totalMoney();
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.quantity', 'change', function () {
    $this = $(this);
    var quantity = $(this).val();
    var product_id = $(this).parent().parent().find('.product_id').val();
    var category_id = $(this).parent().parent().find('.category_id').val();
    var supplier_id = $(this).parent().parent().find('.supplier_id').val();
    $.ajax({
        url: "/api/getInfoProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.number_sb').val(~~(quantity/response.product.unit_cb));
                $this.val(quantity-(~~(quantity/response.product.unit_cb)) * response.product.unit_cb);
                $this.parent().parent().find('.out_weight').val(formatNumbers((Math.round(quantity * response.product.unit_kc))));
                $this.parent().parent().find('.weight').val(Math.round(quantity * response.product.unit_kc));
            }
            totalMoney();
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.out_weight', 'blur', function () {
    $this = $(this);
    //
    var supplier_id = $(this).parent().parent().find('.supplier_id').val();
    var quantity1 = $(this).parent().parent().find('.supplier_id').val();
    //
    var quantity = $(this).val();
    var product_id = $(this).parent().parent().find('.product_id').val();
    var weight = $(this).parent().find('.weight').val();
    var category_id = $(this).parent().parent().find('.category_id').val();
    $.ajax({
        url: "/api/getProductQuantity",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, weight: weight},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.quantity').val(response.quantity - (~~(response.quantity/response.product.unit_cb) * response.product.unit_cb));
                $this.parent().parent().find('.number_sb').val(~~(response.quantity/response.product.unit_cb));
            }
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.add-delivery', 'click', function () {
    $('#jui-dialog-drag-disabled').dialog('open');
});
$('#frmDelivery').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: "/api/addDelivery",
        method: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.error == false) {
                $('#delivery').html(response.delivery_html);
            }
            $('#jui-dialog-drag-disabled').dialog('close');
            $('#frmDelivery')[0].reset();
            $('.select').select2();
        }
    })
});
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
    $('#expired_date').val(someFormattedDate);
    $('[name="expired_date_submit"]').attr('value', dbDate);
})

$('#frmOrder').submit(function () {
    $('.validate').parent().find('.help-block').remove();
    var empty = false;
    $('.validate').each(function(index){
        if ($(this).val() == '') {
            $(this).focus();
            var span = "<span class='help-block text-danger'>Xin hãy điền đầy đủ thông tin</span>";
            $(this).parent().append(span);
            empty = true;
            return false;
        }
    })
    if (empty) return false;
            return true;
})
$('[data-action="save-order"]').click(function (e) {
    e.preventDefault();
    var elm = this;
    let offer_dont_vat = $('[name="offer_dont_vat_id"]').val();
    let order_id = $(this).data('order_id');
    let user_id = $('[name="user_id"]').val();
    $.ajax({
        url: "/api/checkAllowUser",
        method: "POST",
        data: {user_id:user_id},
        success: function (response) {
            if (response.success == false) {
                swal({
                    title: 'Nhân viên kinh doanh không được phép tạo đơn!',
                    type:'error'
                })
                return 0;
            }
        }
    })
    if ($('[name="vat"]').val() == 0) {
        if (!offer_dont_vat) {
            swal({
                text:"Chọn đề nghị kế hoạch tạo đơn không VAT!",
                type:"error"
            })
        }else {
            $.ajax({
                url: "/api/checkOfferDontVat",
                method: "POST",
                data: {order_id:order_id,offer_dont_vat_id:offer_dont_vat,total_order:$('.total_total').val()},
                success: function (response) {
                    if (response.success == false) {
                        swal({
                            text:response.text,
                            type:"error"
                        });
                    }
                    else {
                        Swal({
                            text: "Vui lòng kiểm tra lại số liệu đã nhập trùng khớp với đơn đặt hàng của khách hàng!",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Lưu lại',
                            cancelButtonText: 'Kiểm tra',
                        }).then((result) => {
                            if (result.value) {
                                var total = 0;
                                var weight = 0;
                                $('.out_price').each(function(){
                                    if($(this).val() != '' && $(this).parent().parent().find('.weight').val() != ''){
                                        total += parseInt($(this).val()) * parseInt($(this).parent().parent().find('.weight').val());
                                        weight += parseInt($(this).parent().parent().find('.weight').val());
                                    }
                                })
                                var lower_row = $('input[name="lower_row"]').val();
                                var vat = $('input[name="vat"]').val();
                                var customer_id = $('#customer').val();
                                $.ajax({
                                    url: "/api/getLimitMoney",
                                    method: "POST",
                                    data: {customer_id:customer_id, total:total, weight:weight, contract_id: $('[name="contract_id"]').val(),lower_row:lower_row,vat:vat},
                                    success: function (response) {
                                        if (response.error == true) {
                                            swal(response.mess);
                                        }
                                        else {
                                            $('#frmOrder').submit();
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    }else {
        Swal({
            text: "Vui lòng kiểm tra lại số liệu đã nhập trùng khớp với đơn đặt hàng của khách hàng!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Lưu lại',
            cancelButtonText: 'Kiểm tra',
        }).then((result) => {
            if (result.value) {
                var total = 0;
                var weight = 0;
                $('.out_price').each(function(){
                    if($(this).val() != '' && $(this).parent().parent().find('.weight').val() != ''){
                        total += parseInt($(this).val()) * parseInt($(this).parent().parent().find('.weight').val());
                        weight += parseInt($(this).parent().parent().find('.weight').val());
                    }
                })
                var lower_row = $('input[name="lower_row"]').val();
                var vat = $('input[name="vat"]').val();
                var customer_id = $('#customer').val();
                $.ajax({
                    url: "/api/getLimitMoney",
                    method: "POST",
                    data: {customer_id:customer_id, total:total, weight:weight, contract_id: $('[name="contract_id"]').val(),lower_row:lower_row,vat:vat},
                    success: function (response) {
                        if (response.error == true) {
                            swal(response.mess);
                        }
                        else {
                            $('#frmOrder').submit();
                        }
                    }
                })
            }
        })
    }

})
$('body').delegate('#customer', 'change', function () {
    var customer_id = $(this).val();
    $.ajax({
        url: "/api/getProjectByCustomer",
        method: "POST",
        data: {customer_id: customer_id},
        success: function (response) {
            if (response.error == false) {
                $('#project').html(response.project_html);
                $('#region').html(response.region_html);
            }
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.add-project', 'click', function () {
    if ($('#customer').val() === '') {
        swal('Cần chọn khách hàng trước khi thao tác');
    } else {
        $('.selected_project').val($('.project_id').val());
        $('#customer_id').val($('#customer').val());
        $('#add_project').modal('show');
    }
});
$('#add_project').delegate('.proj_city', 'change', function(){

    $this = $(this);
    var city_id = $(this).val();
    $.ajax({
        url: "/api/getDistrict",
        method: "POST",
        data: {city_id: city_id},
        success: function (response) {
            if (response.error == false) {
                $this.parents('.item').find('.proj_district').html(response.district_html);
            }
            $('.proj_district').select2();
        }
    })
})
$('#add_project').delegate('.proj_district', 'change', function(){
    $this = $(this);
    var district_id = $(this).val();
    $.ajax({
        url: "/api/getCommune",
        method: "POST",
        data: {district_id: district_id},
        success: function (response) {
            if (response.error == false) {
                $this.parents('.item').find('.proj_commune').html(response.commune_html);
            }
            $('.proj_commune').select2();
        }
    })
})
$('#frmProject').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: "/api/addProjectInOrder",
        method: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.error == false) {
                $('#project').html(response.project_html);
                $('.proj_city').html(response.city_html);
                $('.proj_district').html('');
                $('.proj_commune').html('');
            }
            $('#add_project').modal('hide');
            $('#frmProject')[0].reset();
            $('.select').select2();
        }
    })
});

$('.card-body').delegate('.supplier_id', 'change', function () {
    $this = $(this);
    var supplier_id = $(this).val();
    var company_id = $('#company').val();
    $.ajax({
        url: "/api/getWarehouseBySupplier",
        method: "POST",
        data: {supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $this.parents('.item').find('.export_place').val(response.warehouse_id);
                $this.parents('.item').find('.warehouse').val(response.warehouse_name);
            }
            else if(response.error == true) {
                swal(response.mess);
                $this.parents('.item').find('.export_place').val('');
                $this.parents('.item').find('.warehouse').val('');
            }
        }
    })
    // $.ajax({
    //     url: "/api/getInfoContract",
    //     method: "POST",
    //     data: {supplier_id: supplier_id,company_id:company_id},
    //     success: function (response) {
    //         if (response.error == true) {
    //             swal(response.mess);
    //         }
    //     }
    // })
})
function totalMoney(){
    var total = 0;
    $('.out_price').each(function(){
        if($(this).val() != '' && $(this).parent().parent().find('.weight').val() != ''){
            total += parseFloat($(this).val()) * parseFloat($(this).parent().parent().find('.weight').val());
        }
    })
    $('.total').html(formatNumber(total));
    $('.total_total').val(total);
}
$('.card-body').delegate('.out_weight','change', function () {
    console.log($(this).val());
})
$('.out_weight').bind('input', function() {
   console.log($(this).val()); // get the current value of the input field.
});
$('.card-body').delegate('.out_price_format,.out_weight','change', function () {
    totalMoney();
})
$('.card-body').delegate('.btn_delete', 'click', function () {
    totalMoney();
})
$( document ).ready(function() {
    totalMoney();
    // $('#dropDownId :selected').text();
});
$('.card-body').delegate('.delivery-select','change', function () {
    if($(this).val() == 2){
        $.ajax({
            url: "/api/getVehicleOrder",
            method: "POST",
            data: {},
            success: function (response) {
                if (response.error == false) {
                    $('.shipping_unit_price').val(0);
                    $('.vehicle').html(response.html);
                }
                $('select').select2();
            }
        })
    }
    else {
        $('.vehicle').empty();
    }
});

$('body').delegate('.add-vehicle', 'click', function(){
    $('.selected_vehicle').val($('.vehicle_select').val());
    $('#jui-dialog-append').dialog('open');
});
$('#frmVehicle').on('submit', function (e){
    e.preventDefault();
    $.ajax({
        url: "/api/createVehicleCustomer",
        method: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.error == false) {
                $('.vehicle_select').html(response.vehicle_html);
                $('#jui-dialog-append').dialog('close');
                $('#frmVehicle')[0].reset();
                $('.select').select2();
            }
            else {
                swal('Biển số xe đã tồn tại!');
            }
        }
    })
});
$('[name="contract_id"]').change(function(){
    $.ajax({
        url: '/api/checkContract',
        method: 'post',
        data: {id: $(this).val()},
        success: function(resp) {
            if (resp.error == true) {
                swal({
                    type: 'error',
                    title: 'Không thể thực hiện đơn hàng vì chưa có hợp đồng bản mềm'
                })
            }
        }
    })
})


