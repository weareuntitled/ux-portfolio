'use client';

import { useEffect } from 'react';

const ADMIN_BODY_CLASS = 'payload-admin-page';

/**
 * Ensures the body has a class when the Payload admin is shown so that
 * (payload)/custom.scss can force a light, readable theme and avoid
 * portfolio globals (e.g. dark text on dark bg) affecting the admin.
 */
export function AdminBodyClass() {
  useEffect(() => {
    document.body.classList.add(ADMIN_BODY_CLASS);
    return () => document.body.classList.remove(ADMIN_BODY_CLASS);
  }, []);
  return null;
}
