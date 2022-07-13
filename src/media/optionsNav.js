let optionsNav = {
    admin: [ //los adminitradores de la app pueden 
        {to: '/createCompany', name: 'New Company'}, //crear empresas
        {to: '/getCompanies', name: 'Companies'}, //verlas//editarlas/eliminarlas
        {to: '/create', name: 'New User'}, //crear administradores y usuarios de empresas
        {to: '/getUsers', name: 'Users'}, //verlos/editarlos/eliminarlos
    ],
    owner: [ //usuarios de empresas pueden
        {to: '/createJob', name: 'New Job'}, //crear un nuevo trabajo
        {to: '/getJobs/id', name: 'My Jobs'}, //ver sus postulaciones activas y sus postulados
        {to: '/ancientJobs/id', name: 'Ancient Jobs'} //ver sus postulaciones antiguas
    ],
    user: [ //usuarios postulantes pueden
        {to: '/getCompanies', name: 'Companies'}, //ver todas las empresas adheridas a rosarioJobs
        {to: '/getJobs', name: 'Jobs'}, //ver todas las postulaciones disponibles
        {to: '/myJobs/id', name: 'My Jobs'}, //ver las postulaciones activas, luego el historial de postulaciones
        {to: '/working', name: 'Working'}, //ver las ultimas 10 vacantes contratadas
    ],
    non: [ //usuarios no logueados pueden ver
        {to: '/createCompany', name: 'New Company'},
        {to: '/getCompanies', name: 'Companies'},
        {to: '/createPlate', name: 'New Plate'},
        {to: '/getPlates', name: 'Plates'}
    ]
} //la opcion '/profile' para ver/editar un perfil se realizará desde el menú de usuario

export default optionsNav