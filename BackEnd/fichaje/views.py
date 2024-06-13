from django.shortcuts import render
from django.contrib.auth.models import User
from administracion.models import Empleado
from django.utils import timezone
from .models import Registro
from django.http import JsonResponse
from django.http import HttpResponse
from datetime import datetime, timedelta
import pdfkit

# Create your views here.
def inicio(request):

    last_register = Registro.objects.filter(empleado__id=1).latest('inicio') if Registro.objects.filter(empleado__id=1).exists() else None

    return render(request, 'fichaje/inicio.html', {'last_register': last_register})

def iniciarJornada(request):
    if request.method == 'POST':

        employee_id = request.POST.get('employee_id')

        employee = User.objects.get(pk=employee_id)

        new_registro = Registro.objects.create(
            empleado=employee,
            fecha=timezone.now().date(),
            inicio=timezone.now(),
        )

        new_registro.save()

        registro = {
            'user': {
                'id': new_registro.empleado.id, 
                'username': new_registro.empleado.username,
            },
            'fecha': new_registro.fecha,
            'inicio': new_registro.inicio,
        }
   
        return JsonResponse(registro, safe=False)
    
    return JsonResponse('Error. Se esperaba una solicitud POST', safe=False)

def finalizarJornada(request):
    if request.method == 'POST':
        employee_id = request.POST.get('employee_id')
        employee = User.objects.get(pk=employee_id)
        try:
            # Get the most recent registro without a fin time
            registro = Registro.objects.filter(empleado=employee, fin__isnull=True).latest('inicio')
            registro.fin = timezone.now()
            registro.save()

            response = {
                'user': {
                    'id': registro.empleado.id,
                    'username': registro.empleado.username,
                },
                'fecha': registro.fecha,
                'inicio': registro.inicio,
                'fin': registro.fin,
            }

            return JsonResponse(response, safe=False)
        except Registro.DoesNotExist:
            return JsonResponse('Error. No hay un registro de jornada en curso.', safe=False)

    return JsonResponse('Error. Se esperaba una solicitud POST', safe=False)

def jornadas(request, id_employee=None):

    if id_employee:
        registers = Registro.objects.filter(empleado__id=id_employee).order_by('inicio').reverse()
        return render(request, 'fichaje/registros.html', {'registers': registers, 'id_employee': id_employee})

    else:
        registers = Registro.objects.all().order_by('inicio').reverse()
        return render(request, 'fichaje/registros.html', {'registers': registers})

def generar_pdf(request, id_employee=None):
    if id_employee:
        employee = Empleado.objects.get(user__id=id_employee)
    else:
        employee = Empleado.objects.all()

    # HTML inicial del documento
    contenido_html = """<html>
    <head>
        <style>
            th, td {
                border: 1px solid black;
                padding: 1px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <b><u><h4 style="text-align: center;">LISTADO DE RESUMEN MENSUAL DEL REGISTRO DE JORNADA (DETALLE HORARIO)</h4></u></b>
        <p>En cumplimiento de la obligación establecida en el Art. 12.5 h) del Estatuto de los Trabajadores</p>

        <table  style="border-collapse: collapse; width:100%">
            <thead> """

    empresa_info = """
        <td colspan="3" style='text-align: left; background-color: #ababab; color: black;'>
        <b>EMPRESA: </b> IES ILIBERIS - DAW CFGS <br>
        <b>CIF/NIF: </b> B11934221 <br>
        <b>CENTRO DE TRABAJO: </b> ILIBERP SOLUTIONS - GRANADA <br>
        </td>
        """

    if id_employee:
        trabajador_info = """
                <td colspan="7" style='text-align: left; background-color: #ababab; color: black;'>
                    <b>TRABAJADOR: </b>{name} <br>
                    <b>DNI/NIE: </b>{dni} <br>
                </td>
                """.format(
            name=employee.user.username,
            dni=employee.dni,
        )
    else:
        trabajador_info = """
                <td colspan="7" style='text-align: left; background-color: #ababab; color: black;'>
                    <b>TRABAJADOR: </b>Todos<br>
                </td>
                """

    contenido_html += (
        "<tr>"
        + empresa_info
        + trabajador_info
        + "</tr>"
    )

    meses_espanol = {
        1: "Enero",
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre",
    }

    nombre_mes = meses_espanol[datetime.now().month]

    contenido_html += (
        "</tr>"
        "<tr>"
        "<td colspan='12' style='text-align: left; background-color: #ababab; color: black;'><b> Nº. HORAS SEGÚN CONTRATO: 8 horas </b></td>"
        "</tr>"
        "<tr>"
        "<td colspan='12' style='text-align: left; background-color: #ababab; color: black;'>"
        "<b> MES: {} </b>"
        "</td>"
        "</tr>"
    ).format(nombre_mes)

    contenido_html += """ <tr>
            <th><b> DIA </b></th>
            <th><b> HORA ENTRADA </b></th>
            <th><b> HORA SALIDA </b></th>
            <th><b> HORAS TOTALES DIA </b></th>
        </tr>
    </thead>
    <tbody>"""

    # Variables
    total_horas_mes = timedelta()
    total_horas_extras_mes = 0
    total_trabajado_mes_horas = 0
    total_trabajado_mes_minutos = 0
    total_horas_extras_enteras = 0
    total_horas_extras_minutos = 0
    horas_trabajadas_dia = 0
    horas = 0
    minutos = 0
    registro_despues = None
    registro_antes = None

    # Obtener el primer y último día del mes
    fecha_actual = timezone.now()
    primer_dia_del_mes = fecha_actual.replace(day=1)
    ultimo_dia_del_mes = (primer_dia_del_mes.replace(month=primer_dia_del_mes.month % 12 + 1, day=1) - timedelta(days=1)).date()

    # Bucle para cada día del mes
    for i in range(primer_dia_del_mes.day - 1, ultimo_dia_del_mes.day):
        fecha_actual = primer_dia_del_mes + timedelta(days=i)
        registros_dia = Registro.objects.filter(empleado__id=id_employee, fecha=fecha_actual.date())

        horas_trabajadas_dia = timedelta()

        # Calculo de horas trabajadas del dia
        for registro in registros_dia:
            # Sumar 2 horas a inicio y fin
            inicio_ajustado = registro.inicio + timedelta(hours=2)
            fin_ajustado = registro.fin + timedelta(hours=2)
            
            horas_trabajadas_registro = fin_ajustado - inicio_ajustado
            if horas_trabajadas_registro.total_seconds() < 0:
                # Manejar el caso de tiempo negativo
                horas_trabajadas_registro = timedelta(0)  # O manejarlo de otra manera según el requerimiento

            horas_trabajadas_dia += horas_trabajadas_registro

            contenido_html += (
                "<tr>"
                "<td>{}</td>".format(fecha_actual.day) +
                "<td>{:02d}:{:02d}</td>".format(inicio_ajustado.hour, inicio_ajustado.minute) +
                "<td>{:02d}:{:02d}</td>".format(fin_ajustado.hour, fin_ajustado.minute) +
                "<td>{:.2f}</td>".format(horas_trabajadas_registro.total_seconds() / 3600) +
                "</tr>"
            )

            total_horas_mes += horas_trabajadas_registro

        # Si no hay registros para este día, agregar una fila vacía
        if not registros_dia:
            contenido_html += (
                "<tr>"
                "<td>{}</td>".format(fecha_actual.day) +
                "<td></td>"
                "<td></td>"
                "<td></td>"
                "</tr>"
            )

    contenido_html += """
                </tbody>
                <tfoot style="background-color: #9c9c9c;">
                    <tr>
                        <td>Total Horas</td>
                        <td></td>
                        <td></td>
                        <td>{:.2f}</td>
                    </tr>
                </tfoot>
            </table>
        </body>
    </html>
    """.format(total_horas_mes.total_seconds() / 3600)


    # Configuración del pdfkit y del wkhtmltopdf

    path_wkthmltopdf = r'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'
    config = pdfkit.configuration(wkhtmltopdf=path_wkthmltopdf)

    opciones_pdf = {
        'page-size': 'A4',
        'encoding': 'UTF-8',
        'enable-local-file-access' : "",
    }

    pdf = pdfkit.from_string(contenido_html, False, options=opciones_pdf, configuration=config)

    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="informe.pdf"'

    return response
