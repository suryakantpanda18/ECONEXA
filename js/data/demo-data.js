// ============================================================
// EcoNexa — Demo Data
// Realistic mock data for all entities
// ============================================================

const EcoData = {

  // ============================================================
  // Users
  // ============================================================
  users: [
    // Citizens
    { id: 'U001', role: 'citizen', name: 'Priya Sharma',    email: 'citizen@econexa.in',  password: 'demo123', ward: 'W01', householdId: 'H1001', avatar: 'PS', phone: '9876543210' },
    { id: 'U002', role: 'citizen', name: 'Rahul Mehta',     email: 'rahul@econexa.in',    password: 'demo123', ward: 'W02', householdId: 'H1015', avatar: 'RM', phone: '9876543211' },
    { id: 'U003', role: 'citizen', name: 'Anjali Reddy',    email: 'anjali@econexa.in',   password: 'demo123', ward: 'W03', householdId: 'H1028', avatar: 'AR', phone: '9876543212' },
    // Workers
    { id: 'U010', role: 'worker', name: 'Suresh Kumar',     email: 'worker@econexa.in',   password: 'demo123', ward: 'W01', workerId: 'WK01', avatar: 'SK', phone: '9876500001' },
    { id: 'U011', role: 'worker', name: 'Ramesh Yadav',     email: 'ramesh@econexa.in',   password: 'demo123', ward: 'W02', workerId: 'WK02', avatar: 'RY', phone: '9876500002' },
    { id: 'U012', role: 'worker', name: 'Kavitha Devi',     email: 'kavitha@econexa.in',  password: 'demo123', ward: 'W03', workerId: 'WK03', avatar: 'KD', phone: '9876500003' },
    { id: 'U013', role: 'worker', name: 'Mohan Lal',        email: 'mohan@econexa.in',    password: 'demo123', ward: 'W04', workerId: 'WK04', avatar: 'ML', phone: '9876500004' },
    { id: 'U014', role: 'worker', name: 'Sunita Patel',     email: 'sunita@econexa.in',   password: 'demo123', ward: 'W05', workerId: 'WK05', avatar: 'SP', phone: '9876500005' },
    { id: 'U015', role: 'worker', name: 'Ravi Shankar',     email: 'ravi@econexa.in',     password: 'demo123', ward: 'W06', workerId: 'WK06', avatar: 'RS', phone: '9876500006' },
    // Admin
    { id: 'U020', role: 'admin', name: 'Dr. Meena Gupta',   email: 'admin@econexa.in',    password: 'demo123', municipality: 'GMC', avatar: 'MG', designation: 'Municipal Commissioner' },
    { id: 'U021', role: 'admin', name: 'Vivek Joshi',       email: 'vivek@econexa.in',    password: 'demo123', municipality: 'GMC', avatar: 'VJ', designation: 'Waste Management Officer' },
    // Authority
    { id: 'U030', role: 'authority', name: 'Anand Krishnan', email: 'authority@econexa.in', password: 'demo123', state: 'Telangana', avatar: 'AK', designation: 'State Environment Commissioner' },
  ],

  // ============================================================
  // Municipality
  // ============================================================
  municipality: {
    id: 'GMC',
    name: 'Greenfield Municipal Corporation',
    shortName: 'GMC',
    city: 'Greenfield City',
    state: 'Telangana',
    population: 487000,
    households: 97400,
    area: '142 km²',
    wards: 8,
    established: 1987,
    commissioner: 'Dr. Meena Gupta',
    contact: '+91-40-23456789',
    logo: '🏛️'
  },

  // ============================================================
  // Wards
  // ============================================================
  wards: [
    { id: 'W01', name: 'Ward 1', area: 'Banjara Hills', households: 12800, population: 61200, workers: ['WK01'], lat: 17.415, lng: 78.447, target: 1.7, generated: 1.82, collected: 1.65, efficiency: 90.7 },
    { id: 'W02', name: 'Ward 2', area: 'Jubilee Hills',  households: 10200, population: 48960, workers: ['WK02'], lat: 17.432, lng: 78.413, target: 1.6, generated: 2.10, collected: 1.70, efficiency: 81.0 },
    { id: 'W03', name: 'Ward 3', area: 'Madhapur',       households: 11400, population: 54720, workers: ['WK03'], lat: 17.448, lng: 78.391, target: 1.4, generated: 1.44, collected: 1.38, efficiency: 95.8 },
    { id: 'W04', name: 'Ward 4', area: 'Gachibowli',     households: 13600, population: 65280, workers: ['WK04'], lat: 17.440, lng: 78.349, target: 1.9, generated: 1.95, collected: 1.78, efficiency: 91.3 },
    { id: 'W05', name: 'Ward 5', area: 'Kondapur',       households: 9800,  population: 47040, workers: ['WK05'], lat: 17.460, lng: 78.363, target: 1.3, generated: 1.28, collected: 1.22, efficiency: 95.3 },
    { id: 'W06', name: 'Ward 6', area: 'Miyapur',        households: 11200, population: 53760, workers: ['WK06'], lat: 17.493, lng: 78.347, target: 1.5, generated: 1.62, collected: 1.35, efficiency: 83.3 },
    { id: 'W07', name: 'Ward 7', area: 'Kukatpally',     households: 14200, population: 68160, workers: ['WK01','WK02'], lat: 17.494, lng: 78.404, target: 2.0, generated: 2.18, collected: 1.95, efficiency: 89.4 },
    { id: 'W08', name: 'Ward 8', area: 'LB Nagar',       households: 14200, population: 68160, workers: ['WK05','WK06'], lat: 17.349, lng: 78.548, target: 1.8, generated: 1.74, collected: 1.65, efficiency: 94.8 },
  ],

  // ============================================================
  // Households
  // ============================================================
  households: [
    { id: 'H1001', ward: 'W01', address: '12-3-456, Road No. 5, Banjara Hills', owner: 'Priya Sharma',   type: 'residential', members: 4, status: 'collected', qty: 2.4, wet: 1.2, dry: 0.8, plastic: 0.3, other: 0.1 },
    { id: 'H1002', ward: 'W01', address: '8-2-333, Road No. 12, Banjara Hills', owner: 'Venkat Rao',     type: 'residential', members: 3, status: 'collected', qty: 1.8, wet: 0.9, dry: 0.5, plastic: 0.3, other: 0.1 },
    { id: 'H1003', ward: 'W01', address: '45 Green Park Colony, BH',            owner: 'Shalini Reddy',  type: 'residential', members: 5, status: 'pending',   qty: 3.1, wet: 1.5, dry: 1.0, plastic: 0.4, other: 0.2 },
    { id: 'H1004', ward: 'W01', address: '7-A, Lotus Apartments, BH',           owner: 'Kiran Kumar',   type: 'flat',        members: 2, status: 'missed',    qty: 1.2, wet: 0.6, dry: 0.4, plastic: 0.1, other: 0.1 },
    { id: 'H1005', ward: 'W01', address: 'Shop No. 23, Main Market, BH',        owner: 'Rajesh Stores', type: 'commercial',  members: 0, status: 'collected', qty: 5.2, wet: 1.8, dry: 2.1, plastic: 1.0, other: 0.3 },
    { id: 'H1006', ward: 'W01', address: '3-4-789, Shiva Nagar, BH',            owner: 'Deepa Jain',    type: 'residential', members: 6, status: 'issue',     qty: 2.8, wet: 1.4, dry: 0.9, plastic: 0.3, other: 0.2 },
    { id: 'H1007', ward: 'W01', address: '22, Gandhi Road, Banjara Hills',       owner: 'Naresh Babu',   type: 'residential', members: 4, status: 'collected', qty: 2.2, wet: 1.1, dry: 0.7, plastic: 0.3, other: 0.1 },
    { id: 'H1008', ward: 'W01', address: 'Flat 401, Highland Towers, BH',        owner: 'Meenakshi V',  type: 'flat',        members: 3, status: 'collected', qty: 1.9, wet: 0.8, dry: 0.7, plastic: 0.3, other: 0.1 },
    { id: 'H1009', ward: 'W01', address: '15, Rose Gardens, BH',                 owner: 'Suresh G',     type: 'residential', members: 5, status: 'pending',   qty: 2.7, wet: 1.3, dry: 0.9, plastic: 0.4, other: 0.1 },
    { id: 'H1010', ward: 'W01', address: 'Hotel Lotus, Main Rd, BH',             owner: 'Hotel Mgmt',   type: 'commercial',  members: 0, status: 'collected', qty: 12.4, wet: 8.2, dry: 2.5, plastic: 1.5, other: 0.2 },
    { id: 'H1011', ward: 'W02', address: '45 Film Nagar, Jubilee Hills',          owner: 'Amar Nair',    type: 'residential', members: 4, status: 'collected', qty: 2.1, wet: 1.0, dry: 0.7, plastic: 0.3, other: 0.1 },
    { id: 'H1012', ward: 'W02', address: 'Apt 12B, Silver Oak, JH',              owner: 'Geeta Shah',   type: 'flat',        members: 2, status: 'collected', qty: 1.4, wet: 0.6, dry: 0.5, plastic: 0.2, other: 0.1 },
    { id: 'H1013', ward: 'W02', address: '78-A, Celebrity Colony, JH',           owner: 'Ravi Teja',    type: 'residential', members: 6, status: 'pending',   qty: 3.5, wet: 1.8, dry: 1.2, plastic: 0.4, other: 0.1 },
    { id: 'H1014', ward: 'W02', address: 'Office Complex, Road No. 1, JH',       owner: 'Corp IT Park', type: 'commercial',  members: 0, status: 'collected', qty: 8.4, wet: 2.1, dry: 4.2, plastic: 1.8, other: 0.3 },
    { id: 'H1015', ward: 'W02', address: '33, Park Lane, Jubilee Hills',          owner: 'Rahul Mehta',  type: 'residential', members: 3, status: 'collected', qty: 1.9, wet: 0.9, dry: 0.6, plastic: 0.3, other: 0.1 },
    { id: 'H1016', ward: 'W03', address: '201, Cyber Heights, Madhapur',          owner: 'Asha Rani',    type: 'flat',        members: 4, status: 'collected', qty: 2.0, wet: 0.9, dry: 0.7, plastic: 0.3, other: 0.1 },
    { id: 'H1017', ward: 'W03', address: 'Kothaguda X Roads, Madhapur',          owner: 'Tech Office',  type: 'commercial',  members: 0, status: 'collected', qty: 6.2, wet: 1.2, dry: 3.5, plastic: 1.2, other: 0.3 },
    { id: 'H1018', ward: 'W03', address: '55, Srinivasa Colony, Madhapur',        owner: 'Ramu Chari',   type: 'residential', members: 5, status: 'missed',    qty: 2.4, wet: 1.1, dry: 0.9, plastic: 0.3, other: 0.1 },
    { id: 'H1019', ward: 'W03', address: 'Flat 3B, Green Vista, Madhapur',        owner: 'Preeti S',     type: 'flat',        members: 2, status: 'collected', qty: 1.3, wet: 0.6, dry: 0.4, plastic: 0.2, other: 0.1 },
    { id: 'H1020', ward: 'W03', address: '12, Silicon Valley, Madhapur',          owner: 'Sanjay P',     type: 'residential', members: 4, status: 'collected', qty: 2.1, wet: 1.0, dry: 0.7, plastic: 0.3, other: 0.1 },
    { id: 'H1028', ward: 'W03', address: '88-B, Tech Park Area, Madhapur',        owner: 'Anjali Reddy', type: 'residential', members: 3, status: 'collected', qty: 1.7, wet: 0.8, dry: 0.6, plastic: 0.2, other: 0.1 },
    { id: 'H1021', ward: 'W04', address: '10, DLF Cyber City, Gachibowli',        owner: 'Corp Block A', type: 'commercial',  members: 0, status: 'collected', qty: 15.2, wet: 4.2, dry: 7.8, plastic: 2.8, other: 0.4 },
    { id: 'H1022', ward: 'W04', address: '45, IIIT Colony, Gachibowli',           owner: 'Ramana P',     type: 'residential', members: 5, status: 'collected', qty: 2.6, wet: 1.3, dry: 0.9, plastic: 0.3, other: 0.1 },
    { id: 'H1023', ward: 'W04', address: 'Flat 7C, Image Towers, Gachibowli',     owner: 'Lakshmi D',    type: 'flat',        members: 3, status: 'pending',   qty: 1.8, wet: 0.8, dry: 0.6, plastic: 0.3, other: 0.1 },
    { id: 'H1024', ward: 'W05', address: '23-A, Kondapur Village Road',           owner: 'Mani Teja',    type: 'residential', members: 4, status: 'collected', qty: 2.1, wet: 1.0, dry: 0.7, plastic: 0.3, other: 0.1 },
    { id: 'H1025', ward: 'W06', address: '78, Miyapur Phase-2',                   owner: 'Saritha K',    type: 'residential', members: 6, status: 'pending',   qty: 3.2, wet: 1.6, dry: 1.1, plastic: 0.4, other: 0.1 },
    { id: 'H1026', ward: 'W07', address: 'Flat 15, KPHB Colony, Kukatpally',      owner: 'Vijay M',      type: 'flat',        members: 4, status: 'collected', qty: 2.3, wet: 1.1, dry: 0.8, plastic: 0.3, other: 0.1 },
    { id: 'H1027', ward: 'W08', address: '34, New Colony, LB Nagar',              owner: 'Rupa Rao',     type: 'residential', members: 5, status: 'collected', qty: 2.5, wet: 1.2, dry: 0.9, plastic: 0.3, other: 0.1 },
  ],

  // ============================================================
  // Workers
  // ============================================================
  workers: [
    {
      id: 'WK01', userId: 'U010', name: 'Suresh Kumar', ward: 'W01',
      area: 'Banjara Hills Zone A', phone: '9876500001',
      status: 'active', since: '2019-03-15',
      todayTarget: 850, todayCollected: 612, totalHouseholds: 48,
      householdsCompleted: 36, vehicleNo: 'TS 09 AB 1234',
      vehicleType: 'Compactor', shift: '06:00 AM - 02:00 PM',
      routePoints: [
        { lat: 17.415, lng: 78.447, name: 'Road No. 5' },
        { lat: 17.418, lng: 78.443, name: 'Road No. 8' },
        { lat: 17.421, lng: 78.441, name: 'Park Lane' },
        { lat: 17.423, lng: 78.438, name: 'Main Market' },
      ]
    },
    {
      id: 'WK02', userId: 'U011', name: 'Ramesh Yadav', ward: 'W02',
      area: 'Jubilee Hills Zone B', phone: '9876500002',
      status: 'active', since: '2020-07-01',
      todayTarget: 780, todayCollected: 520, totalHouseholds: 42,
      householdsCompleted: 28, vehicleNo: 'TS 09 CD 5678',
      vehicleType: 'Tipper', shift: '06:00 AM - 02:00 PM',
      routePoints: [
        { lat: 17.432, lng: 78.413, name: 'Film Nagar' },
        { lat: 17.436, lng: 78.410, name: 'Celebrity Colony' },
        { lat: 17.439, lng: 78.407, name: 'Park Road' },
      ]
    },
    {
      id: 'WK03', userId: 'U012', name: 'Kavitha Devi', ward: 'W03',
      area: 'Madhapur Zone A', phone: '9876500003',
      status: 'active', since: '2021-01-10',
      todayTarget: 700, todayCollected: 670, totalHouseholds: 38,
      householdsCompleted: 36, vehicleNo: 'TS 09 EF 9012',
      vehicleType: 'Compactor', shift: '06:00 AM - 02:00 PM',
      routePoints: [
        { lat: 17.448, lng: 78.391, name: 'Cyber Heights' },
        { lat: 17.450, lng: 78.387, name: 'Srinivasa Colony' },
        { lat: 17.452, lng: 78.383, name: 'Silicon Valley' },
      ]
    },
    {
      id: 'WK04', userId: 'U013', name: 'Mohan Lal', ward: 'W04',
      area: 'Gachibowli Zone A', phone: '9876500004',
      status: 'active', since: '2018-11-20',
      todayTarget: 920, todayCollected: 810, totalHouseholds: 54,
      householdsCompleted: 48, vehicleNo: 'TS 09 GH 3456',
      vehicleType: 'Compactor', shift: '06:00 AM - 02:00 PM',
      routePoints: []
    },
    {
      id: 'WK05', userId: 'U014', name: 'Sunita Patel', ward: 'W05',
      area: 'Kondapur Zone A', phone: '9876500005',
      status: 'active', since: '2022-04-05',
      todayTarget: 640, todayCollected: 610, totalHouseholds: 36,
      householdsCompleted: 34, vehicleNo: 'TS 09 IJ 7890',
      vehicleType: 'Tipper', shift: '06:00 AM - 02:00 PM',
      routePoints: []
    },
    {
      id: 'WK06', userId: 'U015', name: 'Ravi Shankar', ward: 'W06',
      area: 'Miyapur Zone A', phone: '9876500006',
      status: 'active', since: '2020-09-15',
      todayTarget: 750, todayCollected: 480, totalHouseholds: 44,
      householdsCompleted: 26, vehicleNo: 'TS 09 KL 1234',
      vehicleType: 'Compactor', shift: '06:00 AM - 02:00 PM',
      routePoints: []
    },
  ],

  // ============================================================
  // Waste Records (daily, by ward)
  // ============================================================
  wasteRecords: [
    // Today's records per ward
    { id: 'WR001', wardId: 'W01', date: '2026-08-14', wet: 0.72, dry: 0.48, plastic: 0.28, ewaste: 0.08, hazardous: 0.04, other: 0.22, total: 1.82 },
    { id: 'WR002', wardId: 'W02', date: '2026-08-14', wet: 0.92, dry: 0.58, plastic: 0.32, ewaste: 0.10, hazardous: 0.06, other: 0.12, total: 2.10 },
    { id: 'WR003', wardId: 'W03', date: '2026-08-14', wet: 0.60, dry: 0.38, plastic: 0.22, ewaste: 0.06, hazardous: 0.03, other: 0.15, total: 1.44 },
    { id: 'WR004', wardId: 'W04', date: '2026-08-14', wet: 0.85, dry: 0.54, plastic: 0.31, ewaste: 0.09, hazardous: 0.05, other: 0.11, total: 1.95 },
    { id: 'WR005', wardId: 'W05', date: '2026-08-14', wet: 0.56, dry: 0.34, plastic: 0.20, ewaste: 0.05, hazardous: 0.02, other: 0.11, total: 1.28 },
    { id: 'WR006', wardId: 'W06', date: '2026-08-14', wet: 0.70, dry: 0.43, plastic: 0.27, ewaste: 0.07, hazardous: 0.04, other: 0.11, total: 1.62 },
    { id: 'WR007', wardId: 'W07', date: '2026-08-14', wet: 0.95, dry: 0.63, plastic: 0.36, ewaste: 0.10, hazardous: 0.05, other: 0.09, total: 2.18 },
    { id: 'WR008', wardId: 'W08', date: '2026-08-14', wet: 0.76, dry: 0.48, plastic: 0.27, ewaste: 0.08, hazardous: 0.04, other: 0.11, total: 1.74 },
  ],

  // Weekly trend (last 7 days, total tons)
  weeklyTrend: [
    { date: '2026-08-08', total: 13.2, collected: 12.1, recycled: 3.8, disposed: 8.3 },
    { date: '2026-08-09', total: 12.8, collected: 11.9, recycled: 3.5, disposed: 8.4 },
    { date: '2026-08-10', total: 11.4, collected: 10.8, recycled: 3.2, disposed: 7.6 },
    { date: '2026-08-11', total: 13.6, collected: 12.8, recycled: 4.0, disposed: 8.8 },
    { date: '2026-08-12', total: 14.2, collected: 13.0, recycled: 4.2, disposed: 8.8 },
    { date: '2026-08-13', total: 12.2, collected: 11.5, recycled: 3.6, disposed: 7.9 },
    { date: '2026-08-14', total: 14.13, collected: 11.98, recycled: 3.9, disposed: 8.08 },
  ],

  // Monthly totals (last 12 months)
  monthlyTrend: [
    { month: 'Sep 25', total: 398, collected: 362, recycled: 115, disposed: 247 },
    { month: 'Oct 25', total: 412, collected: 378, recycled: 122, disposed: 256 },
    { month: 'Nov 25', total: 385, collected: 352, recycled: 110, disposed: 242 },
    { month: 'Dec 25', total: 402, collected: 371, recycled: 118, disposed: 253 },
    { month: 'Jan 26', total: 418, collected: 385, recycled: 125, disposed: 260 },
    { month: 'Feb 26', total: 388, collected: 356, recycled: 112, disposed: 244 },
    { month: 'Mar 26', total: 425, collected: 395, recycled: 130, disposed: 265 },
    { month: 'Apr 26', total: 410, collected: 380, recycled: 124, disposed: 256 },
    { month: 'May 26', total: 432, collected: 401, recycled: 132, disposed: 269 },
    { month: 'Jun 26', total: 415, collected: 384, recycled: 127, disposed: 257 },
    { month: 'Jul 26', total: 428, collected: 398, recycled: 131, disposed: 267 },
    { month: 'Aug 26', total: 198, collected: 184, recycled: 61,  disposed: 123 },
  ],

  // ============================================================
  // Complaints
  // ============================================================
  complaints: [
    { id: 'C001', citizenId: 'U001', ward: 'W01', category: 'missed_collection', title: 'Missed Collection - Road No. 5', desc: 'Garbage collection was not done in our street for the past 2 days. The bin is overflowing.', status: 'resolved', priority: 'high', location: 'Road No. 5, Banjara Hills', createdAt: '2026-08-12T09:30:00', updatedAt: '2026-08-13T14:20:00', assignedTo: 'WK01', resolutionNote: 'Collection done. Route schedule adjusted.' },
    { id: 'C002', citizenId: 'U002', ward: 'W02', category: 'overflowing_bin', title: 'Overflowing Public Bin near Market', desc: 'The public dustbin near Jubilee Hills market has been overflowing since morning. Waste is scattered on the footpath.', status: 'in_progress', priority: 'high', location: 'Jubilee Hills Market Junction', createdAt: '2026-08-14T07:15:00', updatedAt: '2026-08-14T10:45:00', assignedTo: 'WK02', resolutionNote: null },
    { id: 'C003', citizenId: 'U003', ward: 'W03', category: 'illegal_dumping', title: 'Illegal Dumping at Construction Site', desc: 'Someone has dumped construction waste near the park. It includes broken tiles and rubble.', status: 'assigned', priority: 'medium', location: 'Near Cyber Heights, Madhapur', createdAt: '2026-08-14T08:45:00', updatedAt: '2026-08-14T09:30:00', assignedTo: 'WK03', resolutionNote: null },
    { id: 'C004', citizenId: 'U001', ward: 'W01', category: 'damaged_bin', title: 'Damaged Public Bin', desc: 'The public waste bin on Park Road is broken. The lid is missing and the bin is leaning dangerously.', status: 'submitted', priority: 'low', location: 'Park Road, Banjara Hills', createdAt: '2026-08-14T11:20:00', updatedAt: '2026-08-14T11:20:00', assignedTo: null, resolutionNote: null },
    { id: 'C005', citizenId: 'U002', ward: 'W07', category: 'uncollected_waste', title: 'Uncollected Waste Pile', desc: 'Large pile of waste near KPHB Colony main road. Has been there since 3 days.', status: 'in_progress', priority: 'high', location: 'KPHB Main Road, Kukatpally', createdAt: '2026-08-13T16:00:00', updatedAt: '2026-08-14T08:00:00', assignedTo: 'WK01', resolutionNote: null },
    { id: 'C006', citizenId: 'U003', ward: 'W04', category: 'other', title: 'Medical Waste Dumped Near Footpath', desc: 'Used medical supplies including syringes found near the footpath. Very dangerous for children.', status: 'assigned', priority: 'urgent', location: 'Near IIIT Colony Gate, Gachibowli', createdAt: '2026-08-14T06:30:00', updatedAt: '2026-08-14T07:15:00', assignedTo: 'WK04', resolutionNote: null },
    { id: 'C007', citizenId: 'U001', ward: 'W05', category: 'missed_collection', title: 'E-Waste not collected', desc: 'Dropped off old laptop and chargers at the collection point but nobody came for 3 days.', status: 'resolved', priority: 'medium', location: 'Kondapur E-Waste Point', createdAt: '2026-08-10T10:00:00', updatedAt: '2026-08-11T16:30:00', assignedTo: 'WK05', resolutionNote: 'E-waste collected and dispatched to registered recycler.' },
    { id: 'C008', citizenId: 'U002', ward: 'W06', category: 'overflowing_bin', title: 'Garbage Truck Not Coming', desc: 'The garbage collection truck has not come to our street for 4 days. Very bad smell.', status: 'submitted', priority: 'high', location: 'Miyapur Phase-2, Sector 7', createdAt: '2026-08-14T12:00:00', updatedAt: '2026-08-14T12:00:00', assignedTo: null, resolutionNote: null },
  ],

  // ============================================================
  // Facilities — Bins
  // ============================================================
  bins: [
    // Telangana / GMC
    { id: 'B001', name: 'Banjara Hills Bin #1', ward: 'W01', state: 'TS', lat: 17.4155, lng: 78.4480, type: 'dual_bin', capacity: 100, current: 65, status: 'active', lastCollection: '2026-08-14T06:30:00' },
    { id: 'B002', name: 'Banjara Hills Bin #2', ward: 'W01', state: 'TS', lat: 17.4200, lng: 78.4430, type: 'single_bin', capacity: 60, current: 80, status: 'full', lastCollection: '2026-08-13T18:00:00' },
    { id: 'B003', name: 'Jubilee Hills Market Bin', ward: 'W02', state: 'TS', lat: 17.4310, lng: 78.4150, type: 'large_bin', capacity: 200, current: 110, status: 'active', lastCollection: '2026-08-14T07:00:00' },
    { id: 'B004', name: 'Madhapur Tech Park Bin', ward: 'W03', state: 'TS', lat: 17.4480, lng: 78.3910, type: 'dual_bin', capacity: 100, current: 40, status: 'active', lastCollection: '2026-08-14T08:00:00' },
    { id: 'B005', name: 'Gachibowli DLF Bin', ward: 'W04', state: 'TS', lat: 17.4400, lng: 78.3490, type: 'large_bin', capacity: 300, current: 180, status: 'active', lastCollection: '2026-08-14T06:00:00' },
    { id: 'B006', name: 'Kondapur Circle Bin', ward: 'W05', state: 'TS', lat: 17.4600, lng: 78.3630, type: 'dual_bin', capacity: 100, current: 25, status: 'active', lastCollection: '2026-08-14T07:30:00' },
    { id: 'B007', name: 'Miyapur Bus Stand Bin', ward: 'W06', state: 'TS', lat: 17.4930, lng: 78.3470, type: 'single_bin', capacity: 60, current: 55, status: 'active', lastCollection: '2026-08-13T17:00:00' },
    { id: 'B008', name: 'KPHB Colony Main Bin', ward: 'W07', state: 'TS', lat: 17.4940, lng: 78.4040, type: 'dual_bin', capacity: 120, current: 70, status: 'active', lastCollection: '2026-08-14T06:45:00' },
    // West Bengal (Kolkata, Salt Lake, Howrah, Siliguri, Durgapur)
    { id: 'B_WB01', name: 'Park Street Smart Dual Bin', ward: 'KMC Ward 63', state: 'WB', lat: 22.5535, lng: 88.3524, type: 'dual_bin', capacity: 150, current: 45, status: 'active', lastCollection: '2026-08-14T07:00:00' },
    { id: 'B_WB02', name: 'Salt Lake Sector V Tech Bin', ward: 'BMC Ward 28', state: 'WB', lat: 22.5786, lng: 88.4326, type: 'dual_bin', capacity: 200, current: 72, status: 'active', lastCollection: '2026-08-14T08:15:00' },
    { id: 'B_WB03', name: 'Howrah Station Central Eco Bin', ward: 'HMC Ward 14', state: 'WB', lat: 22.5850, lng: 88.3426, type: 'large_bin', capacity: 400, current: 340, status: 'full', lastCollection: '2026-08-14T05:30:00' },
    { id: 'B_WB04', name: 'New Town City Centre II Bin', ward: 'NKDA Action Area 2', state: 'WB', lat: 22.6231, lng: 88.4552, type: 'dual_bin', capacity: 120, current: 30, status: 'active', lastCollection: '2026-08-14T09:00:00' },
    { id: 'B_WB05', name: 'Gariahat Shopping District Bin', ward: 'KMC Ward 85', state: 'WB', lat: 22.5186, lng: 88.3653, type: 'large_bin', capacity: 250, current: 160, status: 'active', lastCollection: '2026-08-14T07:45:00' },
    { id: 'B_WB06', name: 'Shyambazar Five Point Bin', ward: 'KMC Ward 10', state: 'WB', lat: 22.6038, lng: 88.3712, type: 'dual_bin', capacity: 120, current: 90, status: 'active', lastCollection: '2026-08-14T06:15:00' },
    { id: 'B_WB07', name: 'Siliguri Hill Cart Road Bin', ward: 'SMC Ward 12', state: 'WB', lat: 26.7162, lng: 88.4300, type: 'single_bin', capacity: 80, current: 40, status: 'active', lastCollection: '2026-08-14T07:30:00' },
    { id: 'B_WB08', name: 'Durgapur City Centre Bin', ward: 'DMC Ward 22', state: 'WB', lat: 23.5350, lng: 87.2980, type: 'dual_bin', capacity: 100, current: 55, status: 'active', lastCollection: '2026-08-14T08:00:00' },
    // Maharashtra / Mumbai
    { id: 'B_MH01', name: 'Nariman Point Marine Bin', ward: 'BMC Ward A', state: 'MH', lat: 18.9256, lng: 72.8242, type: 'dual_bin', capacity: 150, current: 50, status: 'active', lastCollection: '2026-08-14T07:00:00' },
    { id: 'B_MH02', name: 'Bandra Kurla Complex (BKC) Bin', ward: 'BMC Ward H/E', state: 'MH', lat: 19.0657, lng: 72.8687, type: 'large_bin', capacity: 300, current: 120, status: 'active', lastCollection: '2026-08-14T08:30:00' },
    // Karnataka / Bengaluru
    { id: 'B_KA01', name: 'MG Road Metro Station Bin', ward: 'BBMP Ward 111', state: 'KA', lat: 12.9756, lng: 77.6066, type: 'dual_bin', capacity: 120, current: 60, status: 'active', lastCollection: '2026-08-14T07:15:00' },
    { id: 'B_KA02', name: 'Indiranagar 100ft Road Bin', ward: 'BBMP Ward 89', state: 'KA', lat: 12.9719, lng: 77.6412, type: 'dual_bin', capacity: 100, current: 35, status: 'active', lastCollection: '2026-08-14T09:00:00' },
    // Delhi NCR
    { id: 'B_DL01', name: 'Connaught Place Inner Circle Bin', ward: 'NDMC Ward 01', state: 'DL', lat: 28.6315, lng: 77.2167, type: 'dual_bin', capacity: 200, current: 85, status: 'active', lastCollection: '2026-08-14T06:00:00' },
  ],

  // ============================================================
  // Recycling Centers
  // ============================================================
  recyclingCenters: [
    // Telangana
    { id: 'RC001', name: 'GreenCycle Recycling Hub', ward: 'W03', state: 'TS', lat: 17.450, lng: 78.385, address: 'Plot 45, HITEC City, Madhapur, Hyderabad', phone: '040-23456789', accepted: ['Paper', 'Cardboard', 'Glass', 'Metal', 'Plastics (1-7)'], capacity: '80 T/day', status: 'operational', hours: 'Mon–Sat: 8AM–6PM', distance: null },
    { id: 'RC002', name: 'Recycle India - Jubilee Point', ward: 'W02', state: 'TS', lat: 17.434, lng: 78.409, address: '12, Film Nagar Colony, Jubilee Hills, Hyderabad', phone: '040-27891234', accepted: ['Dry Waste', 'Recyclable Plastics', 'Paper', 'Metal'], capacity: '50 T/day', status: 'operational', hours: 'Mon–Sat: 7AM–7PM', distance: null },
    { id: 'RC003', name: 'EcoSpark Material Recovery', ward: 'W04', state: 'TS', lat: 17.442, lng: 78.351, address: 'Road No. 3, IDA Gachibowli, Hyderabad', phone: '040-29876543', accepted: ['Mixed Dry Waste', 'Metals', 'E-Waste Components'], capacity: '120 T/day', status: 'operational', hours: 'Mon–Sun: 6AM–8PM', distance: null },
    // West Bengal
    { id: 'RC_WB01', name: 'Kolkata Circular Economy Hub — Rajarhat', ward: 'NKDA', state: 'WB', lat: 22.6020, lng: 88.4720, address: 'Action Area II, New Town Rajarhat, Kolkata', phone: '033-23245678', accepted: ['Paper', 'Cardboard', 'Plastics (1-7)', 'Glass', 'Aluminium'], capacity: '160 T/day', status: 'operational', hours: 'Mon–Sat: 7AM–7PM', distance: null },
    { id: 'RC_WB02', name: 'Howrah Central Material Recovery Hub', ward: 'HMC', state: 'WB', lat: 22.5950, lng: 88.3200, address: 'Kona Expressway Junction, Howrah', phone: '033-26541122', accepted: ['Dry Waste', 'Metal Scraps', 'Cardboard', 'Rigid Plastics'], capacity: '90 T/day', status: 'operational', hours: 'Mon–Sat: 8AM–6PM', distance: null },
    { id: 'RC_WB03', name: 'Bidhannagar MRF Sorting Unit', ward: 'BMC', state: 'WB', lat: 22.5840, lng: 88.4180, address: 'Sector I, Salt Lake City, Kolkata', phone: '033-23348899', accepted: ['Dry Recyclables', 'Glass', 'Paper'], capacity: '75 T/day', status: 'operational', hours: 'Mon–Sat: 8AM–5PM', distance: null },
    { id: 'RC_WB04', name: 'Siliguri North Bengal Waste Recovery Depot', ward: 'SMC', state: 'WB', lat: 26.7280, lng: 88.4150, address: 'Burdwan Road, Siliguri', phone: '0353-2521144', accepted: ['All Dry Waste', 'Cartons', 'Scrap Metal'], capacity: '60 T/day', status: 'operational', hours: 'Mon–Sat: 8AM–6PM', distance: null },
  ],

  // ============================================================
  // E-Waste Collection Centers
  // ============================================================
  ewasteCenter: [
    // Telangana
    { id: 'EW001', name: 'Attero E-Waste Centre — Madhapur', ward: 'W03', state: 'TS', lat: 17.449, lng: 78.388, address: 'HITEC City Main Road, Madhapur, Hyderabad', phone: '1800-123-4567', accepted: ['Mobile phones', 'Laptops', 'Chargers', 'Printers', 'TVs', 'Batteries'], status: 'operational', hours: 'Mon–Sat: 9AM–6PM', registeredRecycler: true, certification: 'MoEFCC & TSPCB Authorized' },
    { id: 'EW002', name: 'E-Waste Hub — Gachibowli', ward: 'W04', state: 'TS', lat: 17.443, lng: 78.348, address: 'Near IIIT Gate, Gachibowli, Hyderabad', phone: '1800-456-7890', accepted: ['All e-waste categories'], status: 'operational', hours: 'Mon–Sat: 8AM–7PM', registeredRecycler: true, certification: 'MoEFCC Authorized' },
    // West Bengal
    { id: 'EW_WB01', name: 'Hulladek / Attero E-Waste Hub — Sector V', ward: 'BMC', state: 'WB', lat: 22.5740, lng: 88.4350, address: 'EP Block, Sector V, Salt Lake, Kolkata', phone: '1800-212-3456', accepted: ['Smartphones', 'Laptops', 'Cables', 'Monitors', 'Home Appliances', 'Lithium Batteries'], status: 'operational', hours: 'Mon–Sat: 9AM–7PM', registeredRecycler: true, certification: 'WBPCB & MoEFCC Authorized Recycler (E-Waste Rules 2022)' },
    { id: 'EW_WB02', name: 'New Town Green E-Waste Drop-off Point', ward: 'NKDA', state: 'WB', lat: 22.5890, lng: 88.4680, address: 'Eco Park Gate 2, New Town, Kolkata', phone: '1800-889-1122', accepted: ['Consumer Electronics', 'Chargers', 'LEDs', 'Circuit Boards'], status: 'operational', hours: 'Mon–Sun: 8AM–8PM', registeredRecycler: true, certification: 'NKDA Green Channel' },
    { id: 'EW_WB03', name: 'Howrah Industrial E-Waste Recovery Unit', ward: 'HMC', state: 'WB', lat: 22.6080, lng: 88.3050, address: 'Jalan Industrial Complex, Howrah', phone: '033-26789900', accepted: ['Industrial & IT Hardware', 'Batteries', 'Telecom equipment'], status: 'operational', hours: 'Mon–Sat: 8AM–6PM', registeredRecycler: true, certification: 'WBPCB Authorized TSDF Partner' },
  ],

  // ============================================================
  // Processing Facilities
  // ============================================================
  processingFacilities: [
    // Telangana
    { id: 'PF001', name: 'Ramky Enviro — Compost Plant', ward: 'W04', state: 'TS', lat: 17.437, lng: 78.342, address: 'Outer Ring Road, Near Gachibowli, Hyderabad', type: 'Composting / Organic Processing', capacity: '200 T/day', accepted: ['Wet / Organic Waste', 'Garden Waste'], status: 'operational', hours: '24x7', operator: 'Ramky Enviro Engineers Ltd.' },
    { id: 'PF002', name: 'GHMC Integrated Waste Processing', ward: 'W07', state: 'TS', lat: 17.498, lng: 78.412, address: 'Kukatpally Industrial Area, Hyderabad', type: 'Integrated Processing (MRF + Composting)', capacity: '500 T/day', accepted: ['Mixed Municipal Solid Waste'], status: 'operational', hours: '24x7', operator: 'GHMC / IL&FS' },
    // West Bengal
    { id: 'PF_WB01', name: 'Dhapa Solid Waste Processing & Bio-Compost Plant', ward: 'KMC', state: 'WB', lat: 22.5480, lng: 88.4150, address: 'EM Bypass / Dhapa Road, Kolkata', type: 'Integrated Biomethanation & Aerobic Composting', capacity: '750 T/day', accepted: ['Wet Organic Waste', 'Vegetable Market Waste', 'Horticulture Waste'], status: 'operational', hours: '24x7', operator: 'Kolkata Municipal Corporation (KMC)' },
    { id: 'PF_WB02', name: 'New Town Bio-Methanation & Power Plant', ward: 'NKDA', state: 'WB', lat: 22.5950, lng: 88.4820, address: 'Action Area I-D, New Town, Kolkata', type: 'Waste-to-Energy & Biogas Generation', capacity: '180 T/day', accepted: ['Segregated Wet Waste', 'Food Waste from Eateries'], status: 'operational', hours: '24x7', operator: 'NKDA Green Energy Wing' },
    { id: 'PF_WB03', name: 'Bidhannagar Automated MRF & Baling Facility', ward: 'BMC', state: 'WB', lat: 22.5690, lng: 88.4230, address: 'Sector IV, Salt Lake, Kolkata', type: 'Automated Material Recovery & Refuse-Derived Fuel (RDF)', capacity: '250 T/day', accepted: ['Mixed Municipal Dry Waste', 'Plastic Bundles'], status: 'operational', hours: '24x7', operator: 'BMC & TSP Environ' },
  ],

  // ============================================================
  // Authorized Disposal Sites
  // ============================================================
  disposalSites: [
    // Telangana
    { id: 'DS001', name: 'Jawaharnagar Sanitary Landfill', state: 'TS', lat: 17.543, lng: 78.591, address: 'Jawaharnagar, Secunderabad', type: 'Sanitary Engineered Landfill', capacity: '3000 T/day', accepted: ['Inert Waste', 'Residual Waste post-processing'], status: 'operational', operator: 'GHMC', certification: 'TSPCB Authorized' },
    // West Bengal
    { id: 'DS_WB01', name: 'Dhapa Scientific Landfill & C&D Site', state: 'WB', lat: 22.5420, lng: 88.4210, address: 'Eastern Metropolitan Bypass, Kolkata', type: 'Engineered Sanitary Landfill & C&D Disposal', capacity: '2800 T/day', accepted: ['Inert Residues', 'Non-recyclable non-compostable fraction', 'C&D Debris'], status: 'operational', operator: 'KMC Solid Waste Dept.', certification: 'WBPCB Authorized under SWM Rules 2016' },
    { id: 'DS_WB02', name: 'Belgachia Engineered Landfill Site', state: 'WB', lat: 22.6150, lng: 88.3280, address: 'Belgachia, Howrah', type: 'Sanitary Landfill & Legacy Waste Remediation', capacity: '1200 T/day', accepted: ['Inerts', 'Processed Dry Residues'], status: 'operational', operator: 'Howrah Municipal Corporation', certification: 'WBPCB Authorized' },
    { id: 'DS_WB03', name: 'WBPCB Hazardous Waste TSDF — Haldia', state: 'WB', lat: 22.0620, lng: 88.0830, address: 'Haldia Industrial Complex, East Midnapore', type: 'Hazardous Waste Treatment, Storage & Disposal Facility (TSDF)', capacity: '350 T/day', accepted: ['Domestic & Industrial Hazardous Waste', 'E-Waste Residues', 'Chemical Sludges'], status: 'operational', operator: 'West Bengal Waste Management Ltd.', certification: 'CPCB Category A' },
  ],

  // ============================================================
  // Notifications
  // ============================================================
  notifications: {
    citizen: [
      { id: 'N001', type: 'schedule', title: 'Collection Tomorrow Morning', body: 'Your garbage collection is scheduled for tomorrow, 15 Aug between 7AM–9AM.', time: '2h ago', read: false, icon: '🚛', color: 'green' },
      { id: 'N002', type: 'complaint', title: 'Complaint C001 Resolved', body: 'Your complaint about missed collection on Road No. 5 has been resolved.', time: '1d ago', read: false, icon: '✅', color: 'green' },
      { id: 'N003', type: 'tip', title: '♻️ Waste Tip of the Day', body: 'Did you know? Composting your kitchen waste reduces methane emissions from landfills significantly.', time: '1d ago', read: true, icon: '💡', color: 'teal' },
      { id: 'N004', type: 'facility', title: 'New E-Waste Centre Opened', body: 'A new authorized e-waste collection centre has opened near HITEC City.', time: '3d ago', read: true, icon: '📍', color: 'blue' },
      { id: 'N005', type: 'alert', title: 'Heavy Rainfall - Collection Delay', body: 'Due to heavy rainfall, garbage collection in Ward 1 may be delayed by 2 hours today.', time: '5d ago', read: true, icon: '⚠️', color: 'amber' },
    ],
    worker: [
      { id: 'NW001', type: 'assignment', title: 'New Route Assigned', body: 'Your collection route for today has been updated. Check the Route section.', time: '1h ago', read: false, icon: '📍', color: 'blue' },
      { id: 'NW002', type: 'complaint', title: 'Complaint Near Your Route', body: 'Complaint C003 about illegal dumping near Cyber Heights is in your area.', time: '3h ago', read: false, icon: '⚠️', color: 'amber' },
      { id: 'NW003', type: 'target', title: "Today's Target Updated", body: 'Your collection target has been revised to 850 kg. 610 kg completed so far.', time: '4h ago', read: true, icon: '🎯', color: 'green' },
    ],
    admin: [
      { id: 'NA001', type: 'alert', title: 'Ward 2 — Low Collection Efficiency', body: 'Ward 2 collection efficiency is at 81%. Immediate attention required.', time: '1h ago', read: false, icon: '🔴', color: 'red' },
      { id: 'NA002', type: 'alert', title: 'Bin B002 — Full Capacity', body: 'Bin at Banjara Hills Road No. 12 has reached full capacity. Schedule urgent collection.', time: '2h ago', read: false, icon: '🗑️', color: 'amber' },
      { id: 'NA003', type: 'complaint', title: '3 New Complaints Today', body: 'C004, C006, C008 have been submitted and need assignment.', time: '3h ago', read: false, icon: '📝', color: 'blue' },
      { id: 'NA004', type: 'report', title: 'Weekly Report Ready', body: 'The weekly waste management report for 8-14 Aug is ready for review.', time: '1d ago', read: true, icon: '📊', color: 'teal' },
    ]
  },

  // ============================================================
  // Citizen waste input (session data)
  // ============================================================
  citizenWasteInputs: [
    { date: '2026-08-14', wet: 1.2, dry: 0.8, plastic: 0.3, ewaste: 0, hazardous: 0, other: 0.1, total: 2.4 },
    { date: '2026-08-13', wet: 1.0, dry: 0.6, plastic: 0.2, ewaste: 0, hazardous: 0, other: 0.1, total: 1.9 },
    { date: '2026-08-12', wet: 1.4, dry: 0.9, plastic: 0.4, ewaste: 0.1, hazardous: 0, other: 0.1, total: 2.9 },
    { date: '2026-08-11', wet: 0.8, dry: 0.5, plastic: 0.2, ewaste: 0, hazardous: 0, other: 0.0, total: 1.5 },
    { date: '2026-08-10', wet: 1.1, dry: 0.7, plastic: 0.3, ewaste: 0, hazardous: 0, other: 0.1, total: 2.2 },
    { date: '2026-08-09', wet: 0.9, dry: 0.6, plastic: 0.2, ewaste: 0, hazardous: 0, other: 0.1, total: 1.8 },
    { date: '2026-08-08', wet: 1.3, dry: 0.8, plastic: 0.3, ewaste: 0, hazardous: 0, other: 0.2, total: 2.6 },
  ],

  // ============================================================
  // States Configuration
  // ============================================================
  states: {
    WB: { id: 'WB', name: 'West Bengal', center: [22.5726, 88.3639], zoom: 11, pcb: 'WBPCB (West Bengal Pollution Control Board)', capital: 'Kolkata' },
    TS: { id: 'TS', name: 'Telangana', center: [17.4400, 78.3900], zoom: 12, pcb: 'TSPCB (Telangana State Pollution Control Board)', capital: 'Hyderabad' },
    MH: { id: 'MH', name: 'Maharashtra', center: [19.0760, 72.8777], zoom: 11, pcb: 'MPCB (Maharashtra Pollution Control Board)', capital: 'Mumbai' },
    KA: { id: 'KA', name: 'Karnataka', center: [12.9716, 77.5946], zoom: 11, pcb: 'KSPCB (Karnataka State Pollution Control Board)', capital: 'Bengaluru' },
    DL: { id: 'DL', name: 'Delhi NCR', center: [28.6139, 77.2090], zoom: 11, pcb: 'DPCC (Delhi Pollution Control Committee)', capital: 'New Delhi' },
  },

  // ============================================================
  // Multi-State Municipalities (for Authority & State Dashboards)
  // ============================================================
  stateMunicipalities: {
    WB: [
      { id: 'KMC', name: 'Kolkata Municipal Corporation', city: 'Kolkata', households: 1120000, wasteToday: 4250, collected: 3790, efficiency: 89.2, recycled: 1180, disposed: 2610, complaints: 42, wards: 144, lat: 22.5726, lng: 88.3639 },
      { id: 'HMC', name: 'Howrah Municipal Corporation', city: 'Howrah', households: 285000, wasteToday: 850, collected: 715, efficiency: 84.1, recycled: 195, disposed: 520, complaints: 18, wards: 50, lat: 22.5958, lng: 88.3110 },
      { id: 'BMC', name: 'Bidhannagar Municipal Corp. (Salt Lake)', city: 'Bidhannagar', households: 142000, wasteToday: 210, collected: 198, efficiency: 94.3, recycled: 85, disposed: 113, complaints: 6, wards: 41, lat: 22.5840, lng: 88.4180 },
      { id: 'NKDA', name: 'New Town Kolkata Dev. Authority', city: 'New Town', households: 68000, wasteToday: 140, collected: 135, efficiency: 96.4, recycled: 62, disposed: 73, complaints: 3, wards: 12, lat: 22.5890, lng: 88.4750 },
      { id: 'SMC', name: 'Siliguri Municipal Corporation', city: 'Siliguri', households: 154000, wasteToday: 380, collected: 312, efficiency: 82.1, recycled: 78, disposed: 234, complaints: 14, wards: 47, lat: 26.7271, lng: 88.4326 },
      { id: 'DMC', name: 'Durgapur Municipal Corporation', city: 'Durgapur', households: 132000, wasteToday: 340, collected: 289, efficiency: 85.0, recycled: 88, disposed: 201, complaints: 11, wards: 43, lat: 23.5204, lng: 87.3119 },
      { id: 'AMC', name: 'Asansol Municipal Corporation', city: 'Asansol', households: 165000, wasteToday: 410, collected: 334, efficiency: 81.5, recycled: 82, disposed: 252, complaints: 15, wards: 106, lat: 23.6889, lng: 86.9661 },
    ],
    TS: [
      { id: 'GMC', name: 'Greenfield Municipal Corp.', city: 'Greenfield City', households: 97400, wasteToday: 14.13, collected: 11.98, efficiency: 84.8, recycled: 3.9, disposed: 8.08, complaints: 8, wards: 8, lat: 17.415, lng: 78.447 },
      { id: 'HYD', name: 'Hyderabad Municipal Corp.', city: 'Hyderabad', households: 312000, wasteToday: 42.4, collected: 36.8, efficiency: 86.8, recycled: 11.2, disposed: 25.6, complaints: 24, wards: 24, lat: 17.385, lng: 78.486 },
      { id: 'SEC', name: 'Secunderabad Municipality', city: 'Secunderabad', households: 124000, wasteToday: 16.8, collected: 14.2, efficiency: 84.5, recycled: 4.1, disposed: 10.1, complaints: 11, wards: 10, lat: 17.439, lng: 78.498 },
      { id: 'WAR', name: 'Warangal Municipal Corp.', city: 'Warangal', households: 88000, wasteToday: 11.9, collected: 9.8, efficiency: 82.4, recycled: 2.8, disposed: 7.0, complaints: 9, wards: 8, lat: 17.968, lng: 79.594 },
      { id: 'NIZ', name: 'Nizamabad Municipality', city: 'Nizamabad', households: 52000, wasteToday: 6.8, collected: 5.5, efficiency: 80.9, recycled: 1.5, disposed: 4.0, complaints: 6, wards: 6, lat: 18.672, lng: 78.094 },
      { id: 'KAR', name: 'Karimnagar Municipality', city: 'Karimnagar', households: 68000, wasteToday: 8.9, collected: 7.4, efficiency: 83.1, recycled: 2.1, disposed: 5.3, complaints: 7, wards: 7, lat: 18.438, lng: 79.128 },
    ],
    MH: [
      { id: 'BMC_MUM', name: 'Brihanmumbai Municipal Corp. (BMC)', city: 'Mumbai', households: 3200000, wasteToday: 6500, collected: 5980, efficiency: 92.0, recycled: 2100, disposed: 3880, complaints: 88, wards: 227, lat: 18.939, lng: 72.835 },
      { id: 'PMC_PUN', name: 'Pune Municipal Corporation', city: 'Pune', households: 1100000, wasteToday: 2100, collected: 1910, efficiency: 90.9, recycled: 720, disposed: 1190, complaints: 34, wards: 164, lat: 18.520, lng: 73.856 },
      { id: 'TMC_THA', name: 'Thane Municipal Corporation', city: 'Thane', households: 480000, wasteToday: 920, collected: 810, efficiency: 88.0, recycled: 270, disposed: 540, complaints: 19, wards: 65, lat: 19.218, lng: 72.978 },
      { id: 'NMMC_NAV', name: 'Navi Mumbai Municipal Corp.', city: 'Navi Mumbai', households: 320000, wasteToday: 680, collected: 650, efficiency: 95.5, recycled: 290, disposed: 360, complaints: 8, wards: 89, lat: 19.033, lng: 73.029 },
    ],
    KA: [
      { id: 'BBMP_BLR', name: 'Bruhat Bengaluru Mahanagara Palike', city: 'Bengaluru', households: 2800000, wasteToday: 4800, collected: 4220, efficiency: 87.9, recycled: 1540, disposed: 2680, complaints: 76, wards: 198, lat: 12.971, lng: 77.594 },
      { id: 'MCC_MYS', name: 'Mysuru City Corporation', city: 'Mysuru', households: 260000, wasteToday: 450, collected: 425, efficiency: 94.4, recycled: 190, disposed: 235, complaints: 9, wards: 65, lat: 12.295, lng: 76.639 },
      { id: 'HDMC_HUB', name: 'Hubballi-Dharwad Municipal Corp.', city: 'Hubballi', households: 240000, wasteToday: 390, collected: 320, efficiency: 82.0, recycled: 95, disposed: 225, complaints: 16, wards: 82, lat: 15.364, lng: 75.124 },
    ],
    DL: [
      { id: 'MCD_DEL', name: 'Municipal Corporation of Delhi', city: 'Delhi', households: 3600000, wasteToday: 11000, collected: 9680, efficiency: 88.0, recycled: 3200, disposed: 6480, complaints: 120, wards: 250, lat: 28.613, lng: 77.209 },
      { id: 'NDMC_DEL', name: 'New Delhi Municipal Council', city: 'New Delhi', households: 75000, wasteToday: 280, collected: 275, efficiency: 98.2, recycled: 140, disposed: 135, complaints: 4, wards: 14, lat: 28.601, lng: 77.218 },
    ]
  },

  // State-level municipalities (Default Telangana)
  municipalities: [
    { id: 'GMC', name: 'Greenfield Municipal Corp.',  city: 'Greenfield City', households: 97400, wasteToday: 14.13, collected: 11.98, efficiency: 84.8, recycled: 3.9,  disposed: 8.08,  complaints: 8,  wards: 8, lat: 17.415, lng: 78.447  },
    { id: 'HYD', name: 'Hyderabad Municipal Corp.',   city: 'Hyderabad',       households: 312000, wasteToday: 42.4, collected: 36.8, efficiency: 86.8, recycled: 11.2, disposed: 25.6, complaints: 24, wards: 24, lat: 17.385, lng: 78.486 },
    { id: 'SEC', name: 'Secunderabad Municipality',   city: 'Secunderabad',    households: 124000, wasteToday: 16.8, collected: 14.2, efficiency: 84.5, recycled: 4.1,  disposed: 10.1, complaints: 11, wards: 10, lat: 17.439, lng: 78.498 },
    { id: 'WAR', name: 'Warangal Municipal Corp.',    city: 'Warangal',        households: 88000,  wasteToday: 11.9, collected: 9.8,  efficiency: 82.4, recycled: 2.8,  disposed: 7.0,  complaints: 9,  wards: 8, lat: 17.968, lng: 79.594  },
    { id: 'NIZ', name: 'Nizamabad Municipality',      city: 'Nizamabad',       households: 52000,  wasteToday: 6.8,  collected: 5.5,  efficiency: 80.9, recycled: 1.5,  disposed: 4.0,  complaints: 6,  wards: 6, lat: 18.672, lng: 78.094  },
    { id: 'KAR', name: 'Karimnagar Municipality',     city: 'Karimnagar',      households: 68000,  wasteToday: 8.9,  collected: 7.4,  efficiency: 83.1, recycled: 2.1,  disposed: 5.3,  complaints: 7,  wards: 7, lat: 18.438, lng: 79.128  },
  ],

  // ============================================================
  // "What Goes Where" item database
  // ============================================================
  wasteItems: [
    { keywords: ['banana', 'peel', 'fruit', 'food', 'kitchen', 'vegetable', 'onion', 'potato', 'apple', 'mango', 'rice', 'curry', 'cooked', 'egg', 'shell', 'coffee', 'tea', 'bread', 'roti'], category: 'wet', label: 'Wet / Organic Waste', emoji: '🟢', dos: ['Segregate in green bin', 'Use for composting at home', 'Keep separate from dry waste', 'Drain excess liquids'], donts: ["Don't mix with dry or plastic waste", "Don't dump in public spaces", "Don't put in recycling bin"] },
    { keywords: ['newspaper', 'paper', 'cardboard', 'magazine', 'book', 'notebook', 'envelope', 'box', 'carton', 'tissue', 'pamphlet', 'receipt'], category: 'dry', label: 'Dry / Recyclable Waste', emoji: '🔵', dos: ['Keep dry and clean', 'Put in blue/dry bin', 'Flatten cardboard boxes', 'Remove food residue from paper'], donts: ["Don't wet or contaminate", "Don't mix with wet waste", "Don't shred excessively"] },
    { keywords: ['glass', 'bottle', 'jar', 'broken glass', 'mirror', 'window', 'flask', 'container glass'], category: 'dry', label: 'Dry / Recyclable Waste (Glass)', emoji: '🔵', dos: ['Rinse thoroughly', 'Put in dry/recyclable bin', 'Wrap broken glass in paper for safety'], donts: ["Don't mix with other waste", "Don't leave sharp pieces exposed"] },
    { keywords: ['metal', 'tin', 'can', 'steel', 'aluminium', 'iron', 'copper', 'scrap'], category: 'dry', label: 'Dry / Recyclable Waste (Metal)', emoji: '🔵', dos: ['Rinse cans', 'Compress if possible', 'Put in dry waste bin or give to scrap dealer'], donts: ["Don't mix with wet waste"] },
    { keywords: ['plastic', 'bottle', 'bag', 'wrapper', 'packaging', 'container', 'straw', 'cup', 'styrofoam', 'foam', 'polythene', 'carry bag', 'sachet', 'pouch'], category: 'plastic', label: 'Plastic Waste', emoji: '🟠', dos: ['Check recycling number (1–7)', 'Rinse before discarding', 'Use authorized plastic collection bins', 'Reduce single-use plastic'], donts: ["Don't burn plastic — toxic fumes", "Don't dump in drains or water bodies", "Don't mix with organic waste"] },
    { keywords: ['mobile', 'phone', 'smartphone', 'charger', 'cable', 'laptop', 'computer', 'monitor', 'keyboard', 'mouse', 'printer', 'tv', 'television', 'tablet', 'ipad', 'earphone', 'headphone', 'circuit', 'board', 'electronic', 'appliance', 'fan', 'cooler', 'air conditioner', 'washing machine', 'fridge', 'refrigerator', 'microwave'], category: 'ewaste', label: 'E-Waste (Electronic Waste)', emoji: '🟣', dos: ['Take to authorized e-waste collection centre', 'Use OEM take-back schemes (Nokia, HP etc.)', 'Contact registered e-waste recyclers'], donts: ["Don't put in regular household bin", "Don't dismantle yourself — toxic materials", "Don't sell to unregistered kabadiwallas", "Don't dump in open areas"] },
    { keywords: ['battery', 'cell', 'aa battery', 'aaa battery', 'lithium', 'alkaline', 'button cell', 'rechargeable battery', 'power bank'], category: 'battery', label: 'Battery Waste', emoji: '🔋', dos: ['Take to authorized battery collection / recycling point', 'Use retailer take-back schemes', 'Store safely until collection'], donts: ["Don't throw in regular bin", "Don't break or puncture", "Don't burn", "Don't put in drain"] },
    { keywords: ['paint', 'thinner', 'solvent', 'bleach', 'disinfectant', 'chemical', 'pesticide', 'insecticide', 'medicine', 'drug', 'pill', 'tablet', 'syringe', 'needle', 'fertilizer', 'cleaning liquid', 'acid'], category: 'hazardous', label: 'Domestic Hazardous Waste', emoji: '🔴', dos: ['Contact municipality for hazardous waste collection', 'Store in original containers', 'Label clearly', 'Take to designated hazardous waste drop-off'], donts: ["Don't pour down drain", "Don't mix with regular waste", "Don't burn", "Don't put in regular bin"] },
    { keywords: ['brick', 'concrete', 'cement', 'tile', 'rubble', 'debris', 'sand', 'gravel', 'construction', 'demolition', 'plaster', 'mortar'], category: 'cd', label: 'Construction & Demolition Waste', emoji: '🏗️', dos: ['Use authorized C&D waste collection points', 'Contact municipality for bulk C&D pickup', 'Consider recycling — C&D materials are recyclable'], donts: ["Don't dump on roads or public land", "Don't mix with regular household waste", "Don't dump in drains"] },
    { keywords: ['sanitary', 'napkin', 'pad', 'diaper', 'bandage', 'cotton', 'gauze', 'dressing', 'medical'], category: 'bio', label: 'Biomedical / Sanitary Waste', emoji: '🏥', dos: ['Wrap in newspaper before discarding', 'Dispose in separate bin if available', 'Contact municipality for guidance on biomedical waste'], donts: ["Don't put loose in public bins", "Don't compost", "Don't recycle"] },
    { keywords: ['tyre', 'tire', 'vehicle', 'car', 'motorcycle', 'bike part', 'engine oil', 'motor oil', 'brake fluid', 'car battery', 'auto part'], category: 'automotive', label: 'Automotive / Vehicle Waste', emoji: '🚗', dos: ['Return to authorized service centres', 'Contact scrap dealers registered with govt', 'Return tyres to tyre dealers (take-back)'], donts: ["Don't dump in open areas", "Don't burn tyres — highly toxic", "Don't put in regular bins"] },
    { keywords: ['leaves', 'grass', 'garden', 'plant', 'compost', 'tree', 'branches', 'twigs', 'soil', 'mulch'], category: 'wet', label: 'Garden / Green Waste (Organic)', emoji: '🟢', dos: ['Compost at home or in community compost pit', 'Use municipal garden waste collection', 'Donate to composting facilities'], donts: ["Don't burn in open spaces", "Don't mix with plastic or other waste"] },
  ],

  // ============================================================
  // Collection schedule (citizen view)
  // ============================================================
  collectionSchedule: {
    W01: { days: ['Monday', 'Wednesday', 'Friday', 'Sunday'], time: '7:00 AM – 9:00 AM', nextCollection: '2026-08-15 (Friday)', type: 'Door-to-door' },
    W02: { days: ['Tuesday', 'Thursday', 'Saturday'], time: '7:00 AM – 9:30 AM', nextCollection: '2026-08-15 (Saturday)', type: 'Door-to-door' },
    W03: { days: ['Monday', 'Wednesday', 'Friday'], time: '6:30 AM – 8:30 AM', nextCollection: '2026-08-18 (Monday)', type: 'Door-to-door' },
    W04: { days: ['Daily'], time: '6:00 AM – 8:00 AM', nextCollection: '2026-08-15 (Saturday)', type: 'Door-to-door' },
    W05: { days: ['Tuesday', 'Thursday', 'Sunday'], time: '7:00 AM – 9:00 AM', nextCollection: '2026-08-17 (Sunday)', type: 'Door-to-door' },
    W06: { days: ['Monday', 'Wednesday', 'Friday', 'Sunday'], time: '7:30 AM – 10:00 AM', nextCollection: '2026-08-15 (Friday)', type: 'Door-to-door' },
    W07: { days: ['Daily'], time: '6:00 AM – 10:00 AM', nextCollection: '2026-08-15 (Saturday)', type: 'Door-to-door' },
    W08: { days: ['Monday', 'Thursday', 'Saturday'], time: '7:00 AM – 9:00 AM', nextCollection: '2026-08-15 (Saturday)', type: 'Door-to-door' },
  }
};

// Make globally available
window.EcoData = EcoData;
