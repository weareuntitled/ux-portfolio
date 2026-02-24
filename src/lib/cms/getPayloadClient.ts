import config from '@payload-config';
import { getPayload } from 'payload';

let clientPromise: ReturnType<typeof getPayload> | null = null;

export const getPayloadClient = () => {
  if (!clientPromise) {
    clientPromise = getPayload({ config });
  }

  return clientPromise;
};
