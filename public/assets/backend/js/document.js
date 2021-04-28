$('body').delegate('#select-first', 'change', function(){
    $('.select-more select').val($(this).val()).find("option[value=" + $(this).val() +"]").attr('selected', true);
    $('.position-select select').select2('destroy');
    $('.position-select').html($('.select-more').html());
    $('.position-select select').select2();

})
