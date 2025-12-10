
interface FormattedDateProps {
    date: string | Date;
}

export default function FormattedDate({ date }: FormattedDateProps) {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true, 
    };

    return <>{d.toLocaleString(undefined, options)}</>;
}
