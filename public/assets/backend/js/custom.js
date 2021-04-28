/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Select with search
if ($('.select-search').length) {
    $('.select-search').select2({
        allowClear: true
    });
}

// Initialize
if ($('.touchspin').length) {
    $('.touchspin').TouchSpin({
        min: 0,
        max: 1000000000,
    });

// Trigger value change when +/- buttons are clicked
    $('.touchspin').on('touchspin.on.startspin', function () {
        $(this).trigger('blur');
    });
}
if ($('.tokenfield').length) {
    // Basic initialization
    $('.tokenfield').tokenfield();
}
if ($('.pickadate').length) {
    // Basic options
    $('.pickadate').pickadate({
        timePicker: true,
        format: 'dd/mm/yyyy',
        formatSubmit: 'yyyy-mm-dd'
    });
}
if ($('.ckeditor').length) {
    if (typeof (CKEDITOR) !== 'undefined' && $('#content').length)
        CKEDITOR.replace('content');
}
// Default initialization
if ($('.form-check-input-styled').length) {
    $('.form-check-input-styled').uniform();
// Initialize
    var validator = $('.form-validate-jquery').validate({
        ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
        errorClass: 'validation-invalid-label',
        successClass: 'validation-valid-label',
        validClass: 'validation-valid-label',
        highlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
        },
        unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
        },
        success: function (label) {
            label.addClass('validation-valid-label').text('Success.'); // remove to hide Success message
        },

        // Different components require proper error label placement
        errorPlacement: function (error, element) {

            // Unstyled checkboxes, radios
            if (element.parents().hasClass('form-check')) {
                error.appendTo(element.parents('.form-check').parent());
            }

            // Input with icons and Select2
            else if (element.parents().hasClass('form-group-feedback') || element.hasClass('select2-hidden-accessible')) {
                error.appendTo(element.parent());
            }

            // Input group, styled file input
            else if (element.parent().is('.uniform-uploader, .uniform-select') || element.parents().hasClass('input-group')) {
                error.appendTo(element.parent().parent());
            }

            // Other elements
            else {
                error.insertAfter(element);
            }
        },
        rules: {
            password: {
                minlength: 5
            },
            repeat_password: {
                equalTo: '#password'
            },
            email: {
                email: true
            },
            repeat_email: {
                equalTo: '#email'
            },
            minimum_characters: {
                minlength: 10
            },
            maximum_characters: {
                maxlength: 10
            },
            minimum_number: {
                min: 10
            },
            maximum_number: {
                max: 10
            },
            number_range: {
                range: [10, 20]
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            date_iso: {
                dateISO: true
            },
            numbers: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            },
            basic_checkbox: {
                minlength: 2
            },
            styled_checkbox: {
                minlength: 2
            },
            switchery_group: {
                minlength: 2
            },
            switch_group: {
                minlength: 2
            }
        },
        messages: {
            custom: {
                required: 'This is a custom error message'
            },
            basic_checkbox: {
                minlength: 'Please select at least {0} checkboxes'
            },
            styled_checkbox: {
                minlength: 'Please select at least {0} checkboxes'
            },
            switchery_group: {
                minlength: 'Please select at least {0} switches'
            },
            switch_group: {
                minlength: 'Please select at least {0} switches'
            },
            agree: 'Please accept our policy'
        }
    });
}
$('[data-action="delete"]').click(function (e) {
    var elm = this;
    bootbox.confirm("Bạn có chắc chắn muốn xóa?", function (result) {
        if (result === true) {
            $(elm).parents('form').submit();
        }
    });
});
$('[data-action="open_order"]').click(function (e) {
    var elm = this;
    bootbox.confirm("Bạn có chắc chắn muốn mở đơn?", function (result) {
        if (result === true) {
            $(elm).parents('form').submit();
        }
    });
});
$('[data-action="lock_order"]').click(function (e) {
    var elm = this;
    bootbox.confirm("Bạn có chắc chắn muốn khóa đơn?", function (result) {
        if (result === true) {
            $(elm).parents('form').submit();
        }
    });
});
$('[data-action="unlock_order"]').click(function (e) {
    var elm = this;
    bootbox.confirm("Bạn có chắc chắn muốn mở khóa đơn?", function (result) {
        if (result === true) {
            $(elm).parents('form').submit();
        }
    });
});
$('.card').delegate('.view-number-money','click',function () {
    let bank_account_id = $(this).data('bank_account_id');
    let money = $(this).data('money');
    let table_name = $(this).data('table_name');
    let record_id = $(this).data('record_id');
    $.ajax({
        url: '/api/showNumberMoney',
        method: 'POST',
        data: {bank_account_id:bank_account_id,money:money,table_name:table_name,record_id:record_id},
        success: function (response) {
            if (response.success === true) {
                $('.detail-show-number-money').html(response.html);
                $('#show_number_money').modal('show');
            }
        }
    });
})

function openKCFinder(div) {
    var field = div.id;
    window.KCFinder = {
        callBack: function (url) {
            window.KCFinder = null;
            var img = new Image();
            img.src = url;
            var image_id = jQuery.now();
            var image_idx = $('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs .file-preview-frame:visible').length + 1;
            var filename = url.substring(url.lastIndexOf('/') + 1);
            img.onload = function () {
                var html = '' +
                    '<div class="file-preview-frame krajee-default kv-preview-thumb" id="preview-' + image_id + '-' + image_idx + '" data-fileindex="' + image_idx + '" data-template="image">' +
                    '<div class="kv-file-content">' +
                    '<img src="' + url + '"' +
                    'class="file-preview-image kv-preview-data" title="' + filename + '" alt="' + filename + '" style="width:auto;height:160px;">' +
                    '</div>' +
                    '<div class="file-thumbnail-footer"> <div class="file-footer-caption" title=""> <div class="file-caption-info"></div> <div class="file-size-info"></div> </div> <div class="file-thumb-progress kv-hidden"><div class="progress"> <div class="progress-bar bg-success progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;"> Initializing... </div></div></div><div class="file-actions"> <div class="file-footer-buttons"> <button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button> <button type="button" class="kv-file-zoom btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-zoomin3"></i></button> </div></div><span class="file-drag-handle drag-handle-init btn btn-link btn-xs btn-icon" title="Move / Rearrange"><i class="icon-three-bars"></i></span><div class="clearfix"></div></div>' +
                    '</div>';
                if ($('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs .file-preview-frame:visible').length) {
                    if ($('#' + field).attr('multiple')) {
                        $('.form-group[data-field="' + field + '"]').find('.file-drop-zone-title').remove();
                        $('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs:visible').append(html);
                        $('input[name="' + field + '"]').val($('input[name="' + field + '"]').attr('value') + '|' + url);
                    } else {
                        $('.form-group[data-field="' + field + '"]').find('.file-drop-zone-title').remove();
                        $('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs:visible').html(html);
                        $('input[name="' + field + '"]').val(url);
                    }
                } else {
                    $('.form-group[data-field="' + field + '"]').find('.file-drop-zone-title').remove();
                    $('.form-group[data-field="' + field + '"]').find('.file-preview-thumbnails').html('<div class="file-initial-thumbs">' + html + '</div>');
                    $('input[name="' + field + '"]').val(url);
                }
                $('.form-group[data-field="' + field + '"]').find('.file-input-new').removeClass('file-input-new');
                $('.form-group[data-field="' + field + '"]').find('.file-caption-name').text(filename);
            }
        }
    };
    window.open("/assets/backend/kcfinder-3.20" + '/browse.php?type=images', //type=image&
        'kcfinder_image', 'status=0, toolbar=0, location=0, menubar=0, ' +
        'directories=0, resizable=1, scrollbars=0, width=800, height=600'
    );
}

function openKCFinderLoadFile(div) {
    var field = div.id;
    window.KCFinder = {
        callBack: function (url) {
            window.KCFinder = null;
            var img = new File();
            img.src = url;
            var image_id = jQuery.now();
            var image_idx = $('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs .file-preview-frame:visible').length + 1;
            var filename = url.substring(url.lastIndexOf('/') + 1);
            img.onload = function () {
                var html = '' +
                    '<div class="file-preview-frame krajee-default kv-preview-thumb" id="preview-' + image_id + '-' + image_idx + '" data-fileindex="' + image_idx + '" data-template="image">' +
                    '<div class="kv-file-content">' +
                    '<img src="' + url + '"' +
                    'class="file-preview-image kv-preview-data" title="' + filename + '" alt="' + filename + '" style="width:auto;height:160px;">' +
                    '</div>' +
                    '<div class="file-thumbnail-footer"> <div class="file-footer-caption" title=""> <div class="file-caption-info"></div> <div class="file-size-info"></div> </div> <div class="file-thumb-progress kv-hidden"><div class="progress"> <div class="progress-bar bg-success progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;"> Initializing... </div></div></div><div class="file-actions"> <div class="file-footer-buttons"> <button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button> <button type="button" class="kv-file-zoom btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-zoomin3"></i></button> </div></div><span class="file-drag-handle drag-handle-init btn btn-link btn-xs btn-icon" title="Move / Rearrange"><i class="icon-three-bars"></i></span><div class="clearfix"></div></div>' +
                    '</div>';
                if ($('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs .file-preview-frame:visible').length) {
                    if ($('#' + field).attr('multiple')) {
                        $('.form-group[data-field="' + field + '"]').find('.file-drop-zone-title').remove();
                        $('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs:visible').append(html);
                        $('input[name="' + field + '"]').val($('input[name="' + field + '"]').attr('value') + '|' + url);
                    } else {
                        $('.form-group[data-field="' + field + '"]').find('.file-drop-zone-title').remove();
                        $('.form-group[data-field="' + field + '"]').find('.file-initial-thumbs:visible').html(html);
                        $('input[name="' + field + '"]').val(url);
                    }
                } else {
                    $('.form-group[data-field="' + field + '"]').find('.file-drop-zone-title').remove();
                    $('.form-group[data-field="' + field + '"]').find('.file-preview-thumbnails').html('<div class="file-initial-thumbs">' + html + '</div>');
                    $('input[name="' + field + '"]').val(url);
                }
                $('.form-group[data-field="' + field + '"]').find('.file-input-new').removeClass('file-input-new');
                $('.form-group[data-field="' + field + '"]').find('.file-caption-name').text(filename);
            }
        }
    };
    window.open("/assets/backend/kcfinder-3.20" + '/browse.php?', //type=image&
        'kcfinder_image', 'status=0, toolbar=0, location=0, menubar=0, ' +
        'directories=0, resizable=1, scrollbars=0, width=800, height=600'
    );
}

jQuery(function () {
    if ($('.file-input-overwrite').length) {
        var modalTemplate = '<div class="modal-dialog modal-lg" role="document">\n' +
            '  <div class="modal-content">\n' +
            '    <div class="modal-header">\n' +
            '      <div class="kv-zoom-actions btn-group">{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
            '      <h6 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h6>\n' +
            '    </div>\n' +
            '    <div class="modal-body">\n' +
            '      <div class="floating-buttons btn-group"></div>\n' +
            '      <div class="kv-zoom-body file-zoom-content"></div>\n' + '{prev} {next}\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>\n';
        // Buttons inside zoom modal
        var previewZoomButtonClasses = {
            toggleheader: 'btn btn-default btn-icon btn-xs btn-header-toggle',
            fullscreen: 'btn btn-default btn-icon btn-xs',
            borderless: 'btn btn-default btn-icon btn-xs',
            close: 'btn btn-default btn-icon btn-xs'
        };
        // Icons inside zoom modal classes
        var previewZoomButtonIcons = {
            prev: '<i class="icon-arrow-left32"></i>',
            next: '<i class="icon-arrow-right32"></i>',
            toggleheader: '<i class="icon-menu-open"></i>',
            fullscreen: '<i class="icon-screen-full"></i>',
            borderless: '<i class="icon-alignment-unalign"></i>',
            close: '<i class="icon-cross2 font-size-base"></i>'
        };
        // File actions
        var fileActionSettings = {
            zoomClass: 'btn btn-link btn-xs btn-icon',
            zoomIcon: '<i class="icon-zoomin3"></i>',
            dragClass: 'btn btn-link btn-xs btn-icon',
            dragIcon: '<i class="icon-three-bars"></i>',
            removeClass: 'btn btn-link btn-icon btn-xs',
            removeIcon: '<i class="icon-trash"></i>',
            indicatorNew: '<i class="icon-file-plus text-slate"></i>',
            indicatorSuccess: '<i class="icon-checkmark3 file-icon-large text-success"></i>',
            indicatorError: '<i class="icon-cross2 text-danger"></i>',
            indicatorLoading: '<i class="icon-spinner2 spinner text-muted"></i>'
        };
        $(".file-input-overwrite").each(function () {
            var field = this.dataset.field;
            var images_str = $(this).parents('.div-image').find('.image_data').val();
            var url = [];
            var file_size = [];
            var file_name = [];
            var images = [];
            var image_info = [];
            if (images_str) {
                url = images_str.split('|');
                file_size = [];// this.dataset.size.split('|');
                file_name = [];// this.dataset.name.split('|');
            }
            if (url && url.length) {
                for (i = 0; i < url.length; i++) {
                    images.push((url[i].match(/^\/upload/) || (!url[i].match(/^upload/) && !url[i].match(/^public/)) ? '' : '/') + url[i]);
                    //var tmp = file_name[i].split('/');
                    image_info.push({key: (i + 1)});
                }
            }
            $(this).fileinput({
                removeLabel: 'Xóa',
                browseLabel: 'Chọn',
                browseIcon: '<i class="icon-file-plus"></i>',
                uploadIcon: '<i class="icon-file-upload2"></i>',
                removeIcon: '<i class="icon-cross3"></i>',
                layoutTemplates: {
                    icon: '<i class="icon-file-check"></i>',
                    modal: modalTemplate
                },
                showUpload: false,
                initialPreview: images,
                initialPreviewConfig: image_info,
                initialPreviewAsData: true,
                overwriteInitial: true,
                previewZoomButtonClasses: previewZoomButtonClasses,
                previewZoomButtonIcons: previewZoomButtonIcons,
                fileActionSettings: fileActionSettings,

            });
            sortImage(this);
        });
    }
});

// $(document).ready(function() {
//     $('.datatable-basic').DataTable( {
//         // dom: 'Bfrtip',
//         buttons: ["copy", "excel", "csv", "pdf", "print"], name: "main", tabIndex: 0, dom: {
//             container: {tag: "div", className: "dt-buttons"},
//             collection: {tag: "div", className: "dt-button-collection"},
//             button: {
//                 tag: "button", className: "dt-button", active: "active",
//                 disabled: "disabled"
//             },
//             buttonLiner: {tag: "span", className: ""}
//         }
//     } );
// } );
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ';
}

function formatNumbers(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

//function formatValue(elm) {
//    var value_format = elm.value.replace(/\D/g, '');
//    var n = parseInt(value_format, 10);
//    if (n > 0) {
//        elm.value = n.toLocaleString();
//    } else {
//        elm.value = 0;
//    }
//
//    $(elm).parent().find('[name="'+elm.id+'"]').attr('value', value_format);
//}

function formatValue(elm) {
    var value_format = elm.value.replace(/,/g, '');
    $(elm).val(function (index, value) {
        return value.replace(/(?!\.)\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
    $(elm).parent().parent().find('[name="' + elm.id + '"]').attr('value', value_format);
}

var EchartsColumnsWaterfalls = function () {
    var _columnsWaterfallsExamples = function () {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }
        //Thống kê đơn hàng trong ngày
        // Define elements
        var columns_basic_element = document.getElementById('columns_basic');

        // Basic columns chart
        if (columns_basic_element) {

            // Initialize chart
            var columns_basic = echarts.init(columns_basic_element);
            var order = $('#columns_basic').data('order');
            var code = [];
            var total_order = [];
            order.forEach(function (element) {
                code.push(element.code);
                total_order.push(element.total_order);
            });
            columns_basic.setOption({
                // Define colors
                color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80'],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['Giá trị đơn hàng'],
                    itemHeight: 8,
                    itemGap: 20,
                    textStyle: {
                        padding: [0, 5]
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: code,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#eee']
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Giá trị đơn hàng',
                        type: 'bar',
                        data: total_order,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{type: 'average', name: 'Average'}]
                        }
                    },
                ]
            });
        }

        //Thống kê đơn hàng trong 30 ngày
        // Define elements
        var total_columns_basic = document.getElementById('total_columns_basic');

        // Basic columns chart
        if (total_columns_basic) {

            // Initialize chart
            var total_columns = echarts.init(total_columns_basic);
            var total = $('#total_columns_basic').data('total');
            var date = [];
            var order_total = [];
            total.forEach(function (element) {
                date.push(element.day + "/" + element.month + "/" + element.year);
                order_total.push(element.total);
            });
            total_columns.setOption({
                // Define colors
                color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80'],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['Số lượng đơn hàng'],
                    itemHeight: 8,
                    itemGap: 20,
                    textStyle: {
                        padding: [0, 5]
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: date,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#eee']
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Số lượng đơn hàng',
                        type: 'bar',
                        data: order_total,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{type: 'average', name: 'Average'}]
                        }
                    },
                ]
            });
        }
    }

    return {
        init: function () {
            _columnsWaterfallsExamples();
        }
    }
}();

var EchartsLines = function () {

    var _lineChartExamples = function () {
        if (typeof echarts == 'undefined') {
            console.warn('Warning - echarts.min.js is not loaded.');
            return;
        }

        // Define elements
        var line_multiple_element = document.getElementById('line_multiple');

        // Multiple lines
        if (line_multiple_element) {

            // Initialize chart
            var line_multiple = echarts.init(line_multiple_element);
            var total = $('#line_multiple').data('total');
            var date = [];
            var total_order = [];
            total.forEach(function (element) {
                date.push(element.day + "/" + element.month + "/" + element.year);
                total_order.push(element.total);
            });
            // Options
            line_multiple.setOption({

                // Define colors
                color: ['#f17a52', '#03A9F4'],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: [
                    {
                        left: 30,
                        right: 40,
                        top: 40,
                        containLabel: true
                    },

                ],

                // Title
                title: [
                    {
                        left: 'center',
                        top: 0,
                        textStyle: {
                            fontSize: 15,
                            fontWeight: 500
                        }
                    },
                ],

                // Tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    },
                    formatter: function (a) {
                        return (
                            a[0]['axisValueLabel'] + "<br>" +
                            '<span class="badge badge-mark mr-2" style="border-color: ' + a[0]['color'] + '"></span>' +
                            a[0]['seriesName'] + ': ' + a[0]['value']
                        );
                    }
                },

                // Connect axis pointers
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    }
                },

                // Horizontal axis
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#333'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                width: 1,
                                type: 'dashed'
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                            }
                        },
                        data: date,
                    },

                ],

                // Vertical axis
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#333'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                width: 1,
                                type: 'dashed'
                            }
                        }
                    },

                ],

                // Add series
                series: [
                    {
                        name: 'Tổng đơn hàng',
                        type: 'line',
                        smooth: true,
                        symbolSize: 7,
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
                        },
                        data: total_order,
                    },

                ]
            });
        }

        // Resize function
        var triggerChartResize = function () {
            line_multiple_element && line_multiple.resize();
        };
        // On sidebar width change
        $(document).on('click', '.sidebar-control', function () {
            setTimeout(function () {
                triggerChartResize();
            }, 0);
        });

        // On window resize
        var resizeCharts;
        window.onresize = function () {
            clearTimeout(resizeCharts);
            resizeCharts = setTimeout(function () {
                triggerChartResize();
            }, 200);
        };
    };
    //
    // Return objects assigned to module
    //

    return {
        init: function () {
            _lineChartExamples();
        }
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    EchartsColumnsWaterfalls.init();
    // EchartsLines.init();
});

function sortImage(elm) {
    if (elm) {
        if ($(elm).parents('.form-group').find('.file-preview-thumbnails .file-initial-thumbs').length) {
            $(elm).parents('.form-group').find('.file-preview-thumbnails .file-initial-thumbs').sortable({
                revert: true,
                stop: function (event, ui) {
                    $(ui.item[0]).parents('.form-group').find("input[type='hidden']").val($(ui.item[0]).parents('.form-group').find('img:visible').map(function () {
                        return $(this).attr('src').replace(/^https:\/\/hatex\.vn\//gm, '').replace(/^\//gm, '');
                    }).get().join(','))
                }
            });
        }
    } else {
    }
}

if ($(".file-input-extensions").length) {
    var modalTemplate = '<div class="modal-dialog modal-lg" role="document">\n' +
        '  <div class="modal-content">\n' +
        '    <div class="modal-header">\n' +
        '      <div class="kv-zoom-actions btn-group">{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
        '      <h6 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h6>\n' +
        '    </div>\n' +
        '    <div class="modal-body">\n' +
        '      <div class="floating-buttons btn-group"></div>\n' +
        '      <div class="kv-zoom-body file-zoom-content"></div>\n' + '{prev} {next}\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n';
    var previewZoomButtonClasses = {
        toggleheader: 'btn btn-default btn-icon btn-xs btn-header-toggle',
        fullscreen: 'btn btn-default btn-icon btn-xs',
        borderless: 'btn btn-default btn-icon btn-xs',
        close: 'btn btn-default btn-icon btn-xs'
    };
    // Icons inside zoom modal classes
    var previewZoomButtonIcons = {
        prev: '<i class="icon-arrow-left32"></i>',
        next: '<i class="icon-arrow-right32"></i>',
        toggleheader: '<i class="icon-menu-open"></i>',
        fullscreen: '<i class="icon-screen-full"></i>',
        borderless: '<i class="icon-alignment-unalign"></i>',
        close: '<i class="icon-cross3"></i>'
    };

    // File actions
    var fileActionSettings = {
        zoomClass: 'btn btn-link btn-xs btn-icon',
        zoomIcon: '<i class="icon-zoomin3"></i>',
        dragClass: 'btn btn-link btn-xs btn-icon',
        dragIcon: '<i class="icon-three-bars"></i>',
        removeClass: 'btn btn-link btn-icon btn-xs',
        removeIcon: '<i class="icon-trash"></i>',
        indicatorNew: '<i class="icon-file-plus text-slate"></i>',
        indicatorSuccess: '<i class="icon-checkmark3 file-icon-large text-success"></i>',
        indicatorError: '<i class="icon-cross2 text-danger"></i>',
        indicatorLoading: '<i class="icon-spinner2 spinner text-muted"></i>'
    };
    $(".file-input-extensions").each(function () {
        var valueFromDB = $(this).parents('.div-image').find('.image_data').val();
        var initPreview = valueFromDB ? valueFromDB.split(',') : [];
        for (i = 0; i < initPreview.length; i++) {
            initPreview[i] = '/' + initPreview[i];
        }
        var initPreviewConfig = [];
        for (i = 0; i < initPreview.length; i++) {
            var fileNames = initPreview[i].split('/');
            var fileName = fileNames[fileNames.length - 1];
            var obj = {caption: fileName, key: i + 1, showDrag: false};
            initPreviewConfig.push(obj);
        }
        var options = {
            browseLabel: 'Chọn',
            removeLabel: 'Xóa',
            browseClass: 'btn btn-primary',
            browseIcon: '<i class="icon-file-plus"></i>',
            removeIcon: '<i class="icon-cross3"></i>',
            layoutTemplates: {
                icon: '<i class="icon-file-check"></i>',
                modal: modalTemplate
            },
            maxFilesNum: 10,
            initialCaption: 'Không có ảnh',
            previewZoomButtonClasses: previewZoomButtonClasses,
            previewZoomButtonIcons: previewZoomButtonIcons,
            fileActionSettings: fileActionSettings,
            initialPreviewAsData: true,
            overwriteInitial: false,
        };
        if (initPreviewConfig.length) {
            options.initialPreview = initPreview;
            options.initialPreviewConfig = initPreviewConfig;
        }
        $(this).fileinput(options);
    }).on('filecleared', function (event) {
        $('input[name="' + event.target.id + '"]').parents('.form-group').find('.file-preview').remove();
        $('input[name="' + event.target.id + '"]').val('');
    });
}

setInterval(function () {
    $.ajax({
        url: '/api/notification',
        method: 'POST',
        dataType: 'json',
        success: function (resp) {
            if (resp.error == false) {
                var a = resp.expired;
                $.each(a, function (index) {
                    toastr.options.timeOut = 5000;
                    toastr.info('Ngày ' + a[index].expired_date + ': Khách hàng ' + a[index].customer + ' đến hạn thanh toán');
                });
            }
        }
    });
}, 86400000);

$(document).ready(function () {
    $('.modal').removeAttr("tabindex");
});
$(document).ready(function () {
    $("#factory_order select").select2({
        dropdownParent: $("#frmFactoryOrder")
    });
});

function getExt(filepath) {
    return filepath.split("?")[0].split("#")[0].split('.').pop();
}

if ($('.upload-images').length) {
    $('.upload-images').each(function () {
        var images = $(this).parents('.div-image').find('.image_data').val();
        if (images != '') {
            images = images.split(',');
            for (i = 0; i < images.length; i++) {
                var name = images[i];
                name = name.split('/');
                if (getExt(images[i]) == 'pdf' || getExt(images[i]) == 'docx' || getExt(images[i]) == 'xslx' || getExt(images[i]) == 'doc' || getExt(images[i]) == 'xls') {
                    $(this).parents('.div-image').find('.file-drop-zone').append('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                        '<div class="kv-file-content">' +
                        '<img src="/img/file-icon.png" data-link="'+images[i]+'" class="not-image file-preview-image kv-preview-data" title="' + name[1] + '" alt="' + name[1] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                        '</div>' +
                        '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + name[1] + '">' +
                        '<div class="file-caption-info">' + name[1] + '</div>' +
                        '<div class="file-size-info"></div>' +
                        '</div>' +
                        '<div class="file-actions">' +
                        '<div class="file-footer-buttons">' +
                        '<button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button>' +
                        '<a href="/file/'+name[1]+'" target="_blank" class="btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-file-download"></i></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                } else {
                    $(this).parents('.div-image').find('.file-drop-zone').append('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                        '<div class="kv-file-content">' +
                        '<img src="/' + images[i] + '" class="file-preview-image kv-preview-data" title="' + name[1] + '" alt="' + name[1] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                        '</div>' +
                        '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + name[1] + '">' +
                        '<div class="file-caption-info">' + name[1] + '</div>' +
                        '<div class="file-size-info"></div>' +
                        '</div>' +
                        '<div class="file-actions">' +
                        '<div class="file-footer-buttons">' +
                        '<button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button>' +
                        '<a type="button"  class="kv-file-zoom btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-zoomin3"></i></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            }
        }
    });

}
;
if ($('.show-images').length) {
    $('.show-images').each(function () {
        var images = $(this).parents('.div-image').find('.image_data').val();
        if (images === '') {
        } else {
            images = images.split(',');
            for (i = 0; i < images.length; i++) {
                var name = images[i];
                name = name.split('/');
                if (getExt(images[i]) == 'pdf' || getExt(images[i]) == 'docx' || getExt(images[i]) == 'xslx' || getExt(images[i]) == 'doc' || getExt(images[i]) == 'xls') {
                    $(this).parents('.div-image').find('.file-drop-zone').append('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                        '<div class="kv-file-content">' +
                        '<img src="/img/file-icon.png" data-link="'+images[i]+'" class="not-image file-preview-image kv-preview-data" title="' + name[1] + '" alt="' + name[1] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                        '</div>' +
                        '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + name[1] + '">' +
                        '<div class="file-caption-info">' + name[1] + '</div>' +
                        '<div class="file-size-info"></div>' +
                        '</div>' +
                        '<div class="file-actions">' +
                        '<div class="file-footer-buttons">' +
                        '<a href="/file/'+name[1]+'" target="_blank" class="btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-file-download"></i></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                } else {
                    $(this).parents('.div-image').find('.file-drop-zone').append('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                        '<div class="kv-file-content">' +
                        '<img src="/' + images[i] + '" class="file-preview-image kv-preview-data" title="' + name[1] + '" alt="' + name[1] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                        '</div>' +
                        '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + name[1] + '">' +
                        '<div class="file-caption-info">' + name[1] + '</div>' +
                        '<div class="file-size-info"></div>' +
                        '</div>' +
                        '<div class="file-actions">' +
                        '<div class="file-footer-buttons">' +
                        '<a type="button"  class="kv-file-zoom btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-zoomin3"></i></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            }
        }
    });

}
;

$('body').delegate('.kv-file-zoom', 'click', function () {
    console.log($(this).parents('.file-preview-frame').find('.file-preview-image').attr('src'));
    $('#imagepreview').attr('src', $(this).parents('.file-preview-frame').find('.file-preview-image').attr('src'));

    $('#titleimagepreview').html($(this).parents('.file-preview-frame').find('.file-caption-info').html());
    $('#imagemodal').modal('show');
});
var angle = 0;
$('.turn-image').click(function () {
    angle = (angle + 90) % 360;
    $('#imagepreview').attr('class', "rotate" + angle);
});
$('body').delegate('.upload-images','change', function() {
    $this=$(this);
    var file_data = [];
    var form_data = new FormData();
    var $input = $(this).parents('.div-image').find('.image_data');
    var images = $(this).parents('.div-image').find('.image_data').val();
    if(images === ''){
        images=[];
    }else{
        images = images.split(',');
    }
    for (var i = 0; i < $(this)[0].files.length; i++) {
        form_data.append('file[]', $(this).prop('files')[i]);
    }
    $.ajax({
        url: '/api/uploadFile',
        method: 'POST',
        data: form_data,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function(response){
        if(response.success == true){
            console.log(response.image.length);
                for(var i=0;i < response.image.length;i++ ){
                if (response.type[i] === 1) {
                    $this.parents('.div-image').find('.file-drop-zone').append('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                        '<div class="kv-file-content">' +
                        '<img src="/' + response.image[i] + '" class="file-preview-image kv-preview-data" title="' + response.name[i] + '" alt="' + response.name[i] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                        '</div>' +
                        '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + response.name[i] + '">' +
                        '<div class="file-caption-info">' + response.name[i] + '</div>' +
                        '<div class="file-size-info"></div>' +
                        '</div>' +
                        '<div class="file-actions">' +
                        '<div class="file-footer-buttons">' +
                        '<button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button>' +
                        '<button type="button" class="kv-file-zoom btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-zoomin3"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                } else {
                    $this.parents('.div-image').find('.file-drop-zone').append('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                        '<div class="kv-file-content">' +
                        '<img src="/img/file-icon.png" data-link="'+response.image[i]+'" class="not-image file-preview-image kv-preview-data" title="' + response.name[i] + '" alt="' + response.name[i] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                        '</div>' +
                        '<div class="file-thumbnail-footer">' +
                        '<div class="file-footer-caption" title="' + response.name[i] + '">' +
                        '<div class="file-caption-info">' + response.name[i] + '</div>' +
                        '<div class="file-size-info"></div>' +
                        '</div>' +
                        '<div class="file-actions">' +
                        '<div class="file-footer-buttons">' +
                        '<button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button>' +
                        '<a href="/file/'+response.name[i]+'" target="_blank" class="btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-file-download"></i></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
                images.push(response.image[i]);
                var res = images.join(',');
                $input.val(res);
            }
        }else{
                alert('File upload không hợp lệ');
            }
    }
    });


});
if ($('.upload-image').length) {
    $('.upload-image').each(function () {
        var images = $(this).parents('.div-image').find('.image_data').val();
        console.log(images);
        if (images === '') {
        } else {
            images = images.split(',');
            for (i = 0; i < images.length; i++) {
                var name = images[i];
                name = name.split('/');
                $(this).parents('.div-image').find('.file-drop-zone').append('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                    '<div class="kv-file-content">' +
                    '<img src="/' + images[i] + '" class="file-preview-image kv-preview-data" title="' + name[1] + '" alt="' + name[1] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                    '</div>' +
                    '<div class="file-thumbnail-footer">' +
                    '<div class="file-footer-caption" title="' + name[1] + '">' +
                    '<div class="file-caption-info">' + name[1] + '</div>' +
                    '<div class="file-size-info"></div>' +
                    '</div>' +
                    '<div class="file-actions">' +
                    '<div class="file-footer-buttons">' +
                    '<button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button>' +
                    '<button type="button" class="kv-file-zoom btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-zoomin3"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
            }
        }
    });

}
;
$('body').delegate('.upload-image', 'change', function () {
    var file_data = $(this).prop('files')[0];
    $this = $(this);
    var form_data = new FormData();
    var $input = $(this).parents('.div-image').find('.image_data');
    form_data.append('file', file_data);
    $.ajax({
        url: '/api/uploadFile',
        method: 'POST',
        data: form_data,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            if (response.success == true) {
                $input.val(response.image);
                $this.parents('.div-image').find('.file-drop-zone').html('<div class="file-preview-frame krajee-default  file-preview-initial file-sortable kv-preview-thumb">' +
                    '<div class="kv-file-content">' +
                    '<img src="/' + response.image + '" class="file-preview-image kv-preview-data" title="' + response.name + '" alt="' + response.name + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">' +
                    '</div>' +
                    '<div class="file-thumbnail-footer">' +
                    '<div class="file-footer-caption" title="' + response.name + '">' +
                    '<div class="file-caption-info">' + response.name + '</div>' +
                    '<div class="file-size-info"></div>' +
                    '</div>' +
                    '<div class="file-actions">' +
                    '<div class="file-footer-buttons">' +
                    '<button type="button" class="kv-file-remove btn btn-link btn-icon btn-xs" title="Remove file" data-url="" data-key="1"><i class="icon-trash"></i></button>' +
                    '<button type="button" class="kv-file-zoom btn btn-link btn-xs btn-icon" title="View Details"><i class="icon-zoomin3"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                $input.val(response.image);
            } else {
                alert('File upload không hợp lệ');
            }

        }
    });
});
$('body').delegate('.kv-file-remove,.fileinput-remove', 'click', function () {
    if ($(this).parents('.file-preview-frame').find('.file-preview-image').hasClass('not-image')) {
        //do something
        var image = $(this).parents('.file-preview-frame').find('.file-preview-image').data('link');
    } else {
        var image = $(this).parents('.file-preview-frame').find('.file-preview-image').attr("src");
    }
    $.ajax({
        url: '/api/delete_image',
        method: 'POST',
        data: {link: image.substring(1)},
        success: function (response) {
            if (response.success == true) {
            }
        }
    });
    var $input = $(this).parents('.div-image').find('.image_data');
    var images = $(this).parents('.div-image').find('.image_data').val();
    images = images.split(',');
    var index = images.indexOf(image);
    var image_conf = image.slice(1);
    var posi_image = jQuery.inArray(image_conf,images);
    if (index <= 0) {
        if (posi_image !== -1) {
            images.splice(posi_image, 1);
        }else {
            images.splice(index, 1);
        }
    }
    var res = images.join(',');
    $input.val(res);
    $(this).parents('.file-preview-frame').remove();
});


