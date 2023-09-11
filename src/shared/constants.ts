import dayjs from "dayjs";

export const DEFAULT_DATE_INPUT_FORMAT = "YYYY-MM-DD";
export const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";
export const NOW_DATE_FORMAT = dayjs().format(DEFAULT_DATE_INPUT_FORMAT);
