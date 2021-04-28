/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('.business_plan').DataTable({
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                        i : 0;
            };

            // Total over all pages
            total = api
                    .column(5)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

            // Total over this page
            pageTotal = api
                    .column(5, {page: 'current'})
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

            // Update footer
            $(api.column(5).footer()).html(
                    pageTotal.toLocaleString()
                    );
            // Total over all pages
            total = api
                .column(6)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(6, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(6).footer()).html(
                pageTotal.toLocaleString()
            );
            // Total over all pages
            total = api
                .column(8)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(8, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(8).footer()).html(
                pageTotal.toLocaleString()
            );

        }
    });
});
// Initialize chart
var bars_stacked = echarts.init(document.getElementById('bars_stacked'));
var bars_stacked1 = echarts.init(document.getElementById('bars_stacked1'));
var colors = [
    "blue",
    "red",
    "yellow",
    "green",
    "purple"
];

function popRandomColor() {
    var rand = Math.random();
    var color = colors[Math.floor(rand * colors.length)];
    colors.splice(Math.floor(rand * colors.length), 1);
    return color;
}

//
// Chart config
//
$('#user_id, #supplier_id').change(function () {
    var series_arr = [];
    $.ajax({
        url: '/api/getDataChart',
        method: 'get',
        dataType: 'json',
        data: {user_id: $('#user_id').val(), supplier_id: $('#supplier_id').val()},
        success: function (resp) {
            $.each(resp.type_arr, function (key, value) {
                var s1 = {
                    name: key,
                    type: 'bar',
                    stack: 'Total',
                    barWidth: 36,
                    itemStyle: {
                        normal: {
                            color: popRandomColor(),
                            label: {
                                show: true,
                                position: 'insideRight',
                                padding: [0, 10],
                                fontSize: 12
                            }
                        }
                    },
                    data: value
                };
                series_arr.push(s1);
            });


            // Options
            bars_stacked.setOption({

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
                    right: 30,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: resp.category_arr,
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
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,0,0,0.025)'
                        }
                    }
                },

                // Horizontal axis
                xAxis: [{
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
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dashed'
                            }
                        }
                    }],

                // Vertical axis
                yAxis: [{
                        type: 'category',
                        data: resp.customer_arr,
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
                                color: ['#eee']
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.015)']
                            }
                        }
                    }],

                // Add series
                series: series_arr,
            });
        }
    });
var series_arr1 = [];
    $.ajax({
        url: '/api/getDataChart2',
        method: 'get',
        dataType: 'json',
        data: {user_id: $('#user_id').val(), supplier_id: $('#supplier_id').val()},
        success: function (resp) {
            $.each(resp.type_arr, function (key, value) {
                var s1 = {
                    name: key,
                    type: 'bar',
                    stack: 'Total',
                    barWidth: 36,
                    itemStyle: {
                        normal: {
                            color: popRandomColor(),
                            label: {
                                show: true,
                                position: 'insideRight',
                                padding: [0, 10],
                                fontSize: 12
                            }
                        }
                    },
                    data: value
                };
                series_arr1.push(s1);
            });


            // Options
            bars_stacked1.setOption({

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
                    right: 30,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: resp.category_arr,
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
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,0,0,0.025)'
                        }
                    }
                },

                // Horizontal axis
                xAxis: [{
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
                            show: true,
                            lineStyle: {
                                color: '#eee',
                                type: 'dashed'
                            }
                        }
                    }],

                // Vertical axis
                yAxis: [{
                        type: 'category',
                        data: resp.customer_arr,
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
                                color: ['#eee']
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.015)']
                            }
                        }
                    }],

                // Add series
                series: series_arr1,
            });
        }
    })


})
