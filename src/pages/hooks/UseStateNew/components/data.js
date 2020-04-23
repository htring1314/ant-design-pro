import { formatMessage } from 'umi-plugin-react/locale';

const everyday = { value: '1', name: formatMessage({ id: 'useState.everyday' }) };
const everyWeek = { value: '2', name: formatMessage({ id: 'useState.every.week' }) };
const everyMonth = { value: '3', name: formatMessage({ id: 'useState.every.month' }) };

const frequencySelect = [everyday, everyWeek, everyMonth];

const weeksSelect = [
  { value: 'MONDAY', name: formatMessage({ id: 'useState.monday' }) },
  { value: 'TUESDAY', name: formatMessage({ id: 'useState.tuesday' }) },
  { value: 'WEDNESDAY', name: formatMessage({ id: 'useState.wednesday' }) },
  { value: 'THURSDAY', name: formatMessage({ id: 'useState.thursday' }) },
  { value: 'FRIDAY', name: formatMessage({ id: 'useState.friday' }) },
  { value: 'SATURDAY', name: formatMessage({ id: 'useState.saturday' }) },
  { value: 'SUNDAY', name: formatMessage({ id: 'useState.sunday' }) },
];

const daySelect = () => {
  const days = [];
  for (let i = 1; i <= 28; i += 1) {
    days.push({ value: i, name: i });
  }
  return days;
};

export { everyday, everyWeek, everyMonth, frequencySelect, weeksSelect, daySelect };
