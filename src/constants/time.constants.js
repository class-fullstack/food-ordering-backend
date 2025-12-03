const SECOND = 1000; // 1s  = 1000ms
const MINUTE = 60 * SECOND; // 1m  = 60s
const HOUR = 60 * MINUTE; // 1h  = 60m
const DAY = 24 * HOUR; // 1d  = 24h
const YEAR = 365 * DAY; // 1y  = 365d

const timeConstants = {
  SECOND,
  MINUTE,
  HOUR,

  // Các khoảng thời gian hay dùng (đơn vị: ms)
  DURATION: {
    FIFTEEN_SECONDS: 15 * SECOND,
    FIVE_MINUTES: 5 * MINUTE,
    FIFTEEN_MINUTES: 15 * MINUTE,
    ONE_HOUR: HOUR,
    SEVEN_DAYS: 7 * DAY,
    ONE_YEAR: YEAR,
  },
};

module.exports = timeConstants;
