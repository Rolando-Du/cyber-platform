import { prisma } from "../src/config/prisma.js";

const learningPathId = "6d7c211a-6c5c-4f94-ad68-93c24634b235";

const courseId = "ebe1a74c-dadb-4ae1-98c5-3be147f61e2d";

const moduleId = "f87bc997-c7ab-4a6f-88ba-0685fa8f31d7";

const lessonOneId = "5e0dbef4-c717-4c01-8230-cbbd21a66a2d";

const lessonTwoId = "e176edbb-e4e8-49f5-b96f-5914a269047f";

const lessonThreeId = "9a4ea79b-5118-4d2b-b06c-ce5feff14774";

const quizId = "5ad36250-6f1d-4ebd-9eeb-7720daf7c9eb";

const questionId = "c1b4068c-135b-4d6b-bc37-731f1bd807fb";

const moduleTwoId = "96f1e13f-fa8c-4d36-89c2-188670b74ee8";

const systemLessonOneId = "caae6d10-8bf3-459a-a612-9d5c626acde9";

const systemLessonTwoId = "be909720-8fad-4475-bcd3-1b44a1cf6b3c";

const systemLessonThreeId = "cb252f79-4e63-4599-a39e-5c205aac7579";

const systemLessonFourId = "8454ca19-5d85-4e88-8c90-735854a5ab39";

const systemQuizId = "e764cc60-9b00-4338-81f2-23d5c32a6bf0";

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


  await prisma.module.upsert({
    where: {
      id: moduleTwoId,
    },
    update: {
      courseId,
      title: "Administración de Sistemas Linux y Windows Server",
      description:
        "Administración segura de sistemas operativos, permisos, procesos, servicios, registros y herramientas de línea de comandos.",
      status: "PUBLISHED",
      order: 2,
    },
    create: {
      id: moduleTwoId,
      courseId,
      title: "Administración de Sistemas Linux y Windows Server",
      description:
        "Administración segura de sistemas operativos, permisos, procesos, servicios, registros y herramientas de línea de comandos.",
      status: "PUBLISHED",
      order: 2,
    },
  });

  const systemLessons = [
    {
      id: systemLessonOneId,
      title: "Introducción a Linux y Windows Server",
      slug: "introduccion-linux-windows-server",
      description:
        "Conceptos fundamentales para administrar sistemas Linux y Windows Server con una perspectiva de seguridad.",
      order: 1,
    },
    {
      id: systemLessonTwoId,
      title: "Usuarios, grupos y permisos",
      slug: "usuarios-grupos-y-permisos",
      description:
        "Gestión de identidades, grupos, permisos de archivos y aplicación del principio de mínimo privilegio.",
      order: 2,
    },
    {
      id: systemLessonThreeId,
      title: "Procesos, servicios y registros del sistema",
      slug: "procesos-servicios-y-registros",
      description:
        "Supervisión de procesos, administración de servicios, revisión de puertos y análisis de registros.",
      order: 3,
    },
    {
      id: systemLessonFourId,
      title: "Comandos y administración básica",
      slug: "comandos-y-administracion-basica",
      description:
        "Herramientas esenciales de Bash y PowerShell para administrar y revisar sistemas de forma segura.",
      order: 4,
    },
  ];

  for (const lesson of systemLessons) {
    await prisma.lesson.upsert({
      where: {
        id: lesson.id,
      },
      update: {
        moduleId: moduleTwoId,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        status: "PUBLISHED",
        order: lesson.order,
      },
      create: {
        id: lesson.id,
        moduleId: moduleTwoId,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        status: "PUBLISHED",
        order: lesson.order,
      },
    });
  }

  const systemLessonBlocks = [
    {
      id: "0263b685-5d0c-4e97-92ef-12f290e158cb",
      lessonId: systemLessonOneId,
      type: "HEADING" as const,
      order: 1,
      text: "Administración segura de Linux y Windows Server",
    },
    {
      id: "5a19d511-4303-4e5a-a6bd-082d89c87358",
      lessonId: systemLessonOneId,
      type: "TEXT" as const,
      order: 2,
      text: "Administrar un sistema operativo implica comprender cómo se organizan sus usuarios, permisos, procesos, servicios, archivos y registros. En ciberseguridad, estas tareas son esenciales porque una configuración incorrecta puede ampliar la superficie de ataque o permitir accesos que no deberían existir.",
    },
    {
      id: "17a87026-bace-4653-9749-b55bd1f686ae",
      lessonId: systemLessonOneId,
      type: "HEADING" as const,
      order: 3,
      text: "Línea de comandos y privilegios",
    },
    {
      id: "67480f86-d0fe-4f90-b3fc-cb0098c32d0b",
      lessonId: systemLessonOneId,
      type: "TEXT" as const,
      order: 4,
      text: "Linux se administra habitualmente mediante una shell como Bash, mientras que Windows dispone de PowerShell y del símbolo del sistema. Muchas tareas administrativas requieren privilegios elevados. En Linux suele utilizarse sudo para ejecutar una acción autorizada con privilegios superiores; en Windows se utiliza una consola elevada cuando la tarea lo requiere.",
    },
    {
      id: "f8cdb587-ba6c-455c-a757-a5c641f3241f",
      lessonId: systemLessonOneId,
      type: "HEADING" as const,
      order: 5,
      text: "Organización básica del sistema",
    },
    {
      id: "282c5ac2-8959-460a-b26e-f7d7e60fe710",
      lessonId: systemLessonOneId,
      type: "TEXT" as const,
      order: 6,
      text: "En Linux, directorios como /etc, /var y /home concentran configuración, datos variables y perfiles de usuarios. En Windows, rutas como C:\\\\Windows, C:\\\\Program Files y C:\\\\Users cumplen funciones equivalentes para el sistema, las aplicaciones y los perfiles. Conocer estas ubicaciones facilita la administración y la investigación de incidentes.",
    },
    {
      id: "571295ee-74b0-416c-a502-196b6cf4b086",
      lessonId: systemLessonOneId,
      type: "HEADING" as const,
      order: 7,
      text: "Administración y ciberseguridad",
    },
    {
      id: "a18e50f0-765e-4961-b6db-4a7de1d8f90c",
      lessonId: systemLessonOneId,
      type: "TEXT" as const,
      order: 8,
      text: "Un administrador debe aplicar el principio de mínimo privilegio, mantener los sistemas actualizados, revisar servicios innecesarios y consultar registros ante comportamientos anómalos. El objetivo no es solamente que el sistema funcione, sino reducir oportunidades de abuso y conservar evidencia útil para el análisis.",
    },
    {
      id: "55673d0c-30d3-4189-9b3a-0da7fc8cd295",
      lessonId: systemLessonTwoId,
      type: "HEADING" as const,
      order: 1,
      text: "Usuarios, grupos y permisos",
    },
    {
      id: "9ee3b374-dfba-4414-ad0d-683075da05bf",
      lessonId: systemLessonTwoId,
      type: "TEXT" as const,
      order: 2,
      text: "Los sistemas operativos utilizan usuarios y grupos para identificar quién realiza una acción y qué recursos puede utilizar. Una administración segura evita compartir cuentas, limita privilegios administrativos y asigna a cada usuario solamente los permisos necesarios para sus tareas.",
    },
    {
      id: "95b4d2de-d578-49e8-b841-63637e317c2a",
      lessonId: systemLessonTwoId,
      type: "HEADING" as const,
      order: 3,
      text: "Permisos en Linux",
    },
    {
      id: "59a569d3-d835-400d-bb16-d1927b86ada4",
      lessonId: systemLessonTwoId,
      type: "TEXT" as const,
      order: 4,
      text: "En Linux, los permisos básicos son lectura (r = 4), escritura (w = 2) y ejecución (x = 1). Se aplican al propietario del archivo, al grupo y a otros usuarios. Por ejemplo, 644 representa lectura y escritura para el propietario y solo lectura para grupo y otros; 700 otorga lectura, escritura y ejecución únicamente al propietario.",
    },
    {
      id: "f3f1c445-38e5-4ef1-81a8-0c15697963f5",
      lessonId: systemLessonTwoId,
      type: "HEADING" as const,
      order: 5,
      text: "chmod y chown",
    },
    {
      id: "4fe1b491-a214-4f2f-b2eb-f2bdc8eafc95",
      lessonId: systemLessonTwoId,
      type: "TEXT" as const,
      order: 6,
      text: "El comando chmod modifica permisos. Por ejemplo, chmod 700 script.sh restringe el acceso al propietario, mientras que chmod 755 herramienta.py permite lectura y ejecución para todos y escritura solo al propietario. El comando chown cambia propietario y grupo; con chown -R usuario:grupo /var/www/html el cambio se aplica recursivamente al directorio y su contenido.",
    },
    {
      id: "49aefaad-76f8-4518-a688-591fa8f0efd9",
      lessonId: systemLessonTwoId,
      type: "HEADING" as const,
      order: 7,
      text: "Permisos en Windows",
    },
    {
      id: "1bffaba6-29b9-40e2-bea7-d993c41f9856",
      lessonId: systemLessonTwoId,
      type: "TEXT" as const,
      order: 8,
      text: "Windows utiliza listas de control de acceso (ACL) para definir permisos sobre archivos, carpetas y otros objetos. Los permisos pueden asignarse directamente a usuarios o, preferentemente, mediante grupos. Revisar herencia y permisos efectivos ayuda a detectar accesos excesivos.",
    },
    {
      id: "d87b3ad8-be14-4469-ad94-b205c41bfe0f",
      lessonId: systemLessonThreeId,
      type: "HEADING" as const,
      order: 1,
      text: "Procesos, servicios y registros",
    },
    {
      id: "8ca3c7b6-c1c3-4a12-97e3-2a139e864a91",
      lessonId: systemLessonThreeId,
      type: "TEXT" as const,
      order: 2,
      text: "Un proceso es una instancia de un programa en ejecución. Un servicio es un proceso o conjunto de procesos diseñado para funcionar en segundo plano y proporcionar una función al sistema o a otros programas. Identificar qué se está ejecutando es una tarea básica de administración y análisis de seguridad.",
    },
    {
      id: "1a537608-891e-4144-923b-e054b4a40a01",
      lessonId: systemLessonThreeId,
      type: "HEADING" as const,
      order: 3,
      text: "Servicios en Linux",
    },
    {
      id: "d301fb7e-40b4-4e51-91b9-397cde72420c",
      lessonId: systemLessonThreeId,
      type: "TEXT" as const,
      order: 4,
      text: "En sistemas que utilizan systemd, systemctl permite consultar y administrar servicios. systemctl status sshd muestra el estado del servicio SSH y sudo systemctl restart ufw reinicia el servicio indicado. Antes de modificar un servicio conviene verificar su función y el impacto que tendrá el cambio.",
    },
    {
      id: "a0385a07-fbb7-431b-bbfb-e18f60cdd79d",
      lessonId: systemLessonThreeId,
      type: "HEADING" as const,
      order: 5,
      text: "Procesos y puertos",
    },
    {
      id: "7a3f4f6b-f9c5-4bfc-877d-0f15b3c4d956",
      lessonId: systemLessonThreeId,
      type: "TEXT" as const,
      order: 6,
      text: "Herramientas como ps y top permiten observar procesos en Linux. Para revisar puertos en escucha y procesos asociados pueden utilizarse ss -tulpn o netstat -tulpn. Esta información ayuda a detectar servicios expuestos inesperadamente o aplicaciones que utilizan conexiones de red.",
    },
    {
      id: "ede6fa42-7a7d-40cb-9e2e-0ff97377de48",
      lessonId: systemLessonThreeId,
      type: "HEADING" as const,
      order: 7,
      text: "Registros del sistema",
    },
    {
      id: "a22d775d-8a21-4132-91f9-a0c747548233",
      lessonId: systemLessonThreeId,
      type: "TEXT" as const,
      order: 8,
      text: "Los registros permiten reconstruir eventos y detectar errores o actividad sospechosa. En Linux pueden consultarse registros con journalctl y archivos dentro de /var/log. En Windows, el Visor de eventos registra información del sistema, aplicaciones y seguridad. Las marcas de tiempo y el origen de cada evento son datos importantes durante una investigación.",
    },
    {
      id: "b8587080-6cad-46bd-9a76-c983a3a4df08",
      lessonId: systemLessonFourId,
      type: "HEADING" as const,
      order: 1,
      text: "Comandos y administración básica",
    },
    {
      id: "492886d3-37a5-4ca3-8bb8-38f1c6aa9006",
      lessonId: systemLessonFourId,
      type: "TEXT" as const,
      order: 2,
      text: "La administración cotidiana combina navegación por archivos, consulta del estado del sistema, gestión de cuentas y revisión de red. Aprender a interpretar la salida de los comandos es tan importante como memorizar su sintaxis.",
    },
    {
      id: "f5c7ce1f-af40-4b69-a5c3-3b16ff806272",
      lessonId: systemLessonFourId,
      type: "HEADING" as const,
      order: 3,
      text: "Comandos útiles en Linux",
    },
    {
      id: "534ad143-6cd4-4716-a501-5b1ca8bbea56",
      lessonId: systemLessonFourId,
      type: "TEXT" as const,
      order: 4,
      text: "Comandos como pwd, ls y cd permiten ubicarse y navegar por el sistema de archivos. cp, mv y rm administran archivos; cat y less permiten revisar contenido. whoami e id muestran información de identidad y grupos, mientras que uname y hostname aportan datos básicos del sistema.",
    },
    {
      id: "88d9e5e7-4365-4c83-8504-17bcf56f1510",
      lessonId: systemLessonFourId,
      type: "HEADING" as const,
      order: 5,
      text: "Herramientas útiles en Windows",
    },
    {
      id: "5bb78b51-f115-44af-946a-06b949b834d9",
      lessonId: systemLessonFourId,
      type: "TEXT" as const,
      order: 6,
      text: "PowerShell permite automatizar y consultar el sistema mediante cmdlets. Get-Process muestra procesos, Get-Service consulta servicios y Get-LocalUser permite revisar cuentas locales cuando el módulo correspondiente está disponible. Herramientas como ipconfig y netstat también ayudan a revisar la configuración y las conexiones de red.",
    },
    {
      id: "90139b40-0013-45a9-aa0b-f4af29eb39f1",
      lessonId: systemLessonFourId,
      type: "HEADING" as const,
      order: 7,
      text: "Buenas prácticas de administración",
    },
    {
      id: "4bb70084-feeb-433c-a6a1-5af078dab217",
      lessonId: systemLessonFourId,
      type: "TEXT" as const,
      order: 8,
      text: "Antes de realizar cambios conviene conocer el estado actual, documentar la acción y comprobar el resultado. Deben evitarse privilegios permanentes innecesarios, deshabilitarse servicios que no se utilizan y revisarse periódicamente cuentas, permisos, puertos y registros. Estas prácticas reducen errores y facilitan la detección de incidentes.",
    },
  ];

  for (const block of systemLessonBlocks) {
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
      id: systemQuizId,
    },
    update: {
      moduleId: moduleTwoId,
      title: "Evaluación de administración de sistemas",
      description:
        "Evaluación de usuarios, permisos, procesos, servicios, registros y comandos básicos en Linux y Windows.",
      status: "PUBLISHED",
      passingScore: 70,
      version: 1,
      order: 1,
    },
    create: {
      id: systemQuizId,
      moduleId: moduleTwoId,
      title: "Evaluación de administración de sistemas",
      description:
        "Evaluación de usuarios, permisos, procesos, servicios, registros y comandos básicos en Linux y Windows.",
      status: "PUBLISHED",
      passingScore: 70,
      version: 1,
      order: 1,
    },
  });

  const systemQuestions = [
    {
      id: "9e28ec59-ed0a-42f6-96dd-9979b8409084",
      text: "¿Qué permisos representa el valor octal 644 en un archivo Linux?",
      explanation: "El valor 644 equivale a lectura y escritura para el propietario (6), lectura para el grupo (4) y lectura para otros (4).",
      order: 1,
      options: [
        {
          id: "f145d989-9f2a-438d-a880-f28e81754921",
          text: "Lectura y escritura para el propietario, y solo lectura para grupo y otros.",
          isCorrect: true,
          order: 1,
        },
        {
          id: "730e171b-ce6e-40fd-9bd9-d4ef4d777b53",
          text: "Lectura, escritura y ejecución para todos los usuarios.",
          isCorrect: false,
          order: 2,
        },
        {
          id: "e573e041-fbf7-4266-8f61-b735674fdfc5",
          text: "Lectura, escritura y ejecución solo para el propietario, sin permisos para los demás.",
          isCorrect: false,
          order: 3,
        },
        {
          id: "a31d94d8-8f69-4f90-b5b4-5c85824f31d1",
          text: "Solo lectura para el propietario, sin permisos para grupo y otros.",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "7ff77e1c-8ea8-4719-b056-60a75242bdcf",
      text: "¿Qué efecto tiene el comando chmod 700 script.sh?",
      explanation: "chmod 700 concede lectura, escritura y ejecución al propietario y elimina los permisos para grupo y otros.",
      order: 2,
      options: [
        {
          id: "6d197f1a-f952-47a1-b71c-090727a302f8",
          text: "Concede lectura, escritura y ejecución solo al propietario.",
          isCorrect: true,
          order: 1,
        },
        {
          id: "da1bb1cd-902a-483d-b5e9-adc804a8e100",
          text: "Concede lectura y ejecución a todos, pero escritura solo al propietario.",
          isCorrect: false,
          order: 2,
        },
        {
          id: "667684b8-be70-48e4-b301-cf6354d2915a",
          text: "Concede únicamente lectura a todos los usuarios.",
          isCorrect: false,
          order: 3,
        },
        {
          id: "9bb56baa-88cf-4a16-8434-a43b7b4afc96",
          text: "Cambia el propietario del archivo al usuario root.",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "0bbd2ac9-1519-4ebb-9dd2-93dba87977d2",
      text: "¿Para qué se utiliza chown -R usuario:grupo /var/www/html?",
      explanation: "chown cambia propietario y grupo; la opción -R aplica el cambio de manera recursiva al directorio y su contenido.",
      order: 3,
      options: [
        {
          id: "61865a7d-58b5-42d7-930b-79d990b47223",
          text: "Para cambiar recursivamente el propietario y el grupo del directorio y su contenido.",
          isCorrect: true,
          order: 1,
        },
        {
          id: "416cfb79-ab9c-4f6a-b202-0759bcd8cef1",
          text: "Para cambiar recursivamente los permisos numéricos del directorio.",
          isCorrect: false,
          order: 2,
        },
        {
          id: "6ad53ce6-da84-4384-97da-121111ea89cc",
          text: "Para reiniciar el servicio web asociado con ese directorio.",
          isCorrect: false,
          order: 3,
        },
        {
          id: "ee9c7dfb-4bda-41bb-9df2-3571e658ed8a",
          text: "Para mostrar los usuarios conectados al sistema.",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "f83ac829-b869-42a5-85a0-0c2f8f1ab138",
      text: "¿Qué comando permite consultar el estado de un servicio administrado por systemd?",
      explanation: "systemctl status permite consultar el estado de un servicio en sistemas Linux que utilizan systemd.",
      order: 4,
      options: [
        {
          id: "76b78228-497b-4fa0-be79-185ec872917f",
          text: "systemctl status",
          isCorrect: true,
          order: 1,
        },
        {
          id: "ef784810-c7d6-4ba4-b884-4cbbf17b592e",
          text: "chmod status",
          isCorrect: false,
          order: 2,
        },
        {
          id: "167812ac-d86a-4cf6-a7ca-2312170b23d8",
          text: "chown status",
          isCorrect: false,
          order: 3,
        },
        {
          id: "00a7e3d7-b5cf-4f36-ae94-4aa80230e9e0",
          text: "ip route",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "d685034f-4e61-48a9-bbae-5d7f52474986",
      text: "¿Qué herramienta puede mostrar puertos en escucha y procesos asociados en Linux?",
      explanation: "ss -tulpn y netstat -tulpn permiten revisar puertos en escucha y, según los privilegios disponibles, los procesos asociados.",
      order: 5,
      options: [
        {
          id: "9456684e-9ce8-4ae8-a4cf-ac2beb8fc3f9",
          text: "ss -tulpn",
          isCorrect: true,
          order: 1,
        },
        {
          id: "e22d0e1d-9f06-4e58-8917-e2b82f81d03a",
          text: "pwd",
          isCorrect: false,
          order: 2,
        },
        {
          id: "86d0e784-8e37-4516-be50-196e18eac759",
          text: "mkdir",
          isCorrect: false,
          order: 3,
        },
        {
          id: "7024dec6-4553-4083-8ec1-999dcd3f97ec",
          text: "whoami",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "674e20f5-a496-4322-ac4d-c1677a78a59a",
      text: "¿Qué busca el principio de mínimo privilegio?",
      explanation: "El principio de mínimo privilegio busca que cada usuario o proceso disponga únicamente de los permisos indispensables para realizar su función.",
      order: 6,
      options: [
        {
          id: "32719cbd-2f17-46b4-80a1-a667054d2ce5",
          text: "Asignar únicamente los permisos necesarios para realizar una tarea.",
          isCorrect: true,
          order: 1,
        },
        {
          id: "7567b32f-8c25-499e-8b89-f52b0e69ea28",
          text: "Otorgar privilegios administrativos permanentes a todos los usuarios.",
          isCorrect: false,
          order: 2,
        },
        {
          id: "04ab1033-dd39-4f8b-80d8-9b783d885f9b",
          text: "Evitar el uso de grupos y administrar cada permiso manualmente.",
          isCorrect: false,
          order: 3,
        },
        {
          id: "a3a15dd5-a995-44b6-9668-939bb1978f37",
          text: "Permitir que cualquier servicio se ejecute con la cuenta más privilegiada.",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "2b778895-8054-42c9-ac5d-fc16c3c1dfcd",
      text: "¿Qué ubicación de Linux se utiliza habitualmente para almacenar registros del sistema y de servicios?",
      explanation: "El directorio /var/log contiene numerosos archivos de registro del sistema y de servicios, aunque algunos eventos también se consultan mediante journalctl.",
      order: 7,
      options: [
        {
          id: "737cd8cd-1c84-4268-b27b-bd1f0e92a922",
          text: "/var/log",
          isCorrect: true,
          order: 1,
        },
        {
          id: "5f76c378-6686-49d7-8cb4-74bc29fa6178",
          text: "/home",
          isCorrect: false,
          order: 2,
        },
        {
          id: "f27d3fe2-1612-45e7-ad8a-0a08fe4c8f08",
          text: "/bin",
          isCorrect: false,
          order: 3,
        },
        {
          id: "1c8ea3f3-d46a-40fd-812b-eac0c8ba3c9d",
          text: "/tmp/users",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "780d9828-3db4-4001-bb00-951e811c9c11",
      text: "¿Qué cmdlet de PowerShell permite consultar servicios en Windows?",
      explanation: "Get-Service muestra los servicios disponibles y su estado en Windows PowerShell.",
      order: 8,
      options: [
        {
          id: "645ba76e-5204-4425-8056-6bdc33567f69",
          text: "Get-Service",
          isCorrect: true,
          order: 1,
        },
        {
          id: "c9da4e36-2464-4c8a-8d85-4f4d9712d20d",
          text: "Get-Process",
          isCorrect: false,
          order: 2,
        },
        {
          id: "b902edd1-5af8-4977-ba90-3c14daf1f3e3",
          text: "Get-LocalUser",
          isCorrect: false,
          order: 3,
        },
        {
          id: "add7e9fd-f7bf-4fac-96fb-9bd709432f0b",
          text: "Set-Location",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "6b9739f6-f207-4bae-ba71-77a115ae937f",
      text: "¿Cuál describe mejor la diferencia entre un proceso y un servicio?",
      explanation: "Un proceso es una instancia de un programa en ejecución; un servicio está pensado para proporcionar una función en segundo plano y también se ejecuta mediante uno o más procesos.",
      order: 9,
      options: [
        {
          id: "0f08cac1-b3b3-450d-8dc4-f7ea0a02ec0b",
          text: "Un proceso es un programa en ejecución y un servicio proporciona una función normalmente en segundo plano.",
          isCorrect: true,
          order: 1,
        },
        {
          id: "38d2d890-29e1-4069-8277-c67e682b8ad5",
          text: "Un servicio es siempre un archivo de texto y un proceso es siempre una conexión de red.",
          isCorrect: false,
          order: 2,
        },
        {
          id: "540706ad-f4ab-4ca7-8b55-05c045c72086",
          text: "Un proceso solo existe en Linux y un servicio solo existe en Windows.",
          isCorrect: false,
          order: 3,
        },
        {
          id: "248adf72-8f8d-4b48-b905-633de8f48937",
          text: "No existe diferencia: ambos términos significan exactamente lo mismo.",
          isCorrect: false,
          order: 4,
        },
      ],
    },
    {
      id: "22f70df6-5212-412f-98e7-25b435805622",
      text: "¿Por qué es importante revisar los registros del sistema durante una investigación de seguridad?",
      explanation: "Los registros conservan eventos, errores, accesos y otras actividades que pueden ayudar a reconstruir lo ocurrido y detectar comportamientos anómalos.",
      order: 10,
      options: [
        {
          id: "811915be-2cc5-4a4d-9c5c-9c4ae26f4aae",
          text: "Porque ayudan a reconstruir eventos y detectar actividad anómala.",
          isCorrect: true,
          order: 1,
        },
        {
          id: "f1d116af-3735-4926-bf21-c142c582d072",
          text: "Porque reemplazan la necesidad de administrar usuarios y permisos.",
          isCorrect: false,
          order: 2,
        },
        {
          id: "d45c0ee8-5879-4da3-abd3-0cb859fd3fac",
          text: "Porque modifican automáticamente los permisos inseguros.",
          isCorrect: false,
          order: 3,
        },
        {
          id: "dee89a6f-f114-407c-ab90-370cc0a6bb54",
          text: "Porque impiden por sí solos que se ejecute cualquier proceso malicioso.",
          isCorrect: false,
          order: 4,
        },
      ],
    },
  ];

  for (const question of systemQuestions) {
    await prisma.question.upsert({
      where: {
        id: question.id,
      },
      update: {
        quizId: systemQuizId,
        type: "SINGLE_CHOICE",
        text: question.text,
        explanation: question.explanation,
        order: question.order,
      },
      create: {
        id: question.id,
        quizId: systemQuizId,
        type: "SINGLE_CHOICE",
        text: question.text,
        explanation: question.explanation,
        order: question.order,
      },
    });

    for (const option of question.options) {
      await prisma.questionOption.upsert({
        where: {
          id: option.id,
        },
        update: {
          questionId: question.id,
          text: option.text,
          isCorrect: option.isCorrect,
          order: option.order,
        },
        create: {
          id: option.id,
          questionId: question.id,
          text: option.text,
          isCorrect: option.isCorrect,
          order: option.order,
        },
      });
    }
  }

  console.log(
    `Seed completado: 1 ruta, 1 curso, 2 módulos, 7 lecciones, ${lessonBlocks.length + systemLessonBlocks.length} bloques, 2 evaluaciones y 20 preguntas.`,
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
