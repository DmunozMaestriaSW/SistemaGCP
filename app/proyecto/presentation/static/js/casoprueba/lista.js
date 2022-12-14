$(document).ready(function () {
    var next = "?next=" + document.location.pathname;
    //$('#loader').show();

    var oTableCasos = $('#dt-casos').DataTable(options_datatable_casos());


    $('#filtro_caso_activo').change(function(){
        oTableCasos.draw();
    });
});


/**
* Datatable casos de prueba
*/
function options_datatable_casos(){
    var url_grupos = $('#dt-casos').data('url');
    var url_detalle = $('#dt-casos').data('url_detalle');
    var proyecto_id = $('#dt-casos').data('id');

    return {
        "order": [[0, "desc"]],
        "responsive": true,
        "autoWidth": false,
        "destroy": true,
        "deferRender": true,
        "language": {url: getUrl('static/plugins/datatables/es.txt')},
        "processing": true,
        "serverSide": true,
        ajax: {
            url: url_grupos,
            type: 'POST',
            data: function ( d ) {
                d.proyecto_id = proyecto_id;
                d.filtro_activo = $('#filtro_caso_activo').val();
            },
            //dataSrc: "",
            cache: false,
            error: function(err){
                if (err.responseJSON && err.responseJSON.message){
                    var msg = err.responseJSON.message;
                    alert(msg);
                }
                console.log(err);
                if (err.status == 401){
                    window.location = window.location;
                }
            }
        },
        columns: [
            {"data": "codigo"},
            {"data": "nombre"},
            {"data": "tipo"},
            {"data": "variedad"},
            {"data": "prioridad"},
            {'data': "estado"},
            {'data': 'ciclos'},
            {"data": "id"},
        ],
        columnDefs: [
            {
                orderable: true,
                targets: [0,1,2],
                class: '',
            },
            {orderable: false,  targets: [6]},
            {targets: [0], render: function (data, type, row) {
                return data;
            }},
            {targets: [1], render: function (data, type, row) {
                return data;
            }},
            {targets: [2], render: function (data, type, row) {
                return data;
            }},
            {targets: [3], render: function (data, type, row) {
                return data;
            }},
            {targets: [4], render: function (data, type, row) {
                return data;
            }},
            {targets: [5], render: function (data, type, row) {
                var css = 'badge-secondary';
                if (data === 'Aprobada'){
                    css = 'badge-success';
                }else if(data === 'Fallo') {
                    css = 'badge-danger';
                }else if(data === 'Bloqueada') {
                    css = 'badge-warning';
                }
                return $.validator.format('<span class="badge {0}">{1}</span>', css, data, row.ciclos);
            }},
            {targets: [6], render: function (data, type, row) {
                return data;
            }},
            {targets: [7], 'class': "text-right", render: function (data, type, row) {
                /*var html =
                '<div class="dropdown show dropdown-grupo" data-id="'+ row.id +'" data-activo="' + row.activo + '"> \
                  <a class="btn btn-link btn-xs dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
                    <i class="fas fa-ellipsis-h"></i> \
                  </a> \
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink"> \
                    <a class="dropdown-item item-grupo-activar" href="javascript:void(0);">' + (row.activo ? 'Desactivar' : 'Activar') + '</a> \
                  </div> \
                </div>';
                return html;*/
                var url =  url_detalle + row.id;
                return $.validator.format('<a href="{0}"><i class="fas fa-edit"></i> {1}</a>', url, 'Editar');

            }}

        ],
        initComplete: function (settings, json) {
        },
        "stateSave": true,
        fnStateSaveParams: function(oSettings, oData){
            oData.filtro_activo = $('#filtro_caso_activo').val();
        },
        fnStateLoadParams: function(oSettings, oData){
            $('#filtro_caso_activo').val(oData.filtro_activo);
        }
    };
};