import winston, { format, Logger, transports } from "winston"

export const createLogger = (serverID: string, level: string = "info"): Logger => {
  const formatForConsole = format.combine(
    format.colorize(),
    format.printf(info => `${info.timestamp} ${info.label} [${info.level}] ${info.message}`),
  )
  const consoleTransp = new transports.Console({ format: formatForConsole })
  const fileAllInfos = new transports.File({ filename: "./server.log", level: "info" })
  const fileErrorOnly = new transports.File({ filename: "./server.error.log", level: "error" })
  const logger = winston.createLogger({
    level,
    format: format.combine(
      format.label({ label: serverID }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(info => `${info.timestamp} ${info.label} [${info.level}] ${info.message}`),
    ),
    transports: [fileAllInfos, fileErrorOnly],
  })
  if (process.env.NODE_ENV !== "production") {
    logger.add(consoleTransp)
  }
  return logger
}
