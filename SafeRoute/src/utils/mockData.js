export const mockContacts = [
  { id: '1', name: 'Mom', phone: '+1 234 567 8900', isEmergency: true, relation: 'Family' },
  { id: '2', name: 'Dad', phone: '+1 234 567 8901', isEmergency: true, relation: 'Family' },
  { id: '3', name: 'John Doe', phone: '+1 234 567 8902', isEmergency: false, relation: 'Friend' },
];

export const mockJourneys = [
  { id: '1', destination: 'Home', time: '18:45', status: 'Safe', date: 'Today' },
  { id: '2', destination: 'Office', time: '09:00', status: 'Safe', date: 'Today' },
  { id: '3', destination: 'Gym', time: '19:30', status: 'Safe', date: 'Yesterday' },
];

export const mockPoliceStations = [
  { id: '1', name: 'Central Police Station', latitude: 37.7749, longitude: -122.4194, distance: '1.2 km', phone: '911' },
  { id: '2', name: 'North District Precinct', latitude: 37.7849, longitude: -122.4094, distance: '2.5 km', phone: '911' },
];

export const mockSafeRoutes = [
  { id: '1', title: 'Main Highway Route', duration: '25 min', distance: '12 km', safetyScore: 98, isLit: true, hasCrowd: true },
  { id: '2', title: 'Scenic Route (Avoid at night)', duration: '30 min', distance: '14 km', safetyScore: 75, isLit: false, hasCrowd: false },
  { id: '3', title: 'City Center Route', duration: '35 min', distance: '13 km', safetyScore: 85, isLit: true, hasCrowd: true },
];
