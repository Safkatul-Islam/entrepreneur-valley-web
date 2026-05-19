export const PITCH_VIDEO_MAX_DURATION_SECONDS = 60;
export const PITCH_VIDEO_MAX_FILE_SIZE_MB = 50;
export const PITCH_VIDEO_MAX_FILE_SIZE_BYTES =
  PITCH_VIDEO_MAX_FILE_SIZE_MB * 1024 * 1024;

export const PITCH_VIDEO_ALLOWED_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
] as const;

export const PITCH_VIDEO_ALLOWED_FORMATS_LABEL = "MP4, MOV, or WebM";
