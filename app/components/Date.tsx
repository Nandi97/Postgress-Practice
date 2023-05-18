import { format, parseISO } from 'date-fns';

type DateFormat = {
	dateString: string;
};

export default function Date({ dateString }: DateFormat) {
	const date = parseISO(dateString);
	return <time dateTime={dateString}>{format(date, 'PPpp')}</time>;
}
