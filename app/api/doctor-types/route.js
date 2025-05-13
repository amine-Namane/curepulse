export async function GET(req) {
    const doctorTypes = [
      { name: 'dentist', slug: 'Dentist' },
      { name: 'cardiologist', slug: 'Cardiologist' },
      { name: 'orthopedic', slug: 'Orthopedic' },
      { name: 'otology', slug: 'Otology' },
      { name: 'doctor', slug: 'Doctor' },
      { name: 'eyedoctor', slug: 'Eyedoctor' },
    ];
    
      return Response.json(doctorTypes);
    }
    
    