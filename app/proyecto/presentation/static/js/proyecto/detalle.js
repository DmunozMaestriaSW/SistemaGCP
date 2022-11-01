$(document).ready(function () {
    var next = "?next=" + document.location.pathname;
    //$('#loader').show();

    var oTableGrupos = $('#dt-casos').DataTable(options_datatable_grupos());

    $('#filtro_caso_activo').change(function(){
        oTableGrupos.draw();
    });

    $(document).on('click', '.item-grupo-activar', function(e){

        var div = $(this).parents('div.dropdown-grupo');
        var activo = $(div).data('activo');
        var mensaje = activo ? 'desactivar' : 'activar';

        alert_confirm('Cambiar de estado', '¿Estas seguro de ' + mensaje + ' el grupo de trabajo?', 'warning' ).then((result) => {
            if (result.isConfirmed) {

                var id = $(div).data('id');
                var url_activar_grupo = $('#dt-casos').data('url_activar_grupo');
                var url_desactivar_grupo = $('#dt-casos').data('url_desactivar_grupo');
                var url = activo ? url_desactivar_grupo : url_activar_grupo;
                $.get(url + id, {}, function(res){
                    if (res.status == 'error'){
                        mensaje_error(res.message);
                    }else{
                        mensaje_exito(res.message);
                    }
                    oTableGrupos.draw(false); //false para no cambiar de página
                });

            }
        });
    });

});

/**
* Datatable miembros
*/
function options_datatable_grupos(){
    var url_grupos = $('#dt-casos').data('url');
    var url_detalle = $('#dt-casos').data('url_detalle');
    var espacio_id = $('#dt-casos').data('id');

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
                d.espacio_id = espacio_id;
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
            {"data": "nombre"},
            {"data": "descripcion"},
            {"data": "id"},
        ],
        columnDefs: [
            {
                orderable: true,
                targets: [0,1,2],
                class: '',
            },
            {targets: [0], render: function (data, type, row) {
                var url =  url_detalle + row.id;
                return $.validator.format('<a href="{0}"><i class="fas fa-users"></i> {1}</a>', url, data);
                return data;
            }},
            {targets: [1], render: function (data, type, row) {
                return data;
            }},

            {targets: [5], 'class': "text-right", render: function (data, type, row) {
                var html =
                '<div class="dropdown show dropdown-grupo" data-id="'+ row.id +'" data-activo="' + row.activo + '"> \
                  <a class="btn btn-link btn-xs dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
                    <i class="fas fa-ellipsis-h"></i> \
                  </a> \
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink"> \
                    <a class="dropdown-item item-grupo-activar" href="javascript:void(0);">' + (row.activo ? 'Desactivar' : 'Activar') + '</a> \
                  </div> \
                </div>';
                return html;
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