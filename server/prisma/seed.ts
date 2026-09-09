import { prisma } from "../src/config/prisma.js";

const learningPathId = "6d7c211a-6c5c-4f94-ad68-93c24634b235";

const courseId = "ebe1a74c-dadb-4ae1-98c5-3be147f61e2d";

const moduleId = "f87bc997-c7ab-4a6f-88ba-0685fa8f31d7";

const lessonOneId = "5e0dbef4-c717-4c01-8230-cbbd21a66a2d";

const lessonTwoId = "e176edbb-e4e8-49f5-b96f-5914a269047f";

const lessonThreeId = "9a4ea79b-5118-4d2b-b06c-ce5feff14774";

const quizId = "5ad36250-6f1d-4ebd-9eeb-7720daf7c9eb";

const questionId = "c1b4068c-135b-4d6b-bc37-731f1bd807fb";

const main = async () => {
  console.log("Iniciando seed de Cyber Platform...");

  await prisma.learningPath.upsert({
    where: {
      id: learningPathId,
    },
    update: {
      title: "Ciberseguridad desde Cero",
      slug: "ciberseguridad-desde-cero",
      description:
        "Ruta de aprendizaje progresiva para adquirir fundamentos de redes, sistemas, análisis de tráfico, seguridad defensiva y hacking ético.",
      status: "PUBLISHED",
      order: 1,
    },
    create: {
      id: learningPathId,
      title: "Ciberseguridad desde Cero",
      slug: "ciberseguridad-desde-cero",
      description:
        "Ruta de aprendizaje progresiva para adquirir fundamentos de redes, sistemas, análisis de tráfico, seguridad defensiva y hacking ético.",
      status: "PUBLISHED",
      order: 1,
    },
  });

  await prisma.course.upsert({
    where: {
      id: courseId,
    },
    update: {
      pathId: learningPathId,
      title: "Fundamentos de Redes",
      slug: "fundamentos-de-redes",
      description:
        "Introducción a los principios esenciales de redes y comunicación.",
      level: "BEGINNER",
      status: "PUBLISHED",
      order: 1,
    },
    create: {
      id: courseId,
      pathId: learningPathId,
      title: "Fundamentos de Redes",
      slug: "fundamentos-de-redes",
      description:
        "Introducción a los principios esenciales de redes y comunicación.",
      level: "BEGINNER",
      status: "PUBLISHED",
      order: 1,
    },
  });

  await prisma.module.upsert({
    where: {
      id: moduleId,
    },
    update: {
      courseId,
      title: "Introducción a las Redes",
      description: "Bases de comunicación, modelos y protocolos fundamentales.",
      status: "PUBLISHED",
      order: 1,
    },
    create: {
      id: moduleId,
      courseId,
      title: "Introducción a las Redes",
      description: "Bases de comunicación, modelos y protocolos fundamentales.",
      status: "PUBLISHED",
      order: 1,
    },
  });

  await prisma.lesson.upsert({
    where: {
      id: lessonOneId,
    },
    update: {
      moduleId,
      title: "¿Qué es una red?",
      slug: "que-es-una-red",
      description:
        "Conceptos básicos para comprender qué es una red informática y para qué se utiliza.",
      status: "PUBLISHED",
      order: 1,
    },
    create: {
      id: lessonOneId,
      moduleId,
      title: "¿Qué es una red?",
      slug: "que-es-una-red",
      description:
        "Conceptos básicos para comprender qué es una red informática y para qué se utiliza.",
      status: "PUBLISHED",
      order: 1,
    },
  });

  await prisma.lesson.upsert({
    where: {
      id: lessonTwoId,
    },
    update: {
      moduleId,
      title: "Modelo OSI y TCP/IP",
      slug: "modelo-osi-y-tcp-ip",
      description:
        "Introducción a los modelos OSI y TCP/IP, sus capas y su importancia para comprender la comunicación entre dispositivos en una red.",
      status: "PUBLISHED",
      order: 2,
    },
    create: {
      id: lessonTwoId,
      moduleId,
      title: "Modelo OSI y TCP/IP",
      slug: "modelo-osi-y-tcp-ip",
      description:
        "Introducción a los modelos OSI y TCP/IP, sus capas y su importancia para comprender la comunicación entre dispositivos en una red.",
      status: "PUBLISHED",
      order: 2,
    },
  });

  await prisma.lesson.upsert({
    where: {
      id: lessonThreeId,
    },
    update: {
      moduleId,
      title: "DNS, DHCP y ARP",
      slug: "dns-dhcp-y-arp",
      description:
        "Introducción a tres servicios y protocolos fundamentales de red: resolución de nombres con DNS, configuración automática mediante DHCP y resolución de direcciones con ARP.",
      status: "PUBLISHED",
      order: 3,
    },
    create: {
      id: lessonThreeId,
      moduleId,
      title: "DNS, DHCP y ARP",
      slug: "dns-dhcp-y-arp",
      description:
        "Introducción a tres servicios y protocolos fundamentales de red: resolución de nombres con DNS, configuración automática mediante DHCP y resolución de direcciones con ARP.",
      status: "PUBLISHED",
      order: 3,
    },
  });

  const lessonBlocks = [
    {
      id: "87a65270-c929-406d-92df-55a58e4f7dca",
      lessonId: lessonOneId,
      type: "TEXT" as const,
      order: 1,
      text: "Una red conecta dispositivos para permitir la comunicación, el intercambio de información y el acceso compartido a recursos.",
    },

    {
      id: "13bb32b3-fbc3-4bc5-846a-f7ec73d8ef51",
      lessonId: lessonTwoId,
      type: "HEADING" as const,
      order: 1,
      text: "Modelo OSI y TCP/IP",
    },
    {
      id: "6d4d9878-b7e7-4fa1-bda7-fc0766671327",
      lessonId: lessonTwoId,
      type: "TEXT" as const,
      order: 2,
      text: "Para comprender cómo se comunican los dispositivos en una red, se utilizan modelos que dividen el proceso de comunicación en diferentes capas. Los dos modelos más importantes son OSI y TCP/IP. Cada capa cumple una función específica y trabaja junto con las demás para permitir que la información viaje desde un dispositivo de origen hasta un dispositivo de destino.",
    },
    {
      id: "ab061196-78fe-4082-9457-0a3cdd9c6ad7",
      lessonId: lessonTwoId,
      type: "HEADING" as const,
      order: 3,
      text: "El modelo OSI",
    },
    {
      id: "df9b986a-47eb-4c26-a3bb-6ea861b2418e",
      lessonId: lessonTwoId,
      type: "TEXT" as const,
      order: 4,
      text: "El modelo OSI organiza la comunicación de red en siete capas: Física, Enlace de datos, Red, Transporte, Sesión, Presentación y Aplicación. Cada capa cumple una función específica y se relaciona con las capas vecinas. Este modelo permite entender mejor cómo viajan los datos y facilita el diagnóstico de problemas de red.",
    },
    {
      id: "b6c5cc82-9d5e-456c-b27b-0fee870d6f40",
      lessonId: lessonTwoId,
      type: "HEADING" as const,
      order: 5,
      text: "El modelo TCP/IP",
    },
    {
      id: "b901863e-c734-47d8-a024-999ca948561f",
      lessonId: lessonTwoId,
      type: "TEXT" as const,
      order: 6,
      text: "El modelo TCP/IP es el que se utiliza de forma práctica en Internet y organiza la comunicación en cuatro capas principales: Acceso a la red, Internet, Transporte y Aplicación. La capa de Acceso a la red se ocupa del envío de datos por el medio físico; la capa de Internet utiliza el protocolo IP para direccionar y enrutar paquetes; la capa de Transporte emplea protocolos como TCP y UDP para la comunicación entre aplicaciones; y la capa de Aplicación reúne protocolos como HTTP, DNS, SMTP y FTP. Aunque tiene menos capas que el modelo OSI, ambos describen funciones similares y se complementan para estudiar el funcionamiento de las redes.",
    },
    {
      id: "fceb31ed-d010-4188-b0f9-bd88fc83f3a5",
      lessonId: lessonTwoId,
      type: "HEADING" as const,
      order: 7,
      text: "Comparación entre OSI y TCP/IP",
    },
    {
      id: "a5d21034-926b-48b7-a2eb-cc8d80fc27da",
      lessonId: lessonTwoId,
      type: "TEXT" as const,
      order: 8,
      text: "El modelo OSI posee siete capas y se utiliza principalmente como referencia para comprender y analizar cómo funciona una red. TCP/IP utiliza cuatro capas y representa de manera más directa el funcionamiento de las redes actuales e Internet. En TCP/IP, las capas de Aplicación, Presentación y Sesión del modelo OSI se agrupan en la capa de Aplicación. Las capas Física y Enlace de datos se agrupan en Acceso a la red. Las capas de Red y Transporte tienen una correspondencia más directa con las capas Internet y Transporte de TCP/IP.",
    },
    {
      id: "52887274-f6b2-4ee5-aea4-5c38d397c7a4",
      lessonId: lessonTwoId,
      type: "HEADING" as const,
      order: 9,
      text: "Ejemplo práctico: abrir una página web",
    },
    {
      id: "88f46b05-d216-4c60-800d-c913d6a70cd6",
      lessonId: lessonTwoId,
      type: "TEXT" as const,
      order: 10,
      text: "Cuando una persona abre una página web, la capa de Aplicación genera una solicitud HTTP o HTTPS. La capa de Transporte utiliza TCP para dividir y controlar el envío de la información. La capa de Internet utiliza IP para identificar el origen y el destino de los paquetes. Finalmente, la capa de Acceso a la red transmite los datos por Ethernet o Wi-Fi. En el servidor, el proceso ocurre en sentido inverso hasta que la solicitud llega a la aplicación correspondiente.",
    },

    {
      id: "1a94ecee-5c7c-4258-a9b2-c6399337695c",
      lessonId: lessonThreeId,
      type: "HEADING" as const,
      order: 1,
      text: "DNS, DHCP y ARP",
    },
    {
      id: "f5f10e0a-ba84-44c8-8cfe-94efd523f109",
      lessonId: lessonThreeId,
      type: "TEXT" as const,
      order: 2,
      text: "DNS, DHCP y ARP cumplen funciones esenciales dentro de una red. DNS permite traducir nombres de dominio en direcciones IP, DHCP asigna automáticamente parámetros de configuración de red a los dispositivos y ARP permite relacionar una dirección IP con una dirección MAC dentro de una red local. Comprender estos mecanismos es fundamental para analizar cómo se comunican los equipos y para diagnosticar problemas de conectividad.",
    },
    {
      id: "fd9e44ca-3e44-4911-b0ca-8f384de9ad5c",
      lessonId: lessonThreeId,
      type: "HEADING" as const,
      order: 3,
      text: "DNS: resolución de nombres",
    },
    {
      id: "f8ffce31-febe-4099-8926-9655ea198be7",
      lessonId: lessonThreeId,
      type: "TEXT" as const,
      order: 4,
      text: "DNS, cuyo nombre significa Domain Name System, permite traducir nombres fáciles de recordar, como ejemplo.com, en direcciones IP que pueden ser utilizadas por los equipos de la red. Cuando un usuario intenta acceder a un sitio web, el dispositivo consulta un servidor DNS para obtener la dirección IP asociada al nombre de dominio. Este proceso evita que las personas tengan que memorizar direcciones numéricas y es fundamental para el funcionamiento de Internet.",
    },
    {
      id: "9876c639-31a5-4477-a13e-96ba16c0eccc",
      lessonId: lessonThreeId,
      type: "HEADING" as const,
      order: 5,
      text: "DHCP: configuración automática de red",
    },
    {
      id: "e3fb509d-51bf-4a71-b089-be6815c0741e",
      lessonId: lessonThreeId,
      type: "TEXT" as const,
      order: 6,
      text: "DHCP, cuyo nombre significa Dynamic Host Configuration Protocol, permite asignar automáticamente la configuración de red a los dispositivos. Cuando un equipo se conecta a una red, puede recibir una dirección IP, máscara de subred, puerta de enlace predeterminada y servidores DNS sin necesidad de configurar esos datos manualmente. Esto simplifica la administración y reduce errores de configuración, especialmente en redes con muchos dispositivos.",
    },
    {
      id: "fb377e68-89ae-47eb-9e89-93d26b8b9ffb",
      lessonId: lessonThreeId,
      type: "HEADING" as const,
      order: 7,
      text: "ARP: relación entre direcciones IP y MAC",
    },
    {
      id: "7d103f15-4880-4937-8faf-15c8ab6b39b5",
      lessonId: lessonThreeId,
      type: "TEXT" as const,
      order: 8,
      text: "ARP, cuyo nombre significa Address Resolution Protocol, se utiliza dentro de una red local para relacionar una dirección IP con una dirección MAC. Cuando un dispositivo necesita comunicarse con otro equipo de la misma red y conoce su dirección IP, puede enviar una consulta ARP para descubrir qué dirección MAC corresponde a ese destino. La información obtenida puede almacenarse temporalmente en una tabla ARP para evitar consultas repetidas.",
    },
    {
      id: "7b5f4e6e-4640-4008-bb29-eda13f4d76ca",
      lessonId: lessonThreeId,
      type: "HEADING" as const,
      order: 9,
      text: "Ejemplo práctico: conectarse a una red y abrir un sitio web",
    },
    {
      id: "fc68ed27-99e8-406b-b2fa-107aac442526",
      lessonId: lessonThreeId,
      type: "TEXT" as const,
      order: 10,
      text: "Cuando una computadora se conecta a una red, DHCP puede asignarle automáticamente una dirección IP y otros parámetros de configuración. Luego, si el usuario intenta abrir un sitio web, DNS traduce el nombre del dominio a una dirección IP. Finalmente, si el destino se encuentra dentro de la misma red local o si el equipo necesita comunicarse con su puerta de enlace, ARP permite conocer la dirección MAC correspondiente. De esta manera, DHCP, DNS y ARP participan en distintas etapas de una comunicación de red.",
    },
    {
      id: "bb9b9f5c-f7de-440e-a790-a2c55405330c",
      lessonId: lessonThreeId,
      type: "HEADING" as const,
      order: 11,
      text: "Importancia para la ciberseguridad",
    },
    {
      id: "2301e3f1-4171-49e9-aed4-ae272dea3444",
      lessonId: lessonThreeId,
      type: "TEXT" as const,
      order: 12,
      text: "Estos protocolos también son importantes desde el punto de vista de la ciberseguridad. La manipulación de DNS puede redirigir a los usuarios hacia destinos falsos. Un servidor DHCP no autorizado puede entregar configuraciones incorrectas a los dispositivos de una red. ARP también puede ser manipulado para asociar direcciones IP con direcciones MAC incorrectas y desviar tráfico dentro de una red local. Por este motivo, comprender cómo funcionan estos protocolos ayuda a detectar comportamientos anómalos y aplicar medidas de protección adecuadas.",
    },
  ];

  for (const block of lessonBlocks) {
    await prisma.lessonBlock.upsert({
      where: {
        id: block.id,
      },
      update: {
        lessonId: block.lessonId,
        type: block.type,
        content: {
          text: block.text,
        },
        order: block.order,
      },
      create: {
        id: block.id,
        lessonId: block.lessonId,
        type: block.type,
        content: {
          text: block.text,
        },
        order: block.order,
      },
    });
  }

  await prisma.quiz.upsert({
    where: {
      id: quizId,
    },
    update: {
      moduleId,
      title: "Evaluación inicial de redes",
      description:
        "Evaluación de los conceptos fundamentales del módulo de introducción a las redes.",
      status: "PUBLISHED",
      passingScore: 70,
      version: 2,
      order: 1,
    },
    create: {
      id: quizId,
      moduleId,
      title: "Evaluación inicial de redes",
      description:
        "Evaluación de los conceptos fundamentales del módulo de introducción a las redes.",
      status: "PUBLISHED",
      passingScore: 70,
      version: 2,
      order: 1,
    },
  });

  // Limpieza de UUID antiguos que PostgreSQL aceptaba,
  // pero que z.uuid rechaza por no usar una variante RFC válida.
  await prisma.questionOption.deleteMany({
    where: {
      id: {
        in: [
          "7d4a2c60-71bf-4e94-d155-6f9c1072e001",
        ],
      },
    },
  });

  await prisma.question.deleteMany({
    where: {
      quizId,
      id: {
        in: [
          "6c3f1b59-60ae-4d83-c044-5e8b0f61d001",
          "7d4a2c60-71bf-4e94-d155-6f9c1072e002",
          "8e5b3d71-82c0-4fa5-e266-70ad2183f001",
          "9f6c4e82-93d1-40b6-f377-81be3294a001",
        ],
      },
    },
  });

  await prisma.question.upsert({
    where: {
      id: questionId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuál es la función principal de una red informática?",
      explanation:
        "Una red informática permite que los dispositivos se comuniquen y compartan datos, servicios y recursos.",
      order: 1,
    },
    create: {
      id: questionId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuál es la función principal de una red informática?",
      explanation:
        "Una red informática permite que los dispositivos se comuniquen y compartan datos, servicios y recursos.",
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "8acea807-b8a4-487d-80e2-0ac2cd9e1836",
    },
    update: {
      questionId,
      text: "Permitir que los dispositivos se comuniquen y compartan datos y recursos.",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "8acea807-b8a4-487d-80e2-0ac2cd9e1836",
      questionId,
      text: "Permitir que los dispositivos se comuniquen y compartan datos y recursos.",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "2e0215d6-f3f6-49a9-84fa-99d34d66fcc9",
    },
    update: {
      questionId,
      text: "Permitir únicamente el almacenamiento local de archivos.",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "2e0215d6-f3f6-49a9-84fa-99d34d66fcc9",
      questionId,
      text: "Permitir únicamente el almacenamiento local de archivos.",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e001",
    },
    update: {
      questionId,
      text: "Permitir únicamente que un dispositivo funcione sin conexión a otros equipos.",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e001",
      questionId,
      text: "Permitir únicamente que un dispositivo funcione sin conexión a otros equipos.",
      isCorrect: false,
      order: 3,
    },
  });

  const questionTwoId = "3f0f8f28-3f7b-4a59-bd11-2b5dfd3fa001";

  await prisma.question.upsert({
    where: {
      id: questionTwoId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuántas capas tiene el modelo OSI?",
      explanation:
        "El modelo OSI divide la comunicación de red en siete capas: Física, Enlace de datos, Red, Transporte, Sesión, Presentación y Aplicación.",
      order: 2,
    },
    create: {
      id: questionTwoId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuántas capas tiene el modelo OSI?",
      explanation:
        "El modelo OSI divide la comunicación de red en siete capas: Física, Enlace de datos, Red, Transporte, Sesión, Presentación y Aplicación.",
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "3f0f8f28-3f7b-4a59-bd11-2b5dfd3fa002",
    },
    update: {
      questionId: questionTwoId,
      text: "4 capas",
      isCorrect: false,
      order: 1,
    },
    create: {
      id: "3f0f8f28-3f7b-4a59-bd11-2b5dfd3fa002",
      questionId: questionTwoId,
      text: "4 capas",
      isCorrect: false,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "3f0f8f28-3f7b-4a59-bd11-2b5dfd3fa003",
    },
    update: {
      questionId: questionTwoId,
      text: "7 capas",
      isCorrect: true,
      order: 2,
    },
    create: {
      id: "3f0f8f28-3f7b-4a59-bd11-2b5dfd3fa003",
      questionId: questionTwoId,
      text: "7 capas",
      isCorrect: true,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "3f0f8f28-3f7b-4a59-bd11-2b5dfd3fa004",
    },
    update: {
      questionId: questionTwoId,
      text: "5 capas",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "3f0f8f28-3f7b-4a59-bd11-2b5dfd3fa004",
      questionId: questionTwoId,
      text: "5 capas",
      isCorrect: false,
      order: 3,
    },
  });
  const questionThreeId =
    "4a1f9d37-4e8c-4b61-ae22-3c6efd4fb001";

  await prisma.question.upsert({
    where: {
      id: questionThreeId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuál es la función principal de DNS?",
      explanation:
        "DNS permite traducir nombres de dominio en direcciones IP para que los dispositivos puedan localizar los servicios y equipos correspondientes.",
      order: 3,
    },
    create: {
      id: questionThreeId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuál es la función principal de DNS?",
      explanation:
        "DNS permite traducir nombres de dominio en direcciones IP para que los dispositivos puedan localizar los servicios y equipos correspondientes.",
      order: 3,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "4a1f9d37-4e8c-4b61-ae22-3c6efd4fb002",
    },
    update: {
      questionId: questionThreeId,
      text: "Traducir nombres de dominio en direcciones IP.",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "4a1f9d37-4e8c-4b61-ae22-3c6efd4fb002",
      questionId: questionThreeId,
      text: "Traducir nombres de dominio en direcciones IP.",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "4a1f9d37-4e8c-4b61-ae22-3c6efd4fb003",
    },
    update: {
      questionId: questionThreeId,
      text: "Asignar automáticamente direcciones IP a los dispositivos.",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "4a1f9d37-4e8c-4b61-ae22-3c6efd4fb003",
      questionId: questionThreeId,
      text: "Asignar automáticamente direcciones IP a los dispositivos.",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "4a1f9d37-4e8c-4b61-ae22-3c6efd4fb004",
    },
    update: {
      questionId: questionThreeId,
      text: "Relacionar direcciones IP con direcciones MAC.",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "4a1f9d37-4e8c-4b61-ae22-3c6efd4fb004",
      questionId: questionThreeId,
      text: "Relacionar direcciones IP con direcciones MAC.",
      isCorrect: false,
      order: 3,
    },
  });


  const questionFourId =
    "5b2e0a48-5f9d-4c72-bf33-4d7afe50c001";

  await prisma.question.upsert({
    where: {
      id: questionFourId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué función cumple DHCP en una red?",
      explanation:
        "DHCP permite asignar automáticamente a los dispositivos parámetros de configuración como dirección IP, máscara de subred, puerta de enlace y servidores DNS.",
      order: 4,
    },
    create: {
      id: questionFourId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué función cumple DHCP en una red?",
      explanation:
        "DHCP permite asignar automáticamente a los dispositivos parámetros de configuración como dirección IP, máscara de subred, puerta de enlace y servidores DNS.",
      order: 4,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "5b2e0a48-5f9d-4c72-bf33-4d7afe50c002",
    },
    update: {
      questionId: questionFourId,
      text: "Asignar automáticamente parámetros de configuración de red a los dispositivos.",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "5b2e0a48-5f9d-4c72-bf33-4d7afe50c002",
      questionId: questionFourId,
      text: "Asignar automáticamente parámetros de configuración de red a los dispositivos.",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "5b2e0a48-5f9d-4c72-bf33-4d7afe50c003",
    },
    update: {
      questionId: questionFourId,
      text: "Traducir nombres de dominio en direcciones IP.",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "5b2e0a48-5f9d-4c72-bf33-4d7afe50c003",
      questionId: questionFourId,
      text: "Traducir nombres de dominio en direcciones IP.",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "5b2e0a48-5f9d-4c72-bf33-4d7afe50c004",
    },
    update: {
      questionId: questionFourId,
      text: "Relacionar direcciones IP con direcciones MAC.",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "5b2e0a48-5f9d-4c72-bf33-4d7afe50c004",
      questionId: questionFourId,
      text: "Relacionar direcciones IP con direcciones MAC.",
      isCorrect: false,
      order: 3,
    },
  });


  const questionFiveId =
    "6c3f1b59-60ae-4d83-a044-5e8b0f61d001";

  await prisma.question.upsert({
    where: {
      id: questionFiveId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Para qué se utiliza ARP dentro de una red local?",
      explanation:
        "ARP permite relacionar una dirección IP con la dirección MAC correspondiente dentro de una red local.",
      order: 5,
    },
    create: {
      id: questionFiveId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Para qué se utiliza ARP dentro de una red local?",
      explanation:
        "ARP permite relacionar una dirección IP con la dirección MAC correspondiente dentro de una red local.",
      order: 5,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "6c3f1b59-60ae-4d83-a044-5e8b0f61d002",
    },
    update: {
      questionId: questionFiveId,
      text: "Relacionar una dirección IP con una dirección MAC.",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "6c3f1b59-60ae-4d83-a044-5e8b0f61d002",
      questionId: questionFiveId,
      text: "Relacionar una dirección IP con una dirección MAC.",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "6c3f1b59-60ae-4d83-a044-5e8b0f61d003",
    },
    update: {
      questionId: questionFiveId,
      text: "Traducir nombres de dominio en direcciones IP.",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "6c3f1b59-60ae-4d83-a044-5e8b0f61d003",
      questionId: questionFiveId,
      text: "Traducir nombres de dominio en direcciones IP.",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "6c3f1b59-60ae-4d83-a044-5e8b0f61d004",
    },
    update: {
      questionId: questionFiveId,
      text: "Asignar automáticamente direcciones IP a los dispositivos.",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "6c3f1b59-60ae-4d83-a044-5e8b0f61d004",
      questionId: questionFiveId,
      text: "Asignar automáticamente direcciones IP a los dispositivos.",
      isCorrect: false,
      order: 3,
    },
  });


  const questionSixId =
    "7d4a2c60-71bf-4e94-a155-6f9c1072e002";

  await prisma.question.upsert({
    where: {
      id: questionSixId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuántas capas principales utiliza el modelo TCP/IP?",
      explanation:
        "El modelo TCP/IP se organiza en cuatro capas principales: Acceso a la red, Internet, Transporte y Aplicación.",
      order: 6,
    },
    create: {
      id: questionSixId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Cuántas capas principales utiliza el modelo TCP/IP?",
      explanation:
        "El modelo TCP/IP se organiza en cuatro capas principales: Acceso a la red, Internet, Transporte y Aplicación.",
      order: 6,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e003",
    },
    update: {
      questionId: questionSixId,
      text: "4 capas",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e003",
      questionId: questionSixId,
      text: "4 capas",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e004",
    },
    update: {
      questionId: questionSixId,
      text: "7 capas",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e004",
      questionId: questionSixId,
      text: "7 capas",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e005",
    },
    update: {
      questionId: questionSixId,
      text: "5 capas",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "7d4a2c60-71bf-4e94-a155-6f9c1072e005",
      questionId: questionSixId,
      text: "5 capas",
      isCorrect: false,
      order: 3,
    },
  });

  const questionSevenId =
    "8e5b3d71-82c0-4fa5-a266-70ad2183f001";

  await prisma.question.upsert({
    where: {
      id: questionSevenId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué capa del modelo OSI se encarga del direccionamiento y enrutamiento mediante direcciones IP?",
      explanation:
        "La capa de Red del modelo OSI se encarga del direccionamiento lógico y del enrutamiento de paquetes entre redes.",
      order: 7,
    },
    create: {
      id: questionSevenId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué capa del modelo OSI se encarga del direccionamiento y enrutamiento mediante direcciones IP?",
      explanation:
        "La capa de Red del modelo OSI se encarga del direccionamiento lógico y del enrutamiento de paquetes entre redes.",
      order: 7,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "8e5b3d71-82c0-4fa5-a266-70ad2183f002",
    },
    update: {
      questionId: questionSevenId,
      text: "Capa de Red",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "8e5b3d71-82c0-4fa5-a266-70ad2183f002",
      questionId: questionSevenId,
      text: "Capa de Red",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "8e5b3d71-82c0-4fa5-a266-70ad2183f003",
    },
    update: {
      questionId: questionSevenId,
      text: "Capa Física",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "8e5b3d71-82c0-4fa5-a266-70ad2183f003",
      questionId: questionSevenId,
      text: "Capa Física",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "8e5b3d71-82c0-4fa5-a266-70ad2183f004",
    },
    update: {
      questionId: questionSevenId,
      text: "Capa de Presentación",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "8e5b3d71-82c0-4fa5-a266-70ad2183f004",
      questionId: questionSevenId,
      text: "Capa de Presentación",
      isCorrect: false,
      order: 3,
    },
  });

  const questionEightId =
    "9f6c4e82-93d1-40b6-a377-81be3294a001";

  await prisma.question.upsert({
    where: {
      id: questionEightId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué protocolo de transporte está orientado a conexión y prioriza la entrega confiable de los datos?",
      explanation:
        "TCP es un protocolo orientado a conexión que incorpora mecanismos de control, confirmación y retransmisión para favorecer una entrega confiable.",
      order: 8,
    },
    create: {
      id: questionEightId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué protocolo de transporte está orientado a conexión y prioriza la entrega confiable de los datos?",
      explanation:
        "TCP es un protocolo orientado a conexión que incorpora mecanismos de control, confirmación y retransmisión para favorecer una entrega confiable.",
      order: 8,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "9f6c4e82-93d1-40b6-a377-81be3294a002",
    },
    update: {
      questionId: questionEightId,
      text: "TCP",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "9f6c4e82-93d1-40b6-a377-81be3294a002",
      questionId: questionEightId,
      text: "TCP",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "9f6c4e82-93d1-40b6-a377-81be3294a003",
    },
    update: {
      questionId: questionEightId,
      text: "UDP",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "9f6c4e82-93d1-40b6-a377-81be3294a003",
      questionId: questionEightId,
      text: "UDP",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "9f6c4e82-93d1-40b6-a377-81be3294a004",
    },
    update: {
      questionId: questionEightId,
      text: "ARP",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "9f6c4e82-93d1-40b6-a377-81be3294a004",
      questionId: questionEightId,
      text: "ARP",
      isCorrect: false,
      order: 3,
    },
  });

  const questionNineId =
    "a07d5f93-a4e2-41c7-a488-92cf43a5b001";

  await prisma.question.upsert({
    where: {
      id: questionNineId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué riesgo puede generar un servidor DHCP no autorizado dentro de una red?",
      explanation:
        "Un servidor DHCP no autorizado puede entregar parámetros de red incorrectos, como una puerta de enlace o un servidor DNS controlado por un atacante.",
      order: 9,
    },
    create: {
      id: questionNineId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué riesgo puede generar un servidor DHCP no autorizado dentro de una red?",
      explanation:
        "Un servidor DHCP no autorizado puede entregar parámetros de red incorrectos, como una puerta de enlace o un servidor DNS controlado por un atacante.",
      order: 9,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "a07d5f93-a4e2-41c7-a488-92cf43a5b002",
    },
    update: {
      questionId: questionNineId,
      text: "Entregar configuraciones de red incorrectas a los dispositivos.",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "a07d5f93-a4e2-41c7-a488-92cf43a5b002",
      questionId: questionNineId,
      text: "Entregar configuraciones de red incorrectas a los dispositivos.",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "a07d5f93-a4e2-41c7-a488-92cf43a5b003",
    },
    update: {
      questionId: questionNineId,
      text: "Aumentar automáticamente la velocidad de la conexión.",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "a07d5f93-a4e2-41c7-a488-92cf43a5b003",
      questionId: questionNineId,
      text: "Aumentar automáticamente la velocidad de la conexión.",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "a07d5f93-a4e2-41c7-a488-92cf43a5b004",
    },
    update: {
      questionId: questionNineId,
      text: "Convertir direcciones MAC en nombres de dominio.",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "a07d5f93-a4e2-41c7-a488-92cf43a5b004",
      questionId: questionNineId,
      text: "Convertir direcciones MAC en nombres de dominio.",
      isCorrect: false,
      order: 3,
    },
  });

  const questionTenId =
    "b18e60a4-b5f3-42d8-b599-a3d054b6c001";

  await prisma.question.upsert({
    where: {
      id: questionTenId,
    },
    update: {
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué puede provocar una manipulación maliciosa de ARP en una red local?",
      explanation:
        "La manipulación de ARP puede asociar una dirección IP con una dirección MAC incorrecta y desviar tráfico hacia otro dispositivo dentro de la red local.",
      order: 10,
    },
    create: {
      id: questionTenId,
      quizId,
      type: "SINGLE_CHOICE",
      text: "¿Qué puede provocar una manipulación maliciosa de ARP en una red local?",
      explanation:
        "La manipulación de ARP puede asociar una dirección IP con una dirección MAC incorrecta y desviar tráfico hacia otro dispositivo dentro de la red local.",
      order: 10,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "b18e60a4-b5f3-42d8-b599-a3d054b6c002",
    },
    update: {
      questionId: questionTenId,
      text: "Desviar tráfico asociando una IP con una dirección MAC incorrecta.",
      isCorrect: true,
      order: 1,
    },
    create: {
      id: "b18e60a4-b5f3-42d8-b599-a3d054b6c002",
      questionId: questionTenId,
      text: "Desviar tráfico asociando una IP con una dirección MAC incorrecta.",
      isCorrect: true,
      order: 1,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "b18e60a4-b5f3-42d8-b599-a3d054b6c003",
    },
    update: {
      questionId: questionTenId,
      text: "Asignar automáticamente una nueva dirección IP pública.",
      isCorrect: false,
      order: 2,
    },
    create: {
      id: "b18e60a4-b5f3-42d8-b599-a3d054b6c003",
      questionId: questionTenId,
      text: "Asignar automáticamente una nueva dirección IP pública.",
      isCorrect: false,
      order: 2,
    },
  });

  await prisma.questionOption.upsert({
    where: {
      id: "b18e60a4-b5f3-42d8-b599-a3d054b6c004",
    },
    update: {
      questionId: questionTenId,
      text: "Traducir nombres de dominio de manera más rápida.",
      isCorrect: false,
      order: 3,
    },
    create: {
      id: "b18e60a4-b5f3-42d8-b599-a3d054b6c004",
      questionId: questionTenId,
      text: "Traducir nombres de dominio de manera más rápida.",
      isCorrect: false,
      order: 3,
    },
  });

  console.log(
    `Seed completado: 1 ruta, 1 curso, 1 módulo, 3 lecciones, ${lessonBlocks.length} bloques, 1 evaluación y 10 preguntas.`,
  );
};

main()
  .catch((error) => {
    console.error("Error ejecutando el seed:", error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
