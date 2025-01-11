export const getStatusColor = (status: string) => {
  switch (status) {
    case 'متاح':
      return 'bg-[#D9D9D9] text-darkBlue';
    case 'محجوز':
      return 'bg-[#C6A567] text-white';
    case 'مباع':
      return 'bg-darkBlue text-white';
    default:
      return 'bg-[#D9D9D9] text-darkBlue';
  }
};

export const getFloorName = (number: number) => {
  const floors = ['الأرضي', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'];
  return floors[number] || `${number}`;
};