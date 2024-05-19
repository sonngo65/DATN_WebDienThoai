import {
  differenceInMilliseconds,
  intervalToDuration,
  formatDuration,
  format,
} from "date-fns";
export default function useFormatDate() {
  const customFormatDuration = (start: number, endTime: any) => {
    const currenTime = new Date();
    endTime = new Date(endTime);
    const durationInMillis = differenceInMilliseconds(endTime, currenTime);
    const duration = intervalToDuration({
      start: 0,
      end: durationInMillis,
    });
    return duration;

    // if (duration.years && duration.years > 0)
    //   return formatDuration(duration, {
    //     format: ["years"],
    //   });
    // if (duration.months && duration.months > 0)
    //   return formatDuration(duration, {
    //     format: ["months"],
    //   });
    // if (duration.days && duration.days > 0)
    //   return formatDuration(duration, {
    //     format: ["days"],
    //   });
    // if (duration.minutes && duration.minutes > 0)
    //   return formatDuration(duration, {
    //     format: ["minutes"],
    //   });
    // if (duration.seconds && duration.seconds > 0)
    //   return formatDuration(duration, {
    //     format: ["seconds"],
    //   });
  };
  const formatDate = (dateTime: any) => {
    dateTime = new Date(dateTime);
    return format(dateTime, "d 'thg' M, HH:mm");
  };
  const formatDateInput = (dateTime: any) => {
    dateTime = new Date(dateTime);
    return format(dateTime, "yyyy-MM-dd");
  };
  return {
    customFormatDuration,
    formatDate,
    formatDateInput,
  };
}
