import { notFound } from 'next/navigation';

const doctorData = {
  cardiologist: {
    name: 'Cardiologist',
    description: 'Specializes in heart-related issues.',
  },
  dermatologist: {
    name: 'Dermatologist',
    description: 'Specializes in skin-related issues.',
  },
  pediatrician: {
    name: 'Pediatrician',
    description: 'Specializes in child health.',
  },
  orthopedic: {
    name: 'Orthopedic',
    description: 'Specializes in bone and joint issues.',
  },
};

export default function DoctorPage({ params }) {
  const doctorType = doctorData[params.type];

  if (!doctorType) {
    return notFound();
  }

  return (
    <div>
      <h1>{doctorType.name}</h1>
      <p>{doctorType.description}</p>
    </div>
  );
}

