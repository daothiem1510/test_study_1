
$('select[name="big_order_supplier_id"]').change(function () {
    var id = $(this).val();
    $.ajax({
        url: "/api/getBigOrderSupplier",
        method: "POST",
        data: {id: id},
        success: function (response) {
            if (response.success == true) {
                $('select[name="supplier_id"]').html(response.supplier_html);
                $('select[name="company_id"]').html(response.company_html);
                $('select[name="sup_representer_id"]').html(response.sup_representer_html);
                $('select[name="com_representer_id"]').html(response.com_representer_html);
                $('.export_place').val(response.warehouse_id);
                $('.warehouse').val(response.warehouse_name);
                $('#contract').html(response.contract_html);
                printJS(response.link);
            }
            $('select').select2();
        }
    })
});
$('select[name="supplier_id"]').change(function () {
    var supplier_id = $(this).val();
    $.ajax({
        url: "/api/getRepresenterBySupplier",
        method: "POST",
        data: {supplier_id: supplier_id},
        success: function (response) {
            if (response.success == true) {
                $('select[name="sup_representer_id"]').html(response.html);
            }
            $('select[name="sup_representer_id"]').select2();
        }
    })
});
$('select[name="company_id"]').change(function () {
    var supplier_id = $(this).val();
    $.ajax({
        url: "/api/getRepresenterByCompany",
        method: "POST",
        data: {supplier_id: supplier_id},
        success: function (response) {
            if (response.success == true) {
                $('select[name="com_representer_id"]').html(response.html);
            }
            $('select[name="com_representer_id"]').select2();
        }
    })
});
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
    var supplier_id = $('.supplier_id').val();
    $.ajax({
        url: "/api/getProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false && response.product) {
                $this.parent().parent().find('.in_price').val(response.product.price);
                $this.parent().parent().find('.in_price_format').val(response.product.price.toLocaleString());
            }
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.number_sb', 'change', function () {
    $this = $(this);
    var number_sb = $(this).val();
    var product_id = $(this).parent().parent().find('.product_id').val();
    var category_id = $(this).parent().parent().find('.category_id').val();
    var supplier_id = $('.supplier_id').val();
    $.ajax({
        url: "/api/getInfoProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.quantity').val(0);
                $this.parent().parent().find('.out_weight').val((Math.round(response.product.unit_cb * number_sb * response.product.unit_kc)).toLocaleString());
                $this.parent().parent().find('.weight').val(response.product.unit_cb * number_sb * response.product.unit_kc);
            }
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.supplier_id', 'change', function () {
    $this = $(this);
    var supplier_id = $(this).val();
    $.ajax({
        url: "/api/getWarehouseBySupplier",
        method: "POST",
        data: {supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $('.export_place').val(response.warehouse_id);
                $('.warehouse').val(response.warehouse_name);
            } else {
                swal(response.mess);
                $('.export_place').val('');
                $('.warehouse').val('');
            }
        }
    })
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
                            <div class="row item" >
                                <div class="form-group col-md-1">
                                    <select name="product_id[]" data-placeholder="Chọn danh mục sản phẩm" class="product_id form-control select" data-fouc>
                                        ` + response.product_options + `
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <select name="category_id[]" disabled="" data-placeholder="Chọn loại hàng" class="category_id form-control select" data-fouc>
                                        ` + response.category_options + `
                                    </select>
                                </div>
                                <div class="form-group col-md-1">
                                    <input name="unit[]" type="text" value="kg" class="form-control">
                                </div>
                                <div class="form-group col-md-1">
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
                                <div class="form-group col-md-2">
                                    <input name="warehouse[]" value="` + warehouse + `" type="text" class="form-control warehouse" readonly>
                                    <input name="export_place[]" value="` + export_place + `" type="hidden" class="form-control export_place">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-primary btn-primary btn_copy" >Copy </button>
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-primary btn-danger btn_delete" >Xóa </button>
                                </div>
                            </div>
                        `);
            }
            $('.select').select2();
        }
    })
});
$('.card-body').delegate('.out_weight', 'change', function () {
    $this = $(this);
    //
    var supplier_id = $('.supplier_id').val();
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
                $this.parent().parent().find('.quantity').val(response.quantity - (~~(response.quantity / response.product.unit_cb) * response.product.unit_cb));
                $this.parent().parent().find('.number_sb').val(~~(response.quantity / response.product.unit_cb));
            }
            $('.select').select2();
        }
    })
})
$('.card-body').delegate('.quantity', 'change', function () {
    $this = $(this);
    var quantity = $(this).val();
    var product_id = $(this).parent().parent().find('.product_id').val();
    var category_id = $(this).parent().parent().find('.category_id').val();
    var supplier_id = $('.supplier_id').val();
    $.ajax({
        url: "/api/getInfoProduct",
        method: "POST",
        data: {product_id: product_id, category_id: category_id, supplier_id: supplier_id},
        success: function (response) {
            if (response.error == false) {
                $this.parent().parent().find('.number_sb').val(~~(quantity / response.product.unit_cb));
                $this.val(quantity - (~~(quantity / response.product.unit_cb)) * response.product.unit_cb);
                console.log(response.product.unit_kc);
                $this.parent().parent().find('.out_weight').val((Math.round(quantity * response.product.unit_kc)).toLocaleString());
                $this.parent().parent().find('.weight').val(Math.round(quantity * response.product.unit_kc));
            }
            $('.select').select2();
        }
    })
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
    $('#expired_date').val(someFormattedDate);
    $('[name="expired_date_submit"]').attr('value', dbDate);
})
$('.company_id').change(function () {
    var company_id = $(this).val();
    var supplier_id = $('.supplier_id').val();
    $.ajax({
        url: '/api/getAgreement',
        data: {supplier_id: supplier_id, company_id: company_id},
        method: 'POST',
        success: function (response) {
            $('#contract').html(response.html);
            $('.select').select2();
        }
    });
})
$('.card-body').delegate('.btn_delete', 'click', function () {
    $(this).parent().parent().remove();
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
