// pages/api
export default function handler(req, res) {
  const doctorTypes = [
      {name:'dentist',slug:'Dentist'}
       ,{name:'cardiologist',slug:'Cardiologist'}
       ,{name:'orthopedic', slug:'Orthopedic'}
       ,{name:'otology',slug:'Otology'}
       ,{name:'doctor',slug:'Doctor'}
       ,{name:'eyedoctor',slug:'Eyedoctor'}
  ]

  // Return the list of doctor types as JSON
  res.status(200).json(doctorTypes);
}