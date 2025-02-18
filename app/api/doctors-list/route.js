export async function GET(req) {
    const doctorsListe = [
      { name: 'Amine Namane', slug: 'Dentist',img:'/assets/images/dr-cruz.png' },
      { name: 'Abdelaziz boulerouaih', slug: 'Cardiologist' ,img:'/assets/images/dr-green.png'},
      { name: 'yasmine yasmine ', slug: 'Orthopedic',img:'/assets/images/dr-lee.png' },
      { name: 'mohamed mohamed', slug: 'Otology' ,img:'/assets/images/dr-peter.png'},
      { name: 'Zino ', slug: 'Doctor',img:'/assets/images/dr-powell.png' },
      { name: 'selma selma', slug: 'Eyedoctor',img:'/assets/images/dr-cruz.png' },
    ];
  
    return Response.json(doctorsListe);
  }
  