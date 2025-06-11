import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidad</Text>
      <Text style={styles.content}>
        En esta aplicación, respetamos y protegemos tu privacidad. A continuación, te explicamos cómo recopilamos, usamos y protegemos tu información personal.
        {'\n\n'}
        Responsable del tratamiento de sus datos personales:
        {'\n\n'}
Silvana Meneses (en adelante "la Responsable"), con domicilio para oír y recibir notificaciones en [Dirección Física o Electrónica], es responsable del tratamiento de sus datos personales en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y las directrices de la App Store de Apple.
{'\n\n'}
Datos personales que se recaban:
{'\n\n'}
Al utilizar la aplicación de reservaciones del gimnasio, recabamos los siguientes datos personales:
{'\n\n'}
Nombre completo
{'\n'}
Correo electrónico
{'\n'}
Número telefónico
{'\n'}
Información de reservaciones (fechas y horarios)
{'\n\n'}

Finalidades del tratamiento de los datos personales:  {'\n\n'}



Gestionar y confirmar sus reservaciones en el gimnasio.
{'\n'}
Enviar notificaciones relacionadas con sus citas o cambios en los servicios.
{'\n'}
Brindar soporte técnico y atención al cliente.
{'\n'}
Emitir facturas en caso de ser requerido.
{'\n'}
Mejorar la experiencia del usuario dentro de la aplicación.
{'\n'}
Cumplir con las obligaciones legales aplicables.
{'\n\n'}
Transferencias de datos personales:
{'\n\n'}
No compartimos, vendemos ni transferimos sus datos personales a terceros sin su consentimiento, salvo las excepciones previstas en la LFPDPPP o cuando sea necesario para cumplir con las obligaciones legales.
{'\n\n'}
Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición):  {'\n\n'}

Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, tiene derecho a solicitar la corrección de su información personal en caso de estar desactualizada, ser inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstos en la normativa (Cancelación); así como a oponerse al uso de sus datos personales para fines específicos (Oposición).
{'\n\n'}
Para ejercer cualquiera de sus derechos ARCO, por favor envíe una solicitud a la siguiente dirección de correo electrónico: admin@theride.mx. La solicitud deberá contener al menos la siguiente información:
{'\n\n'}
Nombre completo y medios de contacto.
{'\n'}
Documentos que acrediten su identidad o, en su caso, la representación legal.
{'\n'}
Descripción clara y precisa de los datos personales respecto de los cuales busca ejercer alguno de los derechos.
{'\n'}
Cualquier otro elemento que facilite la localización de los datos personales.
{'\n'}
Daremos respuesta a su solicitud en un plazo no mayor a 20 días hábiles, conforme a la normativa aplicable.
{'\n\n'}
Medidas de seguridad:  {'\n\n'}

Adoptamos las medidas de seguridad administrativas, técnicas y físicas necesarias para proteger sus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
{'\n'}
Uso de tecnologías de rastreo:
{'\n'}
Nuestra aplicación puede utilizar tecnologías de rastreo como cookies o identificadores similares para mejorar la experiencia del usuario. Usted puede deshabilitar estas tecnologías desde la configuración de su dispositivo o siguiendo las instrucciones proporcionadas por Apple.
{'\n'}
Cambios en el aviso de privacidad:{'\n\n'}

Nos reservamos el derecho de realizar modificaciones o actualizaciones a este aviso de privacidad en cualquier momento, para atender novedades legislativas, políticas internas o nuevos requerimientos para la prestación u oferta de nuestros servicios. Notificaremos dichos cambios a través de la propia aplicación o por correo electrónico.
{'\n\n'}
Contacto:  {'\n\n'}

Si tiene alguna duda sobre este aviso de privacidad o sobre el tratamiento de sus datos personales, puede contactarnos en:{'\n\n'}
{'\n'}
Correo electrónico: admin@theride.mx
{'\n'}
Fecha de última actualización: 13 de Marzo del 2025
{'\n'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PrivacyPolicyScreen;
