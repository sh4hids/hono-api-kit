import { StatusCodes } from 'http-status-codes';

const HttpStatusCodes = Object.fromEntries(
  Object.entries(StatusCodes).filter(([, v]) => typeof v === 'number')
) as Record<keyof typeof StatusCodes, number>;

export default HttpStatusCodes;
