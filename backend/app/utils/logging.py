"""
Nethub Logging System
Version: v1.2.0

Changes:
- True inline pill (no column effect)
- White text for all levels
- Improved spacing between elements
"""

import sys
import os
import logging
from loguru import logger as loguru_logger

# ----------------------------
# ⚙️ CONFIG
# ----------------------------
VERSION = "v1.2.0"

ENV = os.getenv("ENV", "dev").lower()
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

# ----------------------------
# 🎨 LEVEL STYLING (true pill)
# ----------------------------
LEVEL_STYLES = {
    "DEBUG":    "<white><bg #607D8B>",
    "INFO":     "<white><bg #2E7D32>",   # ✅ proper green
    "WARNING":  "<white><bg #F9A825>",
    "ERROR":    "<white><bg #C62828>",
    "CRITICAL": "<white><bg #6A1B9A>",
}

for level_name, style in LEVEL_STYLES.items():
    loguru_logger.level(level_name, color=style)

# ----------------------------
# 🔇 NOISE FILTER
# ----------------------------
NOISY_LOGGERS = {
    "watchfiles",
    "uvicorn.access",
    "uvicorn.reload",
    "asyncio",
}

def noise_filter(record):
    name = record["name"]

    if any(name.startswith(n) for n in NOISY_LOGGERS):
        return False

    if record["level"].name == "DEBUG" and ENV != "dev":
        return False

    return True

# ----------------------------
# 🔌 INTERCEPT STANDARD LOGGING
# ----------------------------
class InterceptHandler(logging.Handler):
    def emit(self, record):
        try:
            level = loguru_logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        loguru_logger.opt(
            depth=6,
            exception=record.exc_info
        ).log(level, record.getMessage())


def setup_intercept():
    logging.root.handlers = [InterceptHandler()]
    logging.root.setLevel(LOG_LEVEL)

    for name in logging.root.manager.loggerDict:
        logger_obj = logging.getLogger(name)
        logger_obj.handlers = []
        logger_obj.propagate = True

# ----------------------------
# 🧱 LOGGER SETUP
# ----------------------------
def setup_logger():
    loguru_logger.remove()

    loguru_logger.add(
        sys.stdout,
        level=LOG_LEVEL,
        colorize=True,
        filter=noise_filter,
        enqueue=True,
        format=(
            "<level> {level} </level>  "
            "<green>{time:HH:mm:ss}</green>  "   # ⬅️ double space
            # "<level> {level} </level>  "         # ⬅️ tight pill
            "<cyan>{name}</cyan>:<cyan>{line}</cyan>  "
            "{message}"
        ),
    )

    loguru_logger.add(
        "logs/app_{time:YYYY-MM-DD}.log",
        level="INFO",
        rotation="10 MB",
        retention="14 days",
        compression="zip",
        serialize=True,
        enqueue=True,
        backtrace=True,
        diagnose=ENV == "dev",
    )

    setup_intercept()
    return loguru_logger


logger = setup_logger()